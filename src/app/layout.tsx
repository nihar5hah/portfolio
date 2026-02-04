import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://niharshah.dev'),
  title: {
    default: 'Nihar Shah | AI Engineer & Developer',
    template: '%s | Nihar Shah',
  },
  description:
    'Building AI systems that actually work in the real world. Specializing in AI voice assistants, prompt engineering, and computer vision.',
  keywords: [
    'Nihar Shah',
    'AI Engineer',
    'Voice Assistants',
    'Computer Vision',
    'Prompt Engineering',
    'Full-Stack Developer',
    'Python',
    'Machine Learning',
    'Healthcare AI',
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
    title: 'Nihar Shah | AI Engineer & Developer',
    description: 'Building AI systems that actually work in the real world.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nihar Shah - AI Engineer & Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nihar Shah | AI Engineer & Developer',
    description: 'Building AI systems that actually work in the real world.',
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
