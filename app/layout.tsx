import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AuthProvider } from '../context/AuthContext'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'TheDhanMatrix',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
