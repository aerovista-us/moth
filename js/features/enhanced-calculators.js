// Enhanced Calculators - Moth Wing Power Business Planning
class EnhancedCalculators {
    constructor() {
        this.dataManager = window.dataManager;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initializeCalculators();
    }
    
    bindEvents() {
        // Pricing calculator events
        document.addEventListener('input', (e) => {
            if (e.target.matches('#cogsRange, #msrpRange, #cogs, #msrp, #fees')) {
                this.updatePricingCalculator();
            }
        });
        
        // SKU generator events
        document.addEventListener('input', (e) => {
            if (e.target.matches('#shape, #length, #finish, #design, #sizekit')) {
                this.updateSKUGenerator();
            }
        });
    }
    
    initializeCalculators() {
        this.setupPricingCalculator();
        this.setupSKUGenerator();
        this.setupROASCalculator();
        this.setupBusinessMetrics();
    }
    
    setupPricingCalculator() {
        // Enhanced pricing with more variables
        const calculator = document.querySelector('.card:has(h3:contains("Interactive Pricing Calculator"))');
        if (calculator) {
            const enhancedHTML = `
                <div class="enhanced-pricing-calculator">
                    <div class="form-group mystical-form-group">
                        <label for="baseCOGS">Base COGS ($):</label>
                        <input type="range" id="baseCOGS" min="5" max="20" value="8" class="mystical-range">
                        <span id="baseCOGSValue">$8</span>
                    </div>
                    
                    <div class="form-group mystical-form-group">
                        <label for="packagingCost">Packaging & Labels ($):</label>
                        <input type="range" id="packagingCost" min="0.5" max="3" value="1.5" step="0.1" class="mystical-range">
                        <span id="packagingCostValue">$1.50</span>
                    </div>
                    
                    <div class="form-group mystical-form-group">
                        <label for="platformFee">Platform Fee (%):</label>
                        <input type="range" id="platformFee" min="5" max="15" value="8" class="mystical-range">
                        <span id="platformFeeValue">8%</span>
                    </div>
                    
                    <div class="form-group mystical-form-group">
                        <label for="targetMSRP">Target MSRP ($):</label>
                        <input type="range" id="targetMSRP" min="20" max="100" value="39" class="mystical-range">
                        <span id="targetMSRPValue">$39</span>
                    </div>
                    
                    <div class="pricing-results">
                        <div class="result-card">
                            <h4>Unit Economics</h4>
                            <p>Total COGS: $<span id="totalCOGS">9.50</span></p>
                            <p>Platform Fee: $<span id="platformFeeAmount">3.12</span></p>
                            <p>Net Revenue: $<span id="netRevenue">26.38</span></p>
                            <p>Gross Margin: <span id="grossMargin">67.6%</span></p>
                        </div>
                        
                        <div class="result-card">
                            <h4>Breakeven Analysis</h4>
                            <p>Breakeven ROAS: <span id="breakevenROAS">1.48x</span></p>
                            <p>Profit per Unit: $<span id="profitPerUnit">26.38</span></p>
                            <p>Units to Break Even: <span id="unitsToBreakEven">190</span></p>
                        </div>
                    </div>
                </div>
            `;
            
            // Replace the existing calculator content
            const existingCalculator = calculator.querySelector('.form-group');
            if (existingCalculator) {
                existingCalculator.outerHTML = enhancedHTML;
            }
        }
    }
    
    updatePricingCalculator() {
        const baseCOGS = parseFloat(document.getElementById('baseCOGS')?.value || 8);
        const packagingCost = parseFloat(document.getElementById('packagingCost')?.value || 1.5);
        const platformFeePercent = parseFloat(document.getElementById('platformFee')?.value || 8);
        const targetMSRP = parseFloat(document.getElementById('targetMSRP')?.value || 39);
        
        // Update display values
        document.getElementById('baseCOGSValue').textContent = '$' + baseCOGS.toFixed(2);
        document.getElementById('packagingCostValue').textContent = '$' + packagingCost.toFixed(2);
        document.getElementById('platformFeeValue').textContent = platformFeePercent + '%';
        document.getElementById('targetMSRPValue').textContent = '$' + targetMSRP.toFixed(2);
        
        // Calculate results
        const totalCOGS = baseCOGS + packagingCost;
        const platformFeeAmount = (targetMSRP * platformFeePercent) / 100;
        const netRevenue = targetMSRP - totalCOGS - platformFeeAmount;
        const grossMargin = ((netRevenue / targetMSRP) * 100).toFixed(1);
        const breakevenROAS = (targetMSRP / netRevenue).toFixed(2);
        const profitPerUnit = netRevenue.toFixed(2);
        const unitsToBreakEven = Math.ceil(1000 / netRevenue); // Assuming $1000 break-even target
        
        // Update result displays
        document.getElementById('totalCOGS').textContent = totalCOGS.toFixed(2);
        document.getElementById('platformFeeAmount').textContent = platformFeeAmount.toFixed(2);
        document.getElementById('netRevenue').textContent = netRevenue.toFixed(2);
        document.getElementById('grossMargin').textContent = grossMargin + '%';
        document.getElementById('breakevenROAS').textContent = breakevenROAS + 'x';
        document.getElementById('profitPerUnit').textContent = profitPerUnit;
        document.getElementById('unitsToBreakEven').textContent = unitsToBreakEven;
        
        // Add mystical effects
        this.addMysticalEffects();
    }
    
