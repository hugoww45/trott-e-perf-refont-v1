import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import ResetPasswordEmail from '@/emails/ResetPassword'
import { ResetPasswordEmailText } from '@/emails/ResetPassword'

const resend = new Resend(process.env.RESEND_API_KEY)

// Stockage temporaire des tokens (en mémoire + persistance fichier)
const resetTokens = new Map<string, {
  email: string
  customerId: string
  timestamp: number
}>()

const TOKENS_FILE = path.join(process.cwd(), '.next', 'reset-tokens.json')

// Charger les tokens depuis le fichier
function loadTokensFromFile() {
  try {
    if (fs.existsSync(TOKENS_FILE)) {
      const data = fs.readFileSync(TOKENS_FILE, 'utf8')
      const tokens = JSON.parse(data)
      Object.entries(tokens).forEach(([token, data]: [string, any]) => {
        resetTokens.set(token, data)
      })
      console.log('Tokens chargés depuis le fichier:', resetTokens.size)
    }
  } catch (error) {
    console.error('Erreur lors du chargement des tokens:', error)
  }
}

// Sauvegarder les tokens dans le fichier
function saveTokensToFile() {
  try {
    const dir = path.dirname(TOKENS_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const tokens = Object.fromEntries(resetTokens)
    fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2))
    console.log('Tokens sauvegardés:', resetTokens.size)
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des tokens:', error)
  }
}

// Charger les tokens au démarrage
loadTokensFromFile()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validation de l'email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    console.log('🔍 Recherche du customer pour:', email)

    // Vérification des variables d'environnement Admin API
    if (!process.env.SHOPIFY_ADMIN_TOKEN || !process.env.SHOPIFY_DOMAIN) {
      console.error('❌ Variables d\'environnement manquantes: SHOPIFY_ADMIN_TOKEN et SHOPIFY_DOMAIN requis')
      return NextResponse.json({
        error: 'Configuration incomplète. Contactez l\'administrateur.',
        details: 'Les clés d\'API Shopify Admin ne sont pas configurées.'
      }, { status: 500 })
    }

    let customerId: string = ''

    try {
      // Recherche du customer via Admin API
      const customerSearchUrl = `https://${process.env.SHOPIFY_DOMAIN}/admin/api/2023-10/customers/search.json?query=email:${encodeURIComponent(email)}`

      console.log('🔍 Recherche via Admin API:', customerSearchUrl)

      const customerResponse = await fetch(customerSearchUrl, {
        method: 'GET',
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_TOKEN,
          'Content-Type': 'application/json',
        }
      })

      if (!customerResponse.ok) {
        console.error('❌ Erreur API Shopify:', customerResponse.status, customerResponse.statusText)
        throw new Error(`Shopify API error: ${customerResponse.status}`)
      }

      const customerData = await customerResponse.json()
      console.log('Réponse recherche customer:', JSON.stringify(customerData, null, 2))

      if (customerData.customers && customerData.customers.length > 0) {
        const customer = customerData.customers[0]
        customerId = `gid://shopify/Customer/${customer.id}`
        console.log('✅ Customer trouvé:', { id: customerId, email: customer.email })
      } else {
        console.log('❌ Aucun customer trouvé pour l\'email:', email)
        // Pour la sécurité, on renvoie un succès même si le customer n'existe pas
        return NextResponse.json({
          success: true,
          message: 'Si un compte existe avec cet email, vous recevrez les instructions de réinitialisation.'
        })
      }

    } catch (customerError) {
      console.error('❌ Erreur lors de la recherche du customer:', customerError)
      // Pour la sécurité, on renvoie un succès même en cas d'erreur
      return NextResponse.json({
        success: true,
        message: 'Si un compte existe avec cet email, vous recevrez les instructions de réinitialisation.'
      })
    }

    // Génération d'un token sécurisé
    const resetToken = crypto.randomUUID()
    console.log('🔑 Token généré:', resetToken.substring(0, 8) + '...')

    // Stockage temporaire du token (expire après 1 heure)
    resetTokens.set(resetToken, {
      email,
      customerId,
      timestamp: Date.now()
    })
    console.log('💾 Token stocké avec succès. Nombre total de tokens:', resetTokens.size)

    // Sauvegarder dans le fichier
    saveTokensToFile()

    // Génération du lien de réinitialisation
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/nouveau-mot-de-passe?token=${resetToken}&id=${encodeURIComponent(customerId)}`

    console.log('🔗 Lien de réinitialisation généré pour:', email)

    // Vérification de la configuration Resend
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY manquante')
      return NextResponse.json({
        error: 'Configuration email incomplète. Contactez l\'administrateur.'
      }, { status: 500 })
    }

    // Envoi de l'email avec Resend
    try {
      console.log('📧 Envoi de l\'email de réinitialisation...')

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@resend.dev',
        to: [email],
        subject: 'Réinitialisation de votre mot de passe',
        react: ResetPasswordEmail({ resetUrl, userEmail: email }),
        text: ResetPasswordEmailText({ resetUrl, userEmail: email })
      })

      console.log('✅ Email envoyé avec succès à:', email)

    } catch (emailError) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', emailError)

      // Supprimer le token si l'email n'a pas pu être envoyé
      resetTokens.delete(resetToken)
      saveTokensToFile()

      return NextResponse.json({
        error: 'Impossible d\'envoyer l\'email de réinitialisation. Veuillez réessayer plus tard.',
        details: emailError instanceof Error ? emailError.message : 'Erreur inconnue'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Instructions de réinitialisation envoyées par email'
    })

  } catch (error) {
    console.error('❌ Erreur générale:', error)
    return NextResponse.json(
      { error: 'Une erreur interne est survenue' },
      { status: 500 }
    )
  }
}

// Fonction pour nettoyer les tokens expirés
function cleanExpiredTokens() {
  const now = Date.now()
  const oneHour = 60 * 60 * 1000 // 1 heure en millisecondes

  const sizeBefore = resetTokens.size
  resetTokens.forEach((data, token) => {
    if (now - data.timestamp > oneHour) {
      resetTokens.delete(token)
    }
  })

  const sizeAfter = resetTokens.size
  if (sizeBefore !== sizeAfter) {
    console.log(`🧹 Tokens expirés supprimés: ${sizeBefore - sizeAfter}`)
    saveTokensToFile()
  }
}

// Export des fonctions utilitaires
export function validateResetToken(token: string): { email: string, customerId: string } | null {
  console.log('🔍 Validation du token:', token.substring(0, 8) + '...')

  // Recharger les tokens depuis le fichier
  loadTokensFromFile()
  cleanExpiredTokens()

  const tokenData = resetTokens.get(token)

  if (!tokenData) {
    console.log('❌ Token non trouvé')
    return null
  }

  const oneHour = 60 * 60 * 1000
  const isExpired = Date.now() - tokenData.timestamp > oneHour

  if (isExpired) {
    console.log('❌ Token expiré')
    resetTokens.delete(token)
    saveTokensToFile()
    return null
  }

  console.log('✅ Token valide')
  return {
    email: tokenData.email,
    customerId: tokenData.customerId
  }
}

export function consumeResetToken(token: string): void {
  resetTokens.delete(token)
  saveTokensToFile()
  console.log('🗑️ Token consommé et supprimé')
}
