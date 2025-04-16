import { getStorefrontApiUrl, getPublicTokenHeaders } from './server'
import { PRODUCTS_QUERY } from './queries'

export async function generateStaticParams() {
  try {
    const response = await fetch(getStorefrontApiUrl(), {
      method: 'POST',
      headers: getPublicTokenHeaders(),
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
