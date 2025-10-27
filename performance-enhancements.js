/**
 * Performance Enhancement Script
 * Optimizes CSS, JavaScript, and HTML for better performance
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Implementing Performance Enhancements...\n');

// 1. Create minified CSS bundle
console.log('📦 Creating minified CSS bundle...');
const cssFiles = ['mystical-styles.css'];
let minifiedCSS = '';

cssFiles.forEach(cssFile => {
    if (fs.existsSync(cssFile)) {
        let cssContent = fs.readFileSync(cssFile, 'utf8');
        
        // Basic CSS minification
        cssContent = cssContent
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/;\s*}/g, '}') // Remove semicolons before closing braces
            .replace(/{\s*/g, '{') // Remove spaces after opening braces
            .replace(/;\s*/g, ';') // Remove spaces after semicolons
            .replace(/,\s*/g, ',') // Remove spaces after commas
            .trim();
        
        minifiedCSS += cssContent;
        console.log(`  ✅ Minified ${cssFile}`);
    }
});

fs.writeFileSync('mystical-styles.min.css', minifiedCSS);
console.log('  ✅ Created mystical-styles.min.css\n');

// 2. Create minified JavaScript bundle
console.log('📦 Creating minified JavaScript bundle...');
const jsFiles = [
    'js/navigation/streamlined-navigation.js',
    'js/features/calculators.js',
    'js/core/data-manager.js'
];

let minifiedJS = '';
let bundleInfo = {
    files: [],
    totalSize: 0
};

jsFiles.forEach(jsFile => {
    if (fs.existsSync(jsFile)) {
        let jsContent = fs.readFileSync(jsFile, 'utf8');
        const originalSize = jsContent.length;
        
        // Basic JavaScript minification
        jsContent = jsContent
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
            .replace(/\/\/.*$/gm, '') // Remove line comments
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/;\s*}/g, '}') // Remove semicolons before closing braces
            .replace(/{\s*/g, '{') // Remove spaces after opening braces
            .replace(/;\s*/g, ';') // Remove spaces after semicolons
            .trim();
        
        minifiedJS += jsContent + '\n';
        bundleInfo.files.push(jsFile);
        bundleInfo.totalSize += originalSize;
        console.log(`  ✅ Minified ${jsFile} (${originalSize} → ${jsContent.length} bytes)`);
    }
});

fs.writeFileSync('js/bundle.min.js', minifiedJS);
console.log(`  ✅ Created js/bundle.min.js (${bundleInfo.totalSize} → ${minifiedJS.length} bytes)\n`);

// 3. Add performance optimizations to HTML files
console.log('⚡ Adding performance optimizations to HTML files...');

const htmlFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.html'))
    .filter(file => !file.includes('test-') && !file.includes('simple') && !file.includes('outlook'));

let optimizedFiles = 0;

htmlFiles.forEach(htmlFile => {
    console.log(`  📄 Optimizing ${htmlFile}...`);
    
    let content = fs.readFileSync(htmlFile, 'utf8');
    let updated = false;
    
    // Add preload hints for critical resources
    if (!content.includes('preload')) {
        const headPattern = /<head[^>]*>/;
        if (headPattern.test(content)) {
            const preloadHints = `
    <!-- Performance Optimizations -->
    <link rel="preload" href="mystical-styles.min.css" as="style">
    <link rel="preload" href="js/bundle.min.js" as="script">
    <link rel="preload" href="favicon.svg" as="image">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">`;
            
            content = content.replace(headPattern, '$&' + preloadHints);
            console.log(`    ✅ Added preload hints`);
            updated = true;
        }
    }
    
    // Replace CSS reference with minified version
    if (content.includes('mystical-styles.css') && !content.includes('mystical-styles.min.css')) {
        content = content.replace('mystical-styles.css', 'mystical-styles.min.css');
        console.log(`    ✅ Updated to minified CSS`);
        updated = true;
    }
    
    // Add lazy loading for images
    content = content.replace(/<img([^>]*)>/g, '<img$1 loading="lazy">');
    
    // Add async/defer to scripts
    content = content.replace(/<script src="([^"]*\.js)"><\/script>/g, '<script src="$1" defer></script>');
    
    // Add performance meta tags
    if (!content.includes('theme-color')) {
        const metaPattern = /<meta name="viewport"[^>]*>/;
        if (metaPattern.test(content)) {
            const performanceMeta = `
    <meta name="theme-color" content="#6b46c1">
    <meta name="color-scheme" content="dark light">
    <meta name="format-detection" content="telephone=no">`;
            
            content = content.replace(metaPattern, '$&' + performanceMeta);
            console.log(`    ✅ Added performance meta tags`);
            updated = true;
        }
    }
    
    if (updated) {
        fs.writeFileSync(htmlFile, content, 'utf8');
        console.log(`    ✅ ${htmlFile} optimized successfully`);
        optimizedFiles++;
    } else {
        console.log(`    ✅ No optimizations needed`);
    }
});

console.log(`\n🎯 Performance Enhancement Complete!`);
console.log(`📊 Results:`);
console.log(`  • CSS minified: mystical-styles.min.css`);
console.log(`  • JS bundled: js/bundle.min.js`);
console.log(`  • HTML files optimized: ${optimizedFiles}/${htmlFiles.length}`);
console.log(`  • Preload hints added`);
console.log(`  • Lazy loading implemented`);
console.log(`  • Performance meta tags added`);

console.log(`\n✅ Performance enhancements implemented!`);
console.log(`🚀 Site should now load faster with optimized assets.`);
