const fs = require('fs');
const path = require('path');

// Store paths
const htmlPath = path.join(__dirname, '..', 'src', 'index.html');
const codePath = path.join(__dirname, '..', 'src', 'main.ts');
const outPath = path.join(__dirname, '..', 'build', 'main.ts');

// Read files to package
const code = fs.readFileSync(codePath, 'utf8');
const html = fs.readFileSync(htmlPath, 'utf8');

const rendered = code.replace(/const webpage = null;/, `const webpage = \`${html.replace(/`/g, '\\`')}\`;`);

// Create output directory if it doesn't exist
const outDir = path.dirname(outPath);
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Write packaged code to output file
fs.writeFileSync(outPath, rendered, 'utf8');