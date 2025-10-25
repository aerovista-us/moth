// Interactive Features - Moth Wing Power
class InteractiveFeatures {
    constructor() {
        this.currentSection = 'overview';
        this.animations = null;
        this.particleSystem = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initializeFeatures();
    }
    
    bindEvents() {
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('mystical-tab')) {
                e.preventDefault();
                const sectionId = e.target.getAttribute('href').substring(1);
                this.showSection(sectionId);
            }
        });
        
        // Form interactions
        document.addEventListener('input', (e) => {
            if (e.target && e.target.classList && (e.target.classList.contains('mystical-input') || 
                e.target.classList.contains('mystical-range') ||
                e.target.classList.contains('mystical-checkbox'))) {
                this.handleFormInteraction(e.target);
            }
        });
        
        // Button interactions
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('mystical-btn')) {
                this.handleButtonClick(e.target);
            }
        });
        
        // Card hover effects
        document.addEventListener('mouseenter', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('mystical-card')) {
                this.handleCardHover(e.target, true);
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('mystical-card')) {
                this.handleCardHover(e.target, false);
            }
        }, true);
    }
    
    initializeFeatures() {
        // Initialize animations reference
        this.animations = window.mysticalAnimations;
        this.particleSystem = window.mysticalParticleSystem;
        
        // Set up initial state
        this.updateProgress();
        this.updatePricing();
        
        // Add mystical effects to specific elements
        this.addMysticalEffects();
    }
    
    showSection(sectionId) {
        // Hide ALL sections first (including overview)
        const sections = document.querySelectorAll('.mystical-section, .section');
        sections.forEach(section => {
            section.classList.add('hidden');
        });

        // Remove active class from all tabs
        const tabs = document.querySelectorAll('.mystical-tab, .nav-tab');
        tabs.forEach(tab => {
            if (tab && tab.classList) {
                tab.classList.remove('active');
            }
        });

        // Show ONLY the selected section with animation
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('fade-in-effect');
            
            // Add mystical entrance effect
            if (this.animations) {
                this.animations.createShimmerEffect(targetSection);
            }
            
            // Update section header dynamically
            this.updateSectionHeader(sectionId);
        }

        // Add active class to clicked tab
        const activeTab = document.querySelector(`[href="#${sectionId}"]`);
        if (activeTab && activeTab.classList) {
            activeTab.classList.add('active');
            
            // Add button press effect
            if (this.animations) {
                this.animations.createBounceEffect(activeTab);
            }
        }
        
        this.currentSection = sectionId;
        
        // Update progress when switching sections
        setTimeout(() => {
            this.updateProgress();
        }, 300);
    }
    
    // Section data for dynamic content
    getSectionData() {
        return {
            'overview': {
                icon: '1',
                title: 'Product Overview',
                description: 'Brand system, collection architecture, and design concepts for Moth Wing Power'
            },
            'planning': {
                icon: '2', 
                title: 'Content Planning & Marketing Strategy',
                description: 'Launch cadence, content requirements, and marketing channels for Moth Wing Power'
            },
            'tracking': {
                icon: '3',
                title: 'Progress Tracking & Pricing Model', 
                description: 'Interactive pricing calculator, SKU generator, and materials sourcing'
            },
            'supply': {
                icon: '4',
                title: 'Supply Chain & Dropshipping',
                description: 'Hybrid supply chain operations, supplier vetting, and compliance standards'
            },
            'launch': {
                icon: '5',
                title: 'Launch Timeline & Risk Management',
                description: '12-week launch strategy, operations checklist, and risk mitigation'
            },
            'analytics': {
                icon: '6',
                title: 'Analytics & KPIs',
                description: 'Key performance indicators, ROAS calculator, and customer support SOP'
            }
        };
    }
    
    // Update section header with dynamic content
    updateSectionHeader(sectionId) {
        const sectionData = this.getSectionData();
        const sectionInfo = sectionData[sectionId];
        if (!sectionInfo) return;
        
        // Update the section icon and title
        const sectionIcon = document.querySelector(`#${sectionId} .mystical-icon`);
        const sectionTitle = document.querySelector(`#${sectionId} .section-title`);
        
        if (sectionIcon) {
            sectionIcon.textContent = sectionInfo.icon;
            // Add mystical effect to icon change
            if (this.animations) {
                this.animations.createTwinkleEffect(sectionIcon, 2000);
            }
        }
        
        if (sectionTitle) {
            sectionTitle.textContent = sectionInfo.title;
            // Add mystical effect to title change
            if (this.animations) {
                this.animations.createShimmerEffect(sectionTitle);
            }
        }
        
        // Update page title for better UX
        document.title = `${sectionInfo.title} - Nailed IT | Moth Empire`;
        
        // Create powder explosion effect on section change
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const rect = targetSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + 100; // Near the header
            this.createPowderExplosion(centerX, centerY);
        }
    }
    
    handleFormInteraction(element) {
        // Add mystical glow effect
        if (this.animations) {
            this.animations.createGlowEffect(element, 1000);
        }
        
        // Update calculations if it's a pricing input
        if (element.id === 'cogsRange' || element.id === 'msrpRange') {
            this.updatePricing();
        }
        
        // Update progress
        this.updateProgress();
    }
    
    handleButtonClick(button) {
        // Add button press animation
        button.classList.add('button-press-effect');
        setTimeout(() => {
            button.classList.remove('button-press-effect');
        }, 200);
        
        // Add mystical effects
        if (this.animations) {
            this.animations.createShimmerEffect(button);
        }
        
        // Create powder explosion on button click
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        this.createPowderExplosion(centerX, centerY);
        
        // Add powder shimmer effect
        button.classList.add('powder-shimmer');
        setTimeout(() => {
            button.classList.remove('powder-shimmer');
        }, 3000);
        
        // Handle specific button actions
        if (button.onclick) {
            button.onclick();
        }
    }
    
    handleCardHover(card, isEntering) {
        if (isEntering) {
            card.classList.add('mystical-hover-glow');
            
            // Add floating effect
            if (this.animations) {
                this.animations.createPulseEffect(card, 2000);
            }
            
            // Create sparkle effect
            this.createCardSparkles(card);
        } else {
            card.classList.remove('mystical-hover-glow');
        }
    }
    
    createCardSparkles(card) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create multiple sparkles
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createSparkle(centerX, centerY);
            }, i * 200);
        }
        
        // Create powder explosion on card hover
        this.createPowderExplosion(centerX, centerY);
        
        // Create dust trail effect
        this.createDustTrail(centerX - 50, centerY - 50, centerX + 50, centerY + 50);
    }
    
    createPowderExplosion(x, y) {
        if (window.mysticalParticleSystem) {
            window.mysticalParticleSystem.createPowderExplosion(x, y);
        }
    }
    
    createDustTrail(startX, startY, endX, endY) {
        if (window.mysticalParticleSystem) {
            window.mysticalParticleSystem.createMysticalDustTrail(startX, startY, endX, endY);
        }
    }
    
    createPowderCloud(x, y) {
        if (window.mysticalParticleSystem) {
            window.mysticalParticleSystem.createPowderCloud(x, y);
        }
    }
    
    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'particle sparkle-particle';
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
            animation: sparkleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
    
    addMysticalEffects() {
        // Add twinkle effect to section icons
        const icons = document.querySelectorAll('.mystical-icon');
        icons.forEach((icon, index) => {
            setTimeout(() => {
                if (this.animations) {
                    this.animations.createTwinkleEffect(icon, 2000);
                }
            }, index * 500);
        });
        
        // Add wave effect to metric cards
        const metrics = document.querySelectorAll('.mystical-metric');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                if (this.animations) {
                    this.animations.createWaveEffect(metric, 3000);
                }
            }, index * 300);
        });
        
        // Add powder effects to cards
        const cards = document.querySelectorAll('.mystical-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('powder-float');
                // Create initial powder cloud
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                this.createPowderCloud(centerX, centerY);
            }, index * 200);
        });
        
        // Add dust effects to form elements
        const inputs = document.querySelectorAll('.mystical-input, .mystical-range');
        inputs.forEach((input, index) => {
            input.addEventListener('focus', () => {
                const rect = input.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                this.createPowderExplosion(centerX, centerY);
                input.classList.add('dust-entrance');
            });
            
            input.addEventListener('blur', () => {
                input.classList.remove('dust-entrance');
            });
        });
    }
    
    updatePricing() {
        const cogs = document.getElementById('cogsRange')?.value || 8;
        const msrp = document.getElementById('msrpRange')?.value || 39;
        
        const cogsValue = document.getElementById('cogsValue');
        const msrpValue = document.getElementById('msrpValue');
        const marginValue = document.getElementById('marginValue');
        const marginBar = document.getElementById('marginBar');
        const roasValue = document.getElementById('roasValue');
        const roasBar = document.getElementById('roasBar');
        
        if (cogsValue) cogsValue.textContent = '$' + cogs;
        if (msrpValue) msrpValue.textContent = '$' + msrp;
        
        const margin = ((msrp - cogs) / msrp * 100).toFixed(0);
        if (marginValue) marginValue.textContent = margin + '%';
        if (marginBar) {
            marginBar.style.width = margin + '%';
            marginBar.classList.add('progress-animation');
        }
        
        // Calculate ROAS
        const fees = 6;
        const roas = (msrp / (msrp - cogs - fees)).toFixed(2);
        if (roasValue) roasValue.textContent = roas + 'x';
        if (roasBar) {
            roasBar.style.width = Math.min((roas / 5) * 100, 100) + '%';
            roasBar.classList.add('progress-animation');
        }
        
        // Add mystical effect to updated elements
        if (this.animations) {
            if (marginBar) this.animations.createGlowEffect(marginBar, 2000);
            if (roasBar) this.animations.createGlowEffect(roasBar, 2000);
        }
    }
    
    calcROAS() {
        const c = parseFloat(document.getElementById('cogs')?.value || 0);
        const m = parseFloat(document.getElementById('msrp')?.value || 0);
        const f = parseFloat(document.getElementById('fees')?.value || 0);
        const denom = (m - c - f);
        
        const roasOut = document.getElementById('roasOut');
        if (!roasOut) return;
        
        if (denom <= 0 || m <= 0) {
            roasOut.textContent = "Check inputs — margin is non‑positive.";
            roasOut.style.color = '#f44336';
        } else {
            const be = (m / denom);
            roasOut.textContent = "Breakeven ROAS: " + be.toFixed(2) + "x";
            roasOut.style.color = '#4caf50';
            
            // Add success effect
            if (this.animations) {
                this.animations.createPulseEffect(roasOut, 2000);
            }
        }
    }
    
    genSku() {
        const s = (document.getElementById('shape')?.value || "").toUpperCase().replace(/\s+/g,'');
        const l = (document.getElementById('length')?.value || "").toUpperCase();
        const f = (document.getElementById('finish')?.value || "").toUpperCase().replace(/\s+/g,'-');
        const d = (document.getElementById('design')?.value || "").toUpperCase().replace(/\s+/g,'-');
        const k = (document.getElementById('sizekit')?.value || "").toUpperCase();
        const sku = `NAIL-${s}-${l}-${f}-${d}-${k}`;
        
        const skuOut = document.getElementById('skuOut');
        if (skuOut) {
            skuOut.textContent = sku;
            
            // Add mystical effect
            if (this.animations) {
                this.animations.createShimmerEffect(skuOut);
            }
        }
    }
    
    updateProgress() {
        const checkboxes = document.querySelectorAll('.mystical-checkbox, input[type="checkbox"]');
        const checked = document.querySelectorAll('.mystical-checkbox:checked, input[type="checkbox"]:checked');
        const progress = checkboxes.length > 0 ? (checked.length / checkboxes.length * 100).toFixed(0) : 0;
        
        const designProgress = document.getElementById('designProgress');
        const contentProgress = document.getElementById('contentProgress');
        const launchProgress = document.getElementById('launchProgress');
        
        if (designProgress) {
            designProgress.textContent = progress + '%';
            this.animateProgressBar(designProgress, progress);
        }
        
        if (contentProgress) {
            const contentProg = (progress * 0.8).toFixed(0);
            contentProgress.textContent = contentProg + '%';
            this.animateProgressBar(contentProgress, contentProg);
        }
        
        if (launchProgress) {
            const launchProg = (progress * 0.6).toFixed(0);
            launchProgress.textContent = launchProg + '%';
            this.animateProgressBar(launchProgress, launchProg);
        }
    }
    
    animateProgressBar(element, progress) {
        // Add mystical effect to progress bars
        if (this.animations) {
            this.animations.createGlowEffect(element, 1500);
        }
        
        // Add pulse effect when progress changes
        element.classList.add('pulse-effect');
        setTimeout(() => {
            element.classList.remove('pulse-effect');
        }, 1000);
    }
    
    // Public methods for external use
    addMysticalEffect(element, effectType) {
        if (this.animations) {
            switch (effectType) {
                case 'shimmer':
                    this.animations.createShimmerEffect(element);
                    break;
                case 'glow':
                    this.animations.createGlowEffect(element);
                    break;
                case 'pulse':
                    this.animations.createPulseEffect(element);
                    break;
                case 'bounce':
                    this.animations.createBounceEffect(element);
                    break;
                case 'shake':
                    this.animations.createShakeEffect(element);
                    break;
                case 'morph':
                    this.animations.createMorphEffect(element);
                    break;
                case 'wave':
                    this.animations.createWaveEffect(element);
                    break;
                case 'twinkle':
                    this.animations.createTwinkleEffect(element);
                    break;
            }
        }
    }
    
    createMysticalTransition(fromElement, toElement) {
        // Create a mystical transition between elements
        if (this.animations) {
            this.animations.createShimmerEffect(fromElement);
            setTimeout(() => {
                this.animations.createGlowEffect(toElement);
            }, 500);
        }
    }
}

// Initialize interactive features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.interactiveFeatures = new InteractiveFeatures();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveFeatures;
}
