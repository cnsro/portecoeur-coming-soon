// File: app/layout.tsx

import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"; 

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-cormorant-garamond',
});

export const metadata: Metadata = {
  title: 'Consero - Coming Soon',
  description: 'Luxury menswear for the modern gentleman.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}