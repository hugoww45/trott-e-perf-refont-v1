import { NextRequest, NextResponse } from 'next/server';

// Fonction pour normaliser les textes pour la recherche
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^\w\s]/g, "") // Supprimer la ponctuation
    .trim();
}

export async function GET(request: NextRequest) {
  try {
    // Récupérer le paramètre de recherche
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Paramètre de recherche manquant' }, { status: 400 });
    }

    console.log(`API de recherche: Recherche pour "${query}"`);

    // Normaliser la requête pour améliorer les correspondances
    const normalizedQuery = normalizeText(query);

    // Données des pages et sections du site
    const siteContent = [
      { type: 'page', title: 'Accueil', url: '/' },
      { type: 'page', title: 'À propos', url: '/a-propos' },
      { type: 'page', title: 'Support', url: '/support' },
      { type: 'page', title: 'FAQ', url: '/services/faq' },
      { type: 'page', title: 'Garantie', url: '/services/garantie' },
      { type: 'page', title: 'Contact', url: '/contact' },
      { type: 'category', title: 'Trottinettes électriques', url: '/boutique?categorie=trottinettes' },
      { type: 'category', title: 'Accessoires', url: '/boutique?categorie=accessoires' },
      { type: 'category', title: 'Pièces détachées', url: '/boutique?categorie=pieces' },
      { type: 'category', title: 'Équipements de sécurité', url: '/boutique?categorie=securite' },
      { type: 'category', title: 'Nouveautés', url: '/boutique?categorie=nouveautes' },
      { type: 'category', title: 'Meilleures ventes', url: '/boutique?categorie=meilleures-ventes' },
      { type: 'category', title: 'Offres spéciales', url: '/boutique?categorie=offres' },
    ];

    // Marques populaires
    const popularBrands = [
      { type: 'brand', title: 'Xiaomi', url: '/boutique?q=xiaomi' },
      { type: 'brand', title: 'Segway', url: '/boutique?q=segway' },
      { type: 'brand', title: 'Ninebot', url: '/boutique?q=ninebot' },
      { type: 'brand', title: 'Dualtron', url: '/boutique?q=dualtron' },
      { type: 'brand', title: 'Kaabo', url: '/boutique?q=kaabo' },
      { type: 'brand', title: 'Inokim', url: '/boutique?q=inokim' },
      { type: 'brand', title: 'Speedway', url: '/boutique?q=speedway' },
      { type: 'brand', title: 'Wegoboard', url: '/boutique?q=wegoboard' },
    ];

    // Récupérer les produits de Shopify
    const shopifyApiUrl = 'https://9ece60-13.myshopify.com/api/2024-01/graphql';
    const shopifyToken = '06405a03cab3919e0390d72c922f85c0';

    const shopifyQuery = `
      query SearchProducts($query: String!) {
        products(first: 10, query: $query) {
          edges {
            node {
              id
              title
              handle
              productType
              availableForSale
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    `;

    const shopifyResponse = await fetch(shopifyApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': shopifyToken,
      },
      body: JSON.stringify({
        query: shopifyQuery,
        variables: { query }
      })
    });

    if (!shopifyResponse.ok) {
      console.error('Erreur lors de la requête Shopify:', await shopifyResponse.text());
      throw new Error('Erreur lors de la recherche de produits');
    }

    const shopifyData = await shopifyResponse.json();

    // Transformer les résultats Shopify
    let productResults = [];

    if (shopifyData.data && shopifyData.data.products && shopifyData.data.products.edges) {
      productResults = shopifyData.data.products.edges.map((edge: any) => {
        const product = edge.node;
        return {
          type: 'product',
          title: product.title,
          url: `/boutique/${product.handle}`,
          description: formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode),
          image: product.featuredImage?.url || null
        };
      });
    }

    // Rechercher dans le contenu du site
    const contentResults = siteContent
      .filter(item => {
        const normalizedTitle = normalizeText(item.title);
        return normalizedTitle.includes(normalizedQuery);
      })
      .map(item => ({
        type: item.type,
        title: item.title,
        url: item.url
      }));

    // Rechercher dans les marques
    const brandResults = popularBrands
      .filter(brand => {
        const normalizedTitle = normalizeText(brand.title);
        return normalizedTitle.includes(normalizedQuery);
      })
      .map(brand => ({
        type: brand.type,
        title: brand.title,
        url: brand.url
      }));

    // Combiner tous les résultats
    const allResults = [...productResults, ...brandResults, ...contentResults];

    console.log(`API de recherche: ${allResults.length} résultats trouvés`);

    return NextResponse.json({
      results: allResults,
      query: query
    });
  } catch (error: any) {
    console.error('Erreur dans l\'API de recherche:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur inconnue' },
      { status: 500 }
    );
  }
}

// Fonction utilitaire pour formater les prix
function formatPrice(amount: string, currencyCode: string = 'EUR'): string {
  const price = parseFloat(amount);

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2
  }).format(price);
}
