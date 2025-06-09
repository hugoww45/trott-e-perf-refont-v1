# 🔐 Système de Réinitialisation de Mot de Passe

Ce système permet aux utilisateurs de réinitialiser leur mot de passe via un lien sécurisé envoyé par email.

## 📋 Fonctionnalités

- ✅ Formulaire de demande de réinitialisation (`/auth/mot-de-passe-oublie`)
- ✅ Génération de tokens sécurisés avec expiration (1 heure)
- ✅ Envoi d'emails HTML avec Resend
- ✅ Page de réinitialisation sécurisée (`/auth/nouveau-mot-de-passe`)
- ✅ Validation des mots de passe
- ✅ Intégration avec la Storefront API de Shopify
- ✅ Design moderne avec Tailwind CSS et ShadCN

## 🚀 Configuration

### Variables d'environnement requises

```env
# Configuration Shopify
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token

# Configuration Resend pour l'envoi d'emails
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=noreply@votre-domaine.com

# URL de votre site (pour les liens de réinitialisation)
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

### Configuration Resend

1. Créez un compte sur [Resend](https://resend.com)
2. Obtenez votre clé API
3. Configurez votre domaine d'envoi
4. Ajoutez les variables d'environnement

## 📁 Structure des fichiers

```
app/
├── auth/
│   ├── mot-de-passe-oublie/
│   │   └── page.tsx                 # Formulaire de demande
│   └── nouveau-mot-de-passe/
│       └── page.tsx                 # Formulaire de réinitialisation
├── api/
│   ├── reset-request/
│   │   └── route.ts                 # API de demande de réinitialisation
│   └── reset-password/
│       └── route.ts                 # API de réinitialisation
emails/
└── ResetPassword.tsx                # Template d'email React
```

## 🔄 Flow utilisateur

1. **Demande de réinitialisation**
   - L'utilisateur va sur `/auth/mot-de-passe-oublie`
   - Il saisit son email
   - Le système génère un token sécurisé
   - Un email est envoyé avec le lien de réinitialisation

2. **Réinitialisation**
   - L'utilisateur clique sur le lien dans l'email
   - Il arrive sur `/auth/nouveau-mot-de-passe?token=XXX&id=YYY`
   - Il saisit son nouveau mot de passe
   - Le système valide le token et met à jour le mot de passe

## 🔧 API Endpoints

### POST `/api/reset-request`

Demande de réinitialisation de mot de passe.

**Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Instructions de réinitialisation envoyées par email"
}
```

### POST `/api/reset-password`

Réinitialisation effective du mot de passe.

**Body:**
```json
{
  "customerId": "gid://shopify/Customer/123456",
  "resetToken": "uuid-token",
  "password": "nouveau-mot-de-passe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mot de passe réinitialisé avec succès",
  "customer": {
    "id": "gid://shopify/Customer/123456",
    "email": "user@example.com"
  }
}
```

### GET `/api/reset-password?token=XXX&id=YYY`

Vérification de la validité d'un token (optionnel).

## 🎨 Personnalisation

### Template d'email

Le template d'email se trouve dans `emails/ResetPassword.tsx`. Vous pouvez le personnaliser :

- Couleurs et design
- Logo de votre marque
- Messages personnalisés
- Styles CSS inline

### Pages frontend

Les pages utilisent les composants ShadCN et Tailwind CSS :

- `app/auth/mot-de-passe-oublie/page.tsx`
- `app/auth/nouveau-mot-de-passe/page.tsx`

## 🔒 Sécurité

- **Tokens expirés** : Les tokens expirent après 1 heure
- **Usage unique** : Chaque token ne peut être utilisé qu'une seule fois
- **Validation** : Validation côté client et serveur
- **Nettoyage automatique** : Les tokens expirés sont supprimés automatiquement

## 🚨 Mode développement

En mode développement, si l'API Shopify échoue, le système simule un succès pour faciliter les tests.

## 📝 Notes importantes

1. **Stockage des tokens** : Actuellement en mémoire (Map). En production, utilisez Redis ou une base de données.

2. **Customer ID** : Le système génère actuellement des IDs fictifs. En production, utilisez l'Admin API pour récupérer les vrais IDs.

3. **Domaine d'envoi** : Configurez votre domaine dans Resend pour éviter que les emails finissent en spam.

## 🐛 Dépannage

### Les emails ne sont pas envoyés

1. Vérifiez votre clé API Resend
2. Vérifiez que votre domaine est configuré
3. Consultez les logs de l'API

### Les tokens sont invalides

1. Vérifiez que les URLs sont correctement formées
2. Vérifiez l'expiration (1 heure max)
3. Vérifiez que le token n'a pas déjà été utilisé

### Erreurs Shopify

1. Vérifiez vos tokens d'accès Storefront
2. Vérifiez les permissions de votre app Shopify
3. Consultez la documentation Shopify GraphQL

## 🎯 Améliorations possibles

- [ ] Stockage persistant des tokens (Redis/DB)
- [ ] Intégration avec l'Admin API pour les vrais customer IDs
- [ ] Rate limiting pour éviter le spam
- [ ] Logs d'audit des réinitialisations
- [ ] Support multi-langues
- [ ] Tests automatisés
