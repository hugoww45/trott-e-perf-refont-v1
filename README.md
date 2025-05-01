# Trott-E-Perf Site Web

Ce repository contient le site web de Trott-E-Perf, une entreprise de trottinettes électriques.

## Configuration des variables d'environnement

Pour que toutes les fonctionnalités du site fonctionnent correctement, vous devez configurer certaines variables d'environnement. Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```
# Variables d'environnement pour l'API Admin de Shopify
# Nécessaires pour la suppression de compte client

# La clé d'API Admin de Shopify (Private App API Key)
SHOPIFY_ADMIN_API_KEY=votre_api_key_ici

# Le mot de passe de l'API Admin (Private App Password)
SHOPIFY_ADMIN_PASSWORD=votre_mot_de_passe_ici

# Le domaine de votre boutique Shopify (sans https://)
SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com

# Variables d'environnement publiques pour l'API Storefront de Shopify
# Ces variables sont accessibles côté client
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=votre_token_storefront_ici
```

### Configuration d'une Private App sur Shopify

Pour obtenir les identifiants nécessaires pour l'API Admin Shopify, suivez ces étapes :

1. Allez dans l'administration de votre boutique Shopify
2. Accédez à "Apps" dans le menu de gauche
3. En bas de la page, cliquez sur "Manage private apps"
4. Cliquez sur "Create new private app"
5. Donnez un nom à votre application (ex: "Site Web Trott-E-Perf")
6. Dans la section "Admin API Permissions", assurez-vous de donner les permissions suivantes :
   - Customers: Read and write
7. Cliquez sur "Save" pour créer l'application
8. Copiez l'API Key et le Password générés dans votre fichier .env.local

### Configuration de l'API Storefront de Shopify

Pour obtenir le token Storefront API de Shopify, suivez ces étapes :

1. Allez dans l'administration de votre boutique Shopify
2. Accédez à "Apps" dans le menu de gauche
3. Cliquez sur "Develop apps" puis "Create an app"
4. Donnez un nom à votre application (ex: "Trott-E-Perf Storefront")
5. Une fois l'application créée, allez dans "API credentials"
6. Dans la section "Storefront API", cliquez sur "Configure"
7. Sélectionnez toutes les permissions nécessaires (au minimum "Customers" et "Customer account")
8. Cliquez sur "Save" puis copiez le "Storefront API access token" dans votre fichier .env.local

## Installation

Pour installer et exécuter ce site localement :

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Fonctionnalités principales

- Catalogue de produits synchronisé avec Shopify
- Compte client avec gestion des commandes
- Page de support avec information sur les différentes pièces
- Pages légales (Mentions légales, Conditions générales, etc.)
- Système de financement pour les trottinettes

## Fonctionnalités en cours de développement

⚠️ **Note importante** : Les fonctionnalités suivantes sont actuellement en cours de développement et ne sont pas pleinement opérationnelles en raison de bugs majeurs :

1. **Suppression de compte utilisateur** - La fonction est implémentée mais rencontre des problèmes avec l'API Shopify. Un correctif est en cours de développement.

2. **Synchronisation des commandes en temps réel** - Cette fonctionnalité présente des limitations dues aux restrictions de l'API Shopify et est en cours de refactorisation.

3. **Simulateur de financement interactif** - Des problèmes de calcul des taux et des mensualités sont en cours de résolution.

4. **Système de notifications** - Le service de notifications par email et SMS rencontre des problèmes d'intégration et sera disponible dans une prochaine mise à jour.

Nous travaillons activement à résoudre ces problèmes pour rendre ces fonctionnalités pleinement opérationnelles dans les plus brefs délais.
