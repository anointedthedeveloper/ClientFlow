import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'ClientFlow — CRM for Modern Sales Teams', template: '%s | ClientFlow' },
  description: 'ClientFlow is a clean, fast CRM to manage customers, track deals, and close more revenue. Built for modern sales teams.',
  keywords: ['CRM', 'sales pipeline', 'customer management', 'deal tracking', 'ClientFlow'],
  authors: [{ name: 'anointedthedeveloper', url: 'https://github.com/anointedthedeveloper' }],
  creator: 'anointedthedeveloper',
  metadataBase: new URL('https://clientflow.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://clientflow.vercel.app',
    title: 'ClientFlow — CRM for Modern Sales Teams',
    description: 'Manage customers, track deals, and close more revenue with ClientFlow.',
    siteName: 'ClientFlow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClientFlow — CRM for Modern Sales Teams',
    description: 'Manage customers, track deals, and close more revenue with ClientFlow.',
    creator: '@anointedthedeveloper',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>{children}</body>
    </html>
  );
}
