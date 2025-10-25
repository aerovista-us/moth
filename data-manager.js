// Data Manager - Moth Wing Power Business Planning
class DataManager {
    constructor() {
        this.storageKey = 'mothEmporiumBusinessData';
        this.data = this.loadData();
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.autoSave();
    }
    
    loadData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : this.getDefaultData();
        } catch (error) {
            console.warn('Failed to load data from localStorage:', error);
            return this.getDefaultData();
        }
    }
    
    getDefaultData() {
        return {
            businessInfo: {
                brandName: 'Moth Emporium',
                tagline: 'Nail art as your canvas - Where Beauty Takes Flight',
                launchDate: '',
                targetOrders: 100,
                budget: 5000
            },
            products: {
                designs: [],
                pricing: {
                    baseCOGS: 8,
                    targetMargin: 65,
                    msrp: 39
                }
            },
            content: {
                heroDesigns: 10,
                categories: {
                    evergreen: false,
                    trendy: false,
                    premium: false
                },
                requirements: {
                    lifestylePhotos: false,
                    applicationVideo: false,
                    macroShots: false,
                    qrIntegration: false
                }
            },
            progress: {
                designComplete: 0,
                contentReady: 0,
                launchReady: 0,
                completedTasks: []
            },
            analytics: {
                roas: 2.5,
                aov: 0,
                cac: 0,
                conversionRate: 0
            },
            lastUpdated: new Date().toISOString()
        };
    }
    
    saveData() {
        try {
            this.data.lastUpdated = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
            this.showSaveIndicator();
        } catch (error) {
            console.error('Failed to save data:', error);
            this.showErrorIndicator();
        }
    }
    
    autoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            this.saveData();
        }, 30000);
    }
    
    bindEvents() {
        // Save on form changes
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, select, textarea')) {
                this.updateField(e.target);
            }
        });
        
        // Save on checkbox changes
        document.addEventListener('change', (e) => {
            if (e.target.matches('input[type="checkbox"]')) {
                this.updateField(e.target);
            }
        });
        
        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveData();
        });
    }
    
    updateField(element) {
        const fieldName = element.id || element.name;
        if (!fieldName) return;
        
        let value = element.value;
        if (element.type === 'checkbox') {
            value = element.checked;
        } else if (element.type === 'number') {
            value = parseFloat(value) || 0;
        }
        
        // Update nested data structure
        this.setNestedValue(fieldName, value);
        this.saveData();
    }
    
    setNestedValue(path, value) {
        const keys = path.split('.');
        let current = this.data;
        
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
    }
    
    getNestedValue(path) {
        const keys = path.split('.');
        let current = this.data;
        
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return undefined;
            }
        }
        
        return current;
    }
    
    // Business-specific methods
    updateProgress() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const checked = document.querySelectorAll('input[type="checkbox"]:checked');
        const progress = checkboxes.length > 0 ? (checked.length / checkboxes.length * 100) : 0;
        
        this.data.progress.designComplete = Math.round(progress);
        this.data.progress.contentReady = Math.round(progress * 0.8);
        this.data.progress.launchReady = Math.round(progress * 0.6);
        
        this.updateProgressDisplay();
    }
    
    updateProgressDisplay() {
        const designProgress = document.getElementById('designProgress');
        const contentProgress = document.getElementById('contentProgress');
        const launchProgress = document.getElementById('launchProgress');
        
        if (designProgress) {
            designProgress.textContent = this.data.progress.designComplete + '%';
            this.animateProgressBar(designProgress);
        }
        
        if (contentProgress) {
            contentProgress.textContent = this.data.progress.contentReady + '%';
            this.animateProgressBar(contentProgress);
        }
        
        if (launchProgress) {
            launchProgress.textContent = this.data.progress.launchReady + '%';
            this.animateProgressBar(launchProgress);
        }
    }
    
    animateProgressBar(element) {
        element.classList.add('pulse-effect');
        setTimeout(() => {
            element.classList.remove('pulse-effect');
        }, 1000);
    }
    
    // Export functionality
    exportData(format = 'json') {
        const data = {
            ...this.data,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        if (format === 'json') {
            this.downloadFile(JSON.stringify(data, null, 2), 'moth-emporium-business-plan.json', 'application/json');
        } else if (format === 'csv') {
            this.exportToCSV();
        }
    }
    
    exportToCSV() {
        const csvData = this.generateCSVData();
        this.downloadFile(csvData, 'moth-emporium-data.csv', 'text/csv');
    }
    
    generateCSVData() {
        const headers = ['Category', 'Field', 'Value', 'Last Updated'];
        const rows = [headers];
        
        // Flatten the data structure
        this.flattenData(this.data, rows, '');
        
        return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    }
    
    flattenData(obj, rows, prefix) {
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                this.flattenData(value, rows, prefix + key + '.');
            } else {
                rows.push([prefix.slice(0, -1), key, value, this.data.lastUpdated]);
            }
        }
    }
    
    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    // Import functionality
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                this.data = { ...this.getDefaultData(), ...importedData };
                this.saveData();
                this.loadDataIntoUI();
                this.showSuccessIndicator('Data imported successfully!');
            } catch (error) {
                this.showErrorIndicator('Failed to import data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
    
    loadDataIntoUI() {
        // Load form values from data
        Object.keys(this.data).forEach(section => {
            this.loadSectionData(section, this.data[section]);
        });
    }
    
    loadSectionData(section, data) {
        if (typeof data === 'object' && data !== null) {
            Object.keys(data).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = data[key];
                    } else {
                        element.value = data[key];
                    }
                }
            });
        }
    }
    
    // UI Indicators
    showSaveIndicator() {
        this.showIndicator('Data saved', 'success');
    }
    
    showErrorIndicator(message = 'Error occurred') {
        this.showIndicator(message, 'error');
    }
    
    showSuccessIndicator(message) {
        this.showIndicator(message, 'success');
    }
    
    showIndicator(message, type) {
        const indicator = document.createElement('div');
        indicator.className = `save-indicator ${type}`;
        indicator.textContent = message;
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background: ${type === 'success' ? '#4caf50' : '#f44336'};
            color: white;
            border-radius: 4px;
            z-index: 10000;
            animation: dataSlideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 300);
        }, 2000);
    }
    
    // Reset functionality
    resetData() {
        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            localStorage.removeItem(this.storageKey);
            this.data = this.getDefaultData();
            this.loadDataIntoUI();
            this.showSuccessIndicator('Data reset successfully');
        }
    }
    
    // Get business summary
    getBusinessSummary() {
        return {
            brandName: this.data.businessInfo.brandName,
            progress: this.data.progress,
            targetOrders: this.data.businessInfo.targetOrders,
            budget: this.data.businessInfo.budget,
            lastUpdated: this.data.lastUpdated
        };
    }
}

// Initialize data manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dataManager = new DataManager();
    
    // Add export/import buttons to the interface
    addExportImportButtons();
});

function addExportImportButtons() {
    const analyticsSection = document.getElementById('analytics');
    if (analyticsSection) {
        const exportDiv = document.createElement('div');
        exportDiv.className = 'card mystical-card floating-card';
        exportDiv.innerHTML = `
            <h3>💾 Data Management</h3>
            <div class="form-group mystical-form-group">
                <button class="btn mystical-btn" onclick="window.dataManager.exportData('json')">Export JSON</button>
                <button class="btn mystical-btn" onclick="window.dataManager.exportData('csv')">Export CSV</button>
                <input type="file" id="importFile" accept=".json" style="display: none;" onchange="handleFileImport(this)">
                <button class="btn mystical-btn" onclick="document.getElementById('importFile').click()">Import JSON</button>
                <button class="btn mystical-btn" onclick="window.dataManager.resetData()" style="background: #f44336;">Reset Data</button>
            </div>
        `;
        analyticsSection.appendChild(exportDiv);
    }
}

function handleFileImport(input) {
    const file = input.files[0];
    if (file) {
        window.dataManager.importData(file);
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes dataSlideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes dataSlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
