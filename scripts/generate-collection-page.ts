/**
 * Collection Page Generator Script
 * 
 * This script generates a new collection page based on a menu mapping.
 * To use:
 * 1. Add your new menu mapping to config/menu-mappings.ts
 * 2. Run this script with your mapping title
 *    Example: `npm run generate-collection "Summer Collection"`
 */

import fs from 'fs';
import path from 'path';
import { menuMappings } from '../config/menu-mappings';
import { generateCollectionPageTemplate } from '../utils/collection-page-generator';

// Get the mapping title from command line arguments
const args = process.argv.slice(2);
const mappingTitle = args[0];

if (!mappingTitle) {
  console.error('❌ Error: Please provide a menu mapping title.');
  console.log('Usage: npm run generate-collection "Menu Title"');
  process.exit(1);
}

// Find the mapping with the given title
const mapping = menuMappings.find(m => m.title === mappingTitle);

if (!mapping) {
  console.error(`❌ Error: No menu mapping found with title "${mappingTitle}".`);
  console.log('Available mappings:');
  menuMappings.forEach(m => console.log(`- ${m.title}`));
  process.exit(1);
}

// Generate the collection page template
const template = generateCollectionPageTemplate(mapping);
const dirPath = path.join(process.cwd(), 'app', template.path);

// Check if the directory already exists
if (fs.existsSync(dirPath)) {
  console.warn(`⚠️ Warning: Directory already exists at ${dirPath}`);
  const overwrite = args[1] === '--force';
  
  if (!overwrite) {
    console.error('❌ Aborting to prevent overwriting existing files.');
    console.log('Use --force flag to overwrite existing files.');
    process.exit(1);
  }
}

// Create the directory if it doesn't exist
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`✅ Created directory: ${dirPath}`);
}

// Create the files
template.files.forEach(file => {
  const filePath = path.join(dirPath, file.name);
  fs.writeFileSync(filePath, file.content);
  console.log(`✅ Created file: ${filePath}`);
});

console.log('\n✨ Collection page generated successfully!');
console.log(`📁 Page location: ${dirPath}`);
console.log(`🔗 Page URL: ${mapping.path}`);
console.log('\nRemember to:');
console.log('1. Add the corresponding collection in your Shopify admin');
console.log('2. Make sure the menu item in Shopify links to the correct page');
console.log('3. Restart your Next.js server if it was running');
