import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client';
import { CREATE_CART_MUTATION, ADD_TO_CART_MUTATION, UPDATE_CART_MUTATION, REMOVE_FROM_CART_MUTATION, GET_CART_QUERY } from '@/lib/shopify/queries';

interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode?: string;
    };
    product: {
      title: string;
      images: {
        edges: Array<{
          node: {
            url: string;
          };
        }>;
      };
    };
  };
}

interface CartState {
  cartId: string | null;
  items: CartItem[];
  totalQuantity: number;
  subtotalAmount: string;
  totalAmount: string;
  checkoutUrl: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  customerAccessToken: string | null;
  createCart: () => Promise<string | null>;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateCartItem: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  fetchCart: () => Promise<void>;
  setCustomerAccessToken: (token: string | null) => Promise<void>;
  initialize: () => Promise<void>;
}

// Fonction utilitaire pour gérer les requêtes API en toute sécurité
const safelyParseResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Error parsing JSON:', e, 'Raw response:', text);
    throw new Error('Failed to parse server response');
  }
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      items: [],
      totalQuantity: 0,
      subtotalAmount: '0',
      totalAmount: '0',
      checkoutUrl: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      customerAccessToken: null,

      initialize: async () => {
        const token = localStorage.getItem('customerAccessToken');
        if (token) {
          await get().setCustomerAccessToken(token);
        }
      },

      setCustomerAccessToken: async (token: string | null) => {
        set({
          customerAccessToken: token,
          isAuthenticated: !!token,
          isLoading: true,
          error: null
        });

        if (token) {
          localStorage.setItem('customerAccessToken', token);
          try {
            // Récupérer le cartId sauvegardé
            const savedCartId = localStorage.getItem('cartId');
            if (savedCartId) {
              set({ cartId: savedCartId });
              await get().fetchCart();
            } else {
              // Créer un nouveau panier si aucun n'existe
              await get().createCart();
            }
          } catch (error) {
            console.error('Erreur lors de la récupération du panier:', error);
            set({ error: 'Erreur lors de la récupération du panier' });
          }
        } else {
          localStorage.removeItem('customerAccessToken');
          localStorage.removeItem('cartId');
          set({
            cartId: null,
            items: [],
            totalQuantity: 0,
            subtotalAmount: '0',
            totalAmount: '0',
            checkoutUrl: null
          });
        }
        set({ isLoading: false });
      },

      createCart: async () => {
        const { customerAccessToken } = get();

        set({ isLoading: true, error: null });
        try {
          const response = await fetch(getStorefrontApiUrl(), {
            method: 'POST',
            headers: getPublicTokenHeaders(),
            body: JSON.stringify({
              query: CREATE_CART_MUTATION,
              variables: {
                input: customerAccessToken ? {
                  buyerIdentity: {
                    customerAccessToken
                  }
                } : {}
              }
            })
          });

          const { data, errors } = await safelyParseResponse(response);
          if (errors) {
            throw new Error(errors[0].message);
          }

          if (data?.cartCreate?.cart) {
            const { id, checkoutUrl } = data.cartCreate.cart;
            set({ cartId: id, checkoutUrl });
            localStorage.setItem('cartId', id);
            return id;
          }
          return null;
        } catch (error) {
          console.error('Error creating cart:', error);
          set({ error: 'Erreur lors de la création du panier' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      addToCart: async (variantId: string, quantity: number) => {
        const { isAuthenticated } = get();

        // Vérifier si l'utilisateur est authentifié
        if (!isAuthenticated) {
          set({ error: 'Veuillez vous connecter pour ajouter des produits au panier' });
          throw new Error('Authentification requise');
        }

        set({ isLoading: true, error: null });
        try {
          let { cartId, items } = get();

          if (!cartId) {
            cartId = await get().createCart();
          }

          if (!cartId) throw new Error('Impossible de créer le panier');

          const existingItem = items.find(item => item.merchandise.id === variantId);

          if (existingItem) {
            await get().updateCartItem(existingItem.id, existingItem.quantity + quantity);
          } else {
            const response = await fetch(getStorefrontApiUrl(), {
              method: 'POST',
              headers: getPublicTokenHeaders(),
              body: JSON.stringify({
                query: ADD_TO_CART_MUTATION,
                variables: {
                  cartId,
                  lines: [{ merchandiseId: variantId, quantity }]
                }
              })
            });

            const { data, errors } = await safelyParseResponse(response);
            if (errors) {
              throw new Error(errors[0].message);
            }

            if (data?.cartLinesAdd?.cart) {
              await get().fetchCart();
            }
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
          set({ error: "Erreur lors de l'ajout au panier" });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      updateCartItem: async (lineId: string, quantity: number) => {
        const { isAuthenticated } = get();

        // Vérifier si l'utilisateur est authentifié
        if (!isAuthenticated) {
          set({ error: 'Veuillez vous connecter pour modifier votre panier' });
          throw new Error('Authentification requise');
        }

        set({ isLoading: true, error: null });
        try {
          const { cartId } = get();
          if (!cartId) throw new Error('Panier non trouvé');

          const response = await fetch(getStorefrontApiUrl(), {
            method: 'POST',
            headers: getPublicTokenHeaders(),
            body: JSON.stringify({
              query: UPDATE_CART_MUTATION,
              variables: {
                cartId,
                lines: [{ id: lineId, quantity }]
              }
            })
          });

          const { data, errors } = await safelyParseResponse(response);
          if (errors) {
            throw new Error(errors[0].message);
          }

          if (data?.cartLinesUpdate?.cart) {
            await get().fetchCart();
          }
        } catch (error) {
          console.error('Error updating cart item:', error);
          set({ error: 'Erreur lors de la mise à jour du panier' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      removeFromCart: async (lineId: string) => {
        const { isAuthenticated } = get();

        // Vérifier si l'utilisateur est authentifié
        if (!isAuthenticated) {
          set({ error: 'Veuillez vous connecter pour modifier votre panier' });
          throw new Error('Authentification requise');
        }

        set({ isLoading: true, error: null });
        try {
          const { cartId } = get();
          if (!cartId) throw new Error('Panier non trouvé');

          const response = await fetch(getStorefrontApiUrl(), {
            method: 'POST',
            headers: getPublicTokenHeaders(),
            body: JSON.stringify({
              query: REMOVE_FROM_CART_MUTATION,
              variables: {
                cartId,
                lineIds: [lineId]
              }
            })
          });

          const { data, errors } = await safelyParseResponse(response);
          if (errors) {
            throw new Error(errors[0].message);
          }

          if (data?.cartLinesRemove?.cart) {
            await get().fetchCart();
          }
        } catch (error) {
          console.error('Error removing cart item:', error);
          set({ error: 'Erreur lors de la suppression du produit' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const cartId = get().cartId || localStorage.getItem('cartId');
          if (!cartId) return;

          const response = await fetch(getStorefrontApiUrl(), {
            method: 'POST',
            headers: getPublicTokenHeaders(),
            body: JSON.stringify({
              query: GET_CART_QUERY,
              variables: { cartId }
            })
          });

          const { data, errors } = await safelyParseResponse(response);
          if (errors) {
            throw new Error(errors[0].message);
          }

          if (data?.cart) {
            const { lines, totalQuantity, cost, checkoutUrl } = data.cart;
            set({
              items: lines.edges.map((edge: any) => edge.node),
              totalQuantity,
              subtotalAmount: cost.subtotalAmount.amount,
              totalAmount: cost.totalAmount.amount,
              checkoutUrl
            });
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
          set({ error: 'Erreur lors du chargement du panier' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cartId: state.cartId,
        customerAccessToken: state.customerAccessToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