    setupSKUGenerator() {
        // Enhanced SKU generator with validation
        const generator = document.querySelector('.card:has(h3:contains("Quick SKU Generator"))');
        if (generator) {
            const enhancedHTML = `
                <div class="enhanced-sku-generator">
                    <div class="sku-inputs">
                        <div class="form-group mystical-form-group">
                            <label for="shape">Shape:</label>
                            <select id="shape" class="mystical-input">
                                <option value="ALMOND">Almond</option>
                                <option value="STILETTO">Stiletto</option>
                                <option value="COFFIN">Coffin</option>
                                <option value="OVAL">Oval</option>
                                <option value="SQUARE">Square</option>
                            </select>
                        </div>
                        
                        <div class="form-group mystical-form-group">
                            <label for="length">Length:</label>
                            <select id="length" class="mystical-input">
                                <option value="S">Short</option>
                                <option value="M" selected>Medium</option>
                                <option value="L">Long</option>
                                <option value="XL">Extra Long</option>
                            </select>
                        </div>
                        
                        <div class="form-group mystical-form-group">
                            <label for="finish">Finish:</label>
                            <select id="finish" class="mystical-input">
                                <option value="GLOSS">Gloss</option>
                                <option value="MATTE">Matte</option>
                                <option value="CHROME">Chrome</option>
                                <option value="HOLO">Holo</option>
                                <option value="CAT-EYE">Cat-Eye</option>
                            </select>
                        </div>
                        
                        <div class="form-group mystical-form-group">
                            <label for="design">Design:</label>
                            <input id="design" placeholder="MILKY" value="MILKY" class="mystical-input" />
                        </div>
                        
                        <div class="form-group mystical-form-group">
                            <label for="sizekit">Size Kit:</label>
                            <select id="sizekit" class="mystical-input">
                                <option value="S10">10 Sizes</option>
                                <option value="S12" selected>12 Sizes</option>
                                <option value="S14">14 Sizes</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="sku-output">
                        <h4>Generated SKU:</h4>
                        <div class="sku-display" id="skuDisplay">NAIL-ALMOND-M-GLOSS-MILKY-S12</div>
                        <button class="btn mystical-btn" onclick="copySKU()">Copy SKU</button>
                    </div>
                    
                    <div class="sku-validation">
                        <div id="skuValidation" class="validation-message"></div>
                    </div>
                </div>
            `;
            
            // Replace existing SKU generator
            const existingGenerator = generator.querySelector('.grid');
            if (existingGenerator) {
                existingGenerator.outerHTML = enhancedHTML;
            }
        }
    }
    
    updateSKUGenerator() {
        const shape = document.getElementById('shape')?.value || 'ALMOND';
        const length = document.getElementById('length')?.value || 'M';
        const finish = document.getElementById('finish')?.value || 'GLOSS';
        const design = document.getElementById('design')?.value || 'MILKY';
        const sizekit = document.getElementById('sizekit')?.value || 'S12';
        
        const sku = `NAIL-${shape}-${length}-${finish}-${design}-${sizekit}`;
        
        const skuDisplay = document.getElementById('skuDisplay');
        if (skuDisplay) {
            skuDisplay.textContent = sku;
            this.validateSKU(sku);
        }
    }
    
    validateSKU(sku) {
        const validation = document.getElementById('skuValidation');
        if (!validation) return;
        
        const issues = [];
        
        // Check for required components
        if (!sku.includes('NAIL-')) issues.push('Missing NAIL prefix');
        if (sku.split('-').length < 6) issues.push('Incomplete SKU format');
        
        // Check for valid design names
        const design = sku.split('-')[4];
        if (design.length < 3) issues.push('Design name too short');
        
        if (issues.length === 0) {
            validation.innerHTML = '<span style="color: #4caf50;">✓ SKU is valid</span>';
        } else {
            validation.innerHTML = '<span style="color: #f44336;">⚠ ' + issues.join(', ') + '</span>';
        }
    }
    
