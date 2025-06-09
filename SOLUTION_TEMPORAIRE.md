# 🔧 Solution Temporaire - Guide de Test

## 🎯 Problèmes Identifiés et Corrigés

### ✅ 1. Email maintenant envoyé pour de vrai
- Le système essaie d'envoyer un vrai email avec Resend
- Fallback vers simulation si échec

### ✅ 2. Recherche de vrais customers Shopify
- Le système cherche maintenant le customer dans Shopify par email
- Utilise le vrai ID Shopify si trouvé

### ✅ 3. Messages d'erreur améliorés
- Plus informatifs et utiles pour l'utilisateur

## 🧪 Comment Tester

### Étape 1: Créer un compte client de test dans Shopify

1. **Via Admin Shopify :**
   - Allez dans votre admin Shopify
   - Clients → Ajouter un client
   - Email: `hugoguttr@gmail.com` (ou votre email de test)
   - Définissez un mot de passe temporaire
   - Sauvegardez

2. **Via Storefront :**
   - Allez sur votre boutique
   - Créez un compte avec l'email `hugoguttr@gmail.com`

### Étape 2: Tester le reset

1. **Demander reset :**
   ```bash
   curl -X POST http://localhost:3000/api/reset-request \
   -H "Content-Type: application/json" \
   -d '{"email": "hugoguttr@gmail.com"}'
   ```

2. **Vérifier les logs :**
   - Cherchez `✅ Customer trouvé dans Shopify:`
   - Notez l'ID customer réel

3. **Utiliser le lien dans l'email ou les logs**

### Étape 3: Que faire si ça échoue encore

#### Option A: Admin API (Recommandée)
Configurez dans `.env.local` :
```env
SHOPIFY_ADMIN_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SHOPIFY_DOMAIN=9ece60-13.myshopify.com
```

**Comment obtenir le token :**
1. Admin Shopify → Apps → Développer des apps
2. Créer une app privée
3. Admin API access scopes → `write_customers`
4. Installer l'app et copier l'Admin API access token

#### Option B: Vérifier la config Resend
Dans `.env.local` :
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@votre-domaine.com
```

## 📧 Test Email

Si l'email ne s'envoie toujours pas :

1. **Vérifiez la clé Resend :**
   ```bash
   curl -X GET https://api.resend.com/domains \
   -H "Authorization: Bearer your_api_key"
   ```

2. **Testez avec un email simple :**
   ```bash
   curl -X POST https://api.resend.com/emails \
   -H "Authorization: Bearer your_api_key" \
   -H "Content-Type: application/json" \
   -d '{
     "from": "noreply@resend.dev",
     "to": ["hugoguttr@gmail.com"],
     "subject": "Test",
     "text": "Ceci est un test"
   }'
   ```

## 🚀 Résultat Attendu

Une fois le compte créé dans Shopify et la config faite :

1. ✅ Email reçu avec lien de reset
2. ✅ Formulaire de nouveau mot de passe
3. ✅ Mot de passe vraiment changé dans Shopify
4. ✅ Connexion possible avec le nouveau mot de passe

## 📞 Si Problème Persiste

Le système affichera des messages d'aide précis et des suggestions de configuration dans les erreurs.
