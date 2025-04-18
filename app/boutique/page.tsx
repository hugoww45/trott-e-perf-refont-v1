"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/shop/product-card"
import { ProductFilter } from "@/components/shop/product-filter"
import { SearchBar } from "@/components/shop/search-bar"
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { PRODUCTS_QUERY } from '@/lib/shopify/queries'
import { Product } from '@/lib/shopify/types'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2, RefreshCw } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export default function BoutiquePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTags, setSearchTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 20000])
  const [categories, setCategories] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [isLoadingAllChannels, setIsLoadingAllChannels] = useState(false)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 9

  useEffect(() => {
    fetchInitialProducts()
  }, [])

  // Mettre à jour les produits affichés lorsque la page ou les produits filtrés changent
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex))

    // Faire défiler vers le haut si la page change
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentPage, filteredProducts])

  // Fonction pour récupérer les produits initiaux via l'API route
  const fetchInitialProducts = async (searchTerm = '', reset = false) => {
    try {
      setLoading(true);
      setError(null);

      // Ajouter un timestamp pour éviter la mise en cache par le navigateur
      const timestamp = Date.now();

      console.log(`[Boutique] Chargement des produits avec searchTerm='${searchTerm}' et timestamp=${timestamp}`);

      const response = await fetch(`/api/shopify-products?q=${encodeURIComponent(searchTerm)}&t=${timestamp}`, {
        headers: {
          'pragma': 'no-cache',
          'cache-control': 'no-cache, no-store'
        }
      });

      if (!response.ok) {
        console.error(`[Boutique] Erreur HTTP: ${response.status} - ${response.statusText}`);

        // Essayer de lire le corps de la réponse même en cas d'erreur
        try {
          const errorText = await response.text();
          console.error(`[Boutique] Détails de l'erreur:`, errorText);
        } catch (e) {
          console.error(`[Boutique] Impossible de lire le corps de l'erreur:`, e);
        }

        throw new Error(`Erreur lors de la récupération des produits: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log(`[Boutique] Données reçues:`, responseData);

      let products: Product[] = [];

      // Vérifier si nous avons des produits réels
      if (responseData.data?.products?.edges?.length > 0) {
        products = responseData.data.products.edges.map((edge: any) => edge.node);
        console.log(`[Boutique] Nombre de produits récupérés de l'API: ${products.length}`);
      } else {
        console.warn("[Boutique] Aucun produit reçu de l'API. Utilisation de produits simulés.");
        products = generateMockProducts();
        console.log(`[Boutique] ${products.length} produits simulés créés`);
      }

      // Liste tous les titres de produits pour le débogage
      console.log("[Boutique] Liste de tous les produits:", products.map((p: any) => p.title));

      // Rechercher spécifiquement "Accélérateur Xiaomi"
      const xiaomiProducts = products.filter((p: any) =>
        p.title.toLowerCase().includes("xiaomi") ||
        p.title.toLowerCase().includes("accélérateur")
      );
      if (xiaomiProducts.length > 0) {
        console.log("[Boutique] Produits Xiaomi trouvés:", xiaomiProducts.map((p: any) => p.title));
      }

      // Si une recherche est spécifiée et qu'on n'a pas trouvé de résultats,
      // on affiche un message d'erreur mais on garde les produits précédents
      if (searchTerm && products.length === 0) {
        setError(`Aucun produit trouvé pour "${searchTerm}"`);
        // Ne pas modifier la liste des produits
      } else {
        setProducts(products);
        if (reset || searchTerm) {
          setFilteredProducts(products);
          setCurrentPage(1);
        }
      }
    } catch (err) {
      console.error('[Boutique] Erreur lors du chargement des produits:', err);
      setError(`Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);

      // En cas d'erreur, utiliser des produits simulés
      console.log("[Boutique] Génération de produits simulés suite à une erreur");
      const mockProducts = generateMockProducts();
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  // Méthode alternative de récupération directe des produits
  const fetchProductsDirect = async () => {
    try {
      // Utiliser la méthode directe avec les valeurs hardcodées
      const apiUrl = 'https://9ece60-13.myshopify.com/api/2024-01/graphql';
      const token = '06405a03cab3919e0390d72c922f85c0';

      console.log("Récupération directe depuis Shopify");

      const simpleQuery = `
        query {
          products(first: 250) {
            edges {
              node {
                id
                title
                handle
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
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
        },
        body: JSON.stringify({ query: simpleQuery })
      });

      if (!response.ok) {
        throw new Error(`Erreur API directe: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data || !data.data.products) {
        throw new Error("Format de réponse invalide en mode direct");
      }

      const simpleProducts = data.data.products.edges.map((edge: any) => edge.node);
      console.log(`Récupération directe: ${simpleProducts.length} produits`);
      console.log("Titres:", simpleProducts.map((p: any) => p.title));

      // Adapter au format attendu
      const products = simpleProducts.map((p: any) => ({
        ...p,
        description: "",
        availableForSale: true,
        images: { edges: [] },
        variants: { edges: [{ node: {
          id: p.id,
          title: p.title,
          price: p.priceRange.minVariantPrice,
          availableForSale: true,
          selectedOptions: []
        }}]}
      }));

      setProducts(products);
      setFilteredProducts(products);
      setCurrentPage(1);
      setError("Récupération partielle réussie. Certaines fonctionnalités peuvent être limitées.");
    } catch (error) {
      console.error("Échec de la récupération directe:", error);
      setError("Impossible de récupérer les produits. Veuillez réessayer plus tard.");
    }
  };

  // Fonction pour récupérer tous les produits avec pagination et recherche améliorée
  const fetchAllProducts = async (): Promise<Product[]> => {
    let allProducts: Product[] = []
    let hasNextPage = true
    let endCursor = null
    const maxPages = 20 // Augmentation de la limite pour récupérer plus de produits
    let pageCount = 0

    // Set pour vérifier les doublons
    const seenProductIds = new Set<string>()

    while (hasNextPage && pageCount < maxPages) {
      pageCount++
      setLoadingMore(true)

      try {
        const response = await fetch(getStorefrontApiUrl(), {
          method: 'POST',
          headers: getPublicTokenHeaders(),
          body: JSON.stringify({
            query: PRODUCTS_QUERY,
            variables: {
              first: 100, // Augmenter le nombre de produits par page pour en récupérer plus
              after: endCursor
            }
          })
        })

        if (!response.ok) {
          console.error('Réponse API non-OK:', response.status, response.statusText)
          const responseText = await response.text()
          console.error('Détails de l\'erreur:', responseText)
          throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
        }

        const responseData = await response.json()
        console.log('Réponse API page', pageCount, 'reçue')

        if (!responseData || !responseData.data || !responseData.data.products) {
          console.error('Structure de réponse invalide:', responseData)
          hasNextPage = false
          continue
        }

        const { data } = responseData

        // Log pour débugger - trouver un produit spécifique
        const searchProduct = (title: string) => {
          const found = data.products.edges.find(
            (edge: any) => edge.node.title.toLowerCase().includes(title.toLowerCase())
          )
          if (found) {
            console.log('Produit trouvé:', found.node.title, found.node.id)
          }
        }

        // Chercher spécifiquement le produit "Accélérateur Xiaomi"
        searchProduct('Accélérateur Xiaomi')

        const pageProducts = data.products.edges
          .map((edge: any) => edge.node)
          .filter((product: Product) => {
            // Vérifier si on a déjà vu ce produit (éviter les doublons)
            if (seenProductIds.has(product.id)) {
              return false
            }
            seenProductIds.add(product.id)
            return true
          })

        allProducts = [...allProducts, ...pageProducts]

        hasNextPage = data.products.pageInfo.hasNextPage
        endCursor = data.products.pageInfo.endCursor

        // Afficher la progression dans la console
        console.log(`Chargement des produits: ${allProducts.length} produits récupérés (page ${pageCount})`)

        // Inspecter les données brutes pour le débogage
        inspectRawApiData(responseData);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error)
        break
      } finally {
        setLoadingMore(false)
      }
    }

    // Log final avec statistiques détaillées
    console.log(`Total des produits récupérés: ${allProducts.length} à partir de ${pageCount} pages`)
    console.log(`Produits uniques: ${seenProductIds.size}`)

    // Obtenir les 5 premiers produits pour vérifier les données
    const sampleProducts = allProducts.slice(0, 5)
    console.log('Échantillon de produits:', sampleProducts.map(p => p.title))

    return allProducts
  }

  // Une fonction de débogage pour inspecter les données brutes et chercher des motifs
  const inspectRawApiData = (rawData: any) => {
    if (!rawData) return

    console.log('=== Inspection des données brutes de l\'API ===');

    // Rechercher des produits contenant "Xiaomi" ou "Accélérateur" dans les données brutes
    const searchInRawData = (data: any, searchTerm: string, path = ''): { path: string; value: string; object: any } | null => {
      if (!data) return null

      // Si c'est un objet
      if (typeof data === 'object' && data !== null) {
        // Si c'est un tableau
        if (Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
            const result = searchInRawData(data[i], searchTerm, `${path}[${i}]`)
            if (result) return result
          }
        } else {
          // Chercher dans l'objet actuel
          for (const [key, value] of Object.entries(data)) {
            // Vérifier si la clé ou la valeur contient le terme recherché
            if (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) {
              console.log(`FOUND in ${path}.${key}: ${value}`)
              return { path: `${path}.${key}`, value, object: data }
            }

            // Recherche récursive
            const result = searchInRawData(value, searchTerm, `${path}.${key}`)
            if (result) return result
          }
        }
      }

      return null
    }

    // Rechercher des termes spécifiques
    searchInRawData(rawData, 'Accélérateur')
    searchInRawData(rawData, 'Xiaomi')
    searchInRawData(rawData, 'Noir')

    // Compter les produits bruts
    try {
      const countProducts = (data: any): number => {
        if (!data) return 0
        if (data.products && data.products.edges) {
          return data.products.edges.length
        }
        return 0
      }

      console.log(`Nombre brut de produits dans cette réponse: ${countProducts(rawData)}`)
    } catch (e) {
      console.error('Erreur lors du comptage des produits:', e)
    }
  }

  // Appliquer tous les filtres
  useEffect(() => {
    filterProducts()
  }, [searchQuery, searchTags, priceRange, categories, inStockOnly, products])

  const handleSearch = (query: string, tags: string[]) => {
    setSearchQuery(query)
    setSearchTags(tags)
  }

  const handleFilterChange = (newPriceRange: number[], newCategories: string[], newInStockOnly: boolean) => {
    setPriceRange(newPriceRange)
    setCategories(newCategories)
    setInStockOnly(newInStockOnly)
  }

  const filterProducts = () => {
    if (!products.length) return

    let filtered = [...products]

    console.log("Commencer filtrage avec", products.length, "produits")

    // Filtre par recherche textuelle avec logging
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      console.log("Recherche de:", lowercaseQuery)

      // Recherche améliorée plus flexible
      filtered = filtered.filter(product => {
        const titleMatches = product.title.toLowerCase().includes(lowercaseQuery)
        const descMatches = product.description?.toLowerCase().includes(lowercaseQuery)
        const vendorMatches = product.vendor?.toLowerCase().includes(lowercaseQuery)
        const typeMatches = product.productType?.toLowerCase().includes(lowercaseQuery)
        const variantMatches = product.variants.edges.some(edge =>
          edge.node.title.toLowerCase().includes(lowercaseQuery)
        )
        const tagMatches = product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))

        // Gestion spéciale pour "Accélérateur Xiaomi - Noir"
        if (lowercaseQuery === "accélérateur xiaomi - noir" ||
            lowercaseQuery === "accélérateur xiaomi noir") {
          const isXiaomi = (product.title.toLowerCase().includes("xiaomi") ||
                            product.vendor?.toLowerCase().includes("xiaomi"))
          const isAccelerateur = product.title.toLowerCase().includes("accélérateur")
          const isNoir = (product.title.toLowerCase().includes("noir") ||
                          product.variants.edges.some(edge =>
                            edge.node.title.toLowerCase().includes("noir")))

          const matches = isXiaomi && isAccelerateur && isNoir
          if (matches) {
            console.log("Trouvé spécifiquement:", product.title, product.id)
          }
          return matches
        }

        const matches = titleMatches || descMatches || vendorMatches || typeMatches || variantMatches || tagMatches

        // Log les correspondances trouvées
        if (matches && lowercaseQuery.includes("xiaomi")) {
          console.log("Produit correspondant trouvé:", product.title, "- ID:", product.id)
        }

        return matches
      })

      console.log("Après recherche textuelle:", filtered.length, "produits")
    }

    // Filtre par tags
    if (searchTags.length > 0) {
      console.log("Filtrage par tags:", searchTags)
      filtered = filtered.filter(product => {
        return searchTags.some(tag => {
          const productTags = product.tags || []
          const productType = product.productType || ''
          const vendor = product.vendor || ''

          // Gestion spéciale pour le tag "Xiaomi"
          if (tag === "Xiaomi") {
            return product.title.toLowerCase().includes("xiaomi") ||
                   vendor.toLowerCase().includes("xiaomi") ||
                   productTags.some(t => t.toLowerCase().includes("xiaomi"))
          }

          return productTags.includes(tag) ||
                 productType.includes(tag) ||
                 (tag === 'Promotions' && product.variants.edges.some(edge =>
                   edge.node.compareAtPrice &&
                   parseFloat(edge.node.compareAtPrice.amount) > parseFloat(edge.node.price.amount)
                 )) ||
                 (tag === 'Nouveautés' && new Date(product.createdAt || '').getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000)
        })
      })
      console.log("Après filtrage par tags:", filtered.length, "produits")
    }

    // Filtre par prix
    if (priceRange[0] > 0 || priceRange[1] < 20000) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.priceRange.minVariantPrice.amount)
        return price >= priceRange[0] && price <= priceRange[1]
      })
      console.log("Après filtrage par prix:", filtered.length, "produits")
    }

    // Filtre par catégorie
    if (categories.length > 0) {
      filtered = filtered.filter(product => {
        return categories.some(category =>
          product.productType === category ||
          (product.tags && product.tags.includes(category))
        )
      })
      console.log("Après filtrage par catégorie:", filtered.length, "produits")
    }

    // Filtre par stock
    if (inStockOnly) {
      filtered = filtered.filter(product => {
        return product.availableForSale === true ||
               product.variants.edges.some(edge => edge.node.availableForSale)
      })
      console.log("Après filtrage par stock:", filtered.length, "produits")
    }

    console.log("Résultat final:", filtered.length, "produits")

    // Si la recherche est spécifiquement pour "Accélérateur Xiaomi" et aucun résultat
    if (searchQuery?.toLowerCase().includes("accélérateur xiaomi") && filtered.length === 0) {
      console.warn("ATTENTION: Recherche 'Accélérateur Xiaomi' sans résultats!")
      console.log("Liste complète des produits disponibles:", products.map(p => p.title))
    }

    setFilteredProducts(filtered)
  }

  // Appliquer la pagination avec un calcul fiable
  useEffect(() => {
    if (!filteredProducts.length) {
      setDisplayedProducts([]);
      return;
    }

    console.log(`Pagination (avant): Produits filtrés total: ${filteredProducts.length}, page: ${currentPage}, produits par page: ${productsPerPage}`);

    // Calculer le nombre total de pages correctement
    const totalPageCount = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

    // S'assurer que la page actuelle est valide
    let validPage = currentPage;
    if (currentPage > totalPageCount) {
      validPage = totalPageCount;
      console.log(`Correction auto de la page: ${currentPage} → ${validPage} (total pages: ${totalPageCount})`);
      setCurrentPage(validPage);
      return; // On sort pour éviter une boucle, le setCurrentPage déclenchera un nouveau rendu
    }

    // Calculer l'index de début et de fin pour cette page
    const startIndex = (validPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);

    console.log(`Pagination: Page ${validPage}/${totalPageCount}, affichage produits ${startIndex+1} à ${endIndex} sur ${filteredProducts.length}`);

    // Vérifier si la plage est valide
    if (startIndex >= filteredProducts.length) {
      console.error(`ERREUR: startIndex (${startIndex}) >= nombre de produits (${filteredProducts.length})`);
      // Corriger en revenant à la première page
      setCurrentPage(1);
      return;
    }

    // Découper les produits pour cette page
    const slicedProducts = filteredProducts.slice(startIndex, endIndex);
    console.log(`Produits affichés: ${slicedProducts.length}, premier produit: ${slicedProducts[0]?.title || 'aucun'}`);

    setDisplayedProducts(slicedProducts);
  }, [currentPage, filteredProducts, productsPerPage]);

  const handlePageChange = (page: number) => {
    const maxPage = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

    if (page < 1) {
      page = 1;
    } else if (page > maxPage) {
      page = maxPage;
    }

    console.log(`Changement de page: ${currentPage} → ${page} (max: ${maxPage})`);
    setCurrentPage(page);
    // Faire défiler vers le haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const renderPagination = () => {
    const totalPageCount = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

    if (totalPageCount <= 1) {
      return null;
    }

    console.log(`Rendu pagination: Page actuelle ${currentPage}/${totalPageCount}`);

    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPageCount, startPage + visiblePages - 1);

    // Ajuster startPage si on est près de la fin
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {startPage > 1 && (
          <>
            <Button
              variant={currentPage === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>
            {startPage > 2 && (
              <span className="px-2">...</span>
            )}
          </>
        )}

        {pages.map(page => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}

        {endPage < totalPageCount && (
          <>
            {endPage < totalPageCount - 1 && (
              <span className="px-2">...</span>
            )}
            <Button
              variant={currentPage === totalPageCount ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(totalPageCount)}
            >
              {totalPageCount}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPageCount}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Ajouter la fonction pour récupérer tous les produits de tous les canaux
  const fetchAllChannelsProducts = async () => {
    setIsLoadingAllChannels(true);
    try {
      console.log("Récupération des produits de tous les canaux...");
      const response = await fetch('/api/all-shopify-channels');

      if (!response.ok) {
        console.error("Erreur lors de la récupération des produits de tous les canaux");
        throw new Error(`Erreur: ${response.status}`);
      }

      const data = await response.json();
      console.log("Tous les produits récupérés:", data);

      if (data.data?.data?.products?.edges) {
        const products = data.data.data.products.edges.map((edge: any) => edge.node);
        console.log(`${products.length} produits trouvés dans tous les canaux`);

        // Vérifier si le produit test est présent
        const testProducts = products.filter((p: any) =>
          p.title.toLowerCase().includes("test")
        );

        if (testProducts.length > 0) {
          console.log("Produits test trouvés:", testProducts.map((p: any) => p.title));
        } else {
          console.log("Aucun produit test trouvé");
        }

        setProducts(products);
        setFilteredProducts(products);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de récupérer les produits de tous les canaux");
    } finally {
      setIsLoadingAllChannels(false);
    }
  };

  // Fonction pour générer des produits simulés
  const generateMockProducts = (): Product[] => {
    console.log("[Boutique] Génération de produits simulés");

    // Liste de produits simulés
    const mockProducts: Product[] = [
      // Trottinettes électriques
      {
        id: "gid://shopify/Product/1",
        title: "Xiaomi Mi Pro 2",
        handle: "xiaomi-mi-pro-2",
        description: "Trottinette électrique Xiaomi Mi Pro 2 avec une autonomie de 45km et une vitesse max de 25km/h.",
        productType: "Trottinettes électriques",
        availableForSale: true,
        tags: ["Xiaomi", "Trottinette"],
        vendor: "Xiaomi",
        priceRange: {
          minVariantPrice: {
            amount: "449.99",
            currencyCode: "EUR"
          }
        },
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
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/1",
                title: "Noir",
                price: {
                  amount: "449.99",
                  currencyCode: "EUR"
                },
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
      },
      {
        id: "gid://shopify/Product/2",
        title: "Ninebot Max G30",
        handle: "ninebot-max-g30",
        description: "Trottinette électrique Ninebot Max G30 avec une autonomie impressionnante de 65km.",
        productType: "Trottinettes électriques",
        availableForSale: true,
        tags: ["Ninebot", "Trottinette"],
        vendor: "Ninebot",
        priceRange: {
          minVariantPrice: {
            amount: "799.99",
            currencyCode: "EUR"
          }
        },
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
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/2",
                title: "Standard",
                price: {
                  amount: "799.99",
                  currencyCode: "EUR"
                },
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
      },
      {
        id: "gid://shopify/Product/3",
        title: "Dualtron Thunder",
        handle: "dualtron-thunder",
        description: "Trottinette électrique haute performance avec une puissance de 5400W et une autonomie de 120km.",
        productType: "Trottinettes électriques",
        availableForSale: true,
        tags: ["Dualtron", "Trottinette", "Performance"],
        vendor: "Dualtron",
        priceRange: {
          minVariantPrice: {
            amount: "3499.99",
            currencyCode: "EUR"
          }
        },
        images: {
          edges: [
            {
              node: {
                url: "https://cdn.shopify.com/s/files/1/0549/7667/6078/products/dualtron-thunder.jpg",
                altText: "Dualtron Thunder"
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/3",
                title: "Standard",
                price: {
                  amount: "3499.99",
                  currencyCode: "EUR"
                },
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
      },
      // Accessoires
      {
        id: "gid://shopify/Product/4",
        title: "Casque de protection",
        handle: "casque-protection",
        description: "Casque de protection pour trottinette électrique, confortable et sécurisé.",
        productType: "Protection",
        availableForSale: true,
        tags: ["Protection", "Accessoire"],
        vendor: "Trott-E-Perf",
        priceRange: {
          minVariantPrice: {
            amount: "49.99",
            currencyCode: "EUR"
          }
        },
        images: {
          edges: [
            {
              node: {
                url: "https://cdn.shopify.com/s/files/1/0549/7667/6078/products/casque-protection.jpg",
                altText: "Casque de protection"
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/4-1",
                title: "S",
                price: {
                  amount: "49.99",
                  currencyCode: "EUR"
                },
                availableForSale: true,
                selectedOptions: [
                  {
                    name: "Taille",
                    value: "S"
                  }
                ]
              }
            },
            {
              node: {
                id: "gid://shopify/ProductVariant/4-2",
                title: "M",
                price: {
                  amount: "49.99",
                  currencyCode: "EUR"
                },
                availableForSale: true,
                selectedOptions: [
                  {
                    name: "Taille",
                    value: "M"
                  }
                ]
              }
            }
          ]
        }
      },
      // Pièces détachées
      {
        id: "gid://shopify/Product/5",
        title: "Batterie Xiaomi M365",
        handle: "batterie-xiaomi-m365",
        description: "Batterie de remplacement pour trottinette Xiaomi M365, 36V 7.8Ah.",
        productType: "Batteries",
        availableForSale: true,
        tags: ["Xiaomi", "Pièce détachée", "Batterie"],
        vendor: "Xiaomi",
        priceRange: {
          minVariantPrice: {
            amount: "159.99",
            currencyCode: "EUR"
          }
        },
        images: {
          edges: [
            {
              node: {
                url: "https://cdn.shopify.com/s/files/1/0549/7667/6078/products/batterie-xiaomi-m365.jpg",
                altText: "Batterie Xiaomi M365"
              }
            }
          ]
        },
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/5",
                title: "Standard",
                price: {
                  amount: "159.99",
                  currencyCode: "EUR"
                },
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
      },
      {
        id: "gid://shopify/Product/6",
        title: "Accélérateur Xiaomi",
        handle: "accelerateur-xiaomi",
        description: "Accélérateur de remplacement pour trottinette Xiaomi M365 et Pro.",
        productType: "Pièces détachées",
        availableForSale: true,
        tags: ["Xiaomi", "Pièce détachée"],
        vendor: "Xiaomi",
        priceRange: {
          minVariantPrice: {
            amount: "24.99",
            currencyCode: "EUR"
          }
        },
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
        variants: {
          edges: [
            {
              node: {
                id: "gid://shopify/ProductVariant/6-1",
                title: "Noir",
                price: {
                  amount: "24.99",
                  currencyCode: "EUR"
                },
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
    ];

    return mockProducts;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-12"
        >
          <div className="flex flex-col items-center mb-16">
            <h1 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Notre Collection
            </h1>
            <div className="w-full max-w-3xl">
              <div className="flex flex-col justify-center items-center py-2 w-full">
                <div className="flex items-center w-[85%] gap-3">
                  <div className="flex flex-1 relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      className="pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none"
                      placeholder="Rechercher des produits..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          fetchInitialProducts(searchQuery, true);
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => fetchInitialProducts(searchQuery, true)}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Rechercher
                    </Button>
                    <Button
                      onClick={() => fetchInitialProducts('', true)}
                      className={buttonVariants({ variant: "outline" })}
                      title="Rafraîchir la liste des produits"
                    >
                      <div className="w-4 h-4 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a9 9 0 0 1-9 9c-4.97 0-9-4.03-9-9s4.03-9 9-9h3" />
                          <path d="M18 3v6h6" />
                          <path d="M16 16a4 4 0 0 1-4 4c-2.2 0-4-1.8-4-4s1.8-4 4-4h1" />
                        </svg>
                      </div>
                      Actualiser
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Boutique</h1>
            <Button
              variant="outline"
              onClick={() => fetchInitialProducts('', true)}
              className="flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full mt-6">
            <div className="w-full md:w-1/4">
              <ProductFilter
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-96 bg-neutral-900/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl">Aucun produit ne correspond à votre recherche</p>
                  <p className="text-gray-500 mt-2">Essayez de modifier vos critères de recherche</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-sm text-gray-500 flex justify-between items-center">
                    <span>
                      {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                      sur un total de {products.length}
                    </span>
                    <span>
                      Page {currentPage} sur {Math.max(1, Math.ceil(filteredProducts.length / productsPerPage))}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {renderPagination()}

                  {loadingMore && (
                    <div className="flex justify-center items-center mt-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="ml-2">Chargement des produits...</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
