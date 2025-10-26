/**
 * Business Planning Calculators - Clean and Lightweight
 * Preserves all calculator functionality from the original system
 * 
 * @fileoverview Core business calculator functions for nail art business planning
 * @author Nailed IT Development Team
 * @version 1.0.0
 */

/**
 * Generates a unique SKU code for nail art products
 * Combines product attributes into a standardized format
 * 
 * @function genSku
 * @description Creates SKU codes in format: NAIL-{SHAPE}-{LENGTH}-{FINISH}-{DESIGN}-{SIZEKIT}
 * @example genSku() // Generates SKU based on form inputs
 * @returns {void} Updates the skuOut element with generated SKU
 */
function genSku() {
    const s = (document.getElementById('shape')?.value || "").toUpperCase().replace(/\s+/g,'');
    const l = (document.getElementById('length')?.value || "").toUpperCase();
    const f = (document.getElementById('finish')?.value || "").toUpperCase().replace(/\s+/g,'-');
    const d = (document.getElementById('design')?.value || "").toUpperCase().replace(/\s+/g,'-');
    const k = (document.getElementById('sizekit')?.value || "").toUpperCase();
    const sku = `NAIL-${s}-${l}-${f}-${d}-${k}`;
    
    const skuOut = document.getElementById('skuOut');
    if (skuOut) {
        skuOut.textContent = sku;
        skuOut.classList.add('fade-in');
    }
}

/**
 * Updates pricing calculations in real-time
 * Calculates margins, ROAS, and displays visual progress bars
 * 
 * @function updatePricing
 * @description Real-time pricing calculator with visual feedback
 * @example updatePricing() // Updates pricing based on COGS and MSRP inputs
 * @returns {void} Updates pricing display elements and progress bars
 */
function updatePricing() {
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
}

// Breakeven ROAS Calculator
function calcROAS() {
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
    }
}

// Auto-save form data
function autoSave() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.id) {
            localStorage.setItem(`moth_${input.id}`, input.value);
        }
    });
}

// Load saved form data
function loadSavedData() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.id) {
            const saved = localStorage.getItem(`moth_${input.id}`);
            if (saved !== null) {
                input.value = saved;
            }
        }
    });
}

// Initialize calculators when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data
    loadSavedData();
    
    // Set up auto-save on input changes
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', autoSave);
        input.addEventListener('change', autoSave);
    });
    
    // Initialize pricing calculator if present
    if (document.getElementById('cogsRange')) {
        updatePricing();
    }
});
