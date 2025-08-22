'use client'
import { useState, useEffect } from 'react'

// Shopify Storefront API Configuration - Using hardcoded values
const SHOPIFY_DOMAIN = 'dqnyg5-8i.myshopify.com'
const SHOPIFY_STOREFRONT_TOKEN = '0656c9eb317848c9f55854cc45a7ff72'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Fetch products from Shopify - NO fallback/mock data
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const query = `
      {
        products(first: 20) {
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

      if (!response.ok) {
        throw new Error('Failed to fetch products from Shopify API')
      }

      const data = await response.json()
      
      if (data.errors) {
        throw new Error(data.errors[0].message)
      }

      // Only use data from Shopify API - NO fallback or demo products
      const formattedProducts = data.data.products.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        description: node.description,
        handle: node.handle,
        price: node.priceRange.minVariantPrice.amount,
        currency: node.priceRange.minVariantPrice.currencyCode,
        image: node.images.edges[0]?.node.url || '/placeholder.jpg',
        imageAlt: node.images.edges[0]?.node.altText || node.title,
        tags: node.tags,
        variantId: node.variants.edges[0]?.node.id,
        available: node.variants.edges[0]?.node.availableForSale
      }))

      setProducts(formattedProducts)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching products from Shopify:', err)
      setError(err.message)
      // NO fallback products - only show error if API fails
      setProducts([])
      setLoading(false)
    }
  }

  // Add to cart function
  const addToCart = (product) => {
    setCart([...cart, product])
    setIsCartOpen(true)
    
    // Animation feedback
    const button = event.target
    button.textContent = 'â ADÄUGAT'
    button.style.background = '#10b981'
    setTimeout(() => {
      button.textContent = 'ADAUGÄ ÃN COÈ'
      button.style.background = ''
    }, 1500)
  }

  // Filter products by category (using tags) - only from Shopify data
  const categories = ['all', 'funny', 'gift', 'tech', 'special']
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.tags.includes(selectedCategory))

  return (
    <main className="min-h-screen bg-white">
      {/* Simple Hero Section */}
      <section className="relative bg-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-purple-400">DEKIKI</span> SHOP
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Produse funny pentru oameni funny ð
          </p>
          <div className="inline-block px-6 py-2 border border-purple-400 text-purple-400 rounded-full">
            {products.length} produse disponibile din Shopify
          </div>
        </div>
      </section>

      {/* Category Filter */}
// ✨ ÎNLOCUIEȘTE DOAR HERO SECTION din page.js cu acest cod
// Găsește: <section className="relative bg-black text-white py-20 px-4">
// Și înlocuiește până la sfârșitul secțiunii cu:

      {/* Epic Hero Section */}
      <section className="relative min-h-[70vh] bg-black overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 animate-gradient" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl animate-float-delayed" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `linear-gradient(rgba(138, 43, 226, 0.3) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(138, 43, 226, 0.3) 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }} />

        {/* Content Container */}
        <div className="relative z-10 min-h-[70vh] flex flex-col justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto w-full">
            {/* Top Badge */}
            <div className="flex justify-center mb-8 animate-fadeInDown">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-purple-300 text-sm font-medium">
                  {products.length > 0 ? `${products.length} Produse Live` : 'Magazin Online'}
                </span>
              </div>
            </div>

            {/* Main Title */}
            <div className="text-center space-y-6">
              <h1 className="animate-fadeInUp">
                <span className="block text-6xl md:text-8xl lg:text-9xl font-black">
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-white">D</span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-white">E</span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-white mx-2"> </span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-purple-400">K</span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-purple-400">I</span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-purple-400">K</span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-purple-400">I</span>
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-gray-400 font-light animate-slideInLeft">
                  De ce? De kiki! 
                </span>
              </h1>

              {/* Animated Subtitle */}
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
                Produse <span className="text-purple-400 font-bold">funny</span> care îți fac ziua mai 
                <span className="inline-block mx-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full animate-pulse">
                  amuzantă
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fadeInUp animation-delay-400">
                <button 
                  onClick={() => document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105"
                >
                  <span className="relative z-10">VEZI PRODUSELE</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute inset-0 group-hover:text-white z-20 flex items-center justify-center transition-colors">
                    VEZI PRODUSELE
                  </span>
                </button>

                <button className="group px-8 py-4 border-2 border-purple-500 text-purple-400 font-bold rounded-full hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                  <span className="flex items-center gap-2">
                    <span>RANDOM PRODUCT</span>
                    <span className="text-xl group-hover:rotate-180 transition-transform">🎲</span>
                  </span>
                </button>
              </div>

              {/* Fun Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-12 animate-fadeInUp animation-delay-600">
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:scale-110 transition-transform">
                    100%
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Funny</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:scale-110 transition-transform">
                    24h
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Livrare</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:scale-110 transition-transform">
                    ∞
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Amuzament</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Custom Animations CSS */}
        <style jsx>{`
          @keyframes gradient {
            0%, 100% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            33% { transform: translateY(-30px) translateX(10px); }
            66% { transform: translateY(30px) translateX(-10px); }
          }
          
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0) translateX(0); }
            33% { transform: translateY(30px) translateX(-10px); }
            66% { transform: translateY(-30px) translateX(10px); }
          }
          
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .animate-gradient {
            animation: gradient 20s ease infinite;
          }
          
          .animate-float {
            animation: float 10s ease-in-out infinite;
          }
          
          .animate-float-delayed {
            animation: float-delayed 10s ease-in-out infinite;
          }
          
          .animate-fadeInDown {
            animation: fadeInDown 0.6s ease-out;
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out;
          }
          
          .animate-slideInLeft {
            animation: slideInLeft 0.6s ease-out;
          }
          
          .animation-delay-200 {
            animation-delay: 200ms;
          }
          
          .animation-delay-400 {
            animation-delay: 400ms;
          }
          
          .animation-delay-600 {
            animation-delay: 600ms;
          }
        `}</style>
      </section>

      {/* Products Grid - Only Shopify products, no fallbacks */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            // Loading State
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div className="animate-pulse" key={i}>
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error State - No fallback products
            <div className="text-center py-20">
              <div className="text-6xl mb-4">ð</div>
              <h2 className="text-2xl font-bold mb-2">Eroare la Ã®ncÄrcarea produselor din Shopify</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchProducts}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                ÃncearcÄ din nou
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            // Empty State - No products from Shopify
            <div className="text-center py-20">
              <div className="text-6xl mb-4">ð</div>
              <h2 className="text-2xl font-bold mb-2">Nu existÄ produse Ã®n Shopify pentru aceastÄ categorie</h2>
              <p className="text-gray-600">ÃncearcÄ altÄ categorie sau verificÄ magazinul Shopify</p>
            </div>
          ) : (
            // Products Grid - Only from Shopify API
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id} 
                  className="group cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {!product.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold">SOLD OUT</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {product.title}
                    </h3>
                    
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold">
                        {parseFloat(product.price).toFixed(0)} LEI
                      </span>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (product.available) addToCart(product)
                        }}
                        disabled={!product.available}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          product.available
                            ? 'bg-black text-white hover:bg-purple-600'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {product.available ? 'ADAUGÄ ÃN COÈ' : 'INDISPONIBIL'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Simple Cart Popup */}
      {isCartOpen && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-6 rounded-lg shadow-xl z-50 max-w-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">CoÈ ({cart.length} produse)</h3>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              â
            </button>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Produsele din Shopify au fost adÄugate Ã®n coÈ!
          </p>
          <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Vezi CoÈul
          </button>
        </div>
      )}
    </main>
  )
}
