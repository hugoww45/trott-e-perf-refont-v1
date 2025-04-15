import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer } from '@/lib/shopify/types';

interface AuthStore {
  accessToken: string | null;
  customer: Customer | null;
  setAccessToken: (token: string | null) => void;
  setCustomer: (customer: Customer | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      customer: null,
      setAccessToken: (token) => {
        localStorage.setItem('accessToken', token || '');
        set({ accessToken: token });

        // Synchroniser avec le customerAccessToken dans localStorage
        // pour que le cart store puisse le récupérer
        if (token) {
          localStorage.setItem('customerAccessToken', token);
        } else {
          localStorage.removeItem('customerAccessToken');
        }
      },
      setCustomer: (customer) => {
        localStorage.setItem('customer', JSON.stringify(customer));
        set({ customer });
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('customer');
        localStorage.removeItem('customerAccessToken');
        localStorage.removeItem('cartId');
        set({ accessToken: null, customer: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
