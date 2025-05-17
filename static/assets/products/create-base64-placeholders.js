// Script to create base64-encoded placeholder images
const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const dir = path.join(__dirname);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Function to create a simple colored square with text as a base64 data URL
function createBase64Image(text, color) {
  // Create a simple SVG image
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#${color}" />
      <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>
  `;
  
  // Convert SVG to base64
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// List of products to create placeholders for
const products = [
  { name: 'Smart Door Lock', filename: 'smart-door-lock', color: '2ECC71' },
  { name: 'Digital Safe', filename: 'digital-safe', color: '3498DB' },
  { name: 'Smart Camera', filename: 'smart-camera', color: '9B59B6' },
  { name: 'Video Doorbell', filename: 'video-doorbell', color: 'F1C40F' },
  { name: 'Product Placeholder', filename: 'product-placeholder', color: '1ABC9C' },
  // Categories
  { name: 'Hardware', filename: 'hardware', color: '2C3E50' },
  { name: 'Furniture Fittings', filename: 'furniture-fittings', color: 'E74C3C' },
  { name: 'Kitchen Accessories', filename: 'kitchen-accessories', color: '3498DB' },
  { name: 'Kitchen Appliances', filename: 'kitchen-appliances', color: '9B59B6' },
  { name: 'Adhesive Glue', filename: 'adhesive-glue', color: 'F1C40F' },
  { name: 'Tools', filename: 'tools', color: '1ABC9C' },
];

// Create a JavaScript file with base64 encoded images
const jsContent = `// Auto-generated placeholder images
export const placeholderImages = {
${products.map(product => `  "${product.filename}": "${createBase64Image(product.name, product.color)}",`).join('\n')}
};
`;

// Write the JavaScript file
fs.writeFileSync(path.join(dir, 'placeholders.js'), jsContent);
console.log('Created placeholders.js with base64 encoded images');

// Also create individual placeholder files for testing
products.forEach(product => {
  const base64 = createBase64Image(product.name, product.color);
  
  // Convert base64 to binary data
  const base64Data = base64.replace(/^data:image\/svg\+xml;base64,/, '');
  const binaryData = Buffer.from(base64Data, 'base64');
  
  // Write to file
  fs.writeFileSync(path.join(dir, `${product.filename}.svg`), binaryData);
  console.log(`Created ${product.filename}.svg`);
});

console.log('All placeholder images created successfully!');
