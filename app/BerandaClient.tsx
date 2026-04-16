"use client";

import HeroSection from "@/components/beranda/HeroSection";
import ProductSection from "@/components/beranda/ProductSection";
import ArticleSection from "@/components/beranda/ArticleSection";
import type { Product } from "@/components/beranda/ProductCard";
import type { Article } from "@/components/beranda/ArticleSection";

const products: Product[] = [
  {
    id: 1,
    name: "Domba Garut",
    price: "Rp 3.500.000",
    description:
      "Domba asli Garut dengan postur tegap, cocok untuk kurban dan budidaya.",
    image: "/images/domba-garut.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Domba Arjuna",
    price: "Rp 4.200.000",
    description:
      "Ras unggulan dengan bobot besar dan daging berkualitas premium.",
    image: "/images/domba-arjuna.jpg",
    badge: "Premium",
  },
  {
    id: 3,
    name: "Kambing Etawa",
    price: "Rp 2.800.000",
    description:
      "Kambing perah produktif, penghasil susu tinggi dan mudah dipelihara.",
    image: "/images/kambing-etawa.jpg",
    badge: "Populer",
  },
];

const articles: Article[] = [
  {
    id: 1,
    title: "Tips Merawat Domba Garut Agar Sehat dan Produktif",
    description:
      "Panduan lengkap perawatan domba Garut mulai dari pakan, kandang, hingga pencegahan penyakit untuk hasil optimal.",
    image: "/images/artikel-1.jpg",
    date: "12 April 2025",
    category: "Perawatan",
    href: "/berita/tips-merawat-domba",
  },
  {
    id: 2,
    title: "Mengenal Manfaat Susu Kambing Etawa untuk Kesehatan",
    description:
      "Susu kambing Etawa kaya nutrisi dan mudah dicerna. Pelajari manfaatnya bagi tubuh dan cara pengolahannya.",
    image: "/images/artikel-2.jpg",
    date: "5 April 2025",
    category: "Edukasi",
    href: "/berita/manfaat-susu-etawa",
  },
  {
    id: 3,
    title: "Strategi Bisnis Peternakan Domba di Era Modern",
    description:
      "Bagaimana memanfaatkan teknologi dan pemasaran digital untuk mengembangkan usaha peternakan menjadi lebih menguntungkan.",
    image: "/images/artikel-3.jpg",
    date: "28 Maret 2025",
    category: "Bisnis",
    href: "/berita/strategi-bisnis-peternakan",
  },
];

// ─── Main Client Component ────────────────────────────────────
export default function BerandaClient() {
  return (
    <main className="min-h-screen bg-white font-sans antialiased">
      <HeroSection />
      <ProductSection products={products} />
      <ArticleSection articles={articles} />
    </main>
  );
}
