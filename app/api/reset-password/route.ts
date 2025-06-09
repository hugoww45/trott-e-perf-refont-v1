import { NextRequest, NextResponse } from 'next/server'
import { validateResetToken, consumeResetToken } from '../reset-request/route'

export async function POST(request: NextRequest) {
  try {
    const { customerId, resetToken, password } = await request.json()

    // Validation des paramètres
    if (!customerId || !resetToken || !password) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      )
    }

    // Validation du mot de passe
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      )
    }

    console.log('🔍 Validation du token de réinitialisation...')

    // Vérification du token
    const tokenData = validateResetToken(resetToken)
    if (!tokenData) {
      return NextResponse.json(
        { error: 'Token de réinitialisation invalide ou expiré' },
        { status: 400 }
      )
    }

    // Vérification que l'ID correspond
    if (tokenData.customerId !== customerId) {
      return NextResponse.json(
        { error: 'Token invalide pour ce customer' },
        { status: 400 }
      )
    }

    console.log('✅ Token valide pour:', tokenData.email)

    // Vérification des variables d'environnement Admin API
    if (!process.env.SHOPIFY_ADMIN_TOKEN || !process.env.SHOPIFY_DOMAIN) {
      console.error('❌ Variables d\'environnement manquantes: SHOPIFY_ADMIN_TOKEN et SHOPIFY_DOMAIN requis')
      return NextResponse.json({
        error: 'Configuration incomplète. Contactez l\'administrateur.',
        details: 'Les clés d\'API Shopify Admin ne sont pas configurées.'
      }, { status: 500 })
    }

    // Extraire l'ID numérique du customer ID Shopify
    const numericCustomerId = customerId.replace('gid://shopify/Customer/', '')
    console.log('🔧 Mise à jour du mot de passe pour le customer ID:', numericCustomerId)

    try {
      // Utilisation de l'Admin API pour changer le mot de passe
      const adminApiUrl = `https://${process.env.SHOPIFY_DOMAIN}/admin/api/2023-10/customers/${numericCustomerId}.json`

      console.log('🔄 Appel Admin API pour mise à jour du mot de passe...')

      const adminResponse = await fetch(adminApiUrl, {
        method: 'PUT',
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            id: parseInt(numericCustomerId),
            password: password,
            password_confirmation: password
          }
        })
      })

      if (!adminResponse.ok) {
        const errorText = await adminResponse.text()
        console.error('❌ Erreur Admin API:', adminResponse.status, adminResponse.statusText, errorText)

        if (adminResponse.status === 404) {
          return NextResponse.json({
            error: 'Customer non trouvé. Veuillez vérifier votre email et réessayer.'
          }, { status: 404 })
        } else if (adminResponse.status === 401) {
          return NextResponse.json({
            error: 'Erreur d\'authentification avec Shopify. Contactez l\'administrateur.'
          }, { status: 500 })
        } else if (adminResponse.status === 422) {
          return NextResponse.json({
            error: 'Le mot de passe ne respecte pas les critères de sécurité de Shopify.'
          }, { status: 400 })
        } else {
          return NextResponse.json({
            error: 'Erreur lors de la mise à jour du mot de passe. Veuillez réessayer plus tard.'
          }, { status: 500 })
        }
      }

      const adminData = await adminResponse.json()
      console.log('✅ Mot de passe mis à jour avec succès via Admin API')

      // Succès - Consommer le token pour éviter la réutilisation
      consumeResetToken(resetToken)

      return NextResponse.json({
        success: true,
        message: 'Mot de passe réinitialisé avec succès',
        customer: {
          id: customerId,
          email: adminData.customer?.email || tokenData.email
        }
      })

    } catch (adminError) {
      console.error('❌ Erreur lors de l\'appel Admin API:', adminError)

      return NextResponse.json({
        error: 'Erreur de communication avec Shopify. Veuillez réessayer plus tard.',
        details: adminError instanceof Error ? adminError.message : 'Erreur inconnue'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('❌ Erreur générale lors de la réinitialisation:', error)
    return NextResponse.json(
      { error: 'Une erreur interne est survenue' },
      { status: 500 }
    )
  }
}

// Endpoint GET pour vérifier la validité d'un token
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const customerId = searchParams.get('id')

  if (!token || !customerId) {
    return NextResponse.json(
      { valid: false, error: 'Paramètres manquants' },
      { status: 400 }
    )
  }

  const tokenData = validateResetToken(token)

  if (!tokenData || tokenData.customerId !== customerId) {
    return NextResponse.json({
      valid: false,
      error: 'Token invalide ou expiré'
    })
  }

  return NextResponse.json({
    valid: true,
    email: tokenData.email
  })
}
