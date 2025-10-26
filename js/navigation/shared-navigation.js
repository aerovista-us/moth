/**
 * Shared Navigation Functionality for Nailed IT
 * Enhanced navigation with keyboard shortcuts, active states, and smooth transitions
 * 
 * @fileoverview Core navigation system for all pages
 * @author Nailed IT Development Team
 * @version 1.0.0
 */

/**
 * Initializes navigation functionality when DOM is loaded
 * Sets up event listeners, active states, and keyboard shortcuts
 * 
 * @function initNavigation
 * @description Main navigation initialization function
 * @example initNavigation() // Called automatically on DOMContentLoaded
 * @returns {void}
 */
function initNavigation() {
    // Add active state to current page
    const currentPage = getCurrentPage();
    const navTabs = document.querySelectorAll('.nav-tab');
    
    // Set active state
    navTabs.forEach(tab => {
        const page = tab.getAttribute('data-page');
        if (page === currentPage) {
            tab.classList.add('active');
        }
        
        // Add enhanced click functionality
        tab.addEventListener('click', handleNavClick);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add tooltips for keyboard shortcuts
    addTooltips(navTabs);
    
    // Add mobile navigation enhancements
    addMobileNavigation();
}

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    
    // Handle index page
    if (filename === 'index' || filename === '' || filename === 'index.html') {
        return 'index';
    }
    
    return filename;
}

function handleNavClick(e) {
    const tab = e.currentTarget;
    const page = tab.getAttribute('data-page');
    
    // Skip if no page attribute
    if (!page) return;
    
    // Add loading state
    tab.style.opacity = '0.7';
    tab.style.transform = 'scale(0.95)';
    
    // Add click animation
    tab.style.transition = 'all 0.2s ease';
    
    // Track navigation
    trackNavigation(page);
    
    // Remove loading state after navigation
    setTimeout(() => {
        tab.style.opacity = '1';
        tab.style.transform = 'scale(1)';
    }, 200);
}

function handleKeyboardNavigation(e) {
    // Alt + number keys for quick navigation
    if (e.altKey && !e.ctrlKey && !e.shiftKey) {
        const keyMap = {
            '1': 'overview',
            '2': 'planning', 
            '3': 'tracking',
            '4': 'supply',
            '5': 'launch',
            '6': 'analytics',
            '0': 'index' // Home page
        };
        
        if (keyMap[e.key]) {
            e.preventDefault();
            const targetTab = document.querySelector(`[data-page="${keyMap[e.key]}"]`);
            if (targetTab) {
                targetTab.click();
            } else if (keyMap[e.key] === 'index') {
                window.location.href = 'index.html';
            }
        }
    }
    
    // Escape key to show keyboard shortcuts
    if (e.key === 'Escape') {
        showKeyboardShortcuts();
    }
}

function addTooltips(navTabs) {
    const shortcuts = ['1', '2', '3', '4', '5', '6'];
    
    navTabs.forEach((tab, index) => {
        const page = tab.getAttribute('data-page');
        const shortcut = shortcuts[index] || '';
        
        if (shortcut && page) {
            tab.title = `Go to ${page.charAt(0).toUpperCase() + page.slice(1)} (Alt + ${shortcut})`;
        }
    });
}

function addMobileNavigation() {
    // Add mobile menu toggle if needed
    const header = document.querySelector('.mystical-header');
    if (header && window.innerWidth <= 768) {
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: var(--moth-gold);
            border: none;
            color: var(--moth-primary);
            padding: 0.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.2rem;
        `;
        
        // Insert mobile menu button
        const container = header.querySelector('.container');
        container.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            const nav = header.querySelector('.mystical-nav');
            nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
        });
        
        // Show/hide mobile menu button based on screen size
        function handleResize() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                header.querySelector('.mystical-nav').style.display = 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                header.querySelector('.mystical-nav').style.display = 'flex';
            }
        }
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
    }
}

function trackNavigation(page) {
    // Analytics tracking (if available)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'navigation', {
            'page_title': page,
            'page_location': window.location.href
        });
    }
    
    // Console logging for debugging
    console.log(`Navigating to: ${page}`);
}

function showKeyboardShortcuts() {
    const shortcuts = [
        'Alt + 1: Overview',
        'Alt + 2: Planning',
        'Alt + 3: Tracking', 
        'Alt + 4: Supply Chain',
        'Alt + 5: Launch',
        'Alt + 6: Analytics',
        'Alt + 0: Home'
    ];
    
    // Create modal or notification
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--moth-primary);
        color: var(--moth-cream);
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        max-width: 300px;
    `;
    
    modal.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: var(--moth-gold);">⌨️ Keyboard Shortcuts</h3>
        <ul style="list-style: none; padding: 0;">
            ${shortcuts.map(shortcut => `<li style="margin: 0.5rem 0;">${shortcut}</li>`).join('')}
        </ul>
        <button onclick="this.parentElement.remove()" style="
            background: var(--moth-gold);
            color: var(--moth-primary);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 1rem;
        ">Close</button>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (modal.parentElement) {
            modal.remove();
        }
    }, 5000);
}

// Export functions for use in other scripts
window.NailedITNavigation = {
    initNavigation,
    getCurrentPage,
    trackNavigation,
    showKeyboardShortcuts
};
