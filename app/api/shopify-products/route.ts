import { NextResponse } from 'next/server';

// Empêcher la mise en cache côté serveur
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

      // Utilisation de fetch avec des en-têtes simplifiés
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': token
        },
        body: JSON.stringify({
          query: paginationQuery,
          variables: { cursor }
        }),
        next: { revalidate: 0 } // Forcer la revalidation de la requête à chaque fois
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

        // Si la réponse est vide, essayons une requête plus simple comme fallback
        if (pageCount === 1) {
          console.log("API Route: Tentative avec une requête simplifiée...");
          const simpleQuery = `
            query {
              products(first: 250) {
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
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                    variants(first: 1) {
                      edges {
                        node {
                          id
                          title
                          price {
                            amount
                            currencyCode
                          }
                          availableForSale
                        }
                      }
                    }
                  }
                }
              }
            }
          `;

          const fallbackResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': token
            },
            body: JSON.stringify({ query: simpleQuery })
          });

          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            if (fallbackData.data?.products?.edges) {
              console.log("API Route: Récupération réussie avec la requête simplifiée");
              allProducts = fallbackData.data.products.edges;
              break;
            }
          }
        }

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

    // Si aucun produit n'a été trouvé, essayer une approche alternative
    if (allProducts.length === 0) {
      console.log("API Route: Aucun produit trouvé, tentative de récupération alternative...");

      // Méthode alternative directe
      const directQuery = `
        query {
          products(first: 100) {
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
                variants(first: 1) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      availableForSale
                    }
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const directResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token
          },
          body: JSON.stringify({ query: directQuery })
        });

        if (directResponse.ok) {
          const directData = await directResponse.json();
          if (directData.data?.products?.edges) {
            allProducts = directData.data.products.edges;
            console.log(`API Route: Récupération alternative réussie - ${allProducts.length} produits`);
          }
        }
      } catch (altError) {
        console.error("API Route: La méthode alternative a également échoué:", altError);
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

    // Si toujours aucun produit, retourner des données de test pour le débogage
    if (allProducts.length === 0) {
      console.log("API Route: CRITIQUE - Aucun produit disponible. Utilisation des données de secours.");
      // Ajouter des données fictives pour tester l'interface
      responseData.data.products.edges = [
        {
          node: {
            id: "gid://shopify/Product/mock-1",
            title: "Xiaomi Mi Pro 2",
            handle: "xiaomi-mi-pro-2",
            description: "Trottinette électrique Xiaomi Mi Pro 2 avec une autonomie de 45km et une vitesse max de 25km/h.",
            productType: "Trottinettes électriques",
            availableForSale: true,
            images: {
              edges: [
                {
                  node: {
                    url: "https://cdn.shopify.com/s/files/1/0549/7667/6078/products/xiaomi-mi-pro-2.jpg",
                    altText: "Xiaomi Mi Pro 2"
                  }
                }
              ]
            },
            priceRange: {
              minVariantPrice: {
                amount: "449.99",
                currencyCode: "EUR"
              }
            },
            variants: {
              edges: [
                {
                  node: {
                    id: "gid://shopify/ProductVariant/mock-1",
                    title: "Noir",
                    price: {
                      amount: "449.99",
                      currencyCode: "EUR"
                    },
                    compareAtPrice: null,
                    availableForSale: true,
                    selectedOptions: [
                      {
                        name: "Couleur",
                        value: "Noir"
                      }
                    ]
                  }
                }
              ]
            }
          }
        },
        {
          node: {
            id: "gid://shopify/Product/mock-2",
            title: "Accélérateur Xiaomi",
            handle: "accelerateur-xiaomi",
            description: "Accélérateur de remplacement pour trottinette Xiaomi M365 et Pro.",
            productType: "Pièces détachées",
            availableForSale: true,
            images: {
              edges: [
                {
                  node: {
                    url: "https://cdn.shopify.com/s/files/1/0549/7667/6078/products/accelerateur-xiaomi.jpg",
                    altText: "Accélérateur Xiaomi"
                  }
                }
              ]
            },
            priceRange: {
              minVariantPrice: {
                amount: "24.99",
                currencyCode: "EUR"
              }
            },
            variants: {
              edges: [
                {
                  node: {
                    id: "gid://shopify/ProductVariant/mock-2",
                    title: "Noir",
                    price: {
                      amount: "24.99",
                      currencyCode: "EUR"
                    },
                    compareAtPrice: null,
                    availableForSale: true,
                    selectedOptions: [
                      {
                        name: "Couleur",
                        value: "Noir"
                      }
                    ]
                  }
                }
              ]
            }
          }
        },
        {
          node: {
            id: "gid://shopify/Product/mock-3",
            title: "Ninebot Max G30",
            handle: "ninebot-max-g30",
            description: "Trottinette électrique Ninebot Max G30 avec une autonomie impressionnante de 65km.",
            productType: "Trottinettes électriques",
            availableForSale: true,
            images: {
              edges: [
                {
                  node: {
                    url: "https://cdn.shopify.com/s/files/1/0549/7667/6078/products/ninebot-max-g30.jpg",
                    altText: "Ninebot Max G30"
                  }
                }
              ]
            },
            priceRange: {
              minVariantPrice: {
                amount: "799.99",
                currencyCode: "EUR"
              }
            },
            variants: {
              edges: [
                {
                  node: {
                    id: "gid://shopify/ProductVariant/mock-3",
                    title: "Standard",
                    price: {
                      amount: "799.99",
                      currencyCode: "EUR"
                    },
                    compareAtPrice: null,
                    availableForSale: true,
                    selectedOptions: [
                      {
                        name: "Version",
                        value: "Standard"
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      ];
    }

    // Désactiver la mise en cache de la réponse
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate'
      }
    });
  } catch (error: any) {
    console.error('Erreur dans l\'API route:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur inconnue' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0, must-revalidate'
        }
      }
    );
  }
}
