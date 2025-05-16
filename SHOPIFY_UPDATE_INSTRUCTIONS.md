# Shopify Menu Update Instructions

## Updating the "Best-Selling Item" Menu Link

The current implementation temporarily redirects the "Best-Selling Item" menu to the new `/best-selling` page through code. To make this change permanent, follow these steps to update the menu in Shopify:

1. Log in to your Shopify admin dashboard
2. Navigate to **Online Store** > **Navigation**
3. Find and edit the **Main menu** (main-menu-header)
4. Locate the **Best-Selling Item** menu entry
5. Update its link to point to `/best-selling` instead of the current collection URL
6. Save your changes

This will ensure that the "Best-Selling Item" menu properly links to your new dedicated best-selling products page.

## How This Works

The new `/best-selling` page fetches products from Shopify's "best-sellers" collection and displays them in a grid format consistent with the rest of your store. The page includes:

- A clean, responsive layout
- Loading states for better user experience
- Error handling
- SEO optimization with OpenGraph tags

By pointing the existing menu item to this page, you maintain your navigation structure while improving the display of best-selling products.
