'use client'
import { useState, useEffect } from 'react'

// Shopify Storefront API Configuration
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Fetch products from Shopify
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
        throw new Error('Failed to fetch products')
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
      console.error('Error fetching products:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  // Add to cart function
  const addToCart = (product) => {
    setCart([...cart, product])
    setIsCartOpen(true)
    
    // Animation feedback
    const button = event.target
    button.textContent = '✓ ADĂUGAT'
    button.style.background = '#10b981'
    setTimeout(() => {
      button.textContent = 'ADAUGĂ ÎN COȘ'
      button.style.background = ''
    }, 1500)
  }

  // Filter products by category (using tags)
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
            Produse funny pentru oameni funny 🎉
          </p>
          <div className="inline-block px-6 py-2 border border-purple-400 text-purple-400 rounded-full">
            {products.length} produse disponibile
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-40 bg-white border-b border-gray-200 py-4 px-4">
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
            // Error State
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😕</div>
              <h2 className="text-2xl font-bold mb-2">Oops! Ceva nu a mers bine</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchProducts}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Încearcă din nou
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            // Empty State
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold mb-2">Nu am găsit produse</h2>
              <p className="text-gray-600">Încearcă altă categorie</p>
            </div>
          ) : (
            // Products Grid
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
                        {product.available ? 'ADAUGĂ ÎN COȘ' : 'INDISPONIBIL'}
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
            <h3 className="font-bold text-lg">Coș ({cart.length} produse)</h3>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Produsele au fost adăugate în coș!
          </p>
          <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Vezi Coșul
          </button>
        </div>
      )}
    </main>
  )
}
