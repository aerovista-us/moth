// Admin Panel - Moth Wing Power Business Planning
class AdminPanel {
    constructor() {
        this.isAdmin = false;
        this.adminKey = 'moth_admin_2024';
        this.init();
    }
    
    init() {
        this.checkAdminAccess();
        if (this.isAdmin) {
            this.createAdminPanel();
            this.setupAdminFeatures();
        }
    }
    
    checkAdminAccess() {
        // Check for admin key in localStorage or URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const adminParam = urlParams.get('admin');
        const storedAdmin = localStorage.getItem('moth_admin_access');
        const adminExpiry = localStorage.getItem('moth_admin_expiry');
        
        // Check if admin access has expired (24 hours)
        if (adminExpiry && Date.now() > parseInt(adminExpiry)) {
            localStorage.removeItem('moth_admin_access');
            localStorage.removeItem('moth_admin_expiry');
            this.isAdmin = false;
            return;
        }
        
        if (adminParam === this.adminKey || storedAdmin === this.adminKey) {
            this.isAdmin = true;
            localStorage.setItem('moth_admin_access', this.adminKey);
            localStorage.setItem('moth_admin_expiry', (Date.now() + 24 * 60 * 60 * 1000).toString());
        }
    }
    
    createAdminPanel() {
        // Create admin panel overlay
        const adminPanel = document.createElement('div');
        adminPanel.id = 'admin-panel';
        adminPanel.className = 'admin-panel';
        adminPanel.innerHTML = `
            <div class="admin-header">
                <h3>🔧 Admin Panel</h3>
                <button class="admin-close" onclick="window.adminPanel.toggleAdminPanel()">×</button>
            </div>
            <div class="admin-content">
                <div class="admin-tabs">
                    <button class="admin-tab active" onclick="window.adminPanel.showAdminTab('data')">Data Management</button>
                    <button class="admin-tab" onclick="window.adminPanel.showAdminTab('analytics')">Analytics</button>
                    <button class="admin-tab" onclick="window.adminPanel.showAdminTab('system')">System</button>
                    <button class="admin-tab" onclick="window.adminPanel.showAdminTab('users')">Users</button>
                </div>
                
                <div class="admin-tab-content">
                    <div id="admin-data" class="admin-tab-panel active">
                        <h4>Data Management</h4>
                        <div class="admin-section">
                            <h5>Data Operations</h5>
                            <div class="admin-controls">
                                <button class="btn mystical-btn" onclick="window.adminPanel.exportAllData()">Export All Data</button>
                                <button class="btn mystical-btn" onclick="window.adminPanel.importData()">Import Data</button>
                                <button class="btn mystical-btn" onclick="window.adminPanel.clearAllData()">Clear All Data</button>
                                <button class="btn mystical-btn" onclick="window.adminPanel.backupData()">Create Backup</button>
                            </div>
                        </div>
                        
                        <div class="admin-section">
                            <h5>Data Statistics</h5>
                            <div id="dataStats" class="admin-stats"></div>
                        </div>
                        
                        <div class="admin-section">
                            <h5>Data Validation</h5>
                            <button class="btn mystical-btn" onclick="window.adminPanel.validateData()">Validate Data</button>
                            <div id="validationResults" class="validation-results"></div>
                        </div>
                    </div>
                    
                    <div id="admin-analytics" class="admin-tab-panel">
                        <h4>Analytics Management</h4>
                        <div class="admin-section">
                            <h5>Analytics Data</h5>
                            <div class="admin-controls">
                                <button class="btn mystical-btn" onclick="window.adminPanel.exportAnalytics()">Export Analytics</button>
                                <button class="btn mystical-btn" onclick="window.adminPanel.clearAnalytics()">Clear Analytics</button>
                                <button class="btn mystical-btn" onclick="window.adminPanel.generateReport()">Generate Report</button>
                            </div>
                        </div>
                        
                        <div class="admin-section">
                            <h5>Analytics Statistics</h5>
                            <div id="analyticsStats" class="admin-stats"></div>
                        </div>
                    </div>
                    
                    <div id="admin-system" class="admin-tab-panel">
                        <h4>System Management</h4>
                        <div class="admin-section">
                            <h5>System Health</h5>
                            <button class="btn mystical-btn" onclick="window.adminPanel.systemHealthCheck()">Health Check</button>
                            <div id="systemHealth" class="system-health"></div>
                        </div>
                        
                        <div class="admin-section">
                            <h5>Performance</h5>
                            <div id="performanceMetrics" class="performance-metrics"></div>
                        </div>
                        
                        <div class="admin-section">
                            <h5>Error Logs</h5>
                            <button class="btn mystical-btn" onclick="window.adminPanel.viewErrorLogs()">View Error Logs</button>
                            <div id="errorLogs" class="error-logs"></div>
                        </div>
                    </div>
                    
                    <div id="admin-users" class="admin-tab-panel">
                        <h4>User Management</h4>
                        <div class="admin-section">
                            <h5>User Sessions</h5>
                            <div id="userSessions" class="user-sessions"></div>
                        </div>
                        
                        <div class="admin-section">
                            <h5>User Analytics</h5>
                            <div id="userAnalytics" class="user-analytics"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        adminPanel.style.cssText = `
            position: fixed;
            top: 0;
            left: -400px;
            width: 400px;
            height: 100vh;
            background: white;
            z-index: 10000;
            transition: left 0.3s ease;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
            overflow-y: auto;
        `;
        
        document.body.appendChild(adminPanel);
        
        // Add admin toggle button
        this.addAdminToggleButton();
    }
    
    addAdminToggleButton() {
        const toggleButton = document.createElement('button');
        toggleButton.id = 'admin-toggle';
        toggleButton.className = 'admin-toggle';
        toggleButton.innerHTML = '🔧';
        toggleButton.onclick = () => this.toggleAdminPanel();
        
        toggleButton.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--moth-gold);
            color: var(--moth-primary);
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 10001;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toggleButton);
    }
    
    toggleAdminPanel() {
        const panel = document.getElementById('admin-panel');
        const toggle = document.getElementById('admin-toggle');
        
        if (panel.style.left === '-400px' || panel.style.left === '') {
            panel.style.left = '0';
            toggle.style.transform = 'rotate(180deg)';
        } else {
            panel.style.left = '-400px';
            toggle.style.transform = 'rotate(0deg)';
        }
    }
    
    showAdminTab(tabName) {
        // Hide all tab panels
        const panels = document.querySelectorAll('.admin-tab-panel');
        panels.forEach(panel => panel.classList.remove('active'));
        
        // Remove active class from all tabs
        const tabs = document.querySelectorAll('.admin-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Show selected tab panel
        const selectedPanel = document.getElementById(`admin-${tabName}`);
        if (selectedPanel) {
            selectedPanel.classList.add('active');
        }
        
        // Add active class to clicked tab
        const clickedTab = event.target;
        clickedTab.classList.add('active');
        
        // Load tab content
        this.loadTabContent(tabName);
    }
    
    loadTabContent(tabName) {
        switch (tabName) {
            case 'data':
                this.loadDataManagement();
                break;
            case 'analytics':
                this.loadAnalyticsManagement();
                break;
            case 'system':
                this.loadSystemManagement();
                break;
            case 'users':
                this.loadUserManagement();
                break;
        }
    }
    
    loadDataManagement() {
        const dataStats = document.getElementById('dataStats');
        if (dataStats && window.dataManager) {
            const data = window.dataManager.data;
            const dataSize = JSON.stringify(data).length;
            
            dataStats.innerHTML = `
                <div class="stat-item">
                    <strong>Data Size:</strong> ${Math.round(dataSize / 1024)} KB
                </div>
                <div class="stat-item">
                    <strong>Last Updated:</strong> ${data.lastUpdated || 'Never'}
                </div>
                <div class="stat-item">
                    <strong>Business Name:</strong> ${data.businessInfo?.brandName || 'Not set'}
                </div>
                <div class="stat-item">
                    <strong>Target Orders:</strong> ${data.businessInfo?.targetOrders || 0}
                </div>
            `;
        }
    }
    
    loadAnalyticsManagement() {
        const analyticsStats = document.getElementById('analyticsStats');
        if (analyticsStats && window.analyticsTracker) {
            const metrics = window.analyticsTracker.getMetrics();
            const usageStats = window.analyticsTracker.getUsageStats();
            
            analyticsStats.innerHTML = `
                <div class="stat-item">
                    <strong>Total Events:</strong> ${metrics.events}
                </div>
                <div class="stat-item">
                    <strong>Session Duration:</strong> ${usageStats.sessionDuration} min
                </div>
                <div class="stat-item">
                    <strong>Form Interactions:</strong> ${usageStats.formInteractions}
                </div>
                <div class="stat-item">
                    <strong>Calculator Usage:</strong> ${usageStats.calculatorUsage}
                </div>
                <div class="stat-item">
                    <strong>Document Views:</strong> ${usageStats.documentViews}
                </div>
                <div class="stat-item">
                    <strong>Data Saves:</strong> ${usageStats.dataSaves}
                </div>
                <div class="stat-item">
                    <strong>Errors:</strong> ${usageStats.errors}
                </div>
            `;
        }
    }
    
    loadSystemManagement() {
        this.systemHealthCheck();
        this.loadPerformanceMetrics();
    }
    
    loadUserManagement() {
        this.loadUserSessions();
        this.loadUserAnalytics();
    }
    
    // Data Management Methods
    exportAllData() {
        if (window.dataManager) {
            window.dataManager.exportData('json');
        }
    }
    
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                window.dataManager.importData(file);
            }
        };
        input.click();
    }
    
    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            if (window.dataManager) {
                window.dataManager.resetData();
            }
            this.showNotification('All data cleared', 'success');
        }
    }
    
    backupData() {
        if (window.dataManager) {
            const backupData = {
                ...window.dataManager.data,
                backupDate: new Date().toISOString(),
                version: '1.0'
            };
            
            const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `moth-emporium-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            this.showNotification('Backup created successfully', 'success');
        }
    }
    
    validateData() {
        const results = document.getElementById('validationResults');
        if (results) {
            results.innerHTML = '<div class="validation-loading">Validating data...</div>';
            
            setTimeout(() => {
                const validationResults = this.performDataValidation();
                results.innerHTML = `
                    <div class="validation-summary">
                        <h6>Validation Results</h6>
                        <div class="validation-item ${validationResults.valid ? 'valid' : 'invalid'}">
                            <strong>Overall:</strong> ${validationResults.valid ? 'Valid' : 'Invalid'}
                        </div>
                        <div class="validation-item">
                            <strong>Issues Found:</strong> ${validationResults.issues.length}
                        </div>
                        ${validationResults.issues.map(issue => 
                            `<div class="validation-issue">${issue}</div>`
                        ).join('')}
                    </div>
                `;
            }, 1000);
        }
    }
    
    performDataValidation() {
        const issues = [];
        let valid = true;
        
        if (window.dataManager) {
            const data = window.dataManager.data;
            
            // Check required fields
            if (!data.businessInfo?.brandName) {
                issues.push('Business name is required');
                valid = false;
            }
            
            if (!data.businessInfo?.targetOrders || data.businessInfo.targetOrders <= 0) {
                issues.push('Target orders must be greater than 0');
                valid = false;
            }
            
            if (!data.products?.pricing?.msrp || data.products.pricing.msrp <= 0) {
                issues.push('MSRP must be greater than 0');
                valid = false;
            }
            
            // Check data integrity
            if (data.progress?.designComplete > 100) {
                issues.push('Design completion cannot exceed 100%');
                valid = false;
            }
        }
        
        return { valid, issues };
    }
    
    // Analytics Management Methods
    exportAnalytics() {
        if (window.analyticsTracker) {
            window.analyticsTracker.exportAnalytics();
        }
    }
    
    clearAnalytics() {
        if (confirm('Are you sure you want to clear all analytics data?')) {
            if (window.analyticsTracker) {
                window.analyticsTracker.clearAnalytics();
            }
            this.showNotification('Analytics data cleared', 'success');
        }
    }
    
    generateReport() {
        if (window.analyticsTracker) {
            const metrics = window.analyticsTracker.getMetrics();
            const usageStats = window.analyticsTracker.getUsageStats();
            const popularSections = window.analyticsTracker.getPopularSections();
            
            const report = {
                generated: new Date().toISOString(),
                sessionId: metrics.sessionId,
                summary: usageStats,
                popularSections: popularSections,
                recommendations: this.generateRecommendations(usageStats)
            };
            
            const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            this.showNotification('Analytics report generated', 'success');
        }
    }
    
    generateRecommendations(usageStats) {
        const recommendations = [];
        
        if (usageStats.calculatorUsage < 5) {
            recommendations.push('Consider promoting calculator features to increase engagement');
        }
        
        if (usageStats.formInteractions < 10) {
            recommendations.push('Users may need guidance on form completion');
        }
        
        if (usageStats.errors > 0) {
            recommendations.push('Address error patterns to improve user experience');
        }
        
        return recommendations;
    }
    
    // System Management Methods
    systemHealthCheck() {
        const systemHealth = document.getElementById('systemHealth');
        if (systemHealth) {
            systemHealth.innerHTML = '<div class="health-loading">Checking system health...</div>';
            
            setTimeout(() => {
                const health = this.performSystemHealthCheck();
                systemHealth.innerHTML = `
                    <div class="health-summary">
                        <div class="health-item ${health.localStorage ? 'healthy' : 'unhealthy'}">
                            <strong>LocalStorage:</strong> ${health.localStorage ? 'Healthy' : 'Unhealthy'}
                        </div>
                        <div class="health-item ${health.memory ? 'healthy' : 'unhealthy'}">
                            <strong>Memory:</strong> ${health.memory ? 'Healthy' : 'Unhealthy'}
                        </div>
                        <div class="health-item ${health.network ? 'healthy' : 'unhealthy'}">
                            <strong>Network:</strong> ${health.network ? 'Online' : 'Offline'}
                        </div>
                        <div class="health-item">
                            <strong>Performance:</strong> ${health.performance}ms
                        </div>
                    </div>
                `;
            }, 1000);
        }
    }
    
    performSystemHealthCheck() {
        const health = {
            localStorage: this.checkLocalStorage(),
            memory: this.checkMemoryUsage(),
            network: navigator.onLine,
            performance: this.checkPerformance()
        };
        
        return health;
    }
    
    checkLocalStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (error) {
            return false;
        }
    }
    
    checkMemoryUsage() {
        if (performance.memory) {
            const usage = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
            return usage < 0.8; // Less than 80% memory usage
        }
        return true;
    }
    
    checkPerformance() {
        const start = performance.now();
        // Perform a simple operation
        JSON.stringify({ test: 'performance' });
        return Math.round(performance.now() - start);
    }
    
    loadPerformanceMetrics() {
        const performanceMetrics = document.getElementById('performanceMetrics');
        if (performanceMetrics && performance.memory) {
            const memory = performance.memory;
            performanceMetrics.innerHTML = `
                <div class="metric-item">
                    <strong>Used Memory:</strong> ${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB
                </div>
                <div class="metric-item">
                    <strong>Total Memory:</strong> ${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB
                </div>
                <div class="metric-item">
                    <strong>Memory Limit:</strong> ${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB
                </div>
            `;
        }
    }
    
    viewErrorLogs() {
        const errorLogs = document.getElementById('errorLogs');
        if (errorLogs && window.errorHandler) {
            const logs = window.errorHandler.getErrorLog();
            errorLogs.innerHTML = `
                <div class="error-log-summary">
                    <strong>Total Errors:</strong> ${logs.length}
                </div>
                <div class="error-log-list">
                    ${logs.slice(-10).map(log => `
                        <div class="error-log-item">
                            <div class="error-type">${log.type}</div>
                            <div class="error-details">${JSON.stringify(log.details, null, 2)}</div>
                            <div class="error-timestamp">${log.timestamp}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
    
    loadUserSessions() {
        const userSessions = document.getElementById('userSessions');
        if (userSessions) {
            userSessions.innerHTML = `
                <div class="session-item">
                    <strong>Current Session:</strong> ${this.getCurrentSessionInfo()}
                </div>
                <div class="session-item">
                    <strong>Session Duration:</strong> ${this.getSessionDuration()}
                </div>
            `;
        }
    }
    
    loadUserAnalytics() {
        const userAnalytics = document.getElementById('userAnalytics');
        if (userAnalytics && window.analyticsTracker) {
            const metrics = window.analyticsTracker.getMetrics();
            userAnalytics.innerHTML = `
                <div class="user-metric">
                    <strong>Page Views:</strong> ${metrics.pageViews}
                </div>
                <div class="user-metric">
                    <strong>Form Interactions:</strong> ${metrics.formInteractions}
                </div>
                <div class="user-metric">
                    <strong>Calculator Usage:</strong> ${metrics.calculatorUsage}
                </div>
            `;
        }
    }
    
    getCurrentSessionInfo() {
        return sessionStorage.getItem('analytics_session_id') || 'No session ID';
    }
    
    getSessionDuration() {
        const start = sessionStorage.getItem('session_start');
        if (start) {
            return Math.round((Date.now() - parseInt(start)) / 1000 / 60) + ' minutes';
        }
        return 'Unknown';
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem;
            border-radius: 4px;
            z-index: 10002;
            color: white;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            animation: adminSlideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    setupAdminFeatures() {
        // Add keyboard shortcut for admin panel
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                e.preventDefault();
                this.toggleAdminPanel();
            }
        });
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});

