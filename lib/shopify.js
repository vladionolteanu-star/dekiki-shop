const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN
const token = process.env.NEXT_PUBLIC_SHOPIFY_TOKEN

export async function getProducts() {
  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        `
      })
    })
    
    // Check if response is ok
    if (!response.ok) {
      console.error('Shopify API response not ok:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      })
      const errorText = await response.text()
      console.error('Shopify API error response text:', errorText)
      throw new Error(`Shopify API error: ${response.status} ${response.statusText} - ${errorText}`)
    }
    
    const data = await response.json()
    
    // Check for GraphQL errors
    if (data.errors) {
      console.error('Shopify GraphQL errors:', data.errors)
      throw new Error(`Shopify GraphQL errors: ${JSON.stringify(data.errors)}`)
    }
    
    // Check if products exist in response
    if (!data.data || !data.data.products || !data.data.products.edges) {
      console.error('Invalid Shopify response structure:', data)
      throw new Error('Invalid response structure from Shopify API - missing products data')
    }
    
    const products = data.data.products.edges
    
    // Check if products array is empty
    if (!products || products.length === 0) {
      console.warn('No products found in Shopify store')
      throw new Error('No products found in Shopify store')
    }
    
    return products
  } catch (error) {
    console.error('Error fetching products from Shopify:', error)
    throw error
  }
}
