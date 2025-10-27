/**
 * Fix Navigation and Readability Issues
 * Ensures all pages have working navigation and readable text
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Navigation and Readability Issues...\n');

// 1. Fix missing navigation on specific pages
console.log('📄 Checking pages for missing navigation...');

const pagesToCheck = [
    'overview.html',
    'supply.html', 
    'launch.html',
    'analytics.html'
];

let fixedPages = 0;

pagesToCheck.forEach(pageFile => {
    if (fs.existsSync(pageFile)) {
        console.log(`\n🔍 Checking ${pageFile}...`);
        
        let content = fs.readFileSync(pageFile, 'utf8');
        let updated = false;
        
        // Check if streamlined navigation script is present
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
        
        // Check if header placeholder exists
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
        
        if (updated) {
            fs.writeFileSync(pageFile, content, 'utf8');
            console.log(`  ✅ ${pageFile} updated successfully`);
            fixedPages++;
        } else {
            console.log(`  ✅ No changes needed`);
        }
    }
});

// 2. Fix readability issues with CSS
console.log('\n🎨 Fixing readability issues...');

// Read the current CSS file
let cssContent = '';
if (fs.existsSync('mystical-styles.css')) {
    cssContent = fs.readFileSync('mystical-styles.css', 'utf8');
} else if (fs.existsSync('mystical-styles.min.css')) {
    cssContent = fs.readFileSync('mystical-styles.min.css', 'utf8');
}

// Add readability fixes
const readabilityFixes = `

/* ===== READABILITY FIXES ===== */
/* Fix black text on purple backgrounds for better readability */

/* Main content headings */
main h1, main h2, main h3 {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, rgba(107, 70, 193, 0.8), rgba(45, 27, 105, 0.8));
    padding: 1rem 1.5rem;
    border-radius: 12px;
    margin: 1rem 0;
    border: 2px solid rgba(107, 70, 193, 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Main content paragraphs */
main p {
    color: #f3e8ff !important;
    background: rgba(26, 26, 26, 0.7);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    margin: 0.5rem 0;
    border-left: 4px solid #6b46c1;
    backdrop-filter: blur(10px);
}

/* Section headings with better contrast */
.section-title, .section-icon {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Card backgrounds for better readability */
.mystical-section, .nail-art-accent {
    background: rgba(26, 26, 26, 0.8) !important;
    border: 2px solid rgba(107, 70, 193, 0.3);
    border-radius: 16px;
    padding: 2rem;
    margin: 1rem 0;
    backdrop-filter: blur(15px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* List items with better contrast */
main li {
    color: #f3e8ff !important;
    background: rgba(45, 27, 105, 0.4);
    padding: 0.5rem 1rem;
    margin: 0.25rem 0;
    border-radius: 6px;
    border-left: 3px solid #6b46c1;
}

/* Strong text with better visibility */
main strong {
    color: #ffffff !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Code blocks with better contrast */
main code {
    background: rgba(0, 0, 0, 0.6) !important;
    color: #f3e8ff !important;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #6b46c1;
}

/* Ensure all text is readable */
main * {
    color: inherit;
}

/* Override any problematic text colors */
main h1, main h2, main h3, main h4, main h5, main h6 {
    color: #ffffff !important;
}

main p, main div, main span {
    color: #f3e8ff !important;
}

/* Special styling for collaboration page */
.collaboration-section {
    background: rgba(26, 26, 26, 0.9) !important;
    border: 2px solid rgba(107, 70, 193, 0.4);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem 0;
}

/* Team member cards */
.team-member {
    background: rgba(45, 27, 105, 0.6) !important;
    border: 1px solid rgba(107, 70, 193, 0.3);
    border-radius: 8px;
    padding: 1rem;
    margin: 0.5rem 0;
}

/* Project board cards */
.project-card {
    background: rgba(26, 26, 26, 0.8) !important;
    border: 1px solid rgba(107, 70, 193, 0.3);
    border-radius: 8px;
    padding: 1rem;
    margin: 0.5rem 0;
}

/* Chat messages */
.chat-message {
    background: rgba(45, 27, 105, 0.5) !important;
    border-left: 3px solid #6b46c1;
    padding: 0.75rem 1rem;
    margin: 0.5rem 0;
    border-radius: 6px;
}

/* File sharing items */
.file-item {
    background: rgba(26, 26, 26, 0.7) !important;
    border: 1px solid rgba(107, 70, 193, 0.3);
    border-radius: 8px;
    padding: 1rem;
    margin: 0.5rem 0;
}
`;

// Append the fixes to the CSS
cssContent += readabilityFixes;

// Write back to both regular and minified CSS
fs.writeFileSync('mystical-styles.css', cssContent, 'utf8');
console.log('  ✅ Added readability fixes to mystical-styles.css');

// Also update the minified version
const minifiedCSS = cssContent
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/;\s*}/g, '}') // Remove semicolons before closing braces
    .replace(/{\s*/g, '{') // Remove spaces after opening braces
    .replace(/;\s*/g, ';') // Remove spaces after semicolons
    .replace(/,\s*/g, ',') // Remove spaces after commas
    .trim();

fs.writeFileSync('mystical-styles.min.css', minifiedCSS);
console.log('  ✅ Updated mystical-styles.min.css');

console.log(`\n🎯 Navigation and Readability Fix Complete!`);
console.log(`📊 Results:`);
console.log(`  • Pages checked: ${pagesToCheck.length}`);
console.log(`  • Pages fixed: ${fixedPages}`);
console.log(`  • Readability improvements: Added to CSS`);
console.log(`  • Card backgrounds: Enhanced for better contrast`);
console.log(`  • Text colors: Improved for readability`);

console.log(`\n✅ All navigation and readability issues fixed!`);
console.log(`🚀 Pages should now have working navigation and readable text.`);
