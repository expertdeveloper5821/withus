/**
 * Demo Script for Collection Page Generator
 * 
 * This file demonstrates how to use the collection page generator programmatically.
 * It creates a sample "Winter Collection" page using our generator.
 * 
 * To run this demo:
 * 1. Add "Winter Collection" to your menu-mappings.ts file
 * 2. Run: npm run ts-node scripts/demo-generate-collection.ts
 */

import fs from 'fs';
import path from 'path';
import { MenuMapping } from '../types/menu-mappings';
import { generateCollectionPageTemplate } from '../utils/collection-page-generator';

// Sample menu mapping for demonstration
const winterCollectionMapping: MenuMapping = {
  title: 'Winter Collection',
  path: '/winter-collection',
  description: 'Cozy products for the winter season'
};

console.log('🔍 Generating Winter Collection page using the collection generator...');

// Generate the collection page template
const template = generateCollectionPageTemplate(winterCollectionMapping);
const dirPath = path.join(process.cwd(), 'app', template.path);

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

console.log('\n✨ Winter Collection page generated successfully for demonstration!');

// Provide instruction for the next step
console.log('\n🔍 To complete the integration, add this mapping to config/menu-mappings.ts:');
console.log(`
  {
    title: 'Winter Collection',
    path: '/winter-collection',
    description: 'Cozy products for the winter season'
  },
`);

console.log('\n📚 For more details on the collection page generator, see docs/collection-pages.md');
