/**
 * Keyboard Shortcuts System
 * Adds keyboard shortcuts for power users across the Nailed IT Business Planning Suite
 */

class KeyboardShortcuts {
    constructor() {
        this.shortcuts = new Map();
        this.isEnabled = true;
        this.showHelp = false;
        this.init();
    }

    init() {
        this.registerDefaultShortcuts();
        this.setupEventListeners();
        this.createHelpOverlay();
        this.loadUserPreferences();
    }

    registerDefaultShortcuts() {
        // Navigation shortcuts
        this.register('h', 'Go to Home', () => this.navigateTo('index.html'));
        this.register('o', 'Go to Overview', () => this.navigateTo('overview.html'));
        this.register('p', 'Go to Planning', () => this.navigateTo('planning.html'));
        this.register('t', 'Go to Tracking', () => this.navigateTo('tracking.html'));
        this.register('s', 'Go to Supply', () => this.navigateTo('supply.html'));
        this.register('l', 'Go to Launch', () => this.navigateTo('launch.html'));
        this.register('a', 'Go to Analytics', () => this.navigateTo('analytics.html'));

        // Tool shortcuts
        this.register('g', 'Generate SKU', () => this.executeTool('genSku'));
        this.register('r', 'Calculate ROAS', () => this.executeTool('calcROAS'));
        this.register('u', 'Update Pricing', () => this.executeTool('updatePricing'));

        // Navigation dropdown
        this.register('m', 'Toggle Site Map', () => this.toggleSiteMap());

        // Help and utilities
        this.register('?', 'Show Help', () => this.toggleHelp());
        this.register('Escape', 'Close Help', () => this.hideHelp());
        this.register('ctrl+s', 'Save Data', () => this.saveData());
        this.register('ctrl+e', 'Export Data', () => this.exportData());

        // Form shortcuts
        this.register('ctrl+enter', 'Submit Form', () => this.submitForm());
        this.register('ctrl+z', 'Undo', () => this.undo());
        this.register('ctrl+y', 'Redo', () => this.redo());
    }

    register(key, description, callback, context = 'global') {
        const shortcut = {
            key: key.toLowerCase(),
            description,
            callback,
            context,
            originalKey: key
        };
        
        this.shortcuts.set(key.toLowerCase(), shortcut);
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (!this.isEnabled) return;

            // Don't trigger shortcuts when typing in inputs
            if (this.isTypingInInput(e.target)) {
                // Only allow certain shortcuts in inputs
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.hideHelp();
                }
                return;
            }

            const key = this.getKeyString(e);
            const shortcut = this.shortcuts.get(key);

