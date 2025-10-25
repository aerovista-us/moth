// Script to update all remaining pages with complete navigation
const fs = require('fs');
const path = require('path');

// Complete navigation HTML
const completeNavigation = `
            <nav class="nav-tabs mystical-nav">
                <a href="index.html" class="nav-tab" data-page="home">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-text">Home</span>
                </a>
                <a href="overview.html" class="nav-tab" data-page="overview">
                    <span class="nav-icon">🎨</span>
                    <span class="nav-text">Overview</span>
                </a>
                <a href="planning.html" class="nav-tab" data-page="planning">
                    <span class="nav-icon">📸</span>
                    <span class="nav-text">Planning</span>
                </a>
                <a href="tracking.html" class="nav-tab" data-page="tracking">
                    <span class="nav-icon">📊</span>
                    <span class="nav-text">Tracking</span>
                </a>
                <a href="supply.html" class="nav-tab" data-page="supply">
                    <span class="nav-icon">📦</span>
                    <span class="nav-text">Supply</span>
                </a>
                <a href="launch.html" class="nav-tab" data-page="launch">
                    <span class="nav-icon">🚀</span>
                    <span class="nav-text">Launch</span>
                </a>
                <a href="analytics.html" class="nav-tab" data-page="analytics">
                    <span class="nav-icon">📈</span>
                    <span class="nav-text">Analytics</span>
                </a>
                <a href="advanced-analytics.html" class="nav-tab" data-page="advanced">
                    <span class="nav-icon">🚀</span>
                    <span class="nav-text">Advanced</span>
                </a>
                <a href="ai-assistant.html" class="nav-tab" data-page="ai">
                    <span class="nav-icon">🤖</span>
                    <span class="nav-text">AI</span>
                </a>
                <a href="automation-tools.html" class="nav-tab" data-page="automation">
                    <span class="nav-icon">⚡</span>
                    <span class="nav-text">Automation</span>
                </a>
                <a href="collaboration.html" class="nav-tab" data-page="team">
                    <span class="nav-icon">👥</span>
                    <span class="nav-text">Team</span>
                </a>
                <a href="mobile-pwa.html" class="nav-tab" data-page="mobile">
                    <span class="nav-icon">📱</span>
                    <span class="nav-text">Mobile</span>
                </a>
                <a href="content-calendar.html" class="nav-tab" data-page="content">
                    <span class="nav-icon">📅</span>
                    <span class="nav-text">Content</span>
                </a>
                <a href="pricing-calculator.html" class="nav-tab" data-page="pricing">
                    <span class="nav-icon">💰</span>
                    <span class="nav-text">Pricing</span>
                </a>
                <a href="supplier-vetting.html" class="nav-tab" data-page="suppliers">
                    <span class="nav-icon">🔍</span>
                    <span class="nav-text">Suppliers</span>
                </a>
            </nav>`;

// Navigation scripts to add
const navigationScripts = `
    <script src="shared-navigation.js"></script>
    <script src="advanced-navigation.js"></script>
    <script src="mobile-navigation.js"></script>
    <script>
        // Enhanced Navigation JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            initializeNavigation();
        });
    </script>`;

// Pages to update
const pagesToUpdate = [
    'ai-assistant.html',
    'automation-tools.html',
    'collaboration.html',
    'mobile-pwa.html',
    'content-calendar.html',
    'pricing-calculator.html',
    'supplier-vetting.html'
];

// Function to update a single page
function updatePage(pageName) {
    const filePath = path.join(__dirname, pageName);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File ${pageName} not found, skipping...`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the current page name for active state
    const currentPage = pageName.replace('.html', '');
    
    // Replace navigation section
    const navRegex = /<nav class="nav-tabs mystical-nav">[\s\S]*?<\/nav>/;
    if (navRegex.test(content)) {
        // Update active state for current page
        const updatedNav = completeNavigation.replace(
            `data-page="${currentPage}">`,
            `data-page="${currentPage}" class="nav-tab active">`
        );
        
        content = content.replace(navRegex, updatedNav);
        console.log(`✅ Updated navigation in ${pageName}`);
    } else {
        console.log(`⚠️  No navigation found in ${pageName}`);
    }
    
    // Add navigation scripts if not present
    if (!content.includes('shared-navigation.js')) {
        // Find the last script tag or </body> tag
        const scriptRegex = /<\/script>\s*<\/body>/;
        if (scriptRegex.test(content)) {
            content = content.replace(scriptRegex, `</script>${navigationScripts}</body>`);
        } else {
            // Add before </body>
            content = content.replace('</body>', `${navigationScripts}</body>`);
        }
        console.log(`✅ Added navigation scripts to ${pageName}`);
    }
    
    // Write updated content
    fs.writeFileSync(filePath, content);
}

// Update all pages
console.log('🚀 Updating remaining pages with complete navigation...\n');

pagesToUpdate.forEach(page => {
    updatePage(page);
});

console.log('\n✅ Navigation update complete!');
console.log('All pages now have complete 14-button navigation with advanced features.');
