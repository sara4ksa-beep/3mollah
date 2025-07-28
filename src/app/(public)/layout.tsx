import type { Metadata } from "next";
import "./globals.css";
import { Cairo, Inter, Poppins } from 'next/font/google';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// تكوين الخطوط
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-cairo',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "متجر العمولة - تسوق بذكاء",
  description: "موقع البيع بالعمولة - نروج منتجات التجار مقابل عمولة من كل عملية بيع",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mtekt.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "متجر العمولة - تسوق بذكاء",
    description: "موقع البيع بالعمولة - نروج منتجات التجار مقابل عمولة من كل عملية بيع",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mtekt.com',
    siteName: 'متجر العمولة',
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "متجر العمولة - تسوق بذكاء",
    description: "موقع البيع بالعمولة - نروج منتجات التجار مقابل عمولة من كل عملية بيع",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${inter.variable} ${poppins.variable} font-cairo`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 