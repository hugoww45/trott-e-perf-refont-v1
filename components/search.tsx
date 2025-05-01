import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOnClickOutside } from '@/lib/hooks/use-click-outside';
import { motion, AnimatePresence } from 'framer-motion';

// Définition du type de résultat de recherche
interface SearchResult {
  type: 'product' | 'category' | 'brand' | 'page';
  title: string;
  url: string;
  description?: string;
  image?: string;
}

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
  { type: 'brand', title: 'Minimotors', url: '/boutique?q=minimotors' },
  { type: 'brand', title: 'Currus', url: '/boutique?q=currus' },
];

// Produits populaires
const popularProducts = [
  { type: 'product', title: 'Trottinette Xiaomi Pro 2', url: '/boutique?q=xiaomi+pro+2' },
  { type: 'product', title: 'Accélérateur Xiaomi', url: '/boutique?q=accelerateur+xiaomi' },
  { type: 'product', title: 'Batterie de rechange', url: '/boutique?q=batterie+rechange' },
  { type: 'product', title: 'Casque de protection', url: '/boutique?q=casque+protection' },
];

// Fonction pour rechercher dans toutes les sources
function searchAll(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();

  console.log("Recherche pour:", normalizedQuery);

  // Rechercher dans le contenu du site
  const contentResults = siteContent
    .filter(item =>
      item.title.toLowerCase().includes(normalizedQuery)
    )
    .map(item => ({
      type: item.type as 'page' | 'category',
      title: item.title,
      url: item.url
    }));

  // Rechercher dans les marques
  const brandResults = popularBrands
    .filter(brand =>
      brand.title.toLowerCase().includes(normalizedQuery)
    )
    .map(brand => ({
      type: 'brand' as const,
      title: brand.title,
      url: brand.url
    }));

  // Rechercher dans les produits
  const productResults = popularProducts
    .filter(product =>
      product.title.toLowerCase().includes(normalizedQuery)
    )
    .map(product => ({
      type: 'product' as const,
      title: product.title,
      url: product.url
    }));

  // Combiner tous les résultats
  const allResults = [...productResults, ...brandResults, ...contentResults];
  console.log("Résultats trouvés:", allResults.length);

  return allResults;
}

interface SearchProps {
  className?: string;
}

