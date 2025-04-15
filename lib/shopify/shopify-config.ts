/**
 * Récupère le domaine Shopify à partir des variables d'environnement
 */
export function getShopifyDomain(): string {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

  if (!domain) {
    throw new Error('Le domaine Shopify n\'est pas configuré. Veuillez définir NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN dans vos variables d\'environnement.');
  }

  return domain;
}

/**
 * Récupère l'URL de redirection pour la réinitialisation de mot de passe
 */
export function getPasswordResetRedirectUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${baseUrl}/reset-password`;
}
