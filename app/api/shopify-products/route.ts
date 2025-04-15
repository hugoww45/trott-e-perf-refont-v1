import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Utilisation directe des valeurs pour éviter les problèmes avec process.env
    const apiUrl = 'https://9ece60-13.myshopify.com/api/2024-01/graphql';
    const token = '06405a03cab3919e0390d72c922f85c0';

    console.log("API Route: Démarrage de la récupération des produits Shopify");

    // Récupérer tous les produits avec pagination
    let allProducts: any[] = [];
    let hasNextPage = true;
    let cursor: string | null = null;
    let pageCount = 0;

    while (hasNextPage && pageCount < 10) { // Limiter à 10 pages pour éviter les boucles infinies
      pageCount++;

      const paginationQuery = `
        query AllProducts($cursor: String) {
          products(first: 250, after: $cursor) {
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
                productType
                availableForSale
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 3) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
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
      `;

      console.log(`API Route: Envoi de la requête page ${pageCount} à ${apiUrl}, cursor: ${cursor || 'null'}`);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': token,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          query: paginationQuery,
          variables: { cursor }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Route: Erreur HTTP ${response.status}: ${response.statusText}`);
        console.error("API Route: Détails de l'erreur:", errorText);
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText.substring(0, 200)}`);
      }

      const pageData = await response.json();

      if (pageData.errors) {
        console.error(`API Route: Erreurs GraphQL page ${pageCount}:`, pageData.errors);
        throw new Error(`GraphQL errors: ${JSON.stringify(pageData.errors)}`);
      }

      if (!pageData.data || !pageData.data.products || !pageData.data.products.edges) {
        console.error(`API Route: Format de réponse invalide page ${pageCount}:`, pageData);
        break;
      }

      const products = pageData.data.products.edges;
      const pageInfo = pageData.data.products.pageInfo;

      allProducts = [...allProducts, ...products];

      hasNextPage = pageInfo.hasNextPage;
      cursor = pageInfo.endCursor;

      console.log(`API Route: Page ${pageCount} - ${products.length} produits récupérés`);

      // Liste les premiers titres de la page pour le débogage
      if (products.length > 0) {
        const sampleTitles = products
          .slice(0, 5)
          .map((edge: any) => edge.node.title);
        console.log(`API Route: Échantillon page ${pageCount}: ${sampleTitles.join(", ")}`);
      }

      if (!hasNextPage) {
        console.log(`API Route: Fin de la pagination atteinte à la page ${pageCount}`);
        break;
      }
    }

    // Créer un objet de réponse similaire à celui de l'API Shopify
    const responseData = {
      data: {
        products: {
          pageInfo: {
            hasNextPage: false,
            endCursor: null
          },
          edges: allProducts
        }
      }
    };

    const productCount = allProducts.length;
    console.log(`API Route: Total de ${productCount} produits récupérés sur ${pageCount} pages`);

    // Vérifier les produits Xiaomi et le produit test
    if (productCount > 0) {
      // Rechercher le produit test
      const testProducts = allProducts.filter((edge: any) => {
        const title = edge.node.title.toLowerCase();
        return title.includes("test");
      }).map((edge: any) => edge.node.title);

      if (testProducts.length > 0) {
        console.log(`API Route: Produits test trouvés: ${testProducts.join(", ")}`);
      } else {
        console.log("API Route: Aucun produit test trouvé");
      }

      // Vérifier les produits Xiaomi spécifiques
      const xiaomiProducts = allProducts.filter((edge: any) => {
        const title = edge.node.title.toLowerCase();
        return title.includes("xiaomi") || title.includes("accélérateur");
      }).map((edge: any) => edge.node.title);

      if (xiaomiProducts.length > 0) {
        console.log(`API Route: Produits Xiaomi trouvés: ${xiaomiProducts.join(", ")}`);
      } else {
        console.log("API Route: Aucun produit Xiaomi trouvé");
      }
    }

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('Erreur dans l\'API route:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur inconnue' },
      { status: 500 }
    );
  }
}
