"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  href: string;
}

interface ArticleSectionProps {
  articles: Article[];
}

const categoryColor: Record<string, string> = {
  Perawatan: "bg-green-100 text-green-700",
  Edukasi: "bg-blue-100 text-blue-700",
  Bisnis: "bg-amber-100 text-amber-700",
};

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.13, ease: "easeOut" }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-green-50">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Category badge over image */}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${categoryColor[article.category] ?? "bg-gray-100 text-gray-700"}`}
        >
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Date */}
        <p className="text-xs text-gray-400 font-medium mb-3 flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {article.date}
        </p>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 leading-snug mb-3 group-hover:text-green-600 transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1 line-clamp-3">
          {article.description}
        </p>

        {/* CTA */}
        <Link
          href={article.href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors mt-auto group/link"
        >
          Baca Artikel
          <svg
            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

export default function ArticleSection({ articles }: ArticleSectionProps) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-green-600 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Flex antara kiri dan kanan */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-12"
        >
          {/* Kiri: Judul */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              Artikel <span className="italic font-medium">Populer</span>
            </h2>
          </div>

          {/* Kanan: Tombol Baca Artikel */}
          <Link
            href="/berita"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white bg-green-500/30 backdrop-blur-sm hover:bg-green-500/50 px-6 py-2.5 rounded-full transition-all duration-200 whitespace-nowrap self-start sm:self-auto"
          >
            Baca Artikel Lebih Banyak
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}