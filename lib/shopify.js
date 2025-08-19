const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN
const token = process.env.NEXT_PUBLIC_SHOPIFY_TOKEN

export async function getProducts() {
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
  
  const data = await response.json()
  return data.data.products.edges
}
