// Mobile Enhancements - Moth Wing Power Business Planning
class MobileEnhancements {
    constructor() {
        this.isMobile = this.detectMobile();
        this.touchStartY = 0;
        this.touchStartX = 0;
        this.init();
    }
    
    init() {
        if (this.isMobile) {
            this.optimizeForMobile();
            this.addTouchGestures();
            this.improveMobileNavigation();
            this.optimizeMobileForms();
        }
    }
    
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    }
    
    optimizeForMobile() {
        // Add mobile-specific styles
        this.addMobileStyles();
        
        // Optimize particle system for mobile
        this.optimizeParticlesForMobile();
        
        // Add mobile-specific navigation
        this.addMobileNavigation();
        
        // Optimize tables for mobile
        this.optimizeTablesForMobile();
    }
    
    addMobileStyles() {
        const mobileStyle = document.createElement('style');
        mobileStyle.id = 'mobile-enhancements';
        mobileStyle.textContent = `
            /* Mobile-specific optimizations */
            @media (max-width: 768px) {
                .mystical-container {
                    padding: 0.5rem;
                }
                
                .mystical-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                
                .mystical-card {
                    padding: 1rem;
                    margin-bottom: 1rem;
                }
                
                .mystical-nav {
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .mystical-tab {
                    padding: 1rem;
                    font-size: 1rem;
                    text-align: center;
                }
                
                .mystical-table {
                    font-size: 0.8rem;
                }
                
                .mystical-table th,
                .mystical-table td {
                    padding: 0.5rem 0.25rem;
                }
                
                /* Mobile-specific touch targets */
                .mystical-btn {
                    min-height: 44px;
                    min-width: 44px;
                    padding: 0.75rem 1rem;
                    font-size: 1rem;
                }
                
                .mystical-input,
                .mystical-range {
                    min-height: 44px;
                    font-size: 16px; /* Prevents zoom on iOS */
                }
                
                .mystical-checkbox {
                    min-width: 44px;
                    min-height: 44px;
                }
                
                /* Mobile navigation improvements */
                .mobile-nav-toggle {
                    display: block;
                    position: fixed;
                    top: 1rem;
                    right: 1rem;
                    z-index: 1000;
                    background: var(--moth-gold);
                    color: var(--moth-primary);
                    border: none;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                
                .mobile-nav {
                    position: fixed;
                    top: 0;
                    left: -100%;
                    width: 80%;
                    height: 100vh;
                    background: var(--moth-primary);
                    z-index: 999;
                    transition: left 0.3s ease;
                    overflow-y: auto;
                }
                
                .mobile-nav.open {
                    left: 0;
                }
                
                .mobile-nav-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 998;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .mobile-nav-overlay.open {
                    opacity: 1;
                    visibility: visible;
                }
                
                /* Mobile document cards */
                .document-card {
                    margin-bottom: 1rem;
                }
                
                .document-actions {
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .document-actions .btn {
                    width: 100%;
                }
                
                /* Mobile calculator improvements */
                .enhanced-pricing-calculator,
                .enhanced-sku-generator,
                .enhanced-roas-calculator {
                    padding: 1rem;
                }
                
                .pricing-results {
                    grid-template-columns: 1fr;
                }
                
                .result-grid {
                    grid-template-columns: 1fr 1fr;
                }
                
                .metrics-dashboard {
                    grid-template-columns: 1fr 1fr;
                }
                
                /* Mobile modal improvements */
                .document-modal .modal-content {
                    max-width: 95vw;
                    max-height: 95vh;
                    margin: 1rem;
                }
                
                .modal-body {
                    max-height: 70vh;
                }
                
                /* Touch-friendly interactions */
                .mystical-card:hover {
                    transform: none; /* Disable hover effects on mobile */
                }
                
                .floating-card {
                    animation: none; /* Disable floating animations on mobile */
                }
                
                /* Mobile-specific animations */
                .mobile-slide-in {
                    animation: mobileSlideIn 0.3s ease-out;
                }
                
                @keyframes mobileSlideIn {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                
                .mobile-fade-in {
                    animation: mobileFadeIn 0.3s ease-out;
                }
                
                @keyframes mobileFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            }
            
            /* Hide mobile nav toggle on desktop */
            @media (min-width: 769px) {
                .mobile-nav-toggle,
                .mobile-nav,
                .mobile-nav-overlay {
                    display: none;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    }
    
    optimizeParticlesForMobile() {
        // Disable heavy particle effects on mobile
        if (window.mysticalParticleSystem) {
            // Verify particle system exists and has the method
            if (typeof window.mysticalParticleSystem.setParticleCount === 'function') {
                window.mysticalParticleSystem.setParticleCount(3); // Further reduce particle count
            }
            if (typeof window.mysticalParticleSystem.setAnimationSpeed === 'function') {
                window.mysticalParticleSystem.setAnimationSpeed(0.5); // Slow down animations
            }
        }
        
        // Disable shimmer overlay on mobile
        const shimmerOverlay = document.getElementById('shimmer-overlay');
        if (shimmerOverlay) {
            shimmerOverlay.style.display = 'none';
        }
        
        // Disable heavy animations on mobile
        this.disableHeavyAnimations();
        
        // Optimize particle system performance
        this.optimizeParticlePerformance();
        
        // Add performance monitoring
        this.monitorMobilePerformance();
    }
    
    monitorMobilePerformance() {
        // Monitor frame rate on mobile
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkPerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // If FPS is too low, further reduce effects
                if (fps < 30) {
                    this.emergencyPerformanceMode();
                }
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        requestAnimationFrame(checkPerformance);
    }
    
    emergencyPerformanceMode() {
        // Emergency performance mode for very low-end devices
        console.log('Emergency performance mode activated');
        
        // Disable all particle effects
        const particleContainer = document.getElementById('particle-container');
        if (particleContainer) {
            particleContainer.style.display = 'none';
        }
        
        // Disable only heavy animations, not all animations
        const style = document.createElement('style');
        style.textContent = `
            .floating-card,
            .mystical-float,
            .particle-container * {
                animation: none !important;
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    disableHeavyAnimations() {
        // Disable floating animations on mobile
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach(card => {
            card.style.animation = 'none';
        });
        
        // Disable mystical effects on mobile
        const mysticalElements = document.querySelectorAll('.mystical-card');
        mysticalElements.forEach(element => {
            element.style.willChange = 'auto';
        });
    }
    
    optimizeParticlePerformance() {
        // Reduce particle system complexity on mobile
        if (window.mysticalParticleSystem) {
            // Override particle creation to use simpler particles
            const originalCreateParticle = window.mysticalParticleSystem.createParticle;
            window.mysticalParticleSystem.createParticle = (index) => {
                const particle = originalCreateParticle.call(window.mysticalParticleSystem, index);
                // Simplify particle styles for mobile
                particle.style.background = 'rgba(212, 175, 55, 0.3)';
                particle.style.borderRadius = '50%';
                particle.style.boxShadow = 'none';
                return particle;
            };
            
            // Reduce animation frequency
            window.mysticalParticleSystem.setAnimationInterval(100); // Slower updates
        }
    }
    
    addMobileNavigation() {
        // Add mobile navigation toggle
        const header = document.querySelector('.mystical-header');
        if (header) {
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-nav-toggle';
            mobileToggle.innerHTML = '☰';
            mobileToggle.onclick = () => this.toggleMobileNav();
            header.appendChild(mobileToggle);
        }
        
        // Create mobile navigation
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <div class="mobile-nav-header">
                <h3>🦋 Navigation</h3>
                <button class="close-mobile-nav" onclick="window.mobileEnhancements.closeMobileNav()">×</button>
            </div>
            <nav class="mobile-nav-links">
                <a href="#overview" class="mobile-nav-link" onclick="showSection('overview'); window.mobileEnhancements.closeMobileNav()">Overview</a>
                <a href="#planning" class="mobile-nav-link" onclick="showSection('planning'); window.mobileEnhancements.closeMobileNav()">Planning</a>
                <a href="#tracking" class="mobile-nav-link" onclick="showSection('tracking'); window.mobileEnhancements.closeMobileNav()">Tracking</a>
                <a href="#supply" class="mobile-nav-link" onclick="showSection('supply'); window.mobileEnhancements.closeMobileNav()">Supply Chain</a>
                <a href="#launch" class="mobile-nav-link" onclick="showSection('launch'); window.mobileEnhancements.closeMobileNav()">Launch</a>
                <a href="#analytics" class="mobile-nav-link" onclick="showSection('analytics'); window.mobileEnhancements.closeMobileNav()">Analytics</a>
            </nav>
        `;
        
        document.body.appendChild(mobileNav);
        
        // Add mobile nav overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        overlay.onclick = () => this.closeMobileNav();
        document.body.appendChild(overlay);
        
        // Add mobile nav styles
        const navStyle = document.createElement('style');
        navStyle.textContent = `
            .mobile-nav-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: var(--moth-gold);
                color: var(--moth-primary);
            }
            
            .close-mobile-nav {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--moth-primary);
            }
            
            .mobile-nav-links {
                padding: 1rem;
            }
            
            .mobile-nav-link {
                display: block;
                padding: 1rem;
                color: var(--moth-cream);
                text-decoration: none;
                border-bottom: 1px solid rgba(212, 175, 55, 0.3);
                transition: background 0.3s ease;
            }
            
            .mobile-nav-link:hover {
                background: rgba(212, 175, 55, 0.2);
            }
        `;
        document.head.appendChild(navStyle);
    }
    
    toggleMobileNav() {
        const mobileNav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.mobile-nav-overlay');
        
        if (mobileNav && overlay) {
            mobileNav.classList.toggle('open');
            overlay.classList.toggle('open');
        }
    }
    
    closeMobileNav() {
        const mobileNav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.mobile-nav-overlay');
        
        if (mobileNav && overlay) {
            mobileNav.classList.remove('open');
            overlay.classList.remove('open');
        }
    }
    
    addTouchGestures() {
        // Add swipe gestures for section navigation
        document.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
            this.touchStartX = e.touches[0].clientX;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;
            const deltaY = touchEndY - this.touchStartY;
            const deltaX = touchEndX - this.touchStartX;
            
            // Horizontal swipe for section navigation
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                this.handleSwipeNavigation(deltaX > 0 ? 'left' : 'right');
            }
        });
    }
    
    handleSwipeNavigation(direction) {
        const sections = ['overview', 'planning', 'tracking', 'supply', 'launch', 'analytics'];
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        let nextIndex;
        if (direction === 'left') {
            nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        }
        
        showSection(sections[nextIndex]);
    }
    
    getCurrentSection() {
        const visibleSection = document.querySelector('.mystical-section:not(.hidden)');
        return visibleSection ? visibleSection.id : 'overview';
    }
    
    improveMobileNavigation() {
        // Add section indicators for mobile
        this.addSectionIndicators();
        
        // Add quick jump buttons
        this.addQuickJumpButtons();
    }
    
    addSectionIndicators() {
        const container = document.querySelector('.mystical-container');
        if (container) {
            const indicators = document.createElement('div');
            indicators.className = 'mobile-section-indicators';
            indicators.innerHTML = `
                <div class="indicator-dots">
                    <span class="dot active" data-section="overview"></span>
                    <span class="dot" data-section="planning"></span>
                    <span class="dot" data-section="tracking"></span>
                    <span class="dot" data-section="supply"></span>
                    <span class="dot" data-section="launch"></span>
                    <span class="dot" data-section="analytics"></span>
                </div>
            `;
            
            container.appendChild(indicators);
            
            // Add indicator styles
            const indicatorStyle = document.createElement('style');
            indicatorStyle.textContent = `
                .mobile-section-indicators {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1000;
                    display: none;
                }
                
                @media (max-width: 768px) {
                    .mobile-section-indicators {
                        display: block;
                    }
                }
                
                .indicator-dots {
                    display: flex;
                    gap: 0.5rem;
                    background: rgba(0, 0, 0, 0.7);
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                }
                
                .dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .dot.active {
                    background: var(--moth-gold);
                    transform: scale(1.2);
                }
                
                .dot:hover {
                    background: var(--moth-gold);
                }
            `;
            document.head.appendChild(indicatorStyle);
            
            // Add click handlers
            indicators.addEventListener('click', (e) => {
                if (e.target.classList.contains('dot')) {
                    const section = e.target.dataset.section;
                    showSection(section);
                    this.updateIndicators(section);
                }
            });
        }
    }
    
    updateIndicators(activeSection) {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.section === activeSection);
        });
    }
    
    addQuickJumpButtons() {
        // Add floating action button for quick navigation
        const fab = document.createElement('button');
        fab.className = 'mobile-fab';
        fab.innerHTML = '⚡';
        fab.onclick = () => this.showQuickJumpMenu();
        
        document.body.appendChild(fab);
        
        // Add FAB styles
        const fabStyle = document.createElement('style');
        fabStyle.textContent = `
            .mobile-fab {
                position: fixed;
                bottom: 80px;
                right: 20px;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: var(--moth-gold);
                color: var(--moth-primary);
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                display: none;
            }
            
            @media (max-width: 768px) {
                .mobile-fab {
                    display: block;
                }
            }
        `;
        document.head.appendChild(fabStyle);
    }
    
    showQuickJumpMenu() {
        // Create quick jump menu
        const menu = document.createElement('div');
        menu.className = 'quick-jump-menu';
        menu.innerHTML = `
            <div class="quick-jump-header">
                <h4>Quick Jump</h4>
                <button onclick="this.closest('.quick-jump-menu').remove()">×</button>
            </div>
            <div class="quick-jump-links">
                <a href="#overview" onclick="showSection('overview'); this.closest('.quick-jump-menu').remove()">Overview</a>
                <a href="#planning" onclick="showSection('planning'); this.closest('.quick-jump-menu').remove()">Planning</a>
                <a href="#tracking" onclick="showSection('tracking'); this.closest('.quick-jump-menu').remove()">Tracking</a>
                <a href="#supply" onclick="showSection('supply'); this.closest('.quick-jump-menu').remove()">Supply</a>
                <a href="#launch" onclick="showSection('launch'); this.closest('.quick-jump-menu').remove()">Launch</a>
                <a href="#analytics" onclick="showSection('analytics'); this.closest('.quick-jump-menu').remove()">Analytics</a>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Add menu styles
        const menuStyle = document.createElement('style');
        menuStyle.textContent = `
            .quick-jump-menu {
                position: fixed;
                bottom: 150px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                z-index: 1001;
                min-width: 200px;
            }
            
            .quick-jump-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: var(--moth-gold);
                color: var(--moth-primary);
                border-radius: 8px 8px 0 0;
            }
            
            .quick-jump-links {
                padding: 0.5rem;
            }
            
            .quick-jump-links a {
                display: block;
                padding: 0.75rem;
                color: var(--moth-primary);
                text-decoration: none;
                border-radius: 4px;
                transition: background 0.3s ease;
            }
            
            .quick-jump-links a:hover {
                background: rgba(212, 175, 55, 0.2);
            }
        `;
        document.head.appendChild(menuStyle);
    }
    
    optimizeTablesForMobile() {
        // Add horizontal scroll to tables on mobile
        const tables = document.querySelectorAll('.mystical-table');
        tables.forEach(table => {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-wrapper';
            wrapper.style.cssText = `
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            `;
            
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }
    
    optimizeMobileForms() {
        // Improve form inputs for mobile
        const inputs = document.querySelectorAll('.mystical-input, .mystical-range');
        inputs.forEach(input => {
            // Prevent zoom on iOS
            if (input.type === 'number' || input.type === 'email' || input.type === 'tel') {
                input.style.fontSize = '16px';
            }
            
            // Add touch-friendly styling
            input.style.minHeight = '44px';
        });
        
        // Add mobile-specific form validation
        this.addMobileFormValidation();
    }
    
    addMobileFormValidation() {
        // Add real-time validation for mobile forms
        const forms = document.querySelectorAll('form, .mystical-form-group');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateMobileInput(input);
                });
            });
        });
    }
    
    validateMobileInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let message = '';
        
        if (input.required && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (input.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email';
        } else if (input.type === 'number' && value && isNaN(value)) {
            isValid = false;
            message = 'Please enter a valid number';
        }
        
        this.showMobileValidation(input, isValid, message);
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    showMobileValidation(input, isValid, message) {
        // Remove existing validation message
        const existing = input.parentNode.querySelector('.mobile-validation');
        if (existing) {
            existing.remove();
        }
        
        if (!isValid) {
            const validation = document.createElement('div');
            validation.className = 'mobile-validation';
            validation.textContent = message;
            validation.style.cssText = `
                color: #f44336;
                font-size: 0.8rem;
                margin-top: 0.25rem;
            `;
            input.parentNode.appendChild(validation);
        }
        
        // Add visual feedback
        input.style.borderColor = isValid ? '#4caf50' : '#f44336';
    }
}

// Initialize mobile enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mobileEnhancements = new MobileEnhancements();
});
