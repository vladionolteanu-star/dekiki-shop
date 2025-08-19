import './globals.css'

export const metadata = {
  title: 'DEKIKI - De ce? De kiki!',
  description: 'DE MIKI DE 3 LEI RIDICHII',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="header">
          <div className="header-animation">
            <img src="https://i.imgur.com/RXNwBXV.png" alt="Logo 1" className="float-logo logo1" />
            <img src="https://i.imgur.com/JKL4Dxf.png" alt="Logo 2" className="float-logo logo2" />
          </div>
          <div className="header-content">
            <h1 className="main-title">DE KIKI - DE MIKI DE 3 LEI RIDICHII!</h1>
            <p className="slogan">De ce? De kiki!</p>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Caută ceva să te falimenteze..." 
                className="search-bar"
              />
              <button className="search-btn">🔍</button>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
