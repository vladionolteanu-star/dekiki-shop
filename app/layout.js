import { Inter, Space_Grotesk, Syne } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import MatrixRain from '@/components/MatrixRain'
import HeaderMasterpiece from '@/components/HeaderMasterpiece'
import ScrollProgress from '@/components/ScrollProgress'
import CursorGlow from '@/components/CursorGlow'
import PageTransition from '@/components/PageTransition'
import Analytics from '@/components/Analytics'
import ErrorBoundary from '@/components/ErrorBoundary'

// ✨ Font optimization cu Next.js font loading
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '700'],
  display: 'swap',
})

const syne = Syne({ 
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['800'],
  display: 'swap',
})

// ✨ Enhanced metadata cu SEO complet
export const metadata = {
  metadataBase: new URL('https://dekiki.shop'),
  title: {
    default: 'DEKIKI - De ce? De kiki! | Premium Digital Experience',
    template: '%s | DEKIKI Shop'
  },
  description: 'DE MIKI DE 3 LEI RIDICHII - Experiență digitală premium cu produse exclusive și design futurist',
  keywords: ['dekiki', 'shop', 'premium', 'digital', 'exclusive', 'futurist', 'romania'],
  authors: [{ name: 'DEKIKI Team' }],
  creator: 'DEKIKI Digital',
  publisher: 'DEKIKI Shop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'DEKIKI - De ce? De kiki!',
    description: 'Experiență digitală premium cu produse exclusive',
    url: 'https://dekiki.shop',
    siteName: 'DEKIKI Shop',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DEKIKI Shop Preview',
      }
    ],
    locale: 'ro_RO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DEKIKI - Premium Digital Experience',
    description: 'DE MIKI DE 3 LEI RIDICHII',
    images: ['/twitter-image.jpg'],
    creator: '@dekiki',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#8a2be2',
      },
    ],
  },
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: 'https://dekiki.shop',
    languages: {
      'ro-RO': 'https://dekiki.shop',
      'en-US': 'https://dekiki.shop/en',
    },
  },
  category: 'ecommerce',
}

// ✨ JSON-LD Structured Data pentru SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DEKIKI Shop',
  url: 'https://dekiki.shop',
  description: 'Premium Digital Experience Shop',
  publisher: {
    '@type': 'Organization',
    name: 'DEKIKI',
    logo: {
      '@type': 'ImageObject',
      url: 'https://dekiki.shop/logo.png'
    }
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://dekiki.shop/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
}

export default function RootLayout({ children }) {
  return (
    <html 
      lang="ro" 
      className={`${inter.variable} ${spaceGrotesk.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* ✨ Critical CSS pentru eliminarea FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes initialLoad {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            body { 
              opacity: 0; 
              animation: initialLoad 0.3s ease forwards;
              animation-delay: 0.1s;
            }
          `
        }} />
        
        {/* ✨ Preconnect pentru performanță */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
        
        {/* ✨ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* ✨ PWA Support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* ✨ Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      </head>
      
      <body className="font-space-grotesk antialiased">
        {/* ✨ Skip to content pentru accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50">
          Skip to content
        </a>
        
        {/* ✨ Loading state pentru Suspense */}
        <Suspense fallback={
          <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="text-primary text-2xl animate-pulse">DEKIKI LOADING...</div>
          </div>
        }>
          
          {/* ✨ Error Boundary pentru stabilitate */}
          <ErrorBoundary>
            {/* ✨ Componente UI Enhancement */}
            <ScrollProgress />
            <CursorGlow />
            <PageTransition>
              
              {/* ✨ Header Masterpiece Component */}
              <HeaderMasterpiece />
              
              {/* ✨ Main Content */}
              <main id="main-content" className="relative z-10 min-h-screen">
                {children}
              </main>
              
              {/* ✨ Footer modern */}
              <footer className="relative bg-black border-t border-primary/20 mt-20">
                <div className="container mx-auto px-4 py-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                        DEKIKI
                      </h3>
                      <p className="text-gray-400">De ce? De kiki!</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-4">Link-uri Rapide</h4>
                      <ul className="space-y-2 text-gray-400">
                        <li><a href="/products" className="hover:text-primary transition-colors">Produse</a></li>
                        <li><a href="/about" className="hover:text-primary transition-colors">Despre</a></li>
                        <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-4">Social</h4>
                      <div className="flex space-x-4">
                        <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-primary/20 text-center text-gray-400">
                    <p>&copy; 2024 DEKIKI Shop. Toate drepturile rezervate.</p>
                  </div>
                </div>
              </footer>
              
            </PageTransition>
          </ErrorBoundary>
          
        </Suspense>
        
        {/* ✨ Analytics Component */}
        <Analytics />
        
        {/* ✨ Performance Monitoring */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Web Vitals monitoring
            if ('PerformanceObserver' in window) {
              try {
                const po = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    console.log('Performance:', entry.name, entry.startTime);
                  }
                });
                po.observe({ entryTypes: ['measure', 'navigation'] });
              } catch (e) {}
            }
          `
        }} />
      </body>
    </html>
  )
}
