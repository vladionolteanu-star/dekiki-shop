'use client'

import './globals.css'
import { useEffect, useState } from 'react'

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang="ro">
      <head>
        {/* ✨ Metadata de bază */}
        <title>DEKIKI - De ce? De kiki!</title>
        <meta name="description" content="DE MIKI DE 3 LEI RIDICHI - Experiență digitală premium" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* ✨ Font Loading Optimizat */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Syne:wght@800&display=swap" 
          rel="stylesheet" 
        />
        
        {/* ✨ Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* ✨ Theme Color */}
        <meta name="theme-color" content="#8a2be2" />
      </head>
      
      <body suppressHydrationWarning>
        {/* ✨ Header Masterpiece cu toate elementele */}
        <div className="header-masterpiece">
          {/* Logo Universe cu imagini optimizate */}
          <div className="logo-universe">
            <img 
              src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" 
              className="logo-layer layer-base"
              alt="DEKIKI Logo Base"
              loading="eager"
            />
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <img 
                key={num}
                src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" 
                className={`logo-layer layer-${num}`}
                alt={`DEKIKI Logo Layer ${num}`}
                loading="eager"
              />
            ))}
            <div className="particle-field"></div>
          </div>
          
          {/* Content Overlay cu animații */}
          <div className="content-overlay">
            <h1 className="hero-title">
              <span className="sequence seq1">De Kiki</span>
              <span className="sequence seq2">De miki</span>
              <span className="sequence seq3">De 3 lei Ridichii!</span>
            </h1>
            <p className="final-text">De ce? De kiki!</p>
            
            {/* Search Quantum Field */}
            <div className="search-quantum">
              <div className="search-aurora"></div>
              <input 
                type="text" 
                className="search-field" 
                placeholder="ENTER THE VOID..." 
                aria-label="Search products"
              />
              <div className="search-particles">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          
          {/* Matrix Rain Canvas */}
          <canvas id="matrix-rain"></canvas>
        </div>

        {/* ✨ Main Content */}
        <main id="main-content" className="relative z-10 min-h-screen">
          {children}
        </main>

        {/* ✨ Footer Modern și Minimalist */}
        <footer className="bg-black border-t border-purple-900/20 mt-20 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Brand Section */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  DEKIKI
                </h3>
                <p className="text-purple-400">De ce? De kiki!</p>
              </div>
              
              {/* Links Section */}
              <div className="text-center">
                <h4 className="text-white font-semibold mb-4">Link-uri</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/products" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Produse
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Despre
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Social Section */}
              <div className="text-center md:text-right">
                <h4 className="text-white font-semibold mb-4">Social</h4>
                <div className="flex justify-center md:justify-end space-x-4">
                  <a 
                    href="#" 
                    aria-label="Facebook"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    aria-label="Instagram"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    aria-label="Twitter"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-purple-900/20 text-center">
              <p className="text-gray-500">
                &copy; 2024 DEKIKI Shop. Toate drepturile rezervate.
              </p>
            </div>
          </div>
        </footer>

        {/* ✨ Matrix Rain Animation Script */}
        {mounted && (
          <script dangerouslySetInnerHTML={{__html: `
            (function() {
              const canvas = document.getElementById('matrix-rain');
              if (!canvas) return;
              
              const ctx = canvas.getContext('2d');
              canvas.width = window.innerWidth;
              canvas.height = 600;
              
              const matrix = "DEKIKI01デキキ";
              const matrixArray = matrix.split("");
              const fontSize = 10;
              const columns = canvas.width / fontSize;
              const drops = [];
              
              for(let x = 0; x < columns; x++) {
                drops[x] = Math.floor(Math.random() * -100);
              }
              
              function draw() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = '#8a2be2';
                ctx.font = fontSize + 'px monospace';
                
                for(let i = 0; i < drops.length; i++) {
                  const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                  ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                  
                  if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                  }
                  drops[i]++;
                }
              }
              
              setInterval(draw, 35);
              
              // Resize handler
              window.addEventListener('resize', function() {
                canvas.width = window.innerWidth;
                canvas.height = 600;
              });
            })();
          `}} />
        )}

        {/* ✨ Smooth Scroll Script */}
        <script dangerouslySetInnerHTML={{__html: `
          document.documentElement.style.scrollBehavior = 'smooth';
        `}} />
      </body>
    </html>
  )
}
