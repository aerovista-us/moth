// Error Handler - Moth Wing Power Business Planning
class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.maxRetries = 3;
        this.retryDelay = 1000;
        this.init();
    }
    
    init() {
        this.setupGlobalErrorHandling();
        this.setupDocumentErrorHandling();
        this.setupDataErrorHandling();
        this.setupNetworkErrorHandling();
    }
    
    setupGlobalErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.logError('Global Error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error?.toString(),
                stack: event.error?.stack
            });
            
            // Show user-friendly error message
            this.showUserError('Application Error', 
                'An unexpected error occurred. Please refresh the page or contact support if the problem persists.');
        });
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled Promise Rejection', {
                reason: event.reason?.toString(),
                promise: event.promise,
                stack: event.reason?.stack
            });
            
            // Show user-friendly error message
            this.showUserError('Network Error', 
                'A network request failed. Please check your internet connection and try again.');
        });
        
        // Resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.logError('Resource Loading Error', {
                    resource: event.target.src || event.target.href,
                    type: event.target.tagName,
                    error: event.error?.toString()
                });
            }
        }, true);
        
        // Timeout errors
        this.setupTimeoutHandling();
    }
    
    setupTimeoutHandling() {
        // Override setTimeout to catch timeout errors
        const originalSetTimeout = window.setTimeout;
        window.setTimeout = (callback, delay, ...args) => {
            return originalSetTimeout(() => {
                try {
                    callback(...args);
                } catch (error) {
                    this.logError('Timeout Error', {
                        error: error.message,
                        stack: error.stack,
                        delay: delay
                    });
                }
            }, delay);
        };
    }
    
    setupDocumentErrorHandling() {
        // Override document integration methods with error handling
        if (window.documentIntegration) {
            const originalPreviewDocument = window.documentIntegration.previewDocument;
            window.documentIntegration.previewDocument = async (documentKey) => {
                try {
                    await originalPreviewDocument.call(window.documentIntegration, documentKey);
                } catch (error) {
                    this.handleDocumentError(documentKey, error);
                }
            };
        }
    }
    
    setupDataErrorHandling() {
        // Override data manager methods with error handling
        if (window.dataManager) {
            const originalSaveData = window.dataManager.saveData;
            window.dataManager.saveData = () => {
                try {
                    originalSaveData.call(window.dataManager);
                } catch (error) {
                    this.handleDataError('saveData', error);
                }
            };
            
            const originalLoadData = window.dataManager.loadData;
            window.dataManager.loadData = () => {
                try {
                    return originalLoadData.call(window.dataManager);
                } catch (error) {
                    this.handleDataError('loadData', error);
                    return window.dataManager.getDefaultData();
                }
            };
        }
    }
    
    setupNetworkErrorHandling() {
        // Add network error detection
        window.addEventListener('online', () => {
            this.showNetworkStatus('online');
            this.retryFailedOperations();
        });
        
        window.addEventListener('offline', () => {
            this.showNetworkStatus('offline');
        });
    }
    
    async handleDocumentError(documentKey, error) {
        this.logError('Document Loading Error', {
            documentKey,
            error: error.message,
            stack: error.stack
        });
        
        this.showUserError('Document Loading Failed', 
            `Failed to load ${documentKey}. Please check your internet connection and try again.`);
        
        // Try to load from cache if available
        const cachedContent = this.getCachedDocument(documentKey);
        if (cachedContent) {
            this.showUserError('Using Cached Version', 
                `Showing cached version of ${documentKey}. Some content may be outdated.`);
            return cachedContent;
        }
    }
    
    handleDataError(operation, error) {
        this.logError('Data Operation Error', {
            operation,
            error: error.message,
            stack: error.stack
        });
        
        this.showUserError('Data Error', 
            `Failed to ${operation}. Your data may not be saved. Please try again.`);
        
        // Attempt to recover data
        this.attemptDataRecovery(operation);
    }
    
    attemptDataRecovery(operation) {
        try {
            // Try to recover from localStorage backup
            const backupData = localStorage.getItem('mothEmporiumBusinessData_backup');
            if (backupData) {
                localStorage.setItem('mothEmporiumBusinessData', backupData);
                this.showUserError('Data Recovered', 
                    'Your data has been recovered from backup.');
            }
        } catch (error) {
            this.logError('Data Recovery Failed', {
                operation,
                error: error.message
            });
        }
    }
    
    async retryFailedOperations() {
        const failedOperations = this.errorLog.filter(error => 
            error.type === 'Document Loading Error' && error.retryCount < this.maxRetries
        );
        
        for (const operation of failedOperations) {
            try {
                await this.retryOperation(operation);
                operation.retryCount = (operation.retryCount || 0) + 1;
            } catch (error) {
                this.logError('Retry Failed', {
                    originalError: operation,
                    retryError: error.message
                });
            }
        }
    }
    
    async retryOperation(operation) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        // Implement retry logic based on operation type
        if (operation.documentKey) {
            return window.documentIntegration.previewDocument(operation.documentKey);
        }
    }
    
    logError(type, details) {
        const errorEntry = {
            type,
            details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            retryCount: 0
        };
        
        this.errorLog.push(errorEntry);
        
        // Keep only last 100 errors
        if (this.errorLog.length > 100) {
            this.errorLog = this.errorLog.slice(-100);
        }
        
        // Send to analytics if available
        this.sendErrorToAnalytics(errorEntry);
        
        console.error('ErrorHandler:', errorEntry);
    }
    
    sendErrorToAnalytics(errorEntry) {
        // Send error data to analytics service
        if (window.analytics && window.analytics.track) {
            window.analytics.track('Error Occurred', {
                errorType: errorEntry.type,
                errorDetails: errorEntry.details,
                timestamp: errorEntry.timestamp
            });
        }
    }
    
    showUserError(title, message) {
        // Create user-friendly error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div class="error-content">
                <h4>⚠️ ${title}</h4>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">Dismiss</button>
            </div>
        `;
        
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f44336;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            animation: errorSlideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (errorDiv.parentNode) {
                        errorDiv.parentNode.removeChild(errorDiv);
                    }
                }, 300);
            }
        }, 10000);
    }
    
    showNetworkStatus(status) {
        const statusDiv = document.createElement('div');
        statusDiv.className = `network-status ${status}`;
        statusDiv.textContent = status === 'online' ? '🟢 Online' : '🔴 Offline';
        
        statusDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            z-index: 10000;
            font-weight: bold;
            animation: fadeIn 0.3s ease-out;
        `;
        
        if (status === 'online') {
            statusDiv.style.background = '#4caf50';
            statusDiv.style.color = 'white';
        } else {
            statusDiv.style.background = '#f44336';
            statusDiv.style.color = 'white';
        }
        
        document.body.appendChild(statusDiv);
        
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.style.animation = 'fadeOut 0.3s ease-in';
                setTimeout(() => {
                    if (statusDiv.parentNode) {
                        statusDiv.parentNode.removeChild(statusDiv);
                    }
                }, 300);
            }
        }, 3000);
    }
    
    getCachedDocument(documentKey) {
        try {
            const cached = localStorage.getItem(`document_${documentKey}_cache`);
            if (cached) {
                const cacheData = JSON.parse(cached);
                // Check if cache is still valid (24 hours)
                if (Date.now() - cacheData.timestamp < 24 * 60 * 60 * 1000) {
                    return cacheData.content;
                }
            }
        } catch (error) {
            this.logError('Cache Retrieval Error', {
                documentKey,
                error: error.message
            });
        }
        return null;
    }
    
    setCachedDocument(documentKey, content) {
        try {
            const cacheData = {
                content,
                timestamp: Date.now()
            };
            localStorage.setItem(`document_${documentKey}_cache`, JSON.stringify(cacheData));
        } catch (error) {
            this.logError('Cache Storage Error', {
                documentKey,
                error: error.message
            });
        }
    }
    
    // Public methods for external use
    getErrorLog() {
        return this.errorLog;
    }
    
    clearErrorLog() {
        this.errorLog = [];
    }
    
    exportErrorLog() {
        const errorData = {
            errors: this.errorLog,
            exportDate: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        const blob = new Blob([JSON.stringify(errorData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'error-log.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    // Health check method
    performHealthCheck() {
        const healthStatus = {
            timestamp: new Date().toISOString(),
            errors: this.errorLog.length,
            lastError: this.errorLog[this.errorLog.length - 1],
            localStorage: this.checkLocalStorage(),
            network: navigator.onLine,
            performance: this.checkPerformance()
        };
        
        return healthStatus;
    }
    
    checkLocalStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return { available: true, error: null };
        } catch (error) {
            return { available: false, error: error.message };
        }
    }
    
    checkPerformance() {
        if (window.performance && window.performance.memory) {
            return {
                usedJSHeapSize: window.performance.memory.usedJSHeapSize,
                totalJSHeapSize: window.performance.memory.totalJSHeapSize,
                jsHeapSizeLimit: window.performance.memory.jsHeapSizeLimit
            };
        }
        return { available: false };
    }
}

// Initialize error handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.errorHandler = new ErrorHandler();
    
    // Add error log export button to analytics section
    addErrorLogExportButton();
});

