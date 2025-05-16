# Dynamic Menu Mapping and Collection Pages

This implementation connects Shopify menu items to static pages in the Next.js application, allowing you to create dedicated collection pages that integrate seamlessly with your Shopify navigation.

## Features

- **Dynamic Menu Mapping**: Automatically link Shopify menu items to Next.js routes
- **Centralized Configuration**: All menu mappings are defined in one place
- **Collection Page Generator**: Easily create new collection pages with a single command
- **Consistent UI**: Shared components for headers, loaders, and error states
- **SEO Optimized**: OpenGraph metadata for all collection pages

## Implementation Details

### Core Components

1. **Menu Mapping Configuration** (`config/menu-mappings.ts`)
   - Central registry of all menu-to-route mappings
   - Supports additional metadata like descriptions and icons

2. **Dynamic Link Resolver** (`components/layout/navbar/index.tsx`)
   - Intercepts Shopify menu data
   - Applies mappings to route menu items to static pages

3. **Collection Page Templates**
   - Shared components for consistent UI across all collection pages
   - Reusable loading, error, and layout components

4. **Collection Page Generator** (`utils/collection-page-generator.ts`)
   - Script to generate new collection pages from templates
   - Ensures consistency across all collection pages

### Available Collection Pages

The following collection pages are already implemented:

1. **Best-Selling Items** (`/best-selling`)
   - Shows products from the "best-sellers" Shopify collection
   - Displays products ordered by popularity

2. **5-Star Rated Products** (`/five-star-rated`)
   - Shows highest-rated products with 5-star reviews
   - Uses the "five-star-rated" Shopify collection

3. **New Arrivals** (`/new-arrivals`)
   - Shows recently added products
   - Sorted by creation date (newest first)

4. **Sale Items** (`/sale`)
   - Shows products currently on sale or clearance
   - Highlights discount prices

## Adding New Collection Pages

### Using the Generator (Recommended)

1. Add a new mapping to `config/menu-mappings.ts`:
   ```typescript
   {
     title: 'Your Collection Name',
     path: '/your-collection-path',
     description: 'Description of your collection'
   }
   ```

2. Run the generator:
   ```bash
   npm run generate-collection "Your Collection Name"
   ```

3. Create the corresponding collection in Shopify admin

### Manual Setup

For manual creation, see the [Menu Mapping Documentation](./docs/menu-mapping.md).

## Implementation Flow

1. User navigates to any page with the navigation menu
2. The `Navbar` component fetches menu data from Shopify
3. Menu data is processed through the menu mappings
4. When a user clicks a menu item, they're routed to the correct static page
5. The static page fetches and displays products from the corresponding Shopify collection

## Integrating with Shopify Admin

For a complete integration:

1. Ensure collection handles in Shopify match the ones used in your code
2. Menu item titles in Shopify should exactly match the titles in your menu mappings
3. For best results, keep the menu structure in Shopify minimal and let the Next.js app handle routing
