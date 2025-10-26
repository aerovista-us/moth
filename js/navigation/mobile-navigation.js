// Mobile Navigation JavaScript
class MobileNavigation {
    constructor() {
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.createMobileNav();
        this.addEventListeners();
    }
    
    createMobileNav() {
        // Create mobile navigation overlay
        const mobileNav = document.createElement('div');
        mobileNav.id = 'mobileNav';
        mobileNav.innerHTML = `
            <div class="mobile-nav-overlay">
                <div class="mobile-nav-content">
                    <div class="mobile-nav-header">
                        <div class="mobile-nav-logo">🦋 Nailed IT</div>
                        <button class="mobile-nav-close" id="mobileNavClose">×</button>
                    </div>
                    <div class="mobile-nav-search">
                        <input type="text" placeholder="Search tools..." id="mobileSearchInput">
                        <span class="mobile-search-icon">🔍</span>
                    </div>
                    <div class="mobile-nav-categories">
                        <div class="mobile-category">
                            <div class="mobile-category-header" onclick="toggleMobileCategory('core')">
                                <span class="mobile-category-icon">🏢</span>
                                <span class="mobile-category-title">Core Business</span>
                                <span class="mobile-category-toggle">▼</span>
                            </div>
                            <div class="mobile-category-links" id="core-links">
                                <a href="index.html" class="mobile-nav-link">🏠 Home</a>
                                <a href="overview.html" class="mobile-nav-link">🎨 Overview</a>
                                <a href="planning.html" class="mobile-nav-link">📸 Planning</a>
                                <a href="launch.html" class="mobile-nav-link">🚀 Launch</a>
                            </div>
                        </div>
                        
                        <div class="mobile-category">
                            <div class="mobile-category-header" onclick="toggleMobileCategory('analytics')">
                                <span class="mobile-category-icon">📊</span>
                                <span class="mobile-category-title">Analytics</span>
                                <span class="mobile-category-toggle">▼</span>
                            </div>
                            <div class="mobile-category-links" id="analytics-links">
                                <a href="tracking.html" class="mobile-nav-link">📊 Tracking</a>
                                <a href="analytics.html" class="mobile-nav-link">📈 Analytics</a>
                                <a href="advanced-analytics.html" class="mobile-nav-link">🚀 Advanced</a>
                            </div>
                        </div>
                        
                        <div class="mobile-category">
                            <div class="mobile-category-header" onclick="toggleMobileCategory('operations')">
                                <span class="mobile-category-icon">⚙️</span>
                                <span class="mobile-category-title">Operations</span>
                                <span class="mobile-category-toggle">▼</span>
                            </div>
                            <div class="mobile-category-links" id="operations-links">
                                <a href="supply.html" class="mobile-nav-link">📦 Supply Chain</a>
                                <a href="pricing-calculator.html" class="mobile-nav-link">💰 Pricing</a>
                                <a href="supplier-vetting.html" class="mobile-nav-link">🔍 Suppliers</a>
                            </div>
                        </div>
                        
                        <div class="mobile-category">
                            <div class="mobile-category-header" onclick="toggleMobileCategory('marketing')">
                                <span class="mobile-category-icon">📱</span>
                                <span class="mobile-category-title">Marketing</span>
                                <span class="mobile-category-toggle">▼</span>
                            </div>
                            <div class="mobile-category-links" id="marketing-links">
                                <a href="content-calendar.html" class="mobile-nav-link">📅 Content</a>
                                <a href="automation-tools.html" class="mobile-nav-link">⚡ Automation</a>
                            </div>
                        </div>
                        
                        <div class="mobile-category">
                            <div class="mobile-category-header" onclick="toggleMobileCategory('ai')">
                                <span class="mobile-category-icon">🤖</span>
                                <span class="mobile-category-title">AI & Tech</span>
                                <span class="mobile-category-toggle">▼</span>
                            </div>
                            <div class="mobile-category-links" id="ai-links">
                                <a href="ai-assistant.html" class="mobile-nav-link">🤖 AI Assistant</a>
                                <a href="mobile-pwa.html" class="mobile-nav-link">📱 Mobile</a>
                            </div>
                        </div>
                        
                        <div class="mobile-category">
                            <div class="mobile-category-header" onclick="toggleMobileCategory('team')">
                                <span class="mobile-category-icon">👥</span>
                                <span class="mobile-category-title">Team</span>
                                <span class="mobile-category-toggle">▼</span>
                            </div>
                            <div class="mobile-category-links" id="team-links">
                                <a href="collaboration.html" class="mobile-nav-link">👥 Collaboration</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add mobile navigation styles
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            .mobile-nav-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1000;
                display: none;
            }
            
            .mobile-nav-content {
                position: absolute;
                top: 0;
                right: 0;
                width: 300px;
                height: 100%;
                background: white;
                overflow-y: auto;
                box-shadow: -5px 0 15px rgba(0,0,0,0.3);
            }
            
            .mobile-nav-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: var(--brand-purple);
                color: white;
            }
            
            .mobile-nav-logo {
                font-size: 1.2rem;
                font-weight: bold;
            }
            
            .mobile-nav-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            }
            
            .mobile-nav-search {
                position: relative;
                padding: 1rem;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .mobile-nav-search input {
                width: 100%;
                padding: 0.75rem 0.75rem 0.75rem 2.5rem;
                border: 2px solid var(--brand-purple);
                border-radius: 25px;
                outline: none;
            }
            
            .mobile-search-icon {
                position: absolute;
                left: 1.5rem;
                top: 50%;
                transform: translateY(-50%);
                color: var(--brand-purple);
            }
            
            .mobile-category {
                border-bottom: 1px solid #e5e7eb;
            }
            
            .mobile-category-header {
                display: flex;
                align-items: center;
                padding: 1rem;
                cursor: pointer;
                background: var(--brand-pink-accent);
                transition: background 0.3s ease;
            }
            
            .mobile-category-header:hover {
                background: var(--brand-purple);
                color: white;
            }
            
            .mobile-category-icon {
                font-size: 1.2rem;
                margin-right: 0.75rem;
            }
            
            .mobile-category-title {
                flex: 1;
                font-weight: bold;
            }
            
            .mobile-category-toggle {
                font-size: 0.8rem;
                transition: transform 0.3s ease;
            }
            
            .mobile-category-links {
                display: none;
                background: white;
            }
            
            .mobile-category-links.open {
                display: block;
            }
            
            .mobile-nav-link {
                display: block;
                padding: 0.75rem 1rem 0.75rem 3rem;
                color: var(--brand-black);
                text-decoration: none;
                border-bottom: 1px solid #f3f4f6;
                transition: background 0.3s ease;
            }
            
            .mobile-nav-link:hover {
                background: var(--brand-pink-accent);
            }
            
            .mobile-nav-toggle {
                display: none;
                background: var(--brand-purple);
                color: white;
                border: none;
                border-radius: 10px;
                padding: 0.75rem 1rem;
                cursor: pointer;
                font-weight: bold;
                position: fixed;
                top: 1rem;
                right: 1rem;
                z-index: 999;
            }
            
            @media (max-width: 768px) {
                .mobile-nav-toggle {
                    display: block;
                }
                
                .mystical-nav {
                    display: none;
                }
            }
        `;
        
        document.head.appendChild(mobileStyles);
        document.body.appendChild(mobileNav);
        
        // Add mobile toggle button
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-nav-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.onclick = () => this.toggle();
        document.body.appendChild(mobileToggle);
    }
    
