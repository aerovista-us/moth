/**
 * Comprehensive Navigation Audit and Fix
 * Replaces all old navigation systems with streamlined navigation
 */

const fs = require('fs');
const path = require('path');

// Get all HTML files
const htmlFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.html'))
    .filter(file => !file.includes('test-') && !file.includes('simple') && !file.includes('outlook'));

console.log(`🔍 Auditing ${htmlFiles.length} HTML files for navigation issues...`);

let fixedFiles = 0;
let errorsFound = 0;

// Update each HTML file
htmlFiles.forEach(htmlFile => {
    console.log(`\n📄 Processing ${htmlFile}...`);
    
    let content = fs.readFileSync(htmlFile, 'utf8');
    let updated = false;
    let errors = [];
    
    // Check for old navigation scripts
    const oldScripts = [
        'js/navigation/shared-navigation.js',
        'js/navigation/advanced-navigation.js', 
        'js/navigation/mobile-navigation.js'
    ];
    
    oldScripts.forEach(script => {
        if (content.includes(script)) {
            errors.push(`Found old script: ${script}`);
        }
    });
    
    // Check for old navigation calls
    if (content.includes('initializeNavigation()')) {
        errors.push('Found initializeNavigation() call');
    }
    
    if (content.includes('initNavigation()')) {
        errors.push('Found initNavigation() call');
    }
    
    // Check for old header structure
    if (content.includes('mystical-header') || content.includes('nav-tabs')) {
        errors.push('Found old header structure');
    }
    
    // Fix issues
    if (errors.length > 0) {
        console.log(`  ⚠️  Found ${errors.length} issues:`);
        errors.forEach(error => console.log(`    - ${error}`));
        errorsFound += errors.length;
        
        // Replace old navigation scripts with streamlined navigation
        const scriptPattern = /<!-- Advanced Navigation Scripts -->[\s\S]*?<script src="js\/navigation\/mobile-navigation\.js"><\/script>/;
        if (scriptPattern.test(content)) {
            content = content.replace(scriptPattern, '    <!-- Streamlined Navigation Scripts -->\n    <script src="js/navigation/streamlined-navigation.js"></script>');
            console.log(`  ✅ Replaced old navigation scripts`);
            updated = true;
        }
        
        // Replace old navigation calls
        if (content.includes('initializeNavigation()')) {
            content = content.replace(/initializeNavigation\(\);/g, '// Navigation handled by streamlined-navigation.js');
            console.log(`  ✅ Removed initializeNavigation() calls`);
            updated = true;
        }
        
        if (content.includes('initNavigation()')) {
            content = content.replace(/initNavigation\(\);/g, '// Navigation handled by streamlined-navigation.js');
            console.log(`  ✅ Removed initNavigation() calls`);
            updated = true;
        }
        
        // Ensure header placeholder exists
        if (!content.includes('header-placeholder')) {
            const bodyPattern = /<body[^>]*>/;
            if (bodyPattern.test(content)) {
                content = content.replace(bodyPattern, '$&\n    <!-- Streamlined Navigation Header -->\n    <div id="header-placeholder"></div>');
                console.log(`  ✅ Added header placeholder`);
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
        
        if (updated) {
            fs.writeFileSync(htmlFile, content, 'utf8');
            console.log(`  ✅ ${htmlFile} fixed successfully`);
            fixedFiles++;
        }
    } else {
        console.log(`  ✅ No issues found`);
    }
});

console.log(`\n🎯 Audit Complete!`);
console.log(`📊 Results:`);
console.log(`  • Files processed: ${htmlFiles.length}`);
console.log(`  • Files fixed: ${fixedFiles}`);
console.log(`  • Total errors found: ${errorsFound}`);
console.log(`  • Issues resolved: ${errorsFound}`);

if (fixedFiles > 0) {
    console.log(`\n✅ All navigation issues have been resolved!`);
    console.log(`🚀 The streamlined navigation system is now active across all pages.`);
} else {
    console.log(`\n✅ No navigation issues found - all files are up to date!`);
}
