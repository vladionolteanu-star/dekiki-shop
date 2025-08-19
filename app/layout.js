import './globals.css'

export const metadata = {
  title: 'Dekiki - De-aia sunt falit',
  description: 'Cele mai tari gadgeturi din România',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>
        <div className="header">
          <h1 style={{ fontSize: '28px', textAlign: 'center' }}>🔥 DEKIKI - De-aia sunt falit! 🔥</h1>
          <p style={{ textAlign: 'center', marginTop: '10px', color: '#666' }}>
            Gadgeturi care-ți golesc portofelul dar îți umplu sufletul
          </p>
        </div>
        {children}
      </body>
    </html>
  )
}
