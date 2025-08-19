import './globals.css'

export const metadata = {
  title: 'DEKIKI - De ce? De kiki!',
  description: 'DE MIKI DE 3 LEI RIDICHII',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Russo+One&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="header-clean">
          <img src="/fOpImWI%20-%20Imgur.png" alt="DEKIKI" className="logo-hero" />
          <h1 className="title-main">DE KIKI - DE MIKI DE 3 LEI RIDICHII!</h1>
          <p className="tagline">De ce? De kiki!</p>
          <div className="search-box">
            <input type="text" placeholder="Caută produse..." className="search-input" />
            <button className="search-button">CAUTĂ</button>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
