"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/beranda/HeroSection";
import ProductSection from "@/components/beranda/ProductSection";
import ArticleSection from "@/components/beranda/ArticleSection";
import type { Product } from "@/components/beranda/ProductCard";
import type { Article } from "@/components/beranda/ArticleSection";
import { ternakApi, type FeaturedTernakJenis } from "@/lib/api/endpoints/ternak";

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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getImageUrl = (path: string | null): string => {
      if (!path) return "/images/bg-4.jpg";
      if (path.startsWith("http")) return path;
      return `http://127.0.0.1:8000/storage/${path}`;
    };

    const mapProduct = (featured: FeaturedTernakJenis, index: number): Product => ({
      id: index + 1,
      href: `/ternak?jenis=${encodeURIComponent(featured.jenis_ternak)}`,
      name: featured.jenis_ternak,
      price: featured.price_range.label,
      description: `Tersedia ${featured.jumlah_tersedia} ekor ${featured.jenis_ternak} dengan kisaran harga terbaik.`,
      image: getImageUrl(featured.foto),
    });

    const fetchProducts = async () => {
      try {
        const featured = await ternakApi.getFeatured(6);
        setProducts(featured.map(mapProduct));
      } catch (error) {
        console.error("Gagal memuat produk unggulan:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white font-sans antialiased">
      <HeroSection />
      <ProductSection products={products} />
      <ArticleSection articles={articles} />
    </main>
  );
}
