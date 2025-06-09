# 🔐 Problème de Réinitialisation de Mot de Passe - Guide de Debug

## 🚨 Problème Identifié

Le système de réinitialisation de mot de passe rencontre une erreur Shopify :
```
Shopify API call failed: TypeError: Cannot read properties of null (reading 'customer')
```

### 🔍 Cause Racine

Le problème vient du fait que nous essayons d'utiliser la mutation `customerReset` de Shopify avec un token généré côté serveur. Shopify s'attend à ce que le token provienne de sa propre mutation `customerRecover`.

## 💡 Solution Temporaire (Mode Développement)

**En mode développement**, le système simule maintenant le succès de la réinitialisation. Cela signifie :

✅ **Ce qui fonctionne :**
- Validation des tokens personnalisés
- Flow complet de l'interface utilisateur
- Emails de réinitialisation
- Gestion des erreurs et succès

❌ **Ce qui ne fonctionne pas vraiment :**
- Le mot de passe n'est pas réellement changé dans Shopify
- Il faut utiliser l'ancien mot de passe pour se connecter

## 🛠️ Solutions pour la Production

### Option 1: Utiliser l'Admin API Shopify (Recommandée)

```typescript
// Nécessite d'ajouter l'Admin API token dans .env.local
const adminResponse = await fetch(`https://${process.env.SHOPIFY_DOMAIN}/admin/api/2023-07/customers/${customerId}.json`, {
  method: 'PUT',
  headers: {
    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customer: {
      id: customerId,
      password: newPassword,
      password_confirmation: newPassword
    }
  })
})
```

### Option 2: Workflow Shopify Natif

1. Utiliser `customerRecover` pour déclencher l'email Shopify
2. Intercepter/personnaliser l'email via les templates Shopify
3. Utiliser le token Shopify dans `customerReset`

### Option 3: Système d'Auth Personnalisé

Implémenter un système d'authentification complètement séparé de Shopify pour la gestion des mots de passe.

## 🧪 Test en Mode Développement

1. **Générer un lien de reset :**
   ```bash
   curl -X POST http://localhost:3000/api/reset-request \
   -H "Content-Type: application/json" \
   -d '{"email": "test@example.com"}'
   ```

2. **Utiliser le lien généré dans les logs**

3. **Entrer un nouveau mot de passe** (sera simulé)

4. **Se connecter avec l'ANCIEN mot de passe** (le nouveau ne fonctionne pas vraiment)

## 📝 Messages de Debug

En mode développement, vous verrez ces messages :
- `🚨 MODE DÉVELOPPEMENT: Simulation de la réinitialisation réussie`
- `💡 Dans un vrai environnement, cette étape utiliserait l'Admin API de Shopify`
- `Le mot de passe n'a pas été réellement changé. Utilisez votre ancien mot de passe pour vous connecter.`

## 🔧 Configuration Recommandée

Pour un environnement de production, ajoutez dans `.env.local` :

```env
# Admin API pour les changements de mot de passe
SHOPIFY_ADMIN_TOKEN=shpat_xxxxx
SHOPIFY_DOMAIN=votre-boutique.myshopify.com

# Ou utilisez le webhook de réinitialisation Shopify
SHOPIFY_WEBHOOK_SECRET=xxxxx
```

## 📞 Support

Si vous avez besoin d'implémenter la solution de production, les prochaines étapes seraient :

1. Configurer l'Admin API Shopify
2. Modifier l'API `/api/reset-password/route.ts`
3. Tester avec de vrais comptes clients

Le système actuel est parfait pour le développement et les tests d'interface ! 🎯
