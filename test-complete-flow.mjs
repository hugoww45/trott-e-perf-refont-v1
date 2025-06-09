#!/usr/bin/env node

/**
 * Script pour tester le flow complet de réinitialisation
 * Usage: node test-complete-flow.mjs
 */

const BASE_URL = 'http://localhost:3000'

async function testCompleteFlow() {
  console.log('🚀 Test du flow complet de réinitialisation\n')

  // Étape 1: Demander une réinitialisation
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

    if (!resetResponse.ok || !resetData.success) {
      console.log('❌ Échec de l\'envoi:', resetData.error)
      return
    }

    console.log('✅ Demande envoyée avec succès')
    console.log('📧 Message:', resetData.message)

    // Étape 2: Attendre un peu pour simuler le temps de lecture de l'email
    console.log('\n⏳ Simulation d\'un délai...')
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Étape 3: Essayer une réinitialisation avec un token fictif
    console.log('\n2️⃣ Test de réinitialisation avec token fictif...')

    const passwordResponse = await fetch(`${BASE_URL}/api/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: 'gid://shopify/Customer/123456',
        resetToken: 'token-fictif-pour-test',
        password: 'nouveaumotdepasse123'
      })
    })

    const passwordData = await passwordResponse.json()

    if (passwordResponse.ok) {
      console.log('❌ PROBLÈME: La réinitialisation avec un token fictif a réussi (ne devrait pas)')
    } else {
      console.log('✅ Rejet correct du token fictif')
      console.log('📝 Erreur (attendue):', passwordData.error)
    }

    console.log('\n📝 Notes:')
    console.log('- Le token réel est généré lors de l\'envoi de l\'email')
    console.log('- Regardez les logs du serveur pour voir le token généré')
    console.log('- Pour tester vraiment, vous devrez copier le vrai token depuis les logs')

  } catch (error) {
    console.log('❌ Erreur réseau:', error.message)
  }
}

// Fonction pour tester avec un token réel (à remplir manuellement)
async function testWithRealToken(token, customerId) {
  console.log('\n🔧 Test avec token réel...')
  console.log('Token:', token.substring(0, 8) + '...')
  console.log('Customer ID:', customerId)

  try {
    const response = await fetch(`${BASE_URL}/api/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        resetToken: token,
        password: 'nouveaumotdepasse123'
      })
    })

    const data = await response.json()

    if (response.ok && data.success) {
      console.log('✅ Réinitialisation réussie avec token réel')
      console.log('🎉 Message:', data.message)
    } else {
      console.log('❌ Échec avec token réel:', data.error)
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message)
  }
}

// Exécution
testCompleteFlow().then(() => {
  console.log('\n💡 Pour tester avec un vrai token:')
  console.log('1. Regardez les logs du serveur après avoir envoyé un email')
  console.log('2. Copiez le token généré et le customer ID')
  console.log('3. Exécutez: testWithRealToken("token-complet", "customer-id")')
}).catch(console.error)