export function Search({ className }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchInfo, setShowSearchInfo] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fermer le panneau de recherche quand on clique en dehors
  useOnClickOutside(searchRef, () => setIsOpen(false));

  // Charger les recherches récentes depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSearches = localStorage.getItem('recentSearches');
      if (savedSearches) {
        try {
          setRecentSearches(JSON.parse(savedSearches).slice(0, 3));
        } catch (e) {
          console.error('Erreur lors du chargement des recherches récentes:', e);
        }
      }
    }
  }, []);

  // Initialiser la recherche avec le paramètre d'URL si présent
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [searchParams]);

  // Sauvegarder la recherche récente
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;

    const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 3);
    setRecentSearches(updatedSearches);

    try {
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (e) {
      console.error('Erreur lors de la sauvegarde des recherches récentes:', e);
    }
  };

  // Rechercher quand la requête change avec debounce
  useEffect(() => {
    // Annuler la recherche précédente si une nouvelle est lancée
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    // Attendre un peu avant de lancer la recherche pour éviter trop de requêtes
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

        if (!response.ok) {
          throw new Error(`Erreur de recherche: ${response.status}`);
        }

        const data = await response.json();
        console.log('Résultats de recherche:', data);

        setResults(data.results || []);
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  // Gérer la sélection d'un résultat
  const handleSelect = (url: string) => {
    console.log("Redirection vers:", url);
    setIsOpen(false);

    // Sauvegarder la recherche si elle contient un paramètre q
    if (url.includes('?q=')) {
      const searchTerm = new URLSearchParams(url.split('?')[1]).get('q');
      if (searchTerm) {
        saveRecentSearch(searchTerm);
      }
    }

    // Vider la requête après la sélection
    setQuery('');

    // Utiliser setTimeout pour s'assurer que la redirection se produit après la fermeture du menu
    setTimeout(() => {
      router.push(url);
    }, 10);
  };

  // Soumettre la recherche
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchTerm = query.trim();

      // Sauvegarder dans les recherches récentes
      saveRecentSearch(searchTerm);

      // Créer l'URL de recherche avec le timestamp pour éviter la mise en cache et forcer le chargement des produits
      const timestamp = Date.now();
      const url = `/boutique?q=${encodeURIComponent(searchTerm)}&t=${timestamp}`;

      console.log("Soumission du formulaire vers:", url);

      setIsOpen(false);

      // Utiliser setTimeout pour s'assurer que la redirection se produit après la fermeture du menu
      setTimeout(() => {
        // Déclencher la recherche en utilisant la méthode push du router
        router.push(url);
      }, 10);
    }
  };

  // Recherches populaires
  const popularSearches = [
    'Xiaomi',
    'Trottinette électrique',
    'Accessoires',
    'Pièces détachées',
    'Accélérateur'
  ];

  return (
    <div className="relative" ref={searchRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          console.log("Ouverture de la recherche");
          setIsOpen(true);
        }}
        className={cn("text-muted-foreground hover:text-foreground", className)}
        aria-label="Rechercher"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Rechercher</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 md:pt-28 px-4">
          <div className="w-full max-w-2xl bg-background rounded-lg shadow-xl border overflow-hidden">
            <form onSubmit={handleSubmit} className="flex items-center border-b px-3">
              <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher des produits, marques..."
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none border-0 focus-visible:ring-0"
                autoFocus
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 p-0"
                  onClick={() => setQuery('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="ml-2"
              >
                Rechercher
              </Button>
              <div className="relative ml-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-1"
                  onClick={() => setIsOpen(false)}
                >
                  Fermer
                </Button>
                <button
                  className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowSearchInfo(!showSearchInfo)}
                  onMouseEnter={() => setShowSearchInfo(true)}
                  onMouseLeave={() => setShowSearchInfo(false)}
                >
                  <Info className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {showSearchInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 p-3 rounded-lg shadow-xl border bg-background text-xs text-muted-foreground w-64 z-50"
                    >
                      <p className="mb-1.5 font-medium">Astuce de recherche</p>
                      <p className="mb-2">Notre moteur de recherche prend en charge plusieurs formats :</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Recherche avec tirets (burn-e)</li>
                        <li>Recherche avec espaces (burn e)</li>
                        <li>Recherche sans séparateurs (burne)</li>
                      </ul>
                      <p className="mt-2">Toutes les combinaisons sont testées pour trouver votre produit !</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>

            <SearchResults
              results={results}
              isLoading={isLoading}
              onSelect={handleSelect}
              query={query}
              popularSearches={popularSearches}
              recentSearches={recentSearches}
            />
          </div>
          <div
            className="fixed inset-0 -z-10 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  onSelect: (url: string) => void;
  popularSearches: string[];
  recentSearches: string[];
}

export function SearchResults({ query, results, isLoading, onSelect, popularSearches, recentSearches }: SearchResultsProps) {
  console.log("SearchResults - Query:", query, "Results:", results.length);

  // Si aucune requête ou requête trop courte
  if (query.length < 2) {
    return (
      <div className="p-4">
        {/* Recherches récentes si disponibles */}
        {recentSearches.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 text-xs font-medium text-muted-foreground">Recherches récentes</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, i) => (
                <Button
                  key={`recent-${i}`}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs hover:bg-muted"
                  onClick={() => {
                    // Ajouter le timestamp pour forcer le rafraîchissement des résultats
                    const timestamp = Date.now();
                    onSelect(`/boutique?q=${encodeURIComponent(term)}&t=${timestamp}`);
                  }}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}

        <h3 className="mb-2 text-xs font-medium text-muted-foreground">Recherches populaires</h3>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((tag, i) => (
            <Badge
              key={`popular-${i}`}
              variant="outline"
              className="cursor-pointer hover:bg-muted"
              onClick={() => {
                // Ajouter le timestamp pour forcer le rafraîchissement des résultats
                const timestamp = Date.now();
                onSelect(`/boutique?q=${encodeURIComponent(tag)}&t=${timestamp}`);
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-muted"></div>
              <div className="h-4 w-2/3 rounded bg-muted"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Aucun résultat
  if (results.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">Aucun résultat pour "{query}"</p>
        <Button
          onClick={() => {
            // Ajouter le timestamp pour forcer le rafraîchissement des résultats
            const timestamp = Date.now();
            onSelect(`/boutique?q=${encodeURIComponent(query)}&t=${timestamp}`);
          }}
          variant="outline"
          className="mt-2"
        >
          Voir tous les produits
        </Button>
      </div>
    );
  }

  // Grouper les résultats par type
  const productResults = results.filter(r => r.type === 'product');
  const brandResults = results.filter(r => r.type === 'brand');
  const categoryResults = results.filter(r => r.type === 'category');
  const pageResults = results.filter(r => r.type === 'page');

  return (
    <div className="max-h-96 overflow-y-auto p-2">
      {/* Produits */}
      {productResults.length > 0 && (
        <div className="mb-3">
          <h3 className="mb-1 px-2 text-xs font-medium text-muted-foreground">Produits</h3>
          <div className="space-y-1">
            {productResults.map((result, index) => (
              <div
                key={`product-${index}`}
                className="flex cursor-pointer items-center rounded-md px-2 py-1.5 hover:bg-muted"
                onClick={() => onSelect(result.url)}
              >
                <SearchIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{result.title}</div>
                  {result.description && (
                    <div className="text-xs text-muted-foreground">
                      {result.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marques */}
      {brandResults.length > 0 && (
        <div className="mb-3">
          <h3 className="mb-1 px-2 text-xs font-medium text-muted-foreground">Marques</h3>
          <div className="space-y-1">
            {brandResults.map((result, index) => (
              <div
                key={`brand-${index}`}
                className="flex cursor-pointer items-center rounded-md px-2 py-1.5 hover:bg-muted"
                onClick={() => onSelect(result.url)}
              >
                <Badge className="mr-2" variant="outline">Marque</Badge>
                <span>{result.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Catégories */}
      {categoryResults.length > 0 && (
        <div className="mb-3">
          <h3 className="mb-1 px-2 text-xs font-medium text-muted-foreground">Catégories</h3>
          <div className="space-y-1">
            {categoryResults.map((result, index) => (
              <div
                key={`category-${index}`}
                className="flex cursor-pointer items-center rounded-md px-2 py-1.5 hover:bg-muted"
                onClick={() => onSelect(result.url)}
              >
                <Badge className="mr-2" variant="outline">Catégorie</Badge>
                <span>{result.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pages */}
      {pageResults.length > 0 && (
        <div className="mb-3">
          <h3 className="mb-1 px-2 text-xs font-medium text-muted-foreground">Pages</h3>
          <div className="space-y-1">
            {pageResults.map((result, index) => (
              <div
                key={`page-${index}`}
                className="flex cursor-pointer items-center rounded-md px-2 py-1.5 hover:bg-muted"
                onClick={() => onSelect(result.url)}
              >
                <SearchIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{result.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lien pour voir tous les résultats */}
      <div className="mt-3 border-t pt-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={() => {
            // Ajouter le timestamp pour forcer le rafraîchissement des résultats
            const timestamp = Date.now();
            onSelect(`/boutique?q=${encodeURIComponent(query)}&t=${timestamp}`);
          }}
        >
          <SearchIcon className="mr-2 h-4 w-4" />
          Voir tous les résultats pour "{query}"
        </Button>
      </div>
    </div>
  );
}
