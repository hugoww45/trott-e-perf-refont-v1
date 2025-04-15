import { serverClient } from './server'
import { PRODUCTS_QUERY } from './queries'

export async function generateStaticParams() {
  try {
    const response = await fetch(serverClient.getStorefrontApiUrl(), {
      method: 'POST',
      headers: serverClient.getPublicTokenHeaders(),
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
        variables: { first: 250 }
      })
    })

    const { data } = await response.json()
    return data.products.edges.map((edge: any) => ({
      handle: edge.node.handle
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}