import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pltcreation.com'),
  title: {
    default: 'AMAL PERFUME — More Than A Fragrance, It\'s An Emotion',
    template: '%s | AMAL PERFUME',
  },
  description:
    'Experience AMAL PERFUME. More than a fragrance — it\'s an emotion. Discover our regal collection of pure extraits de parfum, royal Cambodian ouds, and bespoke discovery coffrets.',
  keywords: [
    'amal perfume', 'amal', 'luxury perfume', 'extrait de parfum', 'oud perfume',
    'royal oud', 'niche fragrance', 'more than a fragrance its an emotion',
  ],
  authors: [{ name: 'AMAL PERFUME' }],
  creator: 'AMAL PERFUME',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32 48x48' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'AMAL PERFUME',
    title: 'AMAL PERFUME — More Than A Fragrance, It\'s An Emotion',
    description: 'More than a fragrance — it\'s an emotion. Artisanal pure extraits, royal ouds & discovery coffrets.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMAL PERFUME — More Than A Fragrance, It\'s An Emotion',
    description: 'More than a fragrance — it\'s an emotion. Artisanal pure extraits, royal ouds & discovery coffrets.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'var(--font-inter)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#C4748A', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  );
}
