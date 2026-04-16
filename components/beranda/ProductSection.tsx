"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ProductCard, { Product } from "./ProductCard";

interface ProductSectionProps {
  products: Product[];
}

export default function ProductSection({ products }: ProductSectionProps) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kotak Hijau Pembungkus Konten - dengan margin di semua sisi */}
        <div className="bg-green-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Section Header */}
            <motion.div
              ref={headerRef}
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight relative inline-block">
                Produk <span className="italic">Unggulan</span> Kami
                {/* Brush Shape di bawah judul */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center translate-y-8">
                  <Image
                    src="/images/brush.png"
                    alt=""
                    width={200}
                    height={20}
                    className="w-40 sm:w-48 md:w-56 opacity-90 relative z-10"
                  />
                </div>
              </h2>
            </motion.div>

            {/* Product Cards Grid - Menggunakan komponen ProductCard terpisah */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-14"
            >
              <a
                href="/produk"
                className="group inline-flex items-center gap-3 bg-yellow-400 text-white hover:bg-yellow-500 font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-yellow-500/30 transition-all duration-300 hover:-translate-y-0.5 text-base"
              >
                <span>Lihat Produk Lain</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 7l5 5-5 5M13 7l5 5-5 5"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}