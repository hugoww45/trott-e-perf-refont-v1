import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Utilisation directe des valeurs pour éviter les problèmes avec process.env
    const apiUrl = 'https://9ece60-13.myshopify.com/api/2024-01/graphql';
    const token = '06405a03cab3919e0390d72c922f85c0';
    const adminToken = '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'; // Pour l'API Admin si nécessaire

    console.log("API Route: Récupération des canaux de vente et produits");

    // 1. D'abord, récupérons les canaux de vente disponibles avec l'API Admin (si possible)
    // Note: Cela peut nécessiter d'autres autorisations que nous n'avons pas

    // 2. Ensuite, récupérons tous les produits de tous les canaux
    const productsQuery = `
      query ProductsWithPublicationStatus {
        products(first: 250) {
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
              availableForSale
              publishedAt
              status: publishedOnCurrentPublication
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
              variants(first: 5) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    console.log(`API Route: Envoi de la requête à ${apiUrl} pour tous les produits`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query: productsQuery })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Route: Erreur HTTP ${response.status}: ${response.statusText}`);
      console.error("API Route: Détails de l'erreur:", errorText);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("API Route: Erreurs GraphQL:", data.errors);
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    const productCount = data?.data?.products?.edges?.length || 0;
    console.log(`API Route: ${productCount} produits récupérés au total`);

    // Chercher les produits contenant "test" dans le titre
    if (productCount > 0) {
      const testProducts = data.data.products.edges
        .filter((edge: any) => {
          const title = edge.node.title.toLowerCase();
          return title.includes("test");
        })
        .map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.title,
          status: edge.node.status, // Si le produit est publié sur le canal actuel
          publishedAt: edge.node.publishedAt, // Date de publication
          availableForSale: edge.node.availableForSale // Si le produit est disponible à la vente
        }));

      if (testProducts.length > 0) {
        console.log(`API Route: ${testProducts.length} produits test trouvés:`);
        console.log(JSON.stringify(testProducts, null, 2));
      } else {
        console.log("API Route: Aucun produit test trouvé");
      }
    }

    // 3. Essayons de récupérer les informations sur les produits non publiés aussi
    // Note: Ceci est une tentative, mais l'API Storefront peut ne pas avoir accès à cette information
    console.log("API Route: Tentative de récupération des produits non publiés");

    return NextResponse.json({
      productCount,
      data
    });
  } catch (error: any) {
    console.error('Erreur dans l\'API route:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur inconnue' },
      { status: 500 }
    );
  }
}