// Add CSS for admin panel
const adminStyle = document.createElement('style');
adminStyle.textContent = `
    .admin-panel {
        font-family: Arial, sans-serif;
    }
    
    .admin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: var(--moth-gold);
        color: var(--moth-primary);
    }
    
    .admin-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--moth-primary);
    }
    
    .admin-content {
        padding: 1rem;
    }
    
    .admin-tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid #ddd;
    }
    
    .admin-tab {
        padding: 0.5rem 1rem;
        background: none;
        border: none;
        cursor: pointer;
        border-bottom: 2px solid transparent;
    }
    
    .admin-tab.active {
        border-bottom-color: var(--moth-gold);
        color: var(--moth-primary);
    }
    
    .admin-tab-panel {
        display: none;
    }
    
    .admin-tab-panel.active {
        display: block;
    }
    
    .admin-section {
        margin-bottom: 2rem;
        padding: 1rem;
        background: #f5f5f5;
        border-radius: 8px;
    }
    
    .admin-section h5 {
        color: var(--moth-primary);
        margin-bottom: 1rem;
    }
    
    .admin-controls {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .admin-stats {
        display: grid;
        gap: 0.5rem;
    }
    
    .stat-item {
        padding: 0.5rem;
        background: white;
        border-radius: 4px;
        border-left: 3px solid var(--moth-gold);
    }
    
    .validation-results {
        margin-top: 1rem;
    }
    
    .validation-loading {
        color: #666;
        font-style: italic;
    }
    
    .validation-summary {
        background: white;
        padding: 1rem;
        border-radius: 4px;
    }
    
    .validation-item {
        padding: 0.5rem;
        margin: 0.5rem 0;
        border-radius: 4px;
    }
    
    .validation-item.valid {
        background: #d4edda;
        color: #155724;
    }
    
    .validation-item.invalid {
        background: #f8d7da;
        color: #721c24;
    }
    
    .validation-issue {
        background: #fff3cd;
        color: #856404;
        padding: 0.5rem;
        margin: 0.5rem 0;
        border-radius: 4px;
    }
    
    .system-health {
        margin-top: 1rem;
    }
    
    .health-loading {
        color: #666;
        font-style: italic;
    }
    
    .health-summary {
        background: white;
        padding: 1rem;
        border-radius: 4px;
    }
    
    .health-item {
        padding: 0.5rem;
        margin: 0.5rem 0;
        border-radius: 4px;
    }
    
    .health-item.healthy {
        background: #d4edda;
        color: #155724;
    }
    
    .health-item.unhealthy {
        background: #f8d7da;
        color: #721c24;
    }
    
    .performance-metrics {
        background: white;
        padding: 1rem;
        border-radius: 4px;
    }
    
    .metric-item {
        padding: 0.5rem;
        border-bottom: 1px solid #eee;
    }
    
    .error-logs {
        margin-top: 1rem;
        max-height: 300px;
        overflow-y: auto;
    }
    
    .error-log-summary {
        background: white;
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
    }
    
    .error-log-list {
        background: white;
        border-radius: 4px;
    }
    
    .error-log-item {
        padding: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .error-type {
        font-weight: bold;
        color: #f44336;
    }
    
    .error-details {
        font-family: monospace;
        font-size: 0.8rem;
        background: #f5f5f5;
        padding: 0.5rem;
        border-radius: 4px;
        margin: 0.5rem 0;
    }
    
    .error-timestamp {
        font-size: 0.8rem;
        color: #666;
    }
    
    .user-sessions, .user-analytics {
        background: white;
        padding: 1rem;
        border-radius: 4px;
    }
    
    .session-item, .user-metric {
        padding: 0.5rem;
        border-bottom: 1px solid #eee;
    }
    
    .admin-notification {
        animation: adminSlideIn 0.3s ease-out;
    }
    
    @keyframes adminSlideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(adminStyle);