    setupROASCalculator() {
        // Enhanced ROAS calculator with more metrics
        const calculator = document.querySelector('.card:has(h3:contains("Breakeven ROAS Calculator"))');
        if (calculator) {
            const enhancedHTML = `
                <div class="enhanced-roas-calculator">
                    <div class="input-section">
                        <div class="form-group mystical-form-group">
                            <label for="cogs">COGS ($):</label>
                            <input type="number" id="cogs" value="10" min="1" max="50" class="mystical-input" />
                        </div>
                        
                        <div class="form-group mystical-form-group">
                            <label for="msrp">MSRP ($):</label>
                            <input type="number" id="msrp" value="39" min="10" max="200" class="mystical-input" />
                        </div>
                        
                        <div class="form-group mystical-form-group">
                            <label for="fees">Shipping & Fees ($):</label>
                            <input type="number" id="fees" value="6" min="0" max="50" class="mystical-input" />
                        </div>
                        
                        <div class="form-group mystical-form-group">
                            <label for="adSpend">Daily Ad Spend ($):</label>
                            <input type="number" id="adSpend" value="20" min="0" max="1000" class="mystical-input" />
                        </div>
                    </div>
                    
                    <div class="results-section">
                        <div class="result-grid">
                            <div class="result-item">
                                <h4>Breakeven ROAS</h4>
                                <div class="result-value" id="breakevenROASResult">2.5x</div>
                            </div>
                            
                            <div class="result-item">
                                <h4>Daily Orders Needed</h4>
                                <div class="result-value" id="dailyOrdersNeeded">1</div>
                            </div>
                            
                            <div class="result-item">
                                <h4>Monthly Revenue Target</h4>
                                <div class="result-value" id="monthlyRevenue">$1,170</div>
                            </div>
                            
                            <div class="result-item">
                                <h4>Profit Margin</h4>
                                <div class="result-value" id="profitMargin">59.5%</div>
                            </div>
                        </div>
                        
                        <button class="btn mystical-btn" onclick="calculateEnhancedROAS()">Calculate</button>
                        <div id="roasOut" class="mystical-output"></div>
                    </div>
                </div>
            `;
            
            // Replace existing calculator
            const existingCalculator = calculator.querySelector('.form-group');
            if (existingCalculator) {
                existingCalculator.outerHTML = enhancedHTML;
            }
        }
    }
    
    calculateEnhancedROAS() {
        const c = parseFloat(document.getElementById('cogs')?.value || 0);
        const m = parseFloat(document.getElementById('msrp')?.value || 0);
        const f = parseFloat(document.getElementById('fees')?.value || 0);
        const adSpend = parseFloat(document.getElementById('adSpend')?.value || 0);
        
        const denom = (m - c - f);
        const roasOut = document.getElementById('roasOut');
        
        if (denom <= 0 || m <= 0) {
            roasOut.textContent = "Check inputs — margin is non‑positive.";
            roasOut.style.color = '#f44336';
            return;
        }
        
        const breakevenROAS = (m / denom).toFixed(2);
        const dailyOrdersNeeded = Math.ceil(adSpend / (m - c - f));
        const monthlyRevenue = (m * dailyOrdersNeeded * 30).toLocaleString();
        const profitMargin = ((denom / m) * 100).toFixed(1);
        
        // Update results
        document.getElementById('breakevenROASResult').textContent = breakevenROAS + 'x';
        document.getElementById('dailyOrdersNeeded').textContent = dailyOrdersNeeded;
        document.getElementById('monthlyRevenue').textContent = '$' + monthlyRevenue;
        document.getElementById('profitMargin').textContent = profitMargin + '%';
        
        roasOut.textContent = "Breakeven ROAS: " + breakevenROAS + "x";
        roasOut.style.color = '#4caf50';
        
        // Add mystical effects
        this.addMysticalEffects();
    }
    
