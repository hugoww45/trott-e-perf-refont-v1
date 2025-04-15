import { getShopifyDomain } from './shopify-config';

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, any>;
}

/**
 * Fonction utilitaire pour effectuer des appels à l'API Shopify
 */
export async function shopifyFetch<T = any>({
  query,
  variables = {},
}: ShopifyFetchOptions): Promise<T> {
  const domain = getShopifyDomain();
  const endpoint = `https://${domain}/api/2023-10/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error('Erreurs GraphQL:', json.errors);
      throw new Error(json.errors[0]?.message || 'Erreur GraphQL');
    }

    return json.data;
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API Shopify:', error);
    throw error;
  }
}
