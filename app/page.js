import { getProducts } from '@/lib/shopify'

export default async function Home() {
  const products = await getProducts()
  
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Dekiki Shop</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {products.map(({ node }) => (
          <div key={node.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            {node.images.edges[0] && (
              <img 
                src={node.images.edges[0].node.url} 
                alt={node.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            )}
            <h3>{node.title}</h3>
            <p>{node.priceRange.minVariantPrice.amount} RON</p>
            <button style={{ background: '#000', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer', width: '100%' }}>
              Vezi Produs
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
