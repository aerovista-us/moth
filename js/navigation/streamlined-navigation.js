/**
 * Streamlined Navigation System - Moth Emporium
 * Clean dropdown-style site map navigation
 * 
 * @fileoverview Modern navigation with dropdown site map
 * @author Moth Emporium Development Team
 * @version 2.0.0
 */

/**
 * Generates a clean, modern header with dropdown navigation
 * 
 * @function generateStreamlinedHeader
 * @description Creates a professional header with dropdown site map
 * @returns {string} HTML string for the header
 */
function generateStreamlinedHeader() {
    return `
        <header class="streamlined-header">
            <div class="header-container">
                <!-- Brand Section -->
                <div class="brand-section">
                    <div class="brand-title">🦋 Moth Emporium Presents</div>
                    <div class="brand-subtitle">Nailed IT Business Planning Suite</div>
                </div>
                
                <!-- Navigation Dropdown -->
                <nav class="site-map-nav">
                    <button class="nav-toggle" id="navToggle" aria-label="Toggle site map">
                        <span class="nav-toggle-icon">☰</span>
                        <span class="nav-toggle-text">Site Map</span>
                    </button>
                    
                    <div class="nav-dropdown" id="navDropdown">
                        <div class="nav-grid">
                            <!-- Core Business Tools -->
                            <div class="nav-section">
                                <h3 class="nav-section-title">Core Business Tools</h3>
                                <ul class="nav-links">
                                    <li><a href="index.html" class="nav-link">🏠 Home</a></li>
                                    <li><a href="overview.html" class="nav-link">🎨 Product Overview</a></li>
                                    <li><a href="planning.html" class="nav-link">📸 Content Planning</a></li>
                                    <li><a href="tracking.html" class="nav-link">📊 Progress Tracking</a></li>
                                </ul>
                            </div>
                            
                            <!-- Operations -->
                            <div class="nav-section">
                                <h3 class="nav-section-title">Operations</h3>
                                <ul class="nav-links">
                                    <li><a href="supply.html" class="nav-link">📦 Supply Chain</a></li>
                                    <li><a href="launch.html" class="nav-link">🚀 Launch Timeline</a></li>
                                    <li><a href="analytics.html" class="nav-link">📈 Analytics & KPIs</a></li>
                                </ul>
                            </div>
                            
                            <!-- Advanced Features -->
                            <div class="nav-section">
                                <h3 class="nav-section-title">Advanced Features</h3>
                                <ul class="nav-links">
                                    <li><a href="advanced-analytics.html" class="nav-link">🚀 Advanced Analytics</a></li>
                                    <li><a href="ai-assistant.html" class="nav-link">🤖 AI Assistant</a></li>
                                    <li><a href="automation-tools.html" class="nav-link">⚡ Automation Tools</a></li>
                                </ul>
                            </div>
                            
                            <!-- Team & Tools -->
                            <div class="nav-section">
                                <h3 class="nav-section-title">Team & Tools</h3>
                                <ul class="nav-links">
                                    <li><a href="collaboration.html" class="nav-link">👥 Team Collaboration</a></li>
                                    <li><a href="mobile-pwa.html" class="nav-link">📱 Mobile PWA</a></li>
                                    <li><a href="content-calendar.html" class="nav-link">📅 Content Calendar</a></li>
                                </ul>
                            </div>
                            
                            <!-- Business Tools -->
                            <div class="nav-section">
                                <h3 class="nav-section-title">Business Tools</h3>
                                <ul class="nav-links">
                                    <li><a href="pricing-calculator.html" class="nav-link">💰 Pricing Calculator</a></li>
                                    <li><a href="supplier-vetting.html" class="nav-link">🔍 Supplier Vetting</a></li>
                                </ul>
                            </div>
                            
                            <!-- Documentation -->
                            <div class="nav-section">
                                <h3 class="nav-section-title">Documentation</h3>
                                <ul class="nav-links">
                                    <li><a href="README.html" class="nav-link">📚 Interactive Guide</a></li>
                                    <li><a href="FUTURE_ROADMAP.md" class="nav-link">🗺️ Development Roadmap</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    `;
}

/**
 * Generates CSS for the streamlined navigation
 * 
 * @function generateStreamlinedStyles
 * @description Creates modern, clean CSS for the navigation system
 * @returns {string} CSS string for the navigation
 */
