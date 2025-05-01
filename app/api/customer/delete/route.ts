import { NextResponse } from 'next/server'

// Récupérer les informations d'API Admin depuis les variables d'environnement
const SHOPIFY_ADMIN_API_KEY = process.env.SHOPIFY_ADMIN_API_KEY || ''
const SHOPIFY_ADMIN_PASSWORD = process.env.SHOPIFY_ADMIN_PASSWORD || ''
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || ''
const NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ''
const NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || ''

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const accessToken = request.headers.get('x-access-token')

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized: Token missing' },
        { status: 401 }
      )
    }

    // URL de l'API Storefront
    const storefrontApiUrl = `https://${NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql`

    // En-têtes pour l'API Storefront
    const storefrontHeaders = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
      'Accept': 'application/json'
    }

    // Récupérer l'ID du client à partir du token
    const customerResponse = await fetch(storefrontApiUrl, {
      method: 'POST',
      headers: storefrontHeaders,
      body: JSON.stringify({
        query: `
          query GetCustomer($customerAccessToken: String!) {
            customer(customerAccessToken: $customerAccessToken) {
              id
            }
          }
        `,
        variables: {
          customerAccessToken: accessToken
        }
      })
    })

    const customerData = await customerResponse.json()

    if (!customerData.data?.customer?.id) {
      return NextResponse.json(
        { error: 'Customer not found or token invalid' },
        { status: 404 }
      )
    }

    const customerId = customerData.data.customer.id

    // Vérifier les identifiants admin
    if (!SHOPIFY_ADMIN_API_KEY || !SHOPIFY_ADMIN_PASSWORD || !SHOPIFY_STORE_DOMAIN) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing Shopify admin credentials' },
        { status: 500 }
      )
    }

    // Appeler l'API Admin pour supprimer le compte client
    const deleteResponse = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2023-07/customers/${customerId.replace('gid://shopify/Customer/', '')}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_PASSWORD,
        }
      }
    )

    // Vérifier si la suppression a réussi
    if (deleteResponse.ok) {
      return NextResponse.json({ success: true, message: 'Account successfully deleted' })
    } else {
      const errorData = await deleteResponse.json()
      return NextResponse.json(
        {
          error: 'Failed to delete customer account',
          details: errorData
        },
        { status: deleteResponse.status }
      )
    }
  } catch (error: any) {
    console.error('Error deleting customer account:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred', message: error.message },
      { status: 500 }
    )
  }
}
