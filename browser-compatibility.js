// Browser Compatibility - Moth Wing Power Business Planning
class BrowserCompatibility {
    constructor() {
        this.browserInfo = this.detectBrowser();
        this.compatibilityIssues = [];
        this.init();
    }
    
    init() {
        this.checkCompatibility();
        this.applyBrowserFixes();
        this.showCompatibilityWarnings();
    }
    
    detectBrowser() {
        const userAgent = navigator.userAgent;
        const browserInfo = {
            name: 'Unknown',
            version: 'Unknown',
            isSupported: true,
            features: {}
        };
        
        // Detect browser type and version
        if (userAgent.includes('Chrome')) {
            browserInfo.name = 'Chrome';
            browserInfo.version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
        } else if (userAgent.includes('Firefox')) {
            browserInfo.name = 'Firefox';
            browserInfo.version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
        } else if (userAgent.includes('Safari')) {
            browserInfo.name = 'Safari';
            browserInfo.version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown';
        } else if (userAgent.includes('Edge')) {
            browserInfo.name = 'Edge';
            browserInfo.version = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
        }
        
        return browserInfo;
    }
    
    checkCompatibility() {
        // Check for required features
        this.checkFeature('localStorage', () => {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch (e) {
                return false;
            }
        });
        
        this.checkFeature('sessionStorage', () => {
            try {
                sessionStorage.setItem('test', 'test');
                sessionStorage.removeItem('test');
                return true;
            } catch (e) {
                return false;
            }
        });
        
        this.checkFeature('fetch', () => typeof fetch !== 'undefined');
        this.checkFeature('promises', () => typeof Promise !== 'undefined');
        this.checkFeature('arrowFunctions', () => {
            try {
                eval('() => {}');
                return true;
            } catch (e) {
                return false;
            }
        });
        
        this.checkFeature('templateLiterals', () => {
            try {
                eval('`test`');
                return true;
            } catch (e) {
                return false;
            }
        });
        
        this.checkFeature('serviceWorker', () => 'serviceWorker' in navigator);
        this.checkFeature('indexedDB', () => 'indexedDB' in window);
        this.checkFeature('webGL', () => {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        });
        
        this.checkFeature('cssGrid', () => {
            const element = document.createElement('div');
            return 'grid' in element.style;
        });
        
        this.checkFeature('cssFlexbox', () => {
            const element = document.createElement('div');
            return 'flex' in element.style;
        });
        
        this.checkFeature('cssTransforms', () => {
            const element = document.createElement('div');
            return 'transform' in element.style;
        });
        
        this.checkFeature('cssAnimations', () => {
            const element = document.createElement('div');
            return 'animation' in element.style;
        });
    }
    
    checkFeature(featureName, testFunction) {
        try {
            const isSupported = testFunction();
            this.browserInfo.features[featureName] = isSupported;
            
            if (!isSupported) {
                this.compatibilityIssues.push({
                    feature: featureName,
                    severity: this.getFeatureSeverity(featureName),
                    message: this.getFeatureMessage(featureName)
                });
            }
        } catch (error) {
            this.compatibilityIssues.push({
                feature: featureName,
                severity: 'high',
                message: `Error testing ${featureName}: ${error.message}`
            });
        }
    }
    
    getFeatureSeverity(featureName) {
        const criticalFeatures = ['localStorage', 'fetch', 'promises'];
        const importantFeatures = ['sessionStorage', 'serviceWorker', 'indexedDB'];
        
        if (criticalFeatures.includes(featureName)) return 'critical';
        if (importantFeatures.includes(featureName)) return 'high';
        return 'medium';
    }
    
    getFeatureMessage(featureName) {
        const messages = {
            localStorage: 'Data persistence will not work. Your data will not be saved.',
            sessionStorage: 'Session management will not work properly.',
            fetch: 'Network requests will not work. Some features may be unavailable.',
            promises: 'Async operations will not work. The application may be unstable.',
            arrowFunctions: 'Some JavaScript features may not work properly.',
            templateLiterals: 'String formatting may not work as expected.',
            serviceWorker: 'Offline functionality will not be available.',
            indexedDB: 'Advanced data storage will not be available.',
            webGL: 'Particle effects may not work properly.',
            cssGrid: 'Layout may not display correctly.',
            cssFlexbox: 'Layout may not display correctly.',
            cssTransforms: 'Animations may not work properly.',
            cssAnimations: 'Animations may not work properly.'
        };
        
        return messages[featureName] || `Feature ${featureName} is not supported.`;
    }
    
    applyBrowserFixes() {
        // Apply browser-specific fixes
        if (this.browserInfo.name === 'Safari') {
            this.applySafariFixes();
        }
        
        if (this.browserInfo.name === 'Firefox') {
            this.applyFirefoxFixes();
        }
        
        if (this.browserInfo.name === 'Edge') {
            this.applyEdgeFixes();
        }
        
        // Apply fixes for missing features
        this.applyFeatureFixes();
    }
    
    applySafariFixes() {
        // Safari-specific fixes
        console.log('Applying Safari-specific fixes');
        
        // Fix backdrop-filter
        const style = document.createElement('style');
        style.textContent = `
            .mystical-card {
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
            }
        `;
        document.head.appendChild(style);
    }
    
