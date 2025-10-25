// Loading States - Moth Wing Power Business Planning
class LoadingStates {
    constructor() {
        this.activeLoaders = new Set();
        this.loadingOverlay = null;
        this.init();
    }
    
    init() {
        this.createLoadingOverlay();
        this.setupDataOperationLoading();
        this.setupDocumentLoading();
        this.setupFormLoading();
    }
    
    createLoadingOverlay() {
        this.loadingOverlay = document.createElement('div');
        this.loadingOverlay.className = 'loading-overlay';
        this.loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="mystical-spinner"></div>
                <div class="loading-text">Loading...</div>
                <div class="loading-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            </div>
        `;
        
        this.loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(this.loadingOverlay);
    }
    
    setupDataOperationLoading() {
        // Override data manager methods with loading states
        if (window.dataManager) {
            const originalSaveData = window.dataManager.saveData;
            window.dataManager.saveData = () => {
                this.showLoader('Saving data...', 'save');
                try {
                    originalSaveData.call(window.dataManager);
                    this.hideLoader('save');
                } catch (error) {
                    this.hideLoader('save');
                    throw error;
                }
            };
            
            const originalLoadData = window.dataManager.loadData;
            window.dataManager.loadData = () => {
                this.showLoader('Loading data...', 'load');
                try {
                    const result = originalLoadData.call(window.dataManager);
                    this.hideLoader('load');
                    return result;
                } catch (error) {
                    this.hideLoader('load');
                    throw error;
                }
            };
            
            const originalExportData = window.dataManager.exportData;
            window.dataManager.exportData = (format) => {
                this.showLoader('Exporting data...', 'export');
                try {
                    originalExportData.call(window.dataManager, format);
                    this.hideLoader('export');
                } catch (error) {
                    this.hideLoader('export');
                    throw error;
                }
            };
        }
    }
    
    setupDocumentLoading() {
        // Override document integration methods with loading states
        if (window.documentIntegration) {
            const originalPreviewDocument = window.documentIntegration.previewDocument;
            window.documentIntegration.previewDocument = async (documentKey) => {
                this.showLoader('Loading document...', 'document');
                try {
                    await originalPreviewDocument.call(window.documentIntegration, documentKey);
                    this.hideLoader('document');
                } catch (error) {
                    this.hideLoader('document');
                    throw error;
                }
            };
        }
    }
    
    setupFormLoading() {
        // Add loading states to form submissions
        const forms = document.querySelectorAll('form, .mystical-form-group');
        forms.forEach(form => {
            const submitButtons = form.querySelectorAll('button[type="submit"], .mystical-btn');
            submitButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.showButtonLoading(button);
                });
            });
        });
    }
    
    showLoader(message, operation) {
        this.activeLoaders.add(operation);
        
        if (this.loadingOverlay) {
            this.loadingOverlay.style.display = 'flex';
            this.loadingOverlay.querySelector('.loading-text').textContent = message;
            this.loadingOverlay.querySelector('.progress-fill').style.width = '0%';
            
            // Animate progress bar
            this.animateProgressBar();
        }
    }
    
    hideLoader(operation) {
        this.activeLoaders.delete(operation);
        
        if (this.activeLoaders.size === 0 && this.loadingOverlay) {
            this.loadingOverlay.style.display = 'none';
        }
    }
    
    animateProgressBar() {
        const progressFill = this.loadingOverlay.querySelector('.progress-fill');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 90) progress = 90; // Don't complete until operation finishes
            
            progressFill.style.width = progress + '%';
            
            if (this.activeLoaders.size === 0) {
                progress = 100;
                progressFill.style.width = '100%';
                clearInterval(interval);
                
                // Hide after completion
                setTimeout(() => {
                    if (this.loadingOverlay) {
                        this.loadingOverlay.style.display = 'none';
                    }
                }, 500);
            }
        }, 200);
    }
    
    showButtonLoading(button) {
        const originalText = button.textContent;
        const originalHTML = button.innerHTML;
        
        button.disabled = true;
        button.innerHTML = `
            <span class="button-spinner"></span>
            <span class="button-text">Loading...</span>
        `;
        
        // Add spinner styles
        const spinnerStyle = document.createElement('style');
        spinnerStyle.textContent = `
            .button-spinner {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 1s ease-in-out infinite;
                margin-right: 8px;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinnerStyle);
        
        // Auto-reset after 5 seconds
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = originalHTML;
        }, 5000);
    }
    
    showSectionLoading(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const loader = document.createElement('div');
            loader.className = 'section-loader';
            loader.innerHTML = `
                <div class="section-spinner"></div>
                <div class="section-loading-text">Loading ${sectionId}...</div>
            `;
            
            loader.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            `;
            
            section.style.position = 'relative';
            section.appendChild(loader);
            
            // Remove loader after section loads
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 1000);
        }
    }
    
    showCardLoading(card) {
        const loader = document.createElement('div');
        loader.className = 'card-loader';
        loader.innerHTML = `
            <div class="card-spinner"></div>
        `;
        
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 100;
        `;
        
        card.style.position = 'relative';
        card.appendChild(loader);
        
        return loader;
    }
    
    hideCardLoading(card, loader) {
        if (loader && loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }
    
    // Public methods for external use
    showCustomLoader(message, duration = 3000) {
        this.showLoader(message, 'custom');
        setTimeout(() => {
            this.hideLoader('custom');
        }, duration);
    }
    
    showProgressLoader(message, progress) {
        this.showLoader(message, 'progress');
        const progressFill = this.loadingOverlay.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    }
    
    hideProgressLoader() {
        this.hideLoader('progress');
    }
    
    // Loading state for async operations
    async withLoading(operation, message = 'Loading...') {
        this.showLoader(message, 'async');
        try {
            const result = await operation();
            this.hideLoader('async');
            return result;
        } catch (error) {
            this.hideLoader('async');
            throw error;
        }
    }
}

// Initialize loading states when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.loadingStates = new LoadingStates();
    
    // Add loading states to section navigation
    const originalShowSection = window.showSection;
    window.showSection = (sectionId) => {
        window.loadingStates.showSectionLoading(sectionId);
        originalShowSection(sectionId);
    };
});

// Add CSS for loading states
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    .loading-overlay {
        animation: loadingFadeIn 0.3s ease-out;
    }
    
    .mystical-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(212, 175, 55, 0.3);
        border-top: 4px solid var(--moth-gold);
        border-radius: 50%;
        animation: loadingSpin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    .loading-content {
        text-align: center;
        color: white;
    }
    
    .loading-text {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        font-weight: 600;
    }
    
    .loading-progress {
        width: 200px;
        margin: 0 auto;
    }
    
    .progress-bar {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: var(--moth-gold);
        border-radius: 2px;
        transition: width 0.3s ease;
    }
    
    .section-loader {
        animation: loadingFadeIn 0.3s ease-out;
    }
    
    .section-spinner {
        width: 30px;
        height: 30px;
        border: 3px solid rgba(212, 175, 55, 0.3);
        border-top: 3px solid var(--moth-gold);
        border-radius: 50%;
        animation: loadingSpin 1s linear infinite;
        margin-bottom: 0.5rem;
    }
    
    .section-loading-text {
        font-size: 0.9rem;
        color: var(--moth-primary);
        font-weight: 600;
    }
    
    .card-loader {
        animation: loadingFadeIn 0.3s ease-out;
    }
    
    .card-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(212, 175, 55, 0.3);
        border-top: 2px solid var(--moth-gold);
        border-radius: 50%;
        animation: loadingSpin 1s linear infinite;
    }
    
    @keyframes loadingSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes loadingFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(loadingStyle);
