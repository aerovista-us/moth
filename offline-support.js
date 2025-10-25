// Offline Support - Moth Wing Power Business Planning
class OfflineSupport {
    constructor() {
        this.isOnline = navigator.onLine;
        this.offlineQueue = [];
        this.criticalData = new Map();
        this.syncInProgress = false;
        this.init();
    }
    
    init() {
        this.setupNetworkListeners();
        this.setupServiceWorker();
        this.cacheCriticalData();
        this.setupOfflineIndicators();
        this.setupDataSync();
    }
    
    setupNetworkListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.handleOnline();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.handleOffline();
        });
    }
    
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }
    
    cacheCriticalData() {
        // Cache essential business data for offline use
        const criticalData = {
            businessInfo: {
                brandName: 'Moth Emporium',
                tagline: 'Nail art as your canvas - Where Beauty Takes Flight',
                targetOrders: 100,
                budget: 5000
            },
            products: {
                pricing: {
                    baseCOGS: 8,
                    targetMargin: 65,
                    msrp: 39
                }
            },
            progress: {
                designComplete: 0,
                contentReady: 0,
                launchReady: 0
            }
        };
        
        this.criticalData.set('businessData', criticalData);
        this.storeOfflineData('criticalData', criticalData);
    }
    
    setupOfflineIndicators() {
        // Create offline indicator
        const offlineIndicator = document.createElement('div');
        offlineIndicator.id = 'offline-indicator';
        offlineIndicator.className = 'offline-indicator';
        offlineIndicator.innerHTML = `
            <div class="offline-content">
                <span class="offline-icon">🔴</span>
                <span class="offline-text">You're offline. Changes will sync when you reconnect.</span>
                <button class="offline-sync-btn" onclick="window.offlineSupport.forceSync()">Try Sync</button>
            </div>
        `;
        
        offlineIndicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: #f44336;
            color: white;
            padding: 0.5rem;
            text-align: center;
            z-index: 10000;
            display: none;
            animation: slideDown 0.3s ease-out;
        `;
        
        document.body.appendChild(offlineIndicator);
        
        // Update indicator based on network status
        this.updateOfflineIndicator();
    }
    
    updateOfflineIndicator() {
        const indicator = document.getElementById('offline-indicator');
        if (indicator) {
            if (this.isOnline) {
                indicator.style.display = 'none';
            } else {
                indicator.style.display = 'block';
            }
        }
    }
    
    handleOffline() {
        this.updateOfflineIndicator();
        this.showOfflineNotification();
        this.enableOfflineMode();
    }
    
    handleOnline() {
        this.updateOfflineIndicator();
        this.showOnlineNotification();
        this.syncOfflineData();
    }
    
    showOfflineNotification() {
        this.showNotification('You\'re offline', 'Some features may be limited. Your data will sync when you reconnect.', 'warning');
    }
    
    showOnlineNotification() {
        this.showNotification('You\'re back online', 'Syncing your data...', 'success');
    }
    
    showNotification(title, message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
            background: ${type === 'success' ? '#4caf50' : type === 'warning' ? '#ff9800' : '#f44336'};
            color: white;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    enableOfflineMode() {
        // Disable features that require internet
        this.disableOnlineFeatures();
        
        // Enable offline alternatives
        this.enableOfflineFeatures();
    }
    
    disableOnlineFeatures() {
        // Disable document loading
        const documentButtons = document.querySelectorAll('[onclick*="previewDocument"]');
        documentButtons.forEach(button => {
            button.disabled = true;
            button.title = 'Available when online';
        });
        
        // Disable export features
        const exportButtons = document.querySelectorAll('[onclick*="exportData"]');
        exportButtons.forEach(button => {
            button.disabled = true;
            button.title = 'Available when online';
        });
    }
    
    enableOfflineFeatures() {
        // Enable offline data editing
        const formInputs = document.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.queueOfflineChange(input);
            });
        });
    }
    
    queueOfflineChange(element) {
        const change = {
            id: element.id || element.name,
            value: element.value,
            type: element.type,
            timestamp: Date.now()
        };
        
        this.offlineQueue.push(change);
        this.storeOfflineData('offlineQueue', this.offlineQueue);
        
        // Show queued changes indicator
        this.showQueuedChangesIndicator();
    }
    
    showQueuedChangesIndicator() {
        let indicator = document.getElementById('queued-changes-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'queued-changes-indicator';
            indicator.className = 'queued-changes-indicator';
            indicator.innerHTML = `
                <span class="queued-icon">📝</span>
                <span class="queued-text">${this.offlineQueue.length} changes queued</span>
            `;
            
            indicator.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #ff9800;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                z-index: 10000;
                font-size: 0.9rem;
                animation: bounceIn 0.3s ease-out;
            `;
            
            document.body.appendChild(indicator);
        } else {
            indicator.querySelector('.queued-text').textContent = `${this.offlineQueue.length} changes queued`;
        }
    }
    
    setupDataSync() {
        // Auto-sync when online
        setInterval(() => {
            if (this.isOnline && this.offlineQueue.length > 0) {
                this.syncOfflineData();
            }
        }, 30000); // Check every 30 seconds
    }
    
    async syncOfflineData() {
        if (this.syncInProgress || this.offlineQueue.length === 0) {
            return;
        }
        
        this.syncInProgress = true;
        
        try {
            // Apply queued changes
            for (const change of this.offlineQueue) {
                await this.applyOfflineChange(change);
            }
            
            // Clear queue
            this.offlineQueue = [];
            this.storeOfflineData('offlineQueue', []);
            
            // Hide queued changes indicator
            const indicator = document.getElementById('queued-changes-indicator');
            if (indicator) {
                indicator.remove();
            }
            
            this.showNotification('Sync Complete', 'Your offline changes have been synced.', 'success');
            
        } catch (error) {
            console.error('Sync failed:', error);
            this.showNotification('Sync Failed', 'Some changes couldn\'t be synced. They\'ll be retried later.', 'error');
        } finally {
            this.syncInProgress = false;
        }
    }
    
    async applyOfflineChange(change) {
        // Apply the change to the appropriate element
        const element = document.getElementById(change.id);
        if (element) {
            element.value = change.value;
            
            // Trigger change event
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
    
    forceSync() {
        if (this.isOnline) {
            this.syncOfflineData();
        } else {
            this.showNotification('Cannot Sync', 'You need to be online to sync data.', 'warning');
        }
    }
    
    storeOfflineData(key, data) {
        try {
            localStorage.setItem(`offline_${key}`, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to store offline data:', error);
        }
    }
    
    getOfflineData(key) {
        try {
            const data = localStorage.getItem(`offline_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to get offline data:', error);
            return null;
        }
    }
    
    // Public methods for external use
    isOfflineMode() {
        return !this.isOnline;
    }
    
    getQueuedChanges() {
        return this.offlineQueue;
    }
    
    clearQueuedChanges() {
        this.offlineQueue = [];
        this.storeOfflineData('offlineQueue', []);
        
        const indicator = document.getElementById('queued-changes-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    getOfflineDataSize() {
        let totalSize = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('offline_')) {
                totalSize += localStorage.getItem(key).length;
            }
        }
        return totalSize;
    }
    
    cleanupOfflineData() {
        // Remove old offline data (older than 7 days)
        const cutoff = Date.now() - (7 * 24 * 60 * 60 * 1000);
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('offline_')) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data.timestamp && data.timestamp < cutoff) {
                        localStorage.removeItem(key);
                    }
                } catch (error) {
                    // Remove invalid data
                    localStorage.removeItem(key);
                }
            }
        }
    }
}

// Initialize offline support when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.offlineSupport = new OfflineSupport();
    
    // Load queued changes from previous session
    const queuedChanges = window.offlineSupport.getOfflineData('offlineQueue');
    if (queuedChanges && queuedChanges.length > 0) {
        window.offlineSupport.offlineQueue = queuedChanges;
        if (!window.offlineSupport.isOnline) {
            window.offlineSupport.showQueuedChangesIndicator();
        }
    }
});

// Add CSS for offline support
const offlineStyle = document.createElement('style');
offlineStyle.textContent = `
    .offline-indicator {
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
    }
    
    .offline-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
    
    .offline-icon {
        font-size: 1.2rem;
    }
    
    .offline-text {
        flex: 1;
        text-align: center;
    }
    
    .offline-sync-btn {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8rem;
    }
    
    .offline-sync-btn:hover {
        background: rgba(255, 255, 255, 0.3);
    }
    
    .notification {
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .queued-changes-indicator {
        animation: bounceIn 0.3s ease-out;
    }
    
    @keyframes bounceIn {
        0% { transform: scale(0.8); opacity: 0; }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    .queued-icon {
        margin-right: 0.5rem;
    }
`;
document.head.appendChild(offlineStyle);
