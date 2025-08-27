import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AlignUK - UK Political Alignment Quiz',
  description: 'Discover your political alignment across six key dimensions in UK politics. Take our neutral, evidence-based quiz to understand where you stand on economic, social, authority, sovereignty, environment, and welfare issues.',
  keywords: 'UK politics, political quiz, political alignment, UK political compass, vote compass, political test',
  authors: [{ name: 'AlignUK' }],
  creator: 'AlignUK',
  publisher: 'AlignUK',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'AlignUK - UK Political Alignment Quiz',
    description: 'Discover your political alignment across six key dimensions in UK politics.',
    url: '/',
    siteName: 'AlignUK',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/logo-large.svg',
        width: 40,
        height: 40,
        alt: 'AlignUK Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlignUK - UK Political Alignment Quiz',
    description: 'Discover your political alignment across six key dimensions in UK politics.',
    images: ['/logo-large.svg'],
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <AuthProvider>
          <div className="min-h-full bg-neutral-50">
            <Header />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
