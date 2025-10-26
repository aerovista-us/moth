/**
 * Add favicon links to all HTML files
 */

const fs = require('fs');
const path = require('path');

// Get all HTML files
const htmlFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.html'))
    .filter(file => !file.includes('test-') && !file.includes('simple') && !file.includes('outlook'));

console.log(`🔍 Adding favicon links to ${htmlFiles.length} HTML files...`);

let updatedFiles = 0;

// Update each HTML file
htmlFiles.forEach(htmlFile => {
    console.log(`\n📄 Processing ${htmlFile}...`);
    
    let content = fs.readFileSync(htmlFile, 'utf8');
    let updated = false;
    
    // Check if favicon link already exists
    if (content.includes('favicon.svg') || content.includes('favicon.ico')) {
        console.log(`  ✅ Favicon already exists`);
        return;
    }
    
    // Add favicon link after title tag
    const titlePattern = /<title>.*?<\/title>/;
    if (titlePattern.test(content)) {
        content = content.replace(
            titlePattern,
            '$&\n    <link rel="icon" type="image/svg+xml" href="favicon.svg">'
        );
        console.log(`  ✅ Added favicon link`);
        updated = true;
    }
    
    if (updated) {
        fs.writeFileSync(htmlFile, content, 'utf8');
        console.log(`  ✅ ${htmlFile} updated successfully`);
        updatedFiles++;
    }
});

console.log(`\n🎯 Favicon update complete!`);
console.log(`📊 Results:`);
console.log(`  • Files processed: ${htmlFiles.length}`);
console.log(`  • Files updated: ${updatedFiles}`);

if (updatedFiles > 0) {
    console.log(`\n✅ Favicon links added to all HTML files!`);
    console.log(`🚀 The 404 favicon error should now be resolved.`);
} else {
    console.log(`\n✅ All files already have favicon links!`);
}