            if (shortcut) {
                e.preventDefault();
                this.executeShortcut(shortcut);
            }
        });

        // Listen for focus changes to update context
        document.addEventListener('focusin', (e) => {
            this.updateContext(e.target);
        });
    }

    getKeyString(e) {
        let key = '';
        
        if (e.ctrlKey) key += 'ctrl+';
        if (e.altKey) key += 'alt+';
        if (e.shiftKey) key += 'shift+';
        if (e.metaKey) key += 'meta+';
        
        key += e.key.toLowerCase();
        
        return key;
    }

    isTypingInInput(target) {
        const inputTypes = ['input', 'textarea', 'select'];
        return inputTypes.includes(target.tagName.toLowerCase()) || 
               target.contentEditable === 'true';
    }

    executeShortcut(shortcut) {
        try {
            shortcut.callback();
            this.showShortcutFeedback(shortcut);
        } catch (error) {
            console.error('Error executing shortcut:', error);
            this.showErrorFeedback(shortcut);
        }
    }

    navigateTo(page) {
        window.location.href = page;
    }

    executeTool(toolName) {
        if (typeof window[toolName] === 'function') {
            window[toolName]();
        } else {
            console.warn(`Tool ${toolName} not found`);
        }
    }

    toggleSiteMap() {
        const navToggle = document.getElementById('navToggle');
        if (navToggle) {
            navToggle.click();
        }
    }

    toggleHelp() {
        this.showHelp = !this.showHelp;
        const helpOverlay = document.getElementById('keyboardShortcutsHelp');
        if (helpOverlay) {
            helpOverlay.style.display = this.showHelp ? 'block' : 'none';
        }
    }

    hideHelp() {
        this.showHelp = false;
        const helpOverlay = document.getElementById('keyboardShortcutsHelp');
        if (helpOverlay) {
            helpOverlay.style.display = 'none';
        }
    }

    saveData() {
        if (window.dataManager && typeof window.dataManager.saveData === 'function') {
            window.dataManager.saveData();
            this.showFeedback('Data saved successfully');
        } else if (window.supplierVettingScorer && typeof window.supplierVettingScorer.saveData === 'function') {
            window.supplierVettingScorer.saveData();
            this.showFeedback('Supplier data saved successfully');
        } else {
            this.showFeedback('No save function available');
        }
    }

    exportData() {
        if (window.dataManager && typeof window.dataManager.exportData === 'function') {
            window.dataManager.exportData('json');
            this.showFeedback('Data exported successfully');
        } else if (window.supplierVettingScorer && typeof window.supplierVettingScorer.exportReport === 'function') {
            window.supplierVettingScorer.exportReport();
            this.showFeedback('Report exported successfully');
        } else {
            this.showFeedback('No export function available');
        }
    }

    submitForm() {
        const form = document.querySelector('form');
        if (form) {
            form.submit();
        } else {
            this.showFeedback('No form found to submit');
        }
    }

    undo() {
        // Basic undo functionality
        if (document.execCommand) {
            document.execCommand('undo');
        }
    }

    redo() {
        // Basic redo functionality
        if (document.execCommand) {
            document.execCommand('redo');
        }
    }

    updateContext(target) {
        // Update context based on current focus
        const context = this.getContextFromElement(target);
        this.currentContext = context;
    }

    getContextFromElement(element) {
        if (element.closest('.supplier-vetting')) return 'supplier-vetting';
        if (element.closest('.calculator')) return 'calculator';
        if (element.closest('.form')) return 'form';
        return 'global';
    }

    showShortcutFeedback(shortcut) {
        this.showFeedback(`✓ ${shortcut.description}`);
    }

    showErrorFeedback(shortcut) {
        this.showFeedback(`✗ Error executing ${shortcut.description}`);
    }

    showFeedback(message) {
        // Remove existing feedback
        const existing = document.getElementById('shortcutFeedback');
        if (existing) {
            existing.remove();
        }

        // Create new feedback
        const feedback = document.createElement('div');
        feedback.id = 'shortcutFeedback';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #6b46c1, #d4a5a5);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(feedback);

        // Remove after 3 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (feedback.parentNode) {
                        feedback.remove();
                    }
                }, 300);
            }
        }, 3000);
    }

    createHelpOverlay() {
        const helpOverlay = document.createElement('div');
        helpOverlay.id = 'keyboardShortcutsHelp';
        helpOverlay.style.cssText = `
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
            padding: 2rem;
        `;

        helpOverlay.innerHTML = `
            <div style="
                background: white;
                border-radius: 20px;
                padding: 2rem;
                max-width: 800px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h2 style="margin: 0; color: #6b46c1;">⌨️ Keyboard Shortcuts</h2>
                    <button onclick="window.keyboardShortcuts.hideHelp()" style="
                        background: #6b46c1;
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        cursor: pointer;
                        font-size: 1.2rem;
                    ">×</button>
                </div>
                
                <div style="display: grid; gap: 1rem;">
                    ${this.generateShortcutGroups()}
                </div>
                
                <div style="margin-top: 2rem; padding-top: 1rem; border-top: 2px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 0.9rem; margin: 0;">
                        Press <kbd style="background: #f3f4f6; padding: 0.2rem 0.5rem; border-radius: 4px; font-family: monospace;">?</kbd> 
                        to toggle this help overlay. Press <kbd style="background: #f3f4f6; padding: 0.2rem 0.5rem; border-radius: 4px; font-family: monospace;">Esc</kbd> 
                        to close.
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(helpOverlay);
    }

    generateShortcutGroups() {
        const groups = {
            'Navigation': [],
            'Tools': [],
            'Forms': [],
            'Utilities': []
        };

        // Categorize shortcuts
        this.shortcuts.forEach((shortcut, key) => {
            if (key.match(/^[a-z]$/)) {
                if (shortcut.description.includes('Go to')) {
                    groups.Navigation.push(shortcut);
                } else if (shortcut.description.includes('Generate') || shortcut.description.includes('Calculate')) {
                    groups.Tools.push(shortcut);
                }
            } else if (key.includes('ctrl')) {
                groups.Forms.push(shortcut);
            } else {
                groups.Utilities.push(shortcut);
            }
        });

        let html = '';
        Object.entries(groups).forEach(([groupName, shortcuts]) => {
            if (shortcuts.length > 0) {
                html += `
                    <div style="background: #f9fafb; padding: 1rem; border-radius: 10px;">
                        <h3 style="margin: 0 0 1rem 0; color: #6b46c1; font-size: 1.1rem;">${groupName}</h3>
                        <div style="display: grid; gap: 0.5rem;">
                            ${shortcuts.map(shortcut => `
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span>${shortcut.description}</span>
                                    <kbd style="background: #e5e7eb; padding: 0.3rem 0.6rem; border-radius: 6px; font-family: monospace; font-size: 0.9rem;">
                                        ${shortcut.originalKey}
                                    </kbd>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        });

        return html;
    }

    loadUserPreferences() {
        const saved = localStorage.getItem('keyboardShortcutsPreferences');
        if (saved) {
            try {
                const preferences = JSON.parse(saved);
                this.isEnabled = preferences.enabled !== false;
            } catch (e) {
                console.error('Error loading keyboard shortcuts preferences:', e);
            }
        }
    }

    saveUserPreferences() {
        const preferences = {
            enabled: this.isEnabled,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('keyboardShortcutsPreferences', JSON.stringify(preferences));
    }

    enable() {
        this.isEnabled = true;
        this.saveUserPreferences();
        this.showFeedback('Keyboard shortcuts enabled');
    }

    disable() {
        this.isEnabled = false;
        this.saveUserPreferences();
        this.showFeedback('Keyboard shortcuts disabled');
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    kbd {
        background: #f3f4f6;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-family: monospace;
        font-size: 0.9rem;
        border: 1px solid #d1d5db;
    }
`;
document.head.appendChild(style);

// Initialize keyboard shortcuts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    window.keyboardShortcuts = new KeyboardShortcuts();
    console.log('✅ Keyboard Shortcuts System initialized');
});
