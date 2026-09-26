import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-alex-brush',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Convite Especial — Aniversário da Taynara Mussa | Restaurante Ouriço',
  description: 'Um dia especial merece ser celebrado com pessoas especiais. 05 de Outubro no Restaurante Ouriço, Macuti, Beira.',
  openGraph: {
    title: 'Convite Especial — Aniversário da Taynara Mussa',
    description: '05 de Outubro às 14:30 no Restaurante Ouriço, Macuti - Beira. Confirme a sua presença!',
    images: [{ url: '/images/ourico-sunset.jpg', width: 1200, height: 630, alt: 'Restaurante Ouriço Sunset' }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" className={`${cormorant.variable} ${jakarta.variable} ${alexBrush.variable} scroll-smooth`}>
      <body className="bg-sand-50 text-charcoal-900 font-sans antialiased selection:bg-blush-200 selection:text-charcoal-900 overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
