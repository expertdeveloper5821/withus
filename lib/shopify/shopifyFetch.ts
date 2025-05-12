import { createClient } from '@shopify/storefront-api-graphql';

const client = createClient({
  domain: 'your-shop.myshopify.com',
  storefrontAccessToken: 'your-access-token',
});

export const searchProducts = async (query: string) => {
  const queryData = `
    query {
      products(first: 10, query: "${query}") {
        edges {
          node {
            id
            title
            descriptionHtml
            handle
          }
        }
      }
    }
  `;

  const response = await client.query({ query: queryData });
  return response.data.products.edges.map((edge: any) => edge.node);
};
