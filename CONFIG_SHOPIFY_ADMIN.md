# 🔧 Configuration Admin API Shopify - Guide Complet

## 🎯 Variables à Ajouter dans .env.local

```env
# Admin API Shopify (OBLIGATOIRE pour réinitialisation mot de passe)
SHOPIFY_ADMIN_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SHOPIFY_DOMAIN=9ece60-13.myshopify.com

# Email Resend (OBLIGATOIRE)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@votre-domaine.com

# URL du site (optionnel, par défaut localhost:3000)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📝 Étapes de Configuration

### 1. Créer une App Privée dans Shopify

1. **Accédez à votre Admin Shopify**
   - Allez sur : `https://9ece60-13.myshopify.com/admin`

2. **Apps → Développer des apps**
   - Cliquez sur "Développer des apps"
   - Puis "Créer une app"

3. **Nom de l'app**
   - Nom : "Reset Password System"
   - Description : "Système de réinitialisation de mot de passe"

### 2. Configurer les Permissions

1. **Admin API access scopes**
   - Cliquez sur "Configurer les scopes Admin API"
   - Cochez `write_customers` (obligatoire)
   - Optionnel : `read_customers` pour les logs

2. **Installer l'app**
   - Cliquez sur "Installer l'app"
   - Confirmez l'installation

### 3. Récupérer le Token

1. **Admin API access token**
   - Après installation, copiez l'"Admin API access token"
   - Il commence par `shpat_`
   - Ajoutez-le dans `.env.local` comme `SHOPIFY_ADMIN_TOKEN`

### 4. Configurer Resend

1. **Créer un compte Resend**
   - Allez sur [resend.com](https://resend.com)
   - Créez un compte gratuit

2. **Récupérer la clé API**
   - Dashboard → API Keys → Create API Key
   - Copiez la clé (commence par `re_`)

3. **Configurer un domaine (optionnel)**
   - Pour production : ajoutez votre domaine
   - Pour développement : utilisez `noreply@resend.dev`

## 🧪 Test de Configuration

### 1. Vérifier l'Admin API

```bash
curl -X GET "https://9ece60-13.myshopify.com/admin/api/2023-10/customers.json?limit=1" \
-H "X-Shopify-Access-Token: VOTRE_TOKEN_ADMIN" \
-H "Content-Type: application/json"
```

**Réponse attendue :** Liste des customers ou message d'erreur clair

### 2. Vérifier Resend

```bash
curl -X POST "https://api.resend.com/emails" \
-H "Authorization: Bearer VOTRE_RESEND_API_KEY" \
-H "Content-Type: application/json" \
-d '{
  "from": "noreply@resend.dev",
  "to": ["votre-email@example.com"],
  "subject": "Test",
  "text": "Test de configuration Resend"
}'
```

### 3. Créer un Customer de Test

Dans votre Admin Shopify :
1. Clients → Ajouter un client
2. Email : `hugoguttr@gmail.com`
3. Mot de passe temporaire : `temppass123`
4. Sauvegardez

## 🚀 Test Complet du Système

```bash
# 1. Demander reset
curl -X POST http://localhost:3000/api/reset-request \
-H "Content-Type: application/json" \
-d '{"email": "hugoguttr@gmail.com"}'

# 2. Vérifier les logs - vous devriez voir :
# ✅ Customer trouvé: {id: "gid://shopify/Customer/123", email: "hugoguttr@gmail.com"}
# ✅ Email envoyé avec succès à: hugoguttr@gmail.com

# 3. Utiliser le lien reçu par email
# 4. Entrer un nouveau mot de passe
# 5. Se connecter avec le nouveau mot de passe
```

## 🔍 Résolution de Problèmes

### ❌ "Variables d'environnement manquantes"
- Vérifiez que `SHOPIFY_ADMIN_TOKEN` et `SHOPIFY_DOMAIN` sont dans `.env.local`
- Redémarrez le serveur `npm run dev`

### ❌ "Erreur d'authentification avec Shopify"
- Vérifiez que le token Admin API est correct
- Vérifiez que l'app a les permissions `write_customers`

### ❌ "Customer non trouvé"
- Créez un customer de test dans l'Admin Shopify
- Utilisez exactement le même email

### ❌ "Impossible d'envoyer l'email"
- Vérifiez la clé Resend
- Vérifiez l'email expéditeur (utilisez `noreply@resend.dev` pour les tests)

## ✅ Résultat Attendu

Une fois configuré :
1. 📧 **Email reçu** avec lien de réinitialisation
2. 🔑 **Nouveau mot de passe** accepté et enregistré
3. 🚀 **Connexion possible** avec le nouveau mot de passe

**Plus de simulation - tout fonctionne vraiment !** 🎉
