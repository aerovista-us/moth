// Advanced Navigation System with User Behavior Tracking
class AdvancedNavigation {
    constructor() {
        this.userData = this.loadUserData();
        this.navigationHistory = this.loadNavigationHistory();
        this.favorites = this.loadFavorites();
        this.usageStats = this.loadUsageStats();
        this.init();
    }
    
    init() {
        this.trackCurrentPage();
        this.createPersonalizedNavigation();
        this.addKeyboardShortcuts();
        this.createFavoritesSystem();
        this.implementProgressiveDisclosure();
        this.addAdvancedSearch();
    }
    
    // User Behavior Tracking
    trackCurrentPage() {
        const currentPage = this.getCurrentPage();
        const timestamp = Date.now();
        
        // Update navigation history
        this.navigationHistory.unshift({
            page: currentPage,
            timestamp: timestamp,
            sessionId: this.getSessionId()
        });
        
        // Keep only last 50 navigation events
        if (this.navigationHistory.length > 50) {
            this.navigationHistory = this.navigationHistory.slice(0, 50);
        }
        
        // Update usage statistics
        if (!this.usageStats[currentPage]) {
            this.usageStats[currentPage] = {
                visits: 0,
                timeSpent: 0,
                lastVisit: timestamp,
                frequency: 0
            };
        }
        
        this.usageStats[currentPage].visits++;
        this.usageStats[currentPage].lastVisit = timestamp;
        
        // Calculate frequency (visits per day)
        const daysSinceFirstVisit = (timestamp - this.usageStats[currentPage].firstVisit) / (1000 * 60 * 60 * 24);
        this.usageStats[currentPage].frequency = this.usageStats[currentPage].visits / Math.max(daysSinceFirstVisit, 1);
        
        this.saveUserData();
    }
    
    // Personalized Navigation
    createPersonalizedNavigation() {
        const personalizedNav = this.generatePersonalizedNavigation();
        this.injectPersonalizedNav(personalizedNav);
    }
    
    generatePersonalizedNavigation() {
        // Get most frequently used tools
        const frequentTools = Object.entries(this.usageStats)
            .sort(([,a], [,b]) => b.frequency - a.frequency)
            .slice(0, 6)
            .map(([page, stats]) => ({
                page,
                stats,
                title: this.getPageTitle(page),
                icon: this.getPageIcon(page)
            }));
        
        // Get recently used tools
        const recentTools = this.navigationHistory
            .slice(0, 5)
            .map(entry => ({
                page: entry.page,
                title: this.getPageTitle(entry.page),
                icon: this.getPageIcon(entry.page),
                timestamp: entry.timestamp
            }));
        
        return {
            frequent: frequentTools,
            recent: recentTools,
            recommendations: this.generateRecommendations()
        };
    }
    
    generateRecommendations() {
        const recommendations = [];
        const currentPage = this.getCurrentPage();
        
        // Context-aware recommendations based on current page
        const contextRecommendations = {
            'index': ['overview', 'planning', 'analytics'],
            'overview': ['planning', 'pricing-calculator', 'supplier-vetting'],
            'planning': ['content-calendar', 'automation-tools', 'launch'],
            'tracking': ['analytics', 'advanced-analytics', 'pricing-calculator'],
            'analytics': ['advanced-analytics', 'ai-assistant', 'tracking'],
            'pricing-calculator': ['supplier-vetting', 'analytics', 'overview'],
            'content-calendar': ['automation-tools', 'planning', 'ai-assistant'],
            'supplier-vetting': ['pricing-calculator', 'supply', 'analytics']
        };
        
        const suggestedPages = contextRecommendations[currentPage] || [];
        
        suggestedPages.forEach(page => {
            if (this.usageStats[page] && this.usageStats[page].frequency < 0.5) {
                recommendations.push({
                    page,
                    title: this.getPageTitle(page),
                    icon: this.getPageIcon(page),
                    reason: 'Suggested based on current page'
                });
            }
        });
        
        return recommendations.slice(0, 3);
    }
    
