import './globals.css'

export const metadata = {
  title: 'DEKIKI - De ce? De kiki!',
  description: 'DE MIKI DE 3 LEI RIDICHII',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="header">
          <div className="logo-wrapper">
            <img 
              src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" 
              alt="DEKIKI" 
              className="logo-bg"
            />
            <div className="logo-slice slice-1"></div>
            <div className="logo-slice slice-2"></div>
            <div className="logo-slice slice-3"></div>
            <div className="logo-slice slice-4"></div>
          </div>
          <div className="header-content">
            <h1 className="title">DE KIKI - DE MIKI DE 3 LEI RIDICHII!</h1>
            <p className="subtitle">De ce? De kiki!</p>
            <div className="search-wrapper">
              <input type="text" placeholder="Search for products..." className="search" />
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
