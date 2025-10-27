/**
 * Add Streamlined Navigation to All Pages
 * Ensures consistent navigation across the entire site
 */

const fs = require('fs');
const path = require('path');

// Get all HTML files that need navigation
const htmlFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.html'))
    .filter(file => !file.includes('test-') && !file.includes('simple') && !file.includes('outlook') && !file.includes('shared-header'));

console.log(`🔍 Adding streamlined navigation to ${htmlFiles.length} HTML files...`);

let updatedFiles = 0;
let skippedFiles = 0;

// Pages that already have the script
const pagesWithScript = ['index.html', 'analytics.html', 'overview.html', 'supply.html'];

htmlFiles.forEach(htmlFile => {
    console.log(`\n📄 Processing ${htmlFile}...`);
    
    let content = fs.readFileSync(htmlFile, 'utf8');
    let updated = false;
    
    // Skip if already has streamlined navigation script
    if (pagesWithScript.includes(htmlFile)) {
        console.log(`  ✅ Already has streamlined navigation script`);
        skippedFiles++;
        return;
    }
    
    // Check if file has header placeholder
    if (!content.includes('header-placeholder')) {
        console.log(`  ⚠️  No header placeholder found - adding one`);
        
        // Add header placeholder after opening body tag
        const bodyPattern = /<body[^>]*>/;
        if (bodyPattern.test(content)) {
            content = content.replace(bodyPattern, '$&\n    <!-- Streamlined Navigation Header -->\n    <div id="header-placeholder"></div>');
            console.log(`  ✅ Added header placeholder`);
            updated = true;
        }
    }
    
    // Check if file has streamlined navigation script
    if (!content.includes('streamlined-navigation.js')) {
        console.log(`  ⚠️  Missing streamlined navigation script - adding one`);
        
        // Add script before closing body tag
        const bodyClosePattern = /<\/body>/;
        if (bodyClosePattern.test(content)) {
            content = content.replace(bodyClosePattern, '    <!-- Streamlined Navigation Scripts -->\n    <script src="js/navigation/streamlined-navigation.js"></script>\n</body>');
            console.log(`  ✅ Added streamlined navigation script`);
            updated = true;
        }
    }
    
    // Update title if needed
    if (!content.includes('Moth Emporium Presents')) {
        content = content.replace(
            /<title>.*?<\/title>/,
            '<title>🦋 Moth Emporium Presents, Nailed IT Business Planning Suite</title>'
        );
        console.log(`  ✅ Updated title`);
        updated = true;
    }
    
    // Add favicon if missing
    if (!content.includes('favicon.svg')) {
        const titlePattern = /<title>.*?<\/title>/;
        if (titlePattern.test(content)) {
            content = content.replace(
                titlePattern,
                '$&\n    <link rel="icon" type="image/svg+xml" href="favicon.svg">'
            );
            console.log(`  ✅ Added favicon link`);
            updated = true;
        }
    }
    
    if (updated) {
        fs.writeFileSync(htmlFile, content, 'utf8');
        console.log(`  ✅ ${htmlFile} updated successfully`);
        updatedFiles++;
    } else {
        console.log(`  ✅ No changes needed`);
    }
});

console.log(`\n🎯 Streamlined Navigation Update Complete!`);
console.log(`📊 Results:`);
console.log(`  • Files processed: ${htmlFiles.length}`);
console.log(`  • Files updated: ${updatedFiles}`);
console.log(`  • Files skipped (already have script): ${skippedFiles}`);

if (updatedFiles > 0) {
    console.log(`\n✅ Streamlined navigation added to all pages!`);
    console.log(`🚀 All pages now have consistent navigation.`);
} else {
    console.log(`\n✅ All pages already have streamlined navigation!`);
}