function addErrorLogExportButton() {
    const analyticsSection = document.getElementById('analytics');
    if (analyticsSection) {
        const errorLogDiv = document.createElement('div');
        errorLogDiv.className = 'card mystical-card floating-card';
        errorLogDiv.innerHTML = `
            <h3>🔧 Error Management</h3>
            <div class="error-controls">
                <button class="btn mystical-btn" onclick="window.errorHandler.exportErrorLog()">Export Error Log</button>
                <button class="btn mystical-btn" onclick="window.errorHandler.clearErrorLog()">Clear Error Log</button>
                <button class="btn mystical-btn" onclick="showHealthCheck()">Health Check</button>
            </div>
            <div id="healthCheckResults" class="health-check-results"></div>
        `;
        
        analyticsSection.appendChild(errorLogDiv);
    }
}

function showHealthCheck() {
    const results = window.errorHandler.performHealthCheck();
    const resultsDiv = document.getElementById('healthCheckResults');
    
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <h4>System Health Check</h4>
            <div class="health-metrics">
                <div class="metric">
                    <strong>Errors:</strong> ${results.errors}
                </div>
                <div class="metric">
                    <strong>Network:</strong> ${results.network ? '🟢 Online' : '🔴 Offline'}
                </div>
                <div class="metric">
                    <strong>LocalStorage:</strong> ${results.localStorage.available ? '🟢 Available' : '🔴 Unavailable'}
                </div>
                <div class="metric">
                    <strong>Memory Usage:</strong> ${results.performance.available ? 
                        `${Math.round(results.performance.usedJSHeapSize / 1024 / 1024)}MB / ${Math.round(results.performance.totalJSHeapSize / 1024 / 1024)}MB` : 
                        'N/A'}
                </div>
            </div>
        `;
    }
}

// Add CSS for error notifications
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .error-notification {
        animation: errorSlideIn 0.3s ease-out;
    }
    
    @keyframes errorSlideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes errorSlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes errorFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes errorFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .error-controls {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
    }
    
    .health-check-results {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 8px;
    }
    
    .health-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .metric {
        padding: 0.5rem;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 4px;
    }
`;
document.head.appendChild(errorStyle);
