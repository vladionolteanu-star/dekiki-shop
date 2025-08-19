import './globals.css'

export const metadata = {
  title: 'DEKIKI - De ce? De kiki!',
  description: 'DE MIKI DE 3 LEI RIDICHII',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Bungee+Shade&family=Monoton&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="header-mega">
          <div className="logo-container">
            <img src="/fOpImWI%20-%20Imgur.png" alt="DEKIKI" className="logo-main piece-1" />
            <img src="/fOpImWI%20-%20Imgur.png" alt="DEKIKI" className="logo-main piece-2" />
            <img src="/fOpImWI%20-%20Imgur.png" alt="DEKIKI" className="logo-main piece-3" />
            <img src="/fOpImWI%20-%20Imgur.png" alt="DEKIKI" className="logo-main piece-4" />
            <img src="/fOpImWI%20-%20Imgur.png" alt="DEKIKI" className="logo-main piece-5" />
          </div>
          <div className="cyber-grid"></div>
          <div className="electric-lines"></div>
          <div className="glitch-container">
            <h1 className="mega-title" data-text="DE KIKI - DE MIKI DE 3 LEI RIDICHII!">
              DE KIKI - DE MIKI DE 3 LEI RIDICHII!
            </h1>
          </div>
          <div className="slogan-3d">De ce? De kiki!</div>
          <div className="search-cyberpunk">
            <div className="search-glow"></div>
            <input type="text" placeholder="CAUTĂ FALIMENTUL..." className="search-input-cyber" />
            <button className="search-btn-cyber">
              <span className="btn-text">CAUTĂ</span>
              <span className="btn-spark"></span>
            </button>
          </div>
          <div className="particles"></div>
        </div>
        {children}
      </body>
    </html>
  )
}
