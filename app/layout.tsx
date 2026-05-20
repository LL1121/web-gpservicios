import type { Metadata } from 'next'
import { Barlow, Inter } from 'next/font/google'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GP Servicios SRL — Ingeniería, Construcción y Montajes Industriales',
  description:
    'GP SERVICIOS S.R.L. — ingeniería, construcción y montaje. Actividad comercial desde 2013, más de 20 años en oleoductos, gasoductos y piping. Centenario, Neuquén.',
  keywords: [
    'GP Servicios',
    'piping industrial',
    'montaje oleoductos',
    'gasoductos Neuquén',
    'ingeniería petrolera',
    'HSEQ',
    'Centenario Neuquén',
    'YPF Pluspetrol ExxonMobil',
  ],
  authors: [{ name: 'LYNTRIX', url: 'https://lyntrix.dev' }],
  creator: 'LYNTRIX',
  metadataBase: new URL('https://gpservicios.com.ar'),
  openGraph: {
    title: 'GP Servicios SRL — Ingeniería Industrial en Petróleo y Gas',
    description:
      'Especialistas en montaje de líneas, conexión a pozo y obras civiles industriales. Neuquén, Argentina.',
    url: 'https://gpservicios.com.ar',
    siteName: 'GP Servicios SRL',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${barlow.variable} ${inter.variable}`}>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
