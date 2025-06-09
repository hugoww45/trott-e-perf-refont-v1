#!/usr/bin/env node

/**
 * Script de test pour le système de réinitialisation de mot de passe
 * Usage: node test-reset-system.mjs
 */

const BASE_URL = 'http://localhost:3000'

async function testResetRequest() {
  console.log('🧪 Test de demande de réinitialisation...')

  try {
    const response = await fetch(`${BASE_URL}/api/reset-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com'
      })
    })

    const data = await response.json()

    if (response.ok && data.success) {
      console.log('✅ Demande de réinitialisation réussie')
      console.log('📧 Message:', data.message)
      return true
    } else {
      console.log('❌ Échec de la demande:', data.error)
      return false
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message)
    return false
  }
}

async function testTokenValidation() {
  console.log('\n🧪 Test de validation de token...')

  try {
    // Test avec un token invalide
    const response = await fetch(`${BASE_URL}/api/reset-password?token=invalid&id=invalid`)
    const data = await response.json()

    if (!data.valid) {
      console.log('✅ Validation de token invalide fonctionne')
      return true
    } else {
      console.log('❌ La validation devrait échouer pour un token invalide')
      return false
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message)
    return false
  }
}

async function testPasswordReset() {
  console.log('\n🧪 Test de réinitialisation de mot de passe...')

  try {
    const response = await fetch(`${BASE_URL}/api/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: 'gid://shopify/Customer/123456',
        resetToken: 'invalid-token',
        password: 'nouveaumotdepasse123'
      })
    })

    const data = await response.json()

    if (!response.ok && data.error) {
      console.log('✅ Rejet de token invalide fonctionne')
      console.log('📝 Erreur attendue:', data.error)
      return true
    } else {
      console.log('❌ La réinitialisation devrait échouer avec un token invalide')
      return false
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message)
    return false
  }
}

async function runTests() {
  console.log('🚀 Démarrage des tests du système de réinitialisation\n')

  const results = []

  results.push(await testResetRequest())
  results.push(await testTokenValidation())
  results.push(await testPasswordReset())

  const passed = results.filter(Boolean).length
  const total = results.length

  console.log(`\n📊 Résultats: ${passed}/${total} tests réussis`)

  if (passed === total) {
    console.log('🎉 Tous les tests sont passés !')
  } else {
    console.log('⚠️  Certains tests ont échoué')
  }

  console.log('\n📝 Notes:')
  console.log('- Assurez-vous que le serveur Next.js est démarré (npm run dev)')
  console.log('- Configurez vos variables d\'environnement Resend')
  console.log('- Vérifiez les logs du serveur pour plus de détails')
}

// Exécution des tests
runTests().catch(console.error)
