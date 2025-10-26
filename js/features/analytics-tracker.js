// Analytics Tracker - Moth Wing Power Business Planning
class AnalyticsTracker {
    constructor() {
        this.events = [];
        this.metrics = {
            pageViews: 0,
            sectionViews: {},
            formInteractions: 0,
            calculatorUsage: 0,
            documentViews: 0,
            dataSaves: 0,
            errors: 0,
            sessionDuration: 0,
            userActions: []
        };
        this.sessionStart = Date.now();
        this.init();
    }
    
    init() {
        this.setupEventTracking();
        this.setupMetricsCollection();
        this.setupUserBehaviorTracking();
        this.setupBusinessMetricsTracking();
        this.setupPerformanceTracking();
    }
    
    setupEventTracking() {
        // Track page views
        this.trackEvent('page_view', {
            page: window.location.pathname,
            timestamp: Date.now()
        });
        
        // Track section navigation
        const originalShowSection = window.showSection;
        window.showSection = (sectionId) => {
            this.trackEvent('section_view', {
                section: sectionId,
                timestamp: Date.now()
            });
            originalShowSection(sectionId);
        };
        
        // Track form interactions
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, select, textarea')) {
                this.trackEvent('form_interaction', {
                    field: e.target.id || e.target.name,
                    value: e.target.value,
                    type: e.target.type,
                    timestamp: Date.now()
                });
            }
        });
        
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn, .mystical-btn')) {
                this.trackEvent('button_click', {
                    button: e.target.textContent.trim(),
                    id: e.target.id,
                    class: e.target.className,
                    timestamp: Date.now()
                });
            }
        });
    }
    
    setupMetricsCollection() {
        // Track data operations
        if (window.dataManager) {
            const originalSaveData = window.dataManager.saveData;
            window.dataManager.saveData = () => {
                this.trackEvent('data_save', {
                    timestamp: Date.now(),
                    dataSize: JSON.stringify(window.dataManager.data).length
                });
                originalSaveData.call(window.dataManager);
            };
            
            const originalExportData = window.dataManager.exportData;
            window.dataManager.exportData = (format) => {
                this.trackEvent('data_export', {
                    format: format,
                    timestamp: Date.now()
                });
                originalExportData.call(window.dataManager, format);
            };
        }
        
        // Track document operations
        if (window.documentIntegration) {
            const originalPreviewDocument = window.documentIntegration.previewDocument;
            window.documentIntegration.previewDocument = async (documentKey) => {
                this.trackEvent('document_view', {
                    document: documentKey,
                    timestamp: Date.now()
                });
                return originalPreviewDocument.call(window.documentIntegration, documentKey);
            };
        }
        
        // Track calculator usage
        if (window.enhancedCalculators) {
            const originalUpdatePricingCalculator = window.enhancedCalculators.updatePricingCalculator;
            window.enhancedCalculators.updatePricingCalculator = () => {
                this.trackEvent('calculator_usage', {
                    calculator: 'pricing',
                    timestamp: Date.now()
                });
                return originalUpdatePricingCalculator.call(window.enhancedCalculators);
            };
        }
    }
    
    setupUserBehaviorTracking() {
        // Track scroll depth
        let maxScrollDepth = 0;
        window.addEventListener('scroll', () => {
            const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                this.trackEvent('scroll_depth', {
                    depth: scrollDepth,
                    timestamp: Date.now()
                });
            }
        });
        
        // Track time on page
        setInterval(() => {
            this.trackEvent('time_on_page', {
                duration: Date.now() - this.sessionStart,
                timestamp: Date.now()
            });
        }, 30000); // Every 30 seconds
        
        // Track mouse movements (heatmap data)
        let mouseMovements = [];
        document.addEventListener('mousemove', (e) => {
            mouseMovements.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            });
            
            // Limit to last 100 movements
            if (mouseMovements.length > 100) {
                mouseMovements = mouseMovements.slice(-100);
            }
        });
        
        // Send heatmap data periodically
        setInterval(() => {
            if (mouseMovements.length > 0) {
                this.trackEvent('mouse_movements', {
                    movements: mouseMovements,
                    timestamp: Date.now()
                });
                mouseMovements = [];
            }
        }, 60000); // Every minute
    }
    
    setupBusinessMetricsTracking() {
        // Track business-specific metrics
        this.trackBusinessMetrics();
        
        // Track progress changes
        this.trackProgressChanges();
        
        // Track pricing changes
        this.trackPricingChanges();
    }
    
    trackBusinessMetrics() {
        setInterval(() => {
            if (window.dataManager) {
                const businessData = window.dataManager.getBusinessSummary();
                this.trackEvent('business_metrics', {
                    metrics: businessData,
                    timestamp: Date.now()
                });
            }
        }, 60000); // Every minute
    }
    
    trackProgressChanges() {
        // Track progress bar changes
        const progressBars = document.querySelectorAll('.mystical-progress-fill');
        progressBars.forEach(bar => {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        this.trackEvent('progress_change', {
                            element: bar.id,
                            value: bar.style.width,
                            timestamp: Date.now()
                        });
                    }
                });
            });
            observer.observe(bar, { attributes: true });
        });
    }
    
    trackPricingChanges() {
        // Track pricing calculator changes
        const pricingInputs = document.querySelectorAll('#cogsRange, #msrpRange, #cogs, #msrp, #fees');
        pricingInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.trackEvent('pricing_change', {
                    field: input.id,
                    value: input.value,
                    timestamp: Date.now()
                });
            });
        });
    }
    
    setupPerformanceTracking() {
        // Track page load performance
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            this.trackEvent('page_performance', {
                loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime,
                firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime,
                timestamp: Date.now()
            });
        });
        
        // Track memory usage
        setInterval(() => {
            if (performance.memory) {
                this.trackEvent('memory_usage', {
                    usedJSHeapSize: performance.memory.usedJSHeapSize,
                    totalJSHeapSize: performance.memory.totalJSHeapSize,
                    jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
                    timestamp: Date.now()
                });
            }
        }, 30000); // Every 30 seconds
    }
    
    trackEvent(eventType, eventData) {
        const event = {
            type: eventType,
            data: eventData,
            timestamp: Date.now(),
            sessionId: this.getSessionId(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.events.push(event);
        
        // Update metrics
        this.updateMetrics(eventType);
        
        // Send to analytics service
        this.sendToAnalytics(event);
        
        // Store locally
        this.storeEvent(event);
    }
    
    updateMetrics(eventType) {
        this.metrics.pageViews++;
        
        switch (eventType) {
            case 'section_view':
                const section = this.events[this.events.length - 1].data.section;
                this.metrics.sectionViews[section] = (this.metrics.sectionViews[section] || 0) + 1;
                break;
            case 'form_interaction':
                this.metrics.formInteractions++;
                break;
            case 'calculator_usage':
                this.metrics.calculatorUsage++;
                break;
            case 'document_view':
                this.metrics.documentViews++;
                break;
            case 'data_save':
                this.metrics.dataSaves++;
                break;
            case 'error':
                this.metrics.errors++;
                break;
        }
        
        this.metrics.sessionDuration = Date.now() - this.sessionStart;
    }
    
    sendToAnalytics(event) {
        // Send to Google Analytics 4 if available
        if (typeof gtag !== 'undefined') {
            gtag('event', event.type, {
                event_category: 'business_planning',
                event_label: event.data.section || event.data.field || event.data.button,
                value: event.data.value || 1,
                custom_parameters: {
                    session_id: event.sessionId,
                    user_agent: event.userAgent,
                    url: event.url
                }
            });
        }
        
        // Send to Google Analytics 4 via Measurement Protocol
        this.sendToGA4(event);
        
        // Send to custom analytics endpoint
        this.sendToCustomAnalytics(event);
    }
    
    sendToGA4(event) {
        // Google Analytics 4 Measurement Protocol
        const measurementId = 'G-XXXXXXXXXX'; // Replace with actual GA4 measurement ID
        const apiSecret = 'your-api-secret'; // Replace with actual API secret
        
        const payload = {
            client_id: this.getClientId(),
            events: [{
                name: event.type,
                params: {
                    event_category: 'business_planning',
                    event_label: event.data.section || event.data.field || event.data.button,
                    value: event.data.value || 1,
                    session_id: event.sessionId,
                    timestamp_micros: event.timestamp * 1000
                }
            }]
        };
        
        // Send to GA4 Measurement Protocol
        fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(error => {
            console.warn('Failed to send to GA4:', error);
        });
    }
    
    getClientId() {
        let clientId = localStorage.getItem('ga_client_id');
        if (!clientId) {
            clientId = 'client_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('ga_client_id', clientId);
        }
        return clientId;
    }
    
    sendToCustomAnalytics(event) {
        // Simulate sending to analytics service
        console.log('Analytics Event:', event);
        
        // In a real implementation, you would send to your analytics service
        // fetch('/api/analytics', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(event)
        // });
    }
    
    storeEvent(event) {
        try {
            const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
            storedEvents.push(event);
            
            // Keep only last 1000 events
            if (storedEvents.length > 1000) {
                storedEvents.splice(0, storedEvents.length - 1000);
            }
            
            localStorage.setItem('analytics_events', JSON.stringify(storedEvents));
        } catch (error) {
            console.error('Failed to store analytics event:', error);
        }
    }
    
    getSessionId() {
        let sessionId = sessionStorage.getItem('analytics_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('analytics_session_id', sessionId);
        }
        return sessionId;
    }
    
    // Public methods for external use
    getMetrics() {
        return {
            ...this.metrics,
            events: this.events.length,
            sessionId: this.getSessionId()
        };
    }
    
    getEvents(eventType = null) {
        if (eventType) {
            return this.events.filter(event => event.type === eventType);
        }
        return this.events;
    }
    
    exportAnalytics() {
        const analyticsData = {
            metrics: this.metrics,
            events: this.events,
            sessionId: this.getSessionId(),
            exportDate: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        const blob = new Blob([JSON.stringify(analyticsData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'analytics-data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    clearAnalytics() {
        this.events = [];
        this.metrics = {
            pageViews: 0,
            sectionViews: {},
            formInteractions: 0,
            calculatorUsage: 0,
            documentViews: 0,
            dataSaves: 0,
            errors: 0,
            sessionDuration: 0,
            userActions: []
        };
        localStorage.removeItem('analytics_events');
        sessionStorage.removeItem('analytics_session_id');
    }
    
    getHeatmapData() {
        const mouseEvents = this.events.filter(event => event.type === 'mouse_movements');
        return mouseEvents.map(event => event.data.movements).flat();
    }
    
    getPopularSections() {
        return Object.entries(this.metrics.sectionViews)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
    }
    
    getUsageStats() {
        return {
            totalEvents: this.events.length,
            sessionDuration: Math.round(this.metrics.sessionDuration / 1000 / 60), // minutes
            formInteractions: this.metrics.formInteractions,
            calculatorUsage: this.metrics.calculatorUsage,
            documentViews: this.metrics.documentViews,
            dataSaves: this.metrics.dataSaves,
            errors: this.metrics.errors
        };
    }
}

// Initialize analytics tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.analyticsTracker = new AnalyticsTracker();
    
    // Add analytics dashboard to analytics section
    addAnalyticsDashboard();
});

function addAnalyticsDashboard() {
    const analyticsSection = document.getElementById('analytics');
    if (analyticsSection) {
        const analyticsDiv = document.createElement('div');
        analyticsDiv.className = 'card mystical-card floating-card';
        analyticsDiv.innerHTML = `
            <h3>📊 Analytics Dashboard</h3>
            <div class="analytics-metrics">
                <div class="metric-item">
                    <h4>Session Duration</h4>
                    <div class="metric-value" id="sessionDuration">0 min</div>
                </div>
                <div class="metric-item">
                    <h4>Form Interactions</h4>
                    <div class="metric-value" id="formInteractions">0</div>
                </div>
                <div class="metric-item">
                    <h4>Calculator Usage</h4>
                    <div class="metric-value" id="calculatorUsage">0</div>
                </div>
                <div class="metric-item">
                    <h4>Document Views</h4>
                    <div class="metric-value" id="documentViews">0</div>
                </div>
            </div>
            <div class="analytics-controls">
                <button class="btn mystical-btn" onclick="updateAnalyticsDashboard()">Refresh</button>
                <button class="btn mystical-btn" onclick="window.analyticsTracker.exportAnalytics()">Export Data</button>
                <button class="btn mystical-btn" onclick="showAnalyticsDetails()">View Details</button>
            </div>
            <div id="analyticsDetails" class="analytics-details"></div>
        `;
        
        analyticsSection.appendChild(analyticsDiv);
        
        // Update dashboard every 30 seconds
        setInterval(updateAnalyticsDashboard, 30000);
    }
}

function updateAnalyticsDashboard() {
    if (window.analyticsTracker) {
        const metrics = window.analyticsTracker.getMetrics();
        const usageStats = window.analyticsTracker.getUsageStats();
        
        document.getElementById('sessionDuration').textContent = usageStats.sessionDuration + ' min';
        document.getElementById('formInteractions').textContent = usageStats.formInteractions;
        document.getElementById('calculatorUsage').textContent = usageStats.calculatorUsage;
        document.getElementById('documentViews').textContent = usageStats.documentViews;
    }
}

function showAnalyticsDetails() {
    if (window.analyticsTracker) {
        const details = document.getElementById('analyticsDetails');
        const metrics = window.analyticsTracker.getMetrics();
        const popularSections = window.analyticsTracker.getPopularSections();
        
        details.innerHTML = `
            <h4>Detailed Analytics</h4>
            <div class="analytics-detail-grid">
                <div class="detail-section">
                    <h5>Popular Sections</h5>
                    <ul>
                        ${popularSections.map(([section, views]) => 
                            `<li>${section}: ${views} views</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="detail-section">
                    <h5>Session Info</h5>
                    <p>Session ID: ${metrics.sessionId}</p>
                    <p>Total Events: ${metrics.events}</p>
                    <p>Data Saves: ${metrics.dataSaves}</p>
                    <p>Errors: ${metrics.errors}</p>
                </div>
            </div>
        `;
    }
}

// Add CSS for analytics dashboard
const analyticsStyle = document.createElement('style');
analyticsStyle.textContent = `
    .analytics-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .metric-item {
        text-align: center;
        padding: 1rem;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 8px;
    }
    
    .metric-item h4 {
        font-size: 0.9rem;
        color: var(--text-light);
        margin-bottom: 0.5rem;
    }
    
    .metric-value {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--moth-primary);
    }
    
    .analytics-controls {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
    }
    
    .analytics-details {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 8px;
    }
    
    .analytics-detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .detail-section {
        padding: 1rem;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 4px;
    }
    
    .detail-section h5 {
        color: var(--moth-primary);
        margin-bottom: 0.5rem;
    }
    
    .detail-section ul {
        list-style: none;
        padding: 0;
    }
    
    .detail-section li {
        padding: 0.25rem 0;
        border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }
`;
document.head.appendChild(analyticsStyle);
