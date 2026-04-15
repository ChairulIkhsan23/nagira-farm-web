import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Nagira Farm',
    template: '%s | Nagira Farm'
  },
  description: 'Tingkatkan Kemandirian dan Ketahanan Pangan dengan domba dan kambing berkualitas dari Nagira Farm, peternakan modern terpercaya di Majalengka, Jawa Barat.',
  keywords: [
    // Brand
    'Nagira Farm',

    // Umum
    'Peternakan Domba',
    'Peternakan Kambing',
    'Domba Berkualitas',
    'Kambing Berkualitas',
    'Kemandirian Pangan',
    'Ketahanan Pangan',

    // Produk
    'Domba Qurban',
    'Kambing Qurban',
    'Domba Aqiqah',
    'Kambing Aqiqah',
    'Domba Kurban',
    'Kambing Kurban',

    // Lokasi
    'Peternakan Majalengka',
    'Domba Jawa Barat',
    'Kambing Jawa Barat',

    // Lainnya
    'Harga Domba Terbaru',
    'Harga Kambing Terbaru',
    'Domba Sehat',
    'Kambing Sehat',
    'Peternakan Terpercaya',
  ],

  // Open Graph Social Media
  openGraph: {
    title: 'Nagira Farm | Peternakan Domba & Kambing',
    description: 'Tingkatkan Kemandirian dan Ketahanan Pangan dengan domba dan kambing berkualitas dari Nagira Farm, peternakan modern terpercaya di Majalengka, Jawa Barat.',
    url: 'https://nagirafarm.com',
    siteName: 'Nagira Farm',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nagira Farm - Peternakan Domba dan Kambing Majalengka',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nagira Farm | Peternakan Domba & Kambing',
    description: 'Tingkatkan Kemandirian dan Ketahanan Pangan dengan domba dan kambing berkualitas',
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

  alternates: {
    canonical: 'https://nagirafarm.com',
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}