// Script to download placeholder images for products
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Create directory if it doesn't exist
const dir = path.join(__dirname);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// List of products to download placeholders for
const products = [
  { name: 'smart-door-lock', color: '2ECC71' },
  { name: 'digital-safe', color: '3498DB' },
  { name: 'smart-camera', color: '9B59B6' },
  { name: 'video-doorbell', color: 'F1C40F' },
  { name: 'product-placeholder', color: '1ABC9C' },
  // Categories
  { name: 'hardware', color: '2C3E50' },
  { name: 'furniture-fittings', color: 'E74C3C' },
  { name: 'kitchen-accessories', color: '3498DB' },
  { name: 'kitchen-appliances', color: '9B59B6' },
  { name: 'adhesive-glue', color: 'F1C40F' },
  { name: 'tools', color: '1ABC9C' },
  // Generic category placeholders
  { name: 'electronics-placeholder', color: '2ECC71' },
  { name: 'security-placeholder', color: '3498DB' },
  { name: 'home-placeholder', color: '9B59B6' },
];

// Download each image
products.forEach(product => {
  const fileName = `${product.name}.jpg`;
  const filePath = path.join(dir, fileName);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`File ${fileName} already exists, skipping...`);
    return;
  }
  
  const url = `https://placehold.co/800x800/${product.color}/FFFFFF?text=${product.name.replace(/-/g, '+')}`;
  console.log(`Downloading ${url} to ${filePath}...`);
  
  const protocol = url.startsWith('https') ? https : http;
  
  protocol.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download ${url}: ${response.statusCode}`);
      return;
    }
    
    const file = fs.createWriteStream(filePath);
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${fileName}`);
    });
    
    file.on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      console.error(`Error writing ${fileName}:`, err.message);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${url}:`, err.message);
  });
});

console.log('Download script started. Check console for progress...');
