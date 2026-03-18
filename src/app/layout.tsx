import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { IBM_Plex_Mono, Instrument_Serif, Noto_Sans_Gujarati, Noto_Sans_Devanagari } from 'next/font/google'
import { ThemeProvider } from '@/hooks/useTheme'
import { Header } from '@/components/layout/Header'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { GlobalInteractions } from '@/components/layout/GlobalInteractions'
import { ChatWidget } from '@/components/ui/ChatWidget'
import './globals.css'

// Neural Brutalism: Technical display font
const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Refined elegance: Serif headline font
const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
})

const notoSansGujarati = Noto_Sans_Gujarati({
  weight: ['400', '700'],
  subsets: ['gujarati'],
  variable: '--font-gujarati',
  display: 'swap',
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ['400', '700'],
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://niharshah.dev'),
  title: {
    default: 'Nihar Shah | Applied AI Systems Builder',
    template: '%s | Nihar Shah',
  },
  description:
    'Building applied AI systems and autonomous agent architectures. Specializing in multi-agent orchestration, AI evaluation systems, and production-ready conversational AI.',
  keywords: [
    'Nihar Shah',
    'Applied AI Systems',
    'Multi-Agent Orchestration',
    'AI Evaluation Systems',
    'Conversational AI',
    'RAG Systems',
    'AI Voice Assistants',
    'Prompt Engineering',
    'Computer Vision',
    'Python',
    'Next.js',
  ],
  authors: [{ name: 'Nihar Shah' }],
  creator: 'Nihar Shah',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://niharshah.dev',
    siteName: 'Nihar Shah Portfolio',
    title: 'Nihar Shah | Applied AI Systems Builder',
    description: 'Building applied AI systems and autonomous agent architectures.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nihar Shah - Applied AI Systems Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nihar Shah | Applied AI Systems Builder',
    description: 'Building applied AI systems and autonomous agent architectures.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable} ${notoSansGujarati.variable} ${notoSansDevanagari.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <GlobalInteractions />
          <Header />
          <ScrollProgress />
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}
