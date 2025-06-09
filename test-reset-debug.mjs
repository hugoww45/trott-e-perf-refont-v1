#!/usr/bin/env node

/**
 * Script pour tester et débugger le système de réinitialisation
 * Usage: node test-reset-debug.mjs
 */

const BASE_URL = 'http://localhost:3000'

async function testResetFlow() {
  console.log('🔍 Test de debug du système de réinitialisation\n')

  // Étape 1: Demander une réinitialisation et récupérer les infos de debug
  console.log('1️⃣ Envoi de la demande de réinitialisation...')

  try {
    const resetResponse = await fetch(`${BASE_URL}/api/reset-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com'
      })
    })

    const resetData = await resetResponse.json()

    console.log('📥 Réponse reçue:', JSON.stringify(resetData, null, 2))

    if (!resetResponse.ok) {
      console.log('❌ Échec de l\'envoi:', resetData.error)
      return
    }

    console.log('✅ Demande envoyée avec succès')

    // Si on a des infos de debug (mode développement)
    if (resetData.debug) {
      const { token, customerId, resetUrl } = resetData.debug

      console.log('\n🔧 Informations de debug récupérées:')
      console.log('🔑 Token:', token.substring(0, 8) + '...')
      console.log('👤 Customer ID:', customerId)
      console.log('🔗 URL de réinitialisation:', resetUrl)

      // Étape 2: Tester le lien directement
      console.log('\n2️⃣ Test du lien de réinitialisation...')

      // Simuler la navigation vers la page
      const urlObj = new URL(resetUrl)
      const tokenFromUrl = urlObj.searchParams.get('token')
      const customerIdFromUrl = urlObj.searchParams.get('id')

      console.log('🔍 Paramètres extraits de l\'URL:')
      console.log('   Token:', tokenFromUrl?.substring(0, 8) + '...')
      console.log('   Customer ID:', customerIdFromUrl)

      // Étape 3: Tester la réinitialisation avec ces paramètres
      console.log('\n3️⃣ Test de réinitialisation avec les vrais paramètres...')

      const passwordResponse = await fetch(`${BASE_URL}/api/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerIdFromUrl,
          resetToken: tokenFromUrl,
          password: 'nouveaumotdepasse123'
        })
      })

      const passwordData = await passwordResponse.json()

      console.log('📥 Réponse de réinitialisation:', JSON.stringify(passwordData, null, 2))

      if (passwordResponse.ok && passwordData.success) {
        console.log('🎉 SUCCÈS: Réinitialisation réussie!')
        console.log('✅ Le système fonctionne correctement')
      } else {
        console.log('❌ ÉCHEC: Réinitialisation échouée')
        console.log('📝 Erreur:', passwordData.error)
      }

    } else {
      console.log('\n⚠️  Pas d\'informations de debug disponibles')
      console.log('💡 Vérifiez que NODE_ENV=development')
      console.log('📊 Regardez les logs du serveur pour voir le token généré')
    }

  } catch (error) {
    console.log('❌ Erreur réseau:', error.message)
  }
}

// Exécution
testResetFlow().catch(console.error)
