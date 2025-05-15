
    import type { NextApiRequest, NextApiResponse } from 'next';


    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { lineItems } = req.body;
    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_TOKEN;
 
    try {
        const response = await fetch(
            `https://${domain}/api/2023-10/graphql.json`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(storefrontAccessToken && { 'X-Shopify-Storefront-Access-Token': storefrontAccessToken }),
                },
                body: JSON.stringify({
                    query: `
                        mutation checkoutCreate($input: CheckoutCreateInput!) {
                            checkoutCreate(input: $input) {
                                checkout {
                                    id
                                    webUrl
                                }
                                userErrors {
                                    field
                                    message
                                }
                            }
                        }
                    `,
                    variables: {
                        input: {
                            lineItems,
                        },
                    },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const { checkout } = data.data.checkoutCreate;

        res.status(200).json({
        checkoutUrl: checkout.webUrl,
        checkoutId: checkout.id,
        });
    } catch (error) {
        const err = error as any;
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Checkout creation failed' });
    }
    }
