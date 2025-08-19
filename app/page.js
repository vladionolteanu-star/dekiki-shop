import { getProducts } from '../lib/shopify'

export default async function Home() {
  let products = []
  
  try {
    products = await getProducts()
  } catch (error) {
    console.error('Error loading products:', error)
  }
  
  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map(({ node }) => (
          <div key={node.id} className="product-card">
            {node.images.edges[0] && (
              <img 
                src={node.images.edges[0].node.url} 
                alt={node.title}
                className="product-image"
              />
            )}
            <div className="product-info">
              <h3 className="product-title">{node.title}</h3>
              <p className="product-price">{node.priceRange.minVariantPrice.amount} RON</p>
              <button className="buy-button">
                SHUT UP AND TAKE MY MONEY!
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Se încarcă produsele...</p>
      )}
    </div>
  )
}