    setupBusinessMetrics() {
        // Add business metrics dashboard
        const analyticsSection = document.getElementById('analytics');
        if (analyticsSection) {
            const metricsHTML = `
                <div class="card mystical-card floating-card">
                    <h3>📊 Business Metrics Dashboard</h3>
                    <div class="metrics-dashboard">
                        <div class="metric-item">
                            <h4>Revenue Projections</h4>
                            <div class="metric-value" id="projectedRevenue">$0</div>
                            <div class="metric-label">Monthly Target</div>
                        </div>
                        
                        <div class="metric-item">
                            <h4>Customer Acquisition</h4>
                            <div class="metric-value" id="customerAcquisition">0</div>
                            <div class="metric-label">New Customers/Month</div>
                        </div>
                        
                        <div class="metric-item">
                            <h4>Average Order Value</h4>
                            <div class="metric-value" id="averageOrderValue">$0</div>
                            <div class="metric-label">AOV</div>
                        </div>
                        
                        <div class="metric-item">
                            <h4>Conversion Rate</h4>
                            <div class="metric-value" id="conversionRate">0%</div>
                            <div class="metric-label">Website Conversion</div>
                        </div>
                    </div>
                    
                    <div class="metrics-controls">
                        <button class="btn mystical-btn" onclick="updateBusinessMetrics()">Update Metrics</button>
                        <button class="btn mystical-btn" onclick="generateBusinessReport()">Generate Report</button>
                    </div>
                </div>
            `;
            
            analyticsSection.insertAdjacentHTML('beforeend', metricsHTML);
        }
    }
    
    addMysticalEffects() {
        // Add mystical effects to updated elements
        const elements = document.querySelectorAll('.result-value, .metric-value');
        elements.forEach(element => {
            element.classList.add('mystical-glow');
            setTimeout(() => {
                element.classList.remove('mystical-glow');
            }, 2000);
        });
    }
}

// Global functions for HTML onclick handlers
function copySKU() {
    const skuDisplay = document.getElementById('skuDisplay');
    if (skuDisplay) {
        navigator.clipboard.writeText(skuDisplay.textContent).then(() => {
            // Show success message
            const indicator = document.createElement('div');
            indicator.textContent = 'SKU copied to clipboard!';
            indicator.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 10px 20px;
                background: #4caf50;
                color: white;
                border-radius: 4px;
                z-index: 10000;
            `;
            document.body.appendChild(indicator);
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 2000);
        });
    }
}

function calculateEnhancedROAS() {
    if (window.enhancedCalculators) {
        window.enhancedCalculators.calculateEnhancedROAS();
    }
}

function updateBusinessMetrics() {
    // Update business metrics based on current data
    const msrp = parseFloat(document.getElementById('msrp')?.value || 39);
    const targetOrders = 100; // From business data
    const projectedRevenue = msrp * targetOrders;
    
    document.getElementById('projectedRevenue').textContent = '$' + projectedRevenue.toLocaleString();
    document.getElementById('customerAcquisition').textContent = targetOrders;
    document.getElementById('averageOrderValue').textContent = '$' + msrp;
    document.getElementById('conversionRate').textContent = '2.5%';
}

function generateBusinessReport() {
    if (window.dataManager) {
        window.dataManager.exportData('json');
    }
}

// Initialize enhanced calculators when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedCalculators = new EnhancedCalculators();
});

// Add CSS for enhanced calculators
const calculatorStyle = document.createElement('style');
calculatorStyle.textContent = `
    .enhanced-pricing-calculator,
    .enhanced-sku-generator,
    .enhanced-roas-calculator {
        display: grid;
        gap: 1rem;
    }
    
    .pricing-results {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .result-card {
        background: rgba(212, 175, 55, 0.1);
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid var(--moth-gold);
    }
    
    .result-card h4 {
        color: var(--moth-primary);
        margin-bottom: 0.5rem;
    }
    
    .sku-output {
        background: rgba(212, 175, 55, 0.1);
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
    }
    
    .sku-display {
        font-family: monospace;
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--moth-primary);
        background: rgba(0,0,0,0.1);
        padding: 0.5rem;
        border-radius: 4px;
        margin: 0.5rem 0;
    }
    
    .validation-message {
        margin-top: 0.5rem;
        font-size: 0.9rem;
    }
    
    .result-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .result-item {
        text-align: center;
        padding: 1rem;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 8px;
    }
    
    .result-item h4 {
        font-size: 0.9rem;
        color: var(--text-light);
        margin-bottom: 0.5rem;
    }
    
    .result-value {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--moth-primary);
    }
    
    .metrics-dashboard {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
        font-size: 2rem;
        font-weight: bold;
        color: var(--moth-primary);
        margin-bottom: 0.5rem;
    }
    
    .metric-label {
        font-size: 0.8rem;
        color: var(--text-light);
    }
    
    .mystical-glow {
        animation: mysticalGlow 2s ease-in-out;
    }
    
    @keyframes mysticalGlow {
        0%, 100% { box-shadow: 0 0 5px var(--moth-gold); }
        50% { box-shadow: 0 0 20px var(--moth-gold), 0 0 30px var(--moth-gold); }
    }
    
    .metrics-controls {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1rem;
    }
`;
document.head.appendChild(calculatorStyle);
