// Simple Calculators - Clean and Lightweight
document.addEventListener('DOMContentLoaded', function() {
    // Pricing Calculator
    const costPerUnit = document.getElementById('costPerUnit');
    const marginSlider = document.getElementById('marginSlider');
    const marginValue = document.getElementById('marginValue');
    const sellingPrice = document.getElementById('sellingPrice');
    
    if (costPerUnit && marginSlider && marginValue && sellingPrice) {
        function updatePricing() {
            const cost = parseFloat(costPerUnit.value) || 0;
            const margin = parseFloat(marginSlider.value) || 0;
            const price = cost / (1 - margin / 100);
            sellingPrice.value = '$' + price.toFixed(2);
            marginValue.textContent = margin + '%';
        }
        
        costPerUnit.addEventListener('input', updatePricing);
        marginSlider.addEventListener('input', updatePricing);
        updatePricing();
    }
    
    // SKU Generator
    const style = document.getElementById('style');
    const length = document.getElementById('length');
    const finish = document.getElementById('finish');
    const design = document.getElementById('design');
    const kit = document.getElementById('kit');
    const skuOutput = document.getElementById('skuOutput');
    
    if (style && length && finish && design && kit && skuOutput) {
        function generateSKU() {
            const s = style.value;
            const l = length.value;
            const f = finish.value;
            const d = design.value;
            const k = kit.value;
            const sku = `NAIL-${s}-${l}-${f}-${d}-${k}`;
            skuOutput.value = sku;
        }
        
        [style, length, finish, design, kit].forEach(select => {
            select.addEventListener('change', generateSKU);
        });
        generateSKU();
    }
    
    // ROAS Calculator
    const roasSlider = document.getElementById('roasSlider');
    const roasValue = document.getElementById('roasValue');
    
    if (roasSlider && roasValue) {
        roasSlider.addEventListener('input', function() {
            roasValue.textContent = this.value + 'x';
        });
    }
    
    // Risk Score Display
    const riskScore = document.getElementById('riskScore');
    const riskValue = document.getElementById('riskValue');
    
    if (riskScore && riskValue) {
        riskScore.addEventListener('input', function() {
            riskValue.textContent = this.value;
        });
    }
});
