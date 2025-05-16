/**
 * Types for menu mapping configuration
 */

export interface MenuMapping {
  /**
   * The exact title of the menu item in Shopify
   */
  title: string;
  
  /**
   * The path in our Next.js application it should link to
   */
  path: string;
  
  /**
   * Optional icon key from allIconList to display with the menu
   */
  icon?: string;
  
  /**
   * Optional description for the menu item
   */
  description?: string;
}
