import './globals.css'

export const metadata = {
  title: 'DE KIKI - De ce? De kiki!',
  description: 'Magazin de cadouri funny și ciudate',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
        {/* HEADER RETRO STYLE - THIS IS WHY I'M BROKE */}
        <header style={{
          background: '#000',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '3px solid #FFD700'
        }}>
          {/* Top Bar */}
          <div style={{
            background: '#111',
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #333'
          }}>
            {/* Search Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              maxWidth: '400px'
            }}>
              <input
                type="text"
                placeholder="Caută produse funny..."
                style={{
                  background: '#222',
                  border: '2px solid #444',
                  color: '#fff',
                  padding: '8px 15px',
                  borderRadius: '25px',
                  width: '100%',
                  fontSize: '14px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#FFD700'}
                onBlur={(e) => e.target.style.borderColor = '#444'}
              />
              <button style={{
                background: '#FFD700',
                border: 'none',
                padding: '8px 15px',
                marginLeft: '-40px',
                borderRadius: '0 25px 25px 0',
                cursor: 'pointer',
                color: '#000',
                fontWeight: 'bold'
              }}>
                🔍
              </button>
            </div>

            {/* Logo Center */}
            <div style={{
              flex: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                background: '#000',
                padding: '10px 30px',
                border: '3px solid #FFD700',
                position: 'relative',
                transform: 'rotate(-2deg)',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
              }}>
                {/* Logo Image */}
                <img 
                  src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png"
                  alt="DEKIKI"
                  style={{
                    height: '40px',
                    width: 'auto',
                    filter: 'brightness(0) invert(1)',
                    marginRight: '15px',
                    verticalAlign: 'middle'
                  }}
                />
                {/* Text */}
                <span style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '28px',
                  color: '#FFD700',
                  letterSpacing: '3px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  verticalAlign: 'middle'
                }}>
                  DE CE? DE KIKI!
                </span>
                
                {/* Retro Stars */}
                <span style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  fontSize: '20px',
                  color: '#FFD700',
                  animation: 'sparkle 1.5s infinite'
                }}>✦</span>
                <span style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '-10px',
                  fontSize: '16px',
                  color: '#FFD700',
                  animation: 'sparkle 1.5s infinite 0.5s'
                }}>✦</span>
              </div>
            </div>

            {/* Login/Register */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flex: 1,
              justifyContent: 'flex-end'
            }}>
              <a href="/login" style={{
                color: '#FFD700',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '5px 10px',
                border: '1px solid #FFD700',
                borderRadius: '20px',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#FFD700'
                e.target.style.color = '#000'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#FFD700'
              }}>
                Intră în Cont
              </a>
              <a href="/register" style={{
                color: '#000',
                background: '#FFD700',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '6px 15px',
                borderRadius: '20px',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#FFC700'
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#FFD700'
                e.target.style.transform = 'scale(1)'
              }}>
                Înregistrare
              </a>
              
              {/* Cart Icon */}
              <div style={{
                position: 'relative',
                cursor: 'pointer',
                marginLeft: '10px'
              }}>
                <span style={{
                  fontSize: '24px',
                  color: '#FFD700'
                }}>🛒</span>
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#FF0000',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>0</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav style={{
            background: '#1a1a1a',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            borderTop: '1px solid #333'
          }}>
            {/* Menu Items */}
            {[
              { text: 'CE E NOU', link: '/new', hot: true },
              { text: 'CADOURI DUPĂ PERSOANĂ', link: '/recipient', dropdown: true },
              { text: 'CADOURI DUPĂ OCAZIE', link: '/occasion', dropdown: true },
              { text: 'CADOURI DUPĂ CATEGORIE', link: '/category', dropdown: true },
              { text: 'MAI MULTE CATEGORII', link: '/more', dropdown: true }
            ].map((item, index) => (
              <div key={index} style={{
                position: 'relative',
                group: true
              }}>
                <a
                  href={item.link}
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '15px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '14px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    transition: 'all 0.3s',
                    borderBottom: '3px solid transparent'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = '#FFD700'
                    e.target.style.borderBottomColor = '#FFD700'
                    e.target.style.background = 'rgba(255, 215, 0, 0.1)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = '#fff'
                    e.target.style.borderBottomColor = 'transparent'
                    e.target.style.background = 'transparent'
                  }}
                >
                  {item.hot && (
                    <span style={{
                      background: '#FF0000',
                      color: '#fff',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      animation: 'pulse 1.5s infinite'
                    }}>
                      HOT
                    </span>
                  )}
                  {item.text}
                  {item.dropdown && (
                    <span style={{ fontSize: '12px' }}>▼</span>
                  )}
                </a>
                
                {/* Dropdown Menu (placeholder) */}
                {item.dropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    background: '#222',
                    minWidth: '200px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
                    display: 'none',
                    borderTop: '3px solid #FFD700'
                  }}>
                    {/* Dropdown items would go here */}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Simple Footer */}
        <footer style={{
          background: '#111',
          color: '#666',
          padding: '40px 20px',
          textAlign: 'center',
          borderTop: '3px solid #FFD700'
        }}>
          <p style={{ fontSize: '14px' }}>
            © 2024 DE KIKI SHOP - Toate drepturile rezervate pentru produse funny
          </p>
        </footer>

        {/* Animation Styles */}
        <style jsx>{`
          @keyframes sparkle {
            0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
            50% { opacity: 0.5; transform: scale(1.2) rotate(180deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}</style>

        {/* Mobile Menu Script */}
        <script dangerouslySetInnerHTML={{__html: `
          // Simple mobile menu toggle
          if (window.innerWidth < 768) {
            // Add hamburger menu logic here
          }
        `}} />
      </body>
    </html>
  )
}