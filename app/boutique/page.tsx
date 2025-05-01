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
import { ChevronLeft, ChevronRight, Loader2, RefreshCw, Filter, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [tagFilter, setTagFilter] = useState<string | null>(null)

  // Pagination avec nombre d'articles par page paramétrable
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(9)
  const [showLoadMore, setShowLoadMore] = useState(false)

  // Récupérer le tag à partir de l'URL si présent
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tagParam = urlParams.get('tag');
      if (tagParam) {
        setTagFilter(tagParam);
        // Si on a un tag, on l'ajoute aux tags de recherche
        setSearchTags(prev => {
          // Éviter les doublons
          if (!prev.includes(tagParam)) {
            return [...prev, tagParam];
          }
          return prev;
        });
      }
    }
  }, []);

  useEffect(() => {
    fetchInitialProducts()
  }, [])

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex))

    // Vérifier s'il y a plus de produits à charger
    setShowLoadMore(endIndex < filteredProducts.length)

    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentPage, filteredProducts, productsPerPage])

  const fetchInitialProducts = async (searchTerm = '', reset = false) => {
    try {
      setLoading(true);
      setError(null);

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

      if (responseData.data?.products?.edges?.length > 0) {
        products = responseData.data.products.edges.map((edge: any) => edge.node);
        console.log(`[Boutique] Nombre de produits récupérés de l'API: ${products.length}`);
      } else {
        console.warn("[Boutique] Aucun produit reçu de l'API. Utilisation de produits simulés.");
        products = generateMockProducts();
        console.log(`[Boutique] ${products.length} produits simulés créés`);
      }

      console.log("[Boutique] Liste de tous les produits:", products.map((p: any) => p.title));

      const xiaomiProducts = products.filter((p: any) =>
        p.title.toLowerCase().includes("xiaomi") ||
        p.title.toLowerCase().includes("accélérateur")
      );
      if (xiaomiProducts.length > 0) {
        console.log("[Boutique] Produits Xiaomi trouvés:", xiaomiProducts.map((p: any) => p.title));
      }

      if (searchTerm && products.length === 0) {
        setError(`Aucun produit trouvé pour "${searchTerm}"`);
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

      const mockProducts = generateMockProducts();
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsDirect = async () => {
    try {
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

  const fetchAllProducts = async (): Promise<Product[]> => {
    let allProducts: Product[] = []
    let hasNextPage = true
    let endCursor = null
    const maxPages = 20
    let pageCount = 0

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
              first: 100,
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

        const searchProduct = (title: string) => {
          const found = data.products.edges.find(
            (edge: any) => edge.node.title.toLowerCase().includes(title.toLowerCase())
          )
          if (found) {
            console.log('Produit trouvé:', found.node.title, found.node.id)
          }
        }

        searchProduct('Accélérateur Xiaomi')

        const pageProducts = data.products.edges
          .map((edge: any) => edge.node)
          .filter((product: Product) => {
            if (seenProductIds.has(product.id)) {
              return false
            }
            seenProductIds.add(product.id)
            return true
          })

        allProducts = [...allProducts, ...pageProducts]

        hasNextPage = data.products.pageInfo.hasNextPage
        endCursor = data.products.pageInfo.endCursor

        console.log(`Chargement des produits: ${allProducts.length} produits récupérés (page ${pageCount})`)

        inspectRawApiData(responseData);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error)
        break
      } finally {
        setLoadingMore(false)
      }
    }

    console.log(`Total des produits récupérés: ${allProducts.length} à partir de ${pageCount} pages`)
    console.log(`Produits uniques: ${seenProductIds.size}`)

    const sampleProducts = allProducts.slice(0, 5)
    console.log('Échantillon de produits:', sampleProducts.map(p => p.title))

    return allProducts
  }

  const inspectRawApiData = (rawData: any) => {
    if (!rawData) return

    console.log('=== Inspection des données brutes de l\'API ===');

    const searchInRawData = (data: any, searchTerm: string, path = ''): { path: string; value: string; object: any } | null => {
      if (!data) return null

      if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
            const result = searchInRawData(data[i], searchTerm, `${path}[${i}]`)
            if (result) return result
          }
        } else {
          for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) {
              console.log(`FOUND in ${path}.${key}: ${value}`)
              return { path: `${path}.${key}`, value, object: data }
            }

            const result = searchInRawData(value, searchTerm, `${path}.${key}`)
            if (result) return result
          }
        }
      }

      return null
    }

    searchInRawData(rawData, 'Accélérateur')
    searchInRawData(rawData, 'Xiaomi')
    searchInRawData(rawData, 'Noir')

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

  useEffect(() => {
    filterProducts()
  }, [searchQuery, searchTags, priceRange, categories, inStockOnly, products])

  const handleSearch = (query: string, tags: string[]) => {
    setSearchQuery(query)
    setSearchTags(tags)
    fetchInitialProducts(query, true)
    setIsMobileFilterOpen(false)
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

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      console.log("Recherche de:", lowercaseQuery)

      const queryAlternatives = [
        lowercaseQuery,
        lowercaseQuery.replace(/-/g, ' '),
        lowercaseQuery.replace(/\s+/g, '-'),
        lowercaseQuery.replace(/\s+/g, '')
      ]

      console.log("Alternatives de recherche:", queryAlternatives)

      filtered = filtered.filter(product => {
        const title = product.title.toLowerCase()
        const description = product.description?.toLowerCase() || ''
        const vendor = product.vendor?.toLowerCase() || ''
        const productType = product.productType?.toLowerCase() || ''
        const tags = product.tags?.map(t => t.toLowerCase()) || []
        const variantTitles = product.variants.edges.map(edge => edge.node.title.toLowerCase())

        const productValues = [
          title,
          title.replace(/-/g, ' '),
          title.replace(/\s+/g, '-'),
          title.replace(/\s+/g, ''),
          description,
          vendor,
          productType,
          ...tags,
          ...variantTitles
        ]

        const matches = queryAlternatives.some(query =>
          productValues.some(value => value.includes(query))
        )

        if (lowercaseQuery === "accélérateur xiaomi - noir" ||
            lowercaseQuery === "accélérateur xiaomi noir") {
          const isXiaomi = (title.includes("xiaomi") || vendor.includes("xiaomi"))
          const isAccelerateur = title.includes("accélérateur")
          const isNoir = (title.includes("noir") || variantTitles.some(t => t.includes("noir")))

          const specialMatch = isXiaomi && isAccelerateur && isNoir
          if (specialMatch) {
            console.log("Trouvé spécifiquement:", product.title, product.id)
          }
          return specialMatch
        }

        if (matches) {
          console.log("Produit correspondant trouvé:", product.title, "- ID:", product.id)
        }

        return matches
      })

      console.log("Après recherche textuelle:", filtered.length, "produits")
    }

    if (searchTags.length > 0) {
      console.log("Filtrage par tags:", searchTags)
      filtered = filtered.filter(product => {
        return searchTags.some(tag => {
          const productTags = product.tags || []
          const productType = product.productType || ''
          const vendor = product.vendor || ''

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

    if (priceRange[0] > 0 || priceRange[1] < 20000) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.priceRange.minVariantPrice.amount)
        return price >= priceRange[0] && price <= priceRange[1]
      })
      console.log("Après filtrage par prix:", filtered.length, "produits")
    }

    if (categories.length > 0) {
      filtered = filtered.filter(product => {
        return categories.some(category =>
          product.productType === category ||
          (product.tags && product.tags.includes(category))
        )
      })
      console.log("Après filtrage par catégorie:", filtered.length, "produits")
    }

    if (inStockOnly) {
      filtered = filtered.filter(product => {
        return product.availableForSale === true ||
               product.variants.edges.some(edge => edge.node.availableForSale)
      })
      console.log("Après filtrage par stock:", filtered.length, "produits")
    }

    console.log("Résultat final:", filtered.length, "produits")

    if (searchQuery?.toLowerCase().includes("accélérateur xiaomi") && filtered.length === 0) {
      console.warn("ATTENTION: Recherche 'Accélérateur Xiaomi' sans résultats!")
      console.log("Liste complète des produits disponibles:", products.map(p => p.title))
    }

    setFilteredProducts(filtered)
  }

  const handlePageChange = (page: number) => {
    const maxPage = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage))

    if (page < 1) {
      page = 1;
    } else if (page > maxPage) {
      page = maxPage;
    }

    console.log(`Changement de page: ${currentPage} → ${page} (max: ${maxPage})`);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Modification pour charger plus d'articles
  const handleLoadMore = () => {
    const nextProducts = filteredProducts.slice(
      displayedProducts.length,
      displayedProducts.length + productsPerPage
    )

    setDisplayedProducts([...displayedProducts, ...nextProducts])
    setShowLoadMore(displayedProducts.length + nextProducts.length < filteredProducts.length)
  }

  // Changer le nombre d'articles par page
  const handleChangeProductsPerPage = (value: number) => {
    setProductsPerPage(value)
    setCurrentPage(1) // Réinitialiser à la première page lors du changement
  }

  const renderPageSizeSelector = () => {
    return (
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-xs text-gray-500">Articles par page:</span>
        <div className="flex bg-black/20 p-0.5 rounded-md">
          {[9, 18, 27, 36].map((size) => (
            <button
              key={size}
              onClick={() => handleChangeProductsPerPage(size)}
              className={`px-2.5 py-1 text-xs rounded ${
                productsPerPage === size
                  ? 'bg-primary text-white font-medium'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderPagination = () => {
    if (filteredProducts.length <= productsPerPage) return null;

    const maxPage = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

    // Pour afficher un nombre raisonnable de boutons de page
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(maxPage, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="mt-10 flex flex-col">
        {renderPageSizeSelector()}

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="sm:inline">Précédent</span>
          </Button>

          <div className="hidden sm:flex space-x-1">
            {startPage > 1 && (
              <>
                <Button
                  variant={currentPage === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(1)}
                  className="w-9 p-0"
                >
                  1
                </Button>
                {startPage > 2 && <span className="mx-1 self-center">...</span>}
              </>
            )}

            {pages.map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-9 p-0"
              >
                {page}
              </Button>
            ))}

            {endPage < maxPage && (
              <>
                {endPage < maxPage - 1 && <span className="mx-1 self-center">...</span>}
                <Button
                  variant={currentPage === maxPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(maxPage)}
                  className="w-9 p-0"
                >
                  {maxPage}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === maxPage}
          >
            <span className="sm:inline">Suivant</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {showLoadMore && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="mx-auto"
            >
              Afficher plus d'articles
            </Button>
          </div>
        )}
      </div>
    );
  };

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

  const generateMockProducts = (): Product[] => {
    console.log("[Boutique] Génération de produits simulés");

    const mockProducts: Product[] = [
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

      <main className="container mx-auto px-4 pt-20 sm:pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-6 sm:py-12"
        >
          <div className="flex flex-col items-center mb-8 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              {tagFilter ? `${tagFilter}s` : "Notre Collection"}
            </h1>
            <div className="w-full max-w-3xl">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {tagFilter && (
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  {tagFilter}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTagFilter(null);
                    setSearchTags([]);
                    filterProducts();
                    // Mise à jour de l'URL sans rechargement de page
                    if (typeof window !== 'undefined') {
                      const url = new URL(window.location.href);
                      url.searchParams.delete('tag');
                      window.history.pushState({}, '', url);
                    }
                  }}
                  className="h-7 text-xs"
                >
                  Effacer le filtre
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-3xl font-semibold">Boutique</h2>

            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex md:hidden items-center gap-1 rounded-full px-3"
                  >
                    <Filter className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:inline-block">Filtres</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pt-20 w-[85vw] max-w-[320px]">
                  <SheetHeader>
                    <SheetTitle>Filtres</SheetTitle>
                  </SheetHeader>
                  <ProductFilter onFilterChange={handleFilterChange} />
                </SheetContent>
              </Sheet>

              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchInitialProducts('', true)}
                className="flex items-center gap-1 rounded-full px-3"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="sr-only sm:not-sr-only sm:inline-block">Actualiser</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full mt-6">
            <div className="hidden md:block w-full md:w-1/4">
              <ProductFilter
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="flex-1">
              <div className="mb-4 text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
                <span>
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                </span>
                <span className="mt-1 sm:mt-0">
                  Page {currentPage} / {Math.max(1, Math.ceil(filteredProducts.length / productsPerPage))}
                </span>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 sm:h-80 bg-neutral-900/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8 bg-red-500/10 rounded-lg border border-red-500/20">
                  <p className="text-base sm:text-lg text-red-500">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => fetchInitialProducts('', true)}
                  >
                    Réessayer
                  </Button>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-8 sm:py-12 bg-neutral-900/20 rounded-lg border border-neutral-800">
                  <p className="text-lg sm:text-xl mb-2">Aucun produit ne correspond à votre recherche</p>
                  <p className="text-gray-500 text-sm sm:text-base mb-4">Essayez de modifier vos critères de recherche</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchInitialProducts('', true)}
                  >
                    Réinitialiser
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
