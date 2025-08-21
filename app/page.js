'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  // Produse featured pentru showcase
  const featuredProducts = [
    {
      id: 1,
      name: "Cyber Hoodie X1",
      price: "299 LEI",
      description: "Hoodie cu LED-uri reactive la sunet",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
      color: "#8a2be2",
      features: ["LED Reactive", "Bluetooth 5.0", "Washable Tech"]
    },
    {
      id: 2,
      name: "Neon Sneakers V2",
      price: "459 LEI",
      description: "Adidași cu talpă luminoasă auto-reîncărcabilă",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      color: "#00ffff",
      features: ["Self-Charging", "App Control", "Water Resistant"]
    },
    {
      id: 3,
      name: "Holographic Jacket",
      price: "599 LEI",
      description: "Jachetă cu material holografic schimbător",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
      color: "#ff00ff",
      features: ["Color Shift", "Temperature Reactive", "UV Protection"]
    }
  ]

  // Mouse tracking pentru efecte paralax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Animation on load
    setTimeout(() => setIsLoaded(true), 100)
    
    // Auto-rotate products
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % featuredProducts.length)
    }, 5000)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900" />
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(138, 43, 226, 0.4) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className={`space-y-8 ${isLoaded ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-bold rounded-full animate-pulse">
                  ✨ COLECȚIE NOUĂ 2024
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  FUTURE
                </span>
                <span className="block">IS NOW</span>
                <span className="block text-2xl md:text-3xl mt-4 text-gray-400">
                  Tech Wear Revolution
                </span>
              </h1>
              
              <p className="text-gray-300 text-lg max-w-md">
                Descoperă colecția exclusivă de îmbrăcăminte tech cu elemente interactive 
                și design futurist. Fiecare piesă este o operă de artă tehnologică.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
                  <span className="relative z-10">EXPLOREAZĂ COLECȚIA</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>
                
                <button className="px-8 py-4 border-2 border-purple-600 text-purple-400 font-bold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300">
                  VEZI DEMO AR
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    50+
                  </div>
                  <div className="text-gray-500 text-sm">Produse Tech</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    24h
                  </div>
                  <div className="text-gray-500 text-sm">Livrare Rapidă</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    100%
                  </div>
                  <div className="text-gray-500 text-sm">Satisfacție</div>
                </div>
              </div>
            </div>
            
            {/* Right Product Showcase */}
            <div className={`relative ${isLoaded ? 'animate-slideInRight' : 'opacity-0'}`}>
              <div className="relative w-full h-[600px]">
                {/* Product Cards */}
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`absolute inset-0 transition-all duration-700 ${
                      index === activeProduct 
                        ? 'opacity-100 scale-100 z-20' 
                        : 'opacity-0 scale-95 z-10'
                    }`}
                    style={{
                      transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)`
                    }}
                  >
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-purple-500/20">
                      {/* Product Image */}
                      <div className="absolute inset-0">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      </div>
                      
                      {/* Product Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                        <div className="flex items-center gap-2">
                          {product.features.map((feature, i) => (
                            <span 
                              key={i}
                              className="px-3 py-1 bg-black/50 backdrop-blur text-xs text-cyan-400 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-3xl font-bold text-white">
                          {product.name}
                        </h3>
                        
                        <p className="text-gray-300">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            {product.price}
                          </span>
                          
                          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold rounded-lg hover:scale-105 transition-transform">
                            ADAUGĂ ÎN COȘ
                          </button>
                        </div>
                      </div>
                      
                      {/* Animated Border */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 border-2 border-transparent rounded-3xl animate-borderGlow"
                             style={{
                               background: `linear-gradient(45deg, ${product.color}, transparent, ${product.color})`,
                               WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                               WebkitMaskComposite: 'xor',
                               maskComposite: 'exclude'
                             }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Product Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveProduct(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeProduct 
                          ? 'w-8 bg-gradient-to-r from-purple-600 to-cyan-600' 
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-30px) translateX(10px);
          }
          66% {
            transform: translateY(30px) translateX(-10px);
          }
        }
        
        @keyframes borderGlow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 1s ease-out;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-borderGlow {
          animation: borderGlow 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}