'use client'
import { useState, useEffect } from 'react'

// Shopify Configuration
const SHOPIFY_DOMAIN = 'dqnyg5-8i.myshopify.com'
const SHOPIFY_STOREFRONT_TOKEN = '0656c9eb317848c9f55854cc45a7ff72'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const query = `
      {
        products(first: 50) {
          edges {
            node {
              id
              title
              description
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
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
              tags
              variants(first: 1) {
                edges {
                  node {
                    id
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    `

    try {
      const response = await fetch(
        `https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
          },
          body: JSON.stringify({ query }),
        }
      )

      const data = await response.json()
      
      if (data.data?.products?.edges) {
        const formattedProducts = data.data.products.edges.map(({ node }) => ({
          id: node.id,
          title: node.title,
          description: node.description,
          handle: node.handle,
          price: parseFloat(node.priceRange.minVariantPrice.amount),
          image: node.images.edges[0]?.node.url || '/placeholder.jpg',
          imageAlt: node.images.edges[0]?.node.altText || node.title,
          tags: node.tags,
          variantId: node.variants.edges[0]?.node.id,
          available: node.variants.edges[0]?.node.availableForSale
        }))

        setProducts(formattedProducts)
      }
    } catch (err) {
      console.error('Shopify Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product) => {
    setCart([...cart, product])
    setShowCart(true)
    setTimeout(() => setShowCart(false), 3000)
  }

  return (
    <>
      {/* HERO SIMPLU - Mobile First */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 8vw, 4rem)',
          fontWeight: '900',
          marginBottom: '20px',
          letterSpacing: '-1px'
        }}>
          PRODUSE FUNNY<br/>
          <span style={{ color: '#FFD700' }}>PENTRU OAMENI FUNNY</span>
        </h1>
        
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: '30px',
          opacity: '0.9'
        }}>
          {products.length > 0 ? `${products.length} produse care îți vor face ziua mai bună` : 'Găsește cadoul perfect'}
        </p>
        
        <button
          onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: 'white',
            color: '#764ba2',
            padding: '15px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transform: 'scale(1)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          VEZI PRODUSELE →
        </button>
      </section>

      {/* PRODUCT GRID - This Is Why I'm Broke Style */}
      <section id="products" style={{
        padding: '40px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Title */}
        <h2 style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '40px',
          color: '#333'
        }}>
          SHUT UP AND TAKE MY MONEY! 💸
        </h2>

        {loading ? (
          // Loading Grid
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                background: '#f0f0f0',
                borderRadius: '10px',
                overflow: 'hidden',
                animation: 'pulse 1.5s infinite'
              }}>
                <div style={{ paddingBottom: '100%', background: '#e0e0e0' }}></div>
                <div style={{ padding: '15px' }}>
                  <div style={{ height: '20px', background: '#e0e0e0', marginBottom: '10px' }}></div>
                  <div style={{ height: '30px', background: '#e0e0e0' }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error State
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>😅</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Oops! Ceva nu merge</h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>{error}</p>
            <button
              onClick={fetchProducts}
              style={{
                background: '#764ba2',
                color: 'white',
                padding: '12px 30px',
                border: 'none',
                borderRadius: '25px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Încearcă din nou
            </button>
          </div>
        ) : products.length === 0 ? (
          // No Products
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎈</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Nu avem produse încă</h3>
            <p style={{ color: '#666' }}>Revino mai târziu!</p>
          </div>
        ) : (
          // CLEAN PRODUCT GRID
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{
                  background: 'white',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)'
                }}
              >
                {/* Fun Badge */}
                {index % 7 === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: '#FF4444',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    zIndex: 1
                  }}>
                    HOT 🔥
                  </div>
                )}
                {index % 5 === 0 && index % 7 !== 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: '#764ba2',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    zIndex: 1
                  }}>
                    WTF?! 🤔
                  </div>
                )}

                {/* Product Image */}
                <div style={{
                  position: 'relative',
                  paddingBottom: '100%',
                  background: '#f8f8f8'
                }}>
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    loading="lazy"
                  />
                  {!product.available && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold'
                      }}>
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div style={{ padding: '20px' }}>
                  {/* Title */}
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    color: '#333',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {product.title}
                  </h3>

                  {/* Description */}
                  {product.description && (
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '15px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {product.description}
                    </p>
                  )}

                  {/* Price & Button */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#764ba2'
                    }}>
                      {product.price.toFixed(0)} LEI
                    </span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (product.available) {
                          addToCart(product)
                          e.target.innerHTML = '✓'
                          setTimeout(() => {
                            e.target.innerHTML = 'CUMPĂRĂ'
                          }, 1000)
                        }
                      }}
                      disabled={!product.available}
                      style={{
                        background: product.available ? '#FFD700' : '#ccc',
                        color: product.available ? '#333' : '#999',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '25px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: product.available ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={(e) => {
                        if (product.available) {
                          e.target.style.background = '#FFC700'
                        }
                      }}
                      onMouseOut={(e) => {
                        if (product.available) {
                          e.target.style.background = '#FFD700'
                        }
                      }}
                    >
                      {product.available ? 'CUMPĂRĂ' : 'SOLD OUT'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Simple Cart Notification */}
      {showCart && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#4CAF50',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease'
        }}>
          ✓ Produs adăugat în coș! ({cart.length} {cart.length === 1 ? 'produs' : 'produse'})
        </div>
      )}

      {/* Simple Animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}
