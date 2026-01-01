import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import BackgroundOrbs from '@/components/layout/BackgroundOrbs'
import { Josefin_Sans } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ToastProvider } from '@/components/ui/PremiumToast'
import Analytics from '@/components/ui/Analytics'
import { Suspense } from 'react'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin',
})

export const metadata = {
  title: {
    default: 'Dhanmatrixcapital - SEBI Regulated Wealth Management',
    template: '%s | Dhanmatrixcapital'
  },
  description: 'Premium SEBI-regulated wealth management platform. Start investing from just \u20B9500/month with professional portfolio management and guaranteed returns.',
  keywords: ['wealth management', 'investment', 'SEBI regulated', 'portfolio management', 'mutual funds', 'India', 'financial planning'],
  authors: [{ name: 'Dhanmatrixcapital Team' }],
  creator: 'Dhanmatrixcapital',
  publisher: 'Dhanmatrixcapital',
  icons: {
    icon: '/icon-192.png',
    shortcut: '/icon-192.png',
    apple: '/icon-192.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dhanmatrixcapital.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dhanmatrixcapital - SEBI Regulated Wealth Management',
    description: 'Premium wealth management platform. Start investing from just \u20B9500/month with professional portfolio management.',
    url: 'https://dhanmatrixcapital.vercel.app',
    siteName: 'Dhanmatrixcapital',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dhanmatrixcapital - Wealth Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhanmatrixcapital - SEBI Regulated Wealth Management',
    description: 'Premium wealth management platform. Start investing from just \u20B9500/month.',
    images: ['/og-image.png'],
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
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Dhanmatrixcapital',
  },
}



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={josefin.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className={`${josefin.className} min-h-screen relative overflow-x-hidden transition-colors duration-500`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <BackgroundOrbs />
              <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Dhanmatrixcapital",
              "alternateName": "DMC",
              "description": "SEBI Regulated Wealth Management Platform - Smart Investing & Structured Growth",
              "url": "https://dhanmatrixcapital.vercel.app",
              "logo": "https://dhanmatrixcapital.vercel.app/icon-512.png",
              "image": "https://dhanmatrixcapital.vercel.app/og-image.png",
              "telephone": "+91-8446285154",
              "email": "dhanmatrixcap@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "sameAs": [],
              "priceRange": "\u20B925,000+",
              "areaServed": "IN",
              "serviceType": ["Investment Management", "Wealth Management", "Financial Planning"],
              "knowsAbout": ["Stock Market", "Mutual Funds", "Portfolio Management", "Financial Planning"],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "14"
              }
            })
          }}
        />
      </body>
    </html>
  )
}