    applyFirefoxFixes() {
        // Firefox-specific fixes
        console.log('Applying Firefox-specific fixes');
        
        // Fix scrollbar styling
        const style = document.createElement('style');
        style.textContent = `
            ::-webkit-scrollbar {
                width: 8px;
            }
            ::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            ::-webkit-scrollbar-thumb {
                background: #d4af37;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);
    }
    
    applyEdgeFixes() {
        // Edge-specific fixes
        console.log('Applying Edge-specific fixes');
        
        // Fix CSS Grid fallback
        const style = document.createElement('style');
        style.textContent = `
            .mystical-grid {
                display: -ms-grid;
                display: grid;
            }
        `;
        document.head.appendChild(style);
    }
    
    applyFeatureFixes() {
        // Fix missing localStorage
        if (!this.browserInfo.features.localStorage) {
            this.createLocalStoragePolyfill();
        }
        
        // Fix missing fetch
        if (!this.browserInfo.features.fetch) {
            this.createFetchPolyfill();
        }
        
        // Fix missing serviceWorker
        if (!this.browserInfo.features.serviceWorker) {
            this.disableOfflineFeatures();
        }
    }
    
    createLocalStoragePolyfill() {
        // Simple localStorage polyfill using cookies
        window.localStorage = {
            setItem: (key, value) => {
                document.cookie = `${key}=${value}; path=/; max-age=31536000`;
            },
            getItem: (key) => {
                const cookies = document.cookie.split(';');
                for (let cookie of cookies) {
                    const [name, value] = cookie.trim().split('=');
                    if (name === key) return value;
                }
                return null;
            },
            removeItem: (key) => {
                document.cookie = `${key}=; path=/; max-age=0`;
            }
        };
    }
    
    createFetchPolyfill() {
        // Simple fetch polyfill using XMLHttpRequest
        window.fetch = (url, options = {}) => {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(options.method || 'GET', url);
                
                if (options.headers) {
                    Object.keys(options.headers).forEach(key => {
                        xhr.setRequestHeader(key, options.headers[key]);
                    });
                }
                
                xhr.onload = () => {
                    resolve({
                        ok: xhr.status >= 200 && xhr.status < 300,
                        status: xhr.status,
                        json: () => Promise.resolve(JSON.parse(xhr.responseText)),
                        text: () => Promise.resolve(xhr.responseText)
                    });
                };
                
                xhr.onerror = () => reject(new Error('Network error'));
                xhr.send(options.body);
            });
        };
    }
    
    disableOfflineFeatures() {
        // Disable offline features if serviceWorker is not supported
        console.log('Disabling offline features - ServiceWorker not supported');
        
        // Remove offline support script
        const offlineScript = document.querySelector('script[src*="offline-support.js"]');
        if (offlineScript) {
            offlineScript.remove();
        }
    }
    
    showCompatibilityWarnings() {
        const criticalIssues = this.compatibilityIssues.filter(issue => issue.severity === 'critical');
        const highIssues = this.compatibilityIssues.filter(issue => issue.severity === 'high');
        
        if (criticalIssues.length > 0) {
            this.showCriticalWarning(criticalIssues);
        } else if (highIssues.length > 0) {
            this.showHighWarning(highIssues);
        }
        
        // Log compatibility info
        console.log('Browser Compatibility Info:', this.browserInfo);
        if (this.compatibilityIssues.length > 0) {
            console.warn('Compatibility Issues:', this.compatibilityIssues);
        }
    }
    
    showCriticalWarning(issues) {
        const warning = document.createElement('div');
        warning.className = 'compatibility-warning critical';
        warning.innerHTML = `
            <div class="warning-content">
                <h3>⚠️ Browser Compatibility Warning</h3>
                <p>Your browser may not support all features of this application:</p>
                <ul>
                    ${issues.map(issue => `<li>${issue.message}</li>`).join('')}
                </ul>
                <p>Please consider updating your browser for the best experience.</p>
                <button onclick="this.parentElement.parentElement.remove()">Dismiss</button>
            </div>
        `;
        
        warning.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(warning);
    }
    
    showHighWarning(issues) {
        const warning = document.createElement('div');
        warning.className = 'compatibility-warning high';
        warning.innerHTML = `
            <div class="warning-content">
                <h3>⚠️ Some Features May Not Work</h3>
                <p>Your browser may not support some features:</p>
                <ul>
                    ${issues.map(issue => `<li>${issue.message}</li>`).join('')}
                </ul>
                <button onclick="this.parentElement.parentElement.remove()">Dismiss</button>
            </div>
        `;
        
        warning.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff9800;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            max-width: 300px;
        `;
        
        document.body.appendChild(warning);
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (warning.parentNode) {
                warning.parentNode.removeChild(warning);
            }
        }, 10000);
    }
    
    // Public methods
    getBrowserInfo() {
        return this.browserInfo;
    }
    
    getCompatibilityIssues() {
        return this.compatibilityIssues;
    }
    
    isFeatureSupported(featureName) {
        return this.browserInfo.features[featureName] || false;
    }
    
    getRecommendedBrowsers() {
        return [
            'Chrome 80+',
            'Firefox 75+',
            'Safari 13+',
            'Edge 80+'
        ];
    }
}

// Initialize browser compatibility when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.browserCompatibility = new BrowserCompatibility();
});

// Add CSS for compatibility warnings
const compatibilityStyle = document.createElement('style');
compatibilityStyle.textContent = `
    .compatibility-warning {
        animation: browserFadeIn 0.3s ease-out;
    }
    
    .warning-content {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        max-width: 500px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .warning-content h3 {
        color: #f44336;
        margin-bottom: 1rem;
    }
    
    .warning-content ul {
        margin: 1rem 0;
        padding-left: 1.5rem;
    }
    
    .warning-content li {
        margin: 0.5rem 0;
    }
    
    .warning-content button {
        background: #f44336;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 1rem;
    }
    
    @keyframes browserFadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(compatibilityStyle);