    addEventListeners() {
        document.getElementById('mobileNavClose').onclick = () => this.close();
        document.getElementById('mobileSearchInput').oninput = (e) => this.handleSearch(e.target.value);
        
        // Close on overlay click
        document.getElementById('mobileNav').onclick = (e) => {
            if (e.target.id === 'mobileNav') {
                this.close();
            }
        };
    }
    
    toggle() {
        this.isOpen = !this.isOpen;
        const overlay = document.getElementById('mobileNav');
        overlay.style.display = this.isOpen ? 'block' : 'none';
    }
    
    close() {
        this.isOpen = false;
        document.getElementById('mobileNav').style.display = 'none';
    }
    
    handleSearch(query) {
        const links = document.querySelectorAll('.mobile-nav-link');
        links.forEach(link => {
            const text = link.textContent.toLowerCase();
            const shouldShow = text.includes(query.toLowerCase());
            link.style.display = shouldShow ? 'block' : 'none';
        });
    }
}

// Global function for category toggles
function toggleMobileCategory(categoryId) {
    const links = document.getElementById(`${categoryId}-links`);
    const toggle = event.target.querySelector('.mobile-category-toggle');
    
    if (links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.textContent = '▼';
    } else {
        links.classList.add('open');
        toggle.textContent = '▲';
    }
}

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    new MobileNavigation();
});
