'use client'
import { useState, useEffect } from 'react'

// Shopify Storefront API Configuration
const SHOPIFY_DOMAIN = 'dqnyg5-8i.myshopify.com'
const SHOPIFY_STOREFRONT_TOKEN = '0656c9eb317848c9f55854cc45a7ff72'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

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
      setProducts([])
      setLoading(false)
    }
  }

  const addToCart = (product) => {
    setCart([...cart, product])
    setIsCartOpen(true)
    
    const button = event.target
    button.textContent = 'â ADÄUGAT'
    button.style.background = '#10b981'
    setTimeout(() => {
      button.textContent = 'ADAUGÄ ÃN COÈ'
      button.style.background = ''
    }, 1500)
  }

  const categories = ['all', 'funny', 'gift', 'tech', 'special']
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.tags.includes(selectedCategory))

  return (
    <main className="min-h-screen bg-white">
      {/* Epic Hero Section */}
      <section className="relative min-h-[70vh] bg-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(138, 43, 226, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(138, 43, 226, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Content */}
        <div className="relative z-10 min-h-[70vh] flex flex-col justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto w-full">
            {/* Badge */}
            <div className="flex justify-center mb-8">
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

            {/* Title */}
            <div className="text-center space-y-6">
              <h1>
                <span className="block text-6xl md:text-8xl lg:text-9xl font-black">
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-white">D</span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-white">E</span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-white mx-2"> </span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-purple-400">K</span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-purple-400">I</span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-purple-400">K</span>
                  <span className="inline-block hover:scale-110 transition-transform cursor-default text-purple-400">I</span>
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-gray-400 font-light">
                  De ce? De kiki!
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Produse <span className="text-purple-400 font-bold">funny</span> care Ã®Èi fac ziua mai 
                <span className="inline-block mx-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full animate-pulse">
                  amuzantÄ
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button 
                  onClick={() => {
                    const element = document.getElementById('products-section')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105"
                >
                  <span className="relative z-10">VEZI PRODUSELE</span>
                </button>

                <button className="group px-8 py-4 border-2 border-purple-500 text-purple-400 font-bold rounded-full hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                  <span className="flex items-center gap-2">
                    <span>RANDOM PRODUCT</span>
                    <span className="text-xl group-hover:rotate-180 transition-transform">ð²</span>
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-12">
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
                    â
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
      </section>

      {/* Category Filter */}
      <section id="products-section" className="sticky top-0 z-40 bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'Toate' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
// 🔥 ÎNLOCUIEȘTE SECȚIUNEA PRODUCTS GRID din page.js
// Găsește: <section className="py-12 px-4">
// Și înlocuiește TOATĂ secțiunea până la </section> cu:

      {/* MASTERPIECE Product Grid - This Is Why I'm Broke Style */}
      <section className="py-8 md:py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              <span className="text-black">PRODUSE CARE TE FAC SĂ ZICI</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">
                "DE CE? DE KIKI!"
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              {filteredProducts.length} produse care îți vor ruina bugetul (în mod amuzant)
            </p>
          </div>

          {loading ? (
            // Loading State - Skeleton Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div className="animate-pulse" key={i}>
                  <div className="bg-gray-200 aspect-[4/5] rounded-2xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error State
            <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
              <div className="text-8xl mb-6">🤷</div>
              <h2 className="text-3xl font-bold mb-4">Houston, avem o problemă!</h2>
              <p className="text-gray-600 mb-8 text-lg">{error}</p>
              <button
                onClick={fetchProducts}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
              >
                ÎNCEARCĂ DIN NOU
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            // Empty State
            <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
              <div className="text-8xl mb-6 animate-bounce">🎈</div>
              <h2 className="text-3xl font-bold mb-4">Categoria asta e goală!</h2>
              <p className="text-gray-600 text-lg mb-8">
                Dar avem alte produse funny care te așteaptă
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-purple-600 transition-colors"
              >
                VEZI TOATE PRODUSELE
              </button>
            </div>
          ) : (
            // MASTERPIECE GRID
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                    opacity: 0
                  }}
                >
                  {/* Random Fun Badge */}
                  {index === 0 && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                        🔥 HOT
                      </span>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                        WTF?!
                      </span>
                    </div>
                  )}
                  {index === 4 && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        💸 SHUT UP & TAKE MY MONEY
                      </span>
                    </div>
                  )}

                  {/* Product Image Container */}
                  <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                    {/* Image */}
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm mb-3 line-clamp-3">
                          {product.description || 'Cel mai funny produs pe care l-ai văzut azi!'}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(`/products/${product.handle}`, '_blank')
                          }}
                          className="text-white font-bold flex items-center gap-2 hover:gap-3 transition-all"
                        >
                          Vezi Detalii
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Sold Out Overlay */}
                    {!product.available && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                        <div className="text-center">
                          <span className="text-white text-2xl font-black">SOLD OUT</span>
                          <p className="text-white/80 text-sm mt-1">Prea funny, s-a vândut!</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {product.title}
                    </h3>
                    
                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">
                          {parseFloat(product.price).toFixed(0)}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">LEI</span>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (product.available) {
                            addToCart(product)
                            // Fun animation
                            e.target.innerHTML = '🎉'
                            setTimeout(() => {
                              e.target.innerHTML = `
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                              `
                            }, 1000)
                          }
                        }}
                        disabled={!product.available}
                        className={`p-3 rounded-full transition-all ${
                          product.available
                            ? 'bg-black text-white hover:bg-purple-600 hover:scale-110 hover:rotate-12'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Fun Tags */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {product.tags.slice(0, 3).map((tag, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && !error && filteredProducts.length >= 20 && (
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-purple-600 transition-colors hover:scale-105 shadow-lg">
                ÎNCARCĂ MAI MULTE PRODUSE FUNNY
              </button>
            </div>
          )}
        </div>

        {/* Animation Styles */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
      

      {/* Cart Popup */}
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
            Produsele au fost adÄugate Ã®n coÈ!
          </p>
          <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Vezi CoÈul
          </button>
        </div>
      )}
    </main>
  )
}