# Menu Mapping Documentation

This document explains how to link Shopify menu items to static pages in your Next.js application.

## How It Works

The menu mapping system allows you to create dynamic links between your Shopify menu items and static pages in your Next.js application. This is particularly useful when you want to:

1. Create dedicated static pages for special collections like "Best Selling" or "New Arrivals"
2. Ensure your navigation menu items point to the correct URLs in your application

## Configuration

All menu mappings are defined in the `config/menu-mappings.ts` file. Each mapping contains:

- `title`: The exact title of the menu item in Shopify
- `path`: The path in your Next.js application it should link to
- `icon`: (Optional) An icon key from allIconList to display with the menu

Example:
```typescript
export const menuMappings: MenuMapping[] = [
  {
    title: 'Best-Selling Item',
    path: '/best-selling',
  },
  {
    title: '5-Star Rated',
    path: '/five-star-rated',
  },
  // Add more mappings as needed
];
```

## Adding New Static Pages with Dynamic Menu Links

### Method 1: Using the Collection Page Generator (Recommended)

We've created a collection page generator to simplify creating new collection pages:

1. **Add a mapping**: Update the `menuMappings` array in `config/menu-mappings.ts` with:
   ```typescript
   {
     title: 'Your Collection Name',
     path: '/your-collection-path',
     description: 'Optional description of your collection'
   }
   ```

2. **Generate the collection page**: Run the generator script
   ```bash
   npm run generate-collection "Your Collection Name"
   ```
   This will automatically create all necessary files in the appropriate location.

3. **Restart the application** to apply the changes

### Method 2: Manual Creation### Method 2: Manual Creation

If you prefer to create the pages manually:

1. **Create the static page**: Add your new page in the appropriate location (e.g. `/app/new-page/page.tsx`)

2. **Create additional files**: For a complete implementation, create these files:
   - `layout.tsx` - For page layout
   - `loading.tsx` - For loading state
   - `error.tsx` - For error handling
   - `opengraph-image.tsx` - For SEO metadata

3. **Add a mapping**: Update the `menuMappings` array in `config/menu-mappings.ts` with:
   ```typescript
   {
     title: 'Exact Menu Title from Shopify',
     path: '/path-to-your-page',
     description: 'Description of this collection or page'
   }
   ```

4. **Restart the application** to apply the changes

## Existing Collection Pages

The application comes with several pre-built collection pages:

1. **Best-Selling Items** - `/best-selling`
2. **5-Star Rated Products** - `/five-star-rated`
3. **New Arrivals** - `/new-arrivals`
4. **Sale Items** - `/sale`

You can use these as references when creating new pages.

For this to work correctly, ensure that:

1. The menu item titles in Shopify exactly match the `title` fields in your mapping configuration
2. The Shopify menu is being loaded with the handle 'main-menu-header'

## Troubleshooting

If your menu links are not working as expected:

1. Check that the menu item title in Shopify exactly matches the `title` in your mapping (case-sensitive)
2. Verify that your static page exists at the specified path
3. Make sure the menu is being loaded correctly via the Shopify API
4. Check the browser console for any errors
