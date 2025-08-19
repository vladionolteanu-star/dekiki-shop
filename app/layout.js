import './globals.css'

export const metadata = {
  title: 'DEKIKI - De ce? De kiki!',
  description: 'DE MIKI DE 3 LEI RIDICHII',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Syne:wght@800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="header-masterpiece">
          <div className="logo-universe">
            <img src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" className="logo-layer layer-base" />
            <img src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" className="logo-layer layer-1" />
            <img src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" className="logo-layer layer-2" />
            <img src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" className="logo-layer layer-3" />
            <img src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" className="logo-layer layer-4" />
            <img src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" className="logo-layer layer-5" />
            <img src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" className="logo-layer layer-6" />
            <img src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" className="logo-layer layer-7" />
            <img src="https://raw.githubusercontent.com/vladionolteanu-star/dekiki-shop/main/fOpImWI%20-%20Imgur.png" className="logo-layer layer-8" />
            <div className="particle-field"></div>
            <div className="wave-distortion"></div>
            <div className="glitch-overlay"></div>
          </div>
          <div className="content-overlay">
  <h1 className="hero-title">
    <span className="sequence seq1">De Kiki</span>
    <span className="sequence seq2">De miki</span>
    <span className="sequence seq3">De 3 lei Ridichii!</span>
  </h1>
  <p className="final-text">De ce? De kiki!</p>
  <div className="search-quantum">
    <div className="search-aurora"></div>
    <input type="text" className="search-field" placeholder="ENTER THE VOID..." />
    <div className="search-particles">
      <span></span><span></span><span></span>
    </div>
  </div>
</div>
            <p className="hero-subtitle">De ce? De kiki!</p>
            <div className="search-quantum">
              <div className="search-aurora"></div>
              <input type="text" className="search-field" placeholder="ENTER THE VOID..." />
              <div className="search-particles">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
          <canvas id="matrix-rain"></canvas>
        </div>
        <script dangerouslySetInnerHTML={{__html: `
          const canvas = document.getElementById('matrix-rain');
          const ctx = canvas.getContext('2d');
          canvas.width = window.innerWidth;
          canvas.height = 600;
          const matrix = "DEKIKI01";
          const matrixArray = matrix.split("");
          const fontSize = 10;
          const columns = canvas.width/fontSize;
          const drops = [];
          for(let x = 0; x < columns; x++) drops[x] = 1;
          function draw(){
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            for(let i = 0; i < drops.length; i++){
              const text = matrixArray[Math.floor(Math.random()*matrixArray.length)];
              ctx.fillText(text, i*fontSize, drops[i]*fontSize);
              if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
              drops[i]++;
            }
          }
          setInterval(draw, 35);
        `}} />
        {children}
      </body>
    </html>
  )
}
