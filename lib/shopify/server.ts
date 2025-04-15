export function getStorefrontApiUrl() {
  const url = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql`
  console.log('API URL:', url)
  return url
}

export function getPublicTokenHeaders() {
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
  console.log('Using Shopify token (masked):', token ? `${token.substring(0, 4)}...${token.substring(token.length - 4)}` : 'Missing token')

  return {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token || '',
    'Accept': 'application/json'
  }
}

// Fonction pour récupérer tous les produits sans utiliser les variables d'environnement
export async function getAllShopifyProducts() {
  try {
    // Utilisation directe des valeurs pour éviter les problèmes avec process.env dans le navigateur
    const apiUrl = 'https://9ece60-13.myshopify.com/api/2024-01/graphql';
    const token = '06405a03cab3919e0390d72c922f85c0';

    console.log('Tentative directe de récupération de tous les produits');

    const query = `
      query GetAllProducts {
        products(first: 250) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }
    `;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Produits récupérés via méthode directe: ${data?.data?.products?.edges?.length || 0}`);
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération directe des produits:', error);
    return null;
  }
}

// Version modifiée de PRODUCTS_QUERY avec moins de champs pour tester
export const SIMPLE_PRODUCTS_QUERY = `#graphql
  query SimpleProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = `#graphql
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 250) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`

export const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`