function generateStreamlinedStyles() {
    return `
        <style>
            /* Streamlined Header Styles */
            .streamlined-header {
                background: linear-gradient(135deg, #1a1a1a 0%, #2d1b69 25%, #6b46c1 50%, #2d1b69 75%, #1a1a1a 100%);
                color: #f3e8ff;
                padding: 1.5rem 0;
                position: relative;
                z-index: 1000;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                border-bottom: 3px solid #6b46c1;
            }
            
            .header-container {
                max-width: 1400px;
                margin: 0 auto;
                padding: 0 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            /* Brand Section */
            .brand-section {
                flex: 1;
            }
            
            .brand-title {
                font-size: 1.2rem;
                font-weight: 600;
                color: #d4a5a5;
                margin-bottom: 0.5rem;
                letter-spacing: 1px;
                text-transform: uppercase;
                text-shadow: 0 0 10px rgba(212, 165, 165, 0.3);
            }
            
            .brand-subtitle {
                font-size: 1.8rem;
                font-weight: 700;
                color: #f3e8ff;
                text-shadow: 0 0 15px rgba(107, 70, 193, 0.4);
                line-height: 1.2;
            }
            
            /* Navigation Toggle */
            .nav-toggle {
                background: linear-gradient(135deg, rgba(107, 70, 193, 0.2), rgba(139, 92, 246, 0.2));
                border: 2px solid #6b46c1;
                color: #f3e8ff;
                padding: 1rem 2rem;
                border-radius: 12px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-weight: 600;
                transition: all 0.3s ease;
                font-size: 1rem;
                position: relative;
                overflow: hidden;
            }
            
            .nav-toggle::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                transition: left 0.5s ease;
            }
            
            .nav-toggle:hover::before {
                left: 100%;
            }
            
            .nav-toggle:hover {
                background: linear-gradient(135deg, #6b46c1, #8b5cf6);
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(107, 70, 193, 0.4);
                border-color: #8b5cf6;
            }
            
            .nav-toggle-icon {
                font-size: 1.4rem;
                transition: transform 0.3s ease;
            }
            
            .nav-toggle:hover .nav-toggle-icon {
                transform: rotate(90deg);
            }
            
            /* Dropdown Navigation */
            .nav-dropdown {
                position: absolute;
                top: 100%;
                right: 2rem;
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                padding: 2rem;
                min-width: 900px;
                max-width: 1200px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-20px);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 1001;
                backdrop-filter: blur(10px);
            }
            
            .nav-dropdown.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .nav-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 2.5rem;
            }
            
            .nav-section {
                min-width: 0;
            }
            
            .nav-section-title {
                font-size: 1rem;
                font-weight: 700;
                color: #6b46c1;
                margin: 0 0 1.5rem 0;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                border-bottom: 3px solid #f3e8ff;
                padding-bottom: 0.75rem;
                position: relative;
            }
            
            .nav-section-title::after {
                content: '';
                position: absolute;
                bottom: -3px;
                left: 0;
                width: 30px;
                height: 3px;
                background: #6b46c1;
                border-radius: 2px;
            }
            
            .nav-links {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .nav-links li {
                margin-bottom: 0.75rem;
            }
            
            .nav-link {
                display: block;
                color: #374151;
                text-decoration: none;
                padding: 0.75rem 1rem;
                border-radius: 8px;
                transition: all 0.3s ease;
                font-size: 0.95rem;
                font-weight: 500;
                position: relative;
                overflow: hidden;
            }
            
            .nav-link::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(107, 70, 193, 0.1), transparent);
                transition: left 0.3s ease;
            }
            
            .nav-link:hover::before {
                left: 100%;
            }
            
            .nav-link:hover {
                background: linear-gradient(135deg, #f3e8ff, #e0e7ff);
                color: #6b46c1;
                transform: translateX(8px);
                box-shadow: 0 4px 12px rgba(107, 70, 193, 0.2);
            }
            
            /* Mobile Responsive */
            @media (max-width: 1024px) {
                .nav-dropdown {
                    min-width: 700px;
                }
                
                .nav-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                }
            }
            
            @media (max-width: 768px) {
                .header-container {
                    padding: 0 1rem;
                }
                
                .brand-subtitle {
                    font-size: 1.4rem;
                }
                
                .nav-dropdown {
                    right: 1rem;
                    left: 1rem;
                    min-width: auto;
                    padding: 1.5rem;
                }
                
                .nav-grid {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }
                
                .nav-toggle {
                    padding: 0.8rem 1.5rem;
                    font-size: 0.9rem;
                }
            }
            
            /* Accessibility */
            .nav-toggle:focus,
            .nav-link:focus {
                outline: 3px solid #6b46c1;
                outline-offset: 2px;
            }
            
            /* Animation for smooth transitions */
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .nav-dropdown.active {
                animation: fadeInDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Loading state */
            .nav-toggle.loading {
                opacity: 0.7;
                pointer-events: none;
            }
            
            .nav-toggle.loading .nav-toggle-icon {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        </style>
    `;
}

/**
 * Initializes the streamlined navigation system
 * 
 * @function initStreamlinedNavigation
 * @description Sets up event listeners and functionality for the navigation
 */
function initStreamlinedNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navDropdown = document.getElementById('navDropdown');
    
    if (!navToggle || !navDropdown) return;
    
    // Toggle dropdown
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        navDropdown.classList.toggle('active');
        
        // Update button text
        const toggleText = navToggle.querySelector('.nav-toggle-text');
        if (navDropdown.classList.contains('active')) {
            toggleText.textContent = 'Close';
        } else {
            toggleText.textContent = 'Site Map';
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navDropdown.contains(e.target)) {
            navDropdown.classList.remove('active');
            const toggleText = navToggle.querySelector('.nav-toggle-text');
            toggleText.textContent = 'Site Map';
        }
    });
    
    // Close dropdown on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navDropdown.classList.remove('active');
            const toggleText = navToggle.querySelector('.nav-toggle-text');
            toggleText.textContent = 'Site Map';
        }
    });
    
    // Add active state to current page
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.style.background = '#f3e8ff';
            link.style.color = '#6b46c1';
            link.style.fontWeight = '600';
        }
    });
}

/**
 * Gets the current page name for active state
 * 
 * @function getCurrentPage
 * @returns {string} Current page identifier
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    
    if (filename === 'index' || filename === '' || filename === 'index.html') {
        return 'index';
    }
    
    return filename;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🦋 Streamlined Navigation loading...');
    
    // Inject the header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = generateStreamlinedHeader();
        console.log('✅ Header injected successfully');
    } else {
        console.error('❌ Header placeholder not found');
    }
    
    // Initialize navigation
    initStreamlinedNavigation();
    console.log('✅ Streamlined Navigation initialized');
});

// Export for use in other scripts
window.StreamlinedNavigation = {
    generateStreamlinedHeader,
    generateStreamlinedStyles,
    initStreamlinedNavigation,
    getCurrentPage
};
