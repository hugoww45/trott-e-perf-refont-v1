"use client"

import { getStorefrontApiUrl, getPublicTokenHeaders } from './server'
import { PRODUCTS_QUERY, PRODUCT_QUERY } from './queries'

export async function fetchProducts() {
  try {
    // Utiliser directement des valeurs hardcodées si les variables d'environnement ne fonctionnent pas
    const apiUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql`;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';

    console.log("Client fetchProducts - URL API:", apiUrl);
    console.log("Client fetchProducts - Token (masqué):", token ? `${token.substring(0, 4)}...${token.substring(token.length - 4)}` : 'manquant');

    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
        variables: { first: 100 }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Erreur API response:", response.status, errText);
      throw new Error(`Erreur API: ${response.status}`);
    }

    const responseData = await response.json();
    if (!responseData.data) {
      console.error("Format de réponse invalide:", responseData);
      throw new Error("Format de réponse invalide");
    }

    return responseData.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchProduct(handle: string) {
  try {
    const apiUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql`;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';

    console.log("Client fetchProduct - URL API:", apiUrl);
    console.log("Client fetchProduct - Handle:", handle);

    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: PRODUCT_QUERY,
        variables: { handle }
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const responseData = await response.json();

    if (!responseData.data) {
      throw new Error("Format de réponse invalide");
    }

    return responseData.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export { getStorefrontApiUrl, getPublicTokenHeaders } from './server'
