export const metadata = {
  title: 'Dekiki Shop',
  description: 'Romanian Shopping Site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  )
}
