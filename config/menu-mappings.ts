/**
 * This file contains mappings from Shopify menu items to static pages in our Next.js application.
 * Use this to link dynamic menus from Shopify to static pages in the application.
 */

import { MenuMapping } from 'types/menu-mappings';

/**
 * Mappings for primary navigation menu items
 * The 'title' should exactly match the menu item title in Shopify
 */
export const menuMappings: MenuMapping[] = [
  {
    title: 'Best-Selling Item',
    path: '/best-selling',
    description: 'Our most popular products based on sales'
  },
  {
    title: '5-Star Rated',
    path: '/five-star-rated',
    description: 'Top-rated products with excellent customer reviews'
  },
  {
    title: 'New Arrivals',
    path: '/new-arrivals',
    description: 'Latest additions to our product catalog'
  },
  {
    title: 'Sale Items',
    path: '/sale',
    description: 'Products with special discounts and limited-time offers'
  },
  {
    title: 'Summer Collection',
    path: '/summer-collection',
    description: 'Seasonal products perfect for summer'
  },
  // Add more mappings as needed
];

/**
 * Helper function to get the mapped path for a menu title
 * @param title The menu item title from Shopify
 * @returns The mapped path or null if no mapping exists
 */
export function getMappedPathForMenuTitle(title: string): string | null {
  const mapping = menuMappings.find(item => item.title === title);
  return mapping ? mapping.path : null;
}