    injectPersonalizedNav(personalizedNav) {
        // Create personalized navigation panel
        const personalizedPanel = document.createElement('div');
        personalizedPanel.id = 'personalizedNav';
        personalizedPanel.innerHTML = `
            <div class="personalized-nav-panel">
                <div class="personalized-nav-header">
                    <h3>🎯 Your Personalized Navigation</h3>
                    <button class="personalized-nav-toggle" onclick="togglePersonalizedNav()">▼</button>
                </div>
                <div class="personalized-nav-content">
                    <div class="personalized-section">
                        <h4>⭐ Most Used Tools</h4>
                        <div class="personalized-tools">
                            ${personalizedNav.frequent.map(tool => `
                                <a href="${tool.page}.html" class="personalized-tool" data-page="${tool.page}">
                                    <span class="tool-icon">${tool.icon}</span>
                                    <span class="tool-title">${tool.title}</span>
                                    <span class="tool-frequency">${tool.stats.frequency.toFixed(1)}/day</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="personalized-section">
                        <h4>🕒 Recently Used</h4>
                        <div class="personalized-tools">
                            ${personalizedNav.recent.map(tool => `
                                <a href="${tool.page}.html" class="personalized-tool" data-page="${tool.page}">
                                    <span class="tool-icon">${tool.icon}</span>
                                    <span class="tool-title">${tool.title}</span>
                                    <span class="tool-time">${this.formatTimeAgo(tool.timestamp)}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="personalized-section">
                        <h4>💡 Recommended</h4>
                        <div class="personalized-tools">
                            ${personalizedNav.recommendations.map(tool => `
                                <a href="${tool.page}.html" class="personalized-tool recommended" data-page="${tool.page}">
                                    <span class="tool-icon">${tool.icon}</span>
                                    <span class="tool-title">${tool.title}</span>
                                    <span class="tool-reason">${tool.reason}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            .personalized-nav-panel {
                background: linear-gradient(135deg, var(--brand-purple), var(--brand-light-purple));
                color: white;
                border-radius: 20px;
                padding: 1.5rem;
                margin: 2rem 0;
                box-shadow: 0 10px 30px rgba(107, 70, 193, 0.3);
            }
            
            .personalized-nav-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .personalized-nav-toggle {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .personalized-nav-toggle:hover {
                transform: scale(1.1);
            }
            
            .personalized-nav-content {
                display: none;
            }
            
            .personalized-nav-content.open {
                display: block;
            }
            
            .personalized-section {
                margin: 1.5rem 0;
            }
            
            .personalized-section h4 {
                margin-bottom: 1rem;
                color: var(--brand-dusty-pink);
            }
            
            .personalized-tools {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            }
            
            .personalized-tool {
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 15px;
                padding: 1rem;
                text-decoration: none;
                color: white;
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            
            .personalized-tool:hover {
                background: rgba(255,255,255,0.2);
                transform: translateY(-5px);
            }
            
            .personalized-tool.recommended {
                border-color: var(--brand-dusty-pink);
                background: rgba(212, 165, 165, 0.2);
            }
            
            .tool-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            
            .tool-title {
                font-weight: bold;
                margin-bottom: 0.25rem;
            }
            
            .tool-frequency, .tool-time, .tool-reason {
                font-size: 0.8rem;
                opacity: 0.8;
            }
        `;
        
        document.head.appendChild(styles);
        
        // Insert after header
        const header = document.querySelector('.mystical-header');
        if (header) {
            header.insertAdjacentElement('afterend', personalizedPanel);
        }
    }
    
    // Keyboard Shortcuts
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + 1-9 for quick navigation
            if (e.altKey && e.key >= '1' && e.key <= '9') {
                e.preventDefault();
                const shortcuts = this.getKeyboardShortcuts();
                const shortcut = shortcuts[parseInt(e.key) - 1];
                if (shortcut) {
                    window.location.href = shortcut.url;
                }
            }
            
            // Alt + S for search
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                this.focusSearch();
            }
            
            // Alt + F for favorites
            if (e.altKey && e.key === 'f') {
                e.preventDefault();
                this.toggleFavorites();
            }
            
            // Alt + H for home
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                window.location.href = 'index.html';
            }
        });
    }
    
    getKeyboardShortcuts() {
        const frequentTools = Object.entries(this.usageStats)
            .sort(([,a], [,b]) => b.frequency - a.frequency)
            .slice(0, 9)
            .map(([page, stats]) => ({
                url: `${page}.html`,
                title: this.getPageTitle(page),
                icon: this.getPageIcon(page)
            }));
        
        return frequentTools;
    }
    
    // Favorites System
    createFavoritesSystem() {
        const favoritesPanel = document.createElement('div');
        favoritesPanel.id = 'favoritesPanel';
        favoritesPanel.innerHTML = `
            <div class="favorites-panel">
                <div class="favorites-header">
                    <h3>⭐ Favorites</h3>
                    <button class="favorites-toggle" onclick="toggleFavorites()">▼</button>
                </div>
                <div class="favorites-content">
                    <div class="favorites-list">
                        ${this.favorites.map(fav => `
                            <div class="favorite-item">
                                <a href="${fav}.html" class="favorite-link">
                                    <span class="favorite-icon">${this.getPageIcon(fav)}</span>
                                    <span class="favorite-title">${this.getPageTitle(fav)}</span>
                                </a>
                                <button class="remove-favorite" onclick="removeFavorite('${fav}')">×</button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="add-favorite-section">
                        <select id="addFavoriteSelect">
                            <option value="">Add to favorites...</option>
                            ${this.getAllPages().filter(page => !this.favorites.includes(page)).map(page => `
                                <option value="${page}">${this.getPageTitle(page)}</option>
                            `).join('')}
                        </select>
                        <button onclick="addFavorite()">+ Add</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add favorites styles
        const favoritesStyles = document.createElement('style');
        favoritesStyles.textContent = `
            .favorites-panel {
                background: var(--brand-pink-accent);
                border: 2px solid var(--brand-purple);
                border-radius: 20px;
                padding: 1.5rem;
                margin: 2rem 0;
            }
            
            .favorites-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .favorites-content {
                display: none;
            }
            
            .favorites-content.open {
                display: block;
            }
            
            .favorite-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.75rem;
                background: white;
                border-radius: 10px;
                margin: 0.5rem 0;
            }
            
            .favorite-link {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                text-decoration: none;
                color: var(--brand-black);
                flex: 1;
            }
            
            .remove-favorite {
                background: #ef4444;
                color: white;
                border: none;
                border-radius: 50%;
                width: 25px;
                height: 25px;
                cursor: pointer;
                font-size: 0.8rem;
            }
            
            .add-favorite-section {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .add-favorite-section select {
                flex: 1;
                padding: 0.5rem;
                border: 2px solid var(--brand-purple);
                border-radius: 10px;
            }
            
            .add-favorite-section button {
                background: var(--brand-purple);
                color: white;
                border: none;
                border-radius: 10px;
                padding: 0.5rem 1rem;
                cursor: pointer;
            }
        `;
        
        document.head.appendChild(favoritesStyles);
        
        // Insert after personalized nav
        const personalizedNav = document.getElementById('personalizedNav');
        if (personalizedNav) {
            personalizedNav.insertAdjacentElement('afterend', favoritesPanel);
        }
    }
    
    // Advanced Search
    addAdvancedSearch() {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            const advancedSearch = document.createElement('div');
            advancedSearch.className = 'advanced-search';
            advancedSearch.innerHTML = `
                <div class="search-filters">
                    <label>
                        <input type="checkbox" id="searchFavorites" checked> Favorites Only
                    </label>
                    <label>
                        <input type="checkbox" id="searchRecent" checked> Recent Tools
                    </label>
                    <label>
                        <input type="checkbox" id="searchFrequent" checked> Frequent Tools
                    </label>
                </div>
                <div class="search-suggestions">
                    <div class="suggestion-title">💡 Quick Access</div>
                    <div class="suggestion-buttons">
                        <button onclick="quickSearch('pricing')">💰 Pricing</button>
                        <button onclick="quickSearch('content')">📅 Content</button>
                        <button onclick="quickSearch('analytics')">📊 Analytics</button>
                        <button onclick="quickSearch('ai')">🤖 AI Assistant</button>
                    </div>
                </div>
            `;
            
            searchContainer.appendChild(advancedSearch);
        }
    }
    
    // Progressive Disclosure
    implementProgressiveDisclosure() {
        // All tools are visible by default - no need to hide advanced tools
        // This provides a cleaner, more accessible interface
    }
    
    // Utility Methods
    getCurrentPage() {
        const path = window.location.pathname;
        return path.split('/').pop().replace('.html', '') || 'index';
    }
    
    getPageTitle(page) {
        const titles = {
            'index': 'Home',
            'overview': 'Overview',
            'planning': 'Planning',
            'tracking': 'Tracking',
            'supply': 'Supply Chain',
            'launch': 'Launch',
            'analytics': 'Analytics',
            'advanced-analytics': 'Advanced Analytics',
            'ai-assistant': 'AI Assistant',
            'automation-tools': 'Automation',
            'collaboration': 'Team',
            'mobile-pwa': 'Mobile',
            'content-calendar': 'Content Calendar',
            'pricing-calculator': 'Pricing Calculator',
            'supplier-vetting': 'Supplier Vetting'
        };
        return titles[page] || page;
    }
    
    getPageIcon(page) {
        const icons = {
            'index': '🏠',
            'overview': '🎨',
            'planning': '📸',
            'tracking': '📊',
            'supply': '📦',
            'launch': '🚀',
            'analytics': '📈',
            'advanced-analytics': '🚀',
            'ai-assistant': '🤖',
            'automation-tools': '⚡',
            'collaboration': '👥',
            'mobile-pwa': '📱',
            'content-calendar': '📅',
            'pricing-calculator': '💰',
            'supplier-vetting': '🔍'
        };
        return icons[page] || '📄';
    }
    
    getAllPages() {
        return [
            'index', 'overview', 'planning', 'tracking', 'supply', 'launch',
            'analytics', 'advanced-analytics', 'ai-assistant', 'automation-tools',
            'collaboration', 'mobile-pwa', 'content-calendar', 'pricing-calculator', 'supplier-vetting'
        ];
    }
    
    formatTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }
    
    getSessionId() {
        let sessionId = sessionStorage.getItem('navigationSessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('navigationSessionId', sessionId);
        }
        return sessionId;
    }
    
    // Data persistence
    loadUserData() {
        const data = localStorage.getItem('nailedItUserData');
        return data ? JSON.parse(data) : {};
    }
    
    saveUserData() {
        localStorage.setItem('nailedItUserData', JSON.stringify(this.userData));
    }
    
    loadNavigationHistory() {
        const history = localStorage.getItem('nailedItNavigationHistory');
        return history ? JSON.parse(history) : [];
    }
    
    saveNavigationHistory() {
        localStorage.setItem('nailedItNavigationHistory', JSON.stringify(this.navigationHistory));
    }
    
    loadFavorites() {
        const favorites = localStorage.getItem('nailedItFavorites');
        return favorites ? JSON.parse(favorites) : [];
    }
    
    saveFavorites() {
        localStorage.setItem('nailedItFavorites', JSON.stringify(this.favorites));
    }
    
    loadUsageStats() {
        const stats = localStorage.getItem('nailedItUsageStats');
        return stats ? JSON.parse(stats) : {};
    }
    
    saveUsageStats() {
        localStorage.setItem('nailedItUsageStats', JSON.stringify(this.usageStats));
    }
}

// Global functions for HTML onclick handlers
function togglePersonalizedNav() {
    const content = document.querySelector('.personalized-nav-content');
    const toggle = document.querySelector('.personalized-nav-toggle');
    
    if (content.classList.contains('open')) {
        content.classList.remove('open');
        toggle.textContent = '▼';
    } else {
        content.classList.add('open');
        toggle.textContent = '▲';
    }
}

function toggleFavorites() {
    const content = document.querySelector('.favorites-content');
    const toggle = document.querySelector('.favorites-toggle');
    
    if (content.classList.contains('open')) {
        content.classList.remove('open');
        toggle.textContent = '▼';
    } else {
        content.classList.add('open');
        toggle.textContent = '▲';
    }
}

function addFavorite() {
    const select = document.getElementById('addFavoriteSelect');
    const page = select.value;
    
    if (page && !window.advancedNav.favorites.includes(page)) {
        window.advancedNav.favorites.push(page);
        window.advancedNav.saveFavorites();
        location.reload(); // Refresh to show updated favorites
    }
}

function removeFavorite(page) {
    window.advancedNav.favorites = window.advancedNav.favorites.filter(fav => fav !== page);
    window.advancedNav.saveFavorites();
    location.reload(); // Refresh to show updated favorites
}

function quickSearch(term) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = term;
        searchInput.dispatchEvent(new Event('input'));
    }
}

// Initialize advanced navigation
document.addEventListener('DOMContentLoaded', function() {
    window.advancedNav = new AdvancedNavigation();
});
