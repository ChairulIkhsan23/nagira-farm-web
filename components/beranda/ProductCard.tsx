"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export interface Product {
    id: number;
    href: string;
    name: string;
    price: string;
    description: string;
    image: string;
    badge?: string;
}

interface ProductCardProps {
    product: Product;
    index: number;
}

const badgeColor: Record<string, string> = {
    "Best Seller": "bg-amber-400 text-amber-900",
    Premium: "bg-purple-400 text-purple-900",
    Populer: "bg-sky-400 text-sky-900",
};

export default function ProductCard({ product, index }: ProductCardProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5 flex flex-col border border-gray-100"
        >
            {/* Badge */}
            {product.badge && (
                <span
                    className={`absolute top-4 left-4 z-10 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${badgeColor[product.badge] ?? "bg-green-400 text-green-900"
                        }`}
                >
                    {product.badge}
                </span>
            )}

            {/* Image */}
            <div className="relative h-52 w-full overflow-hidden bg-green-50">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">
                            Harga mulai dari
                        </p>
                        <p className="text-lg font-extrabold text-green-600">{product.price}</p>
                    </div>
                    <Link
                        href={product.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-white border border-green-500 hover:bg-green-500 px-4 py-2 rounded-lg transition-all duration-200"
                    >
                        Detail
                        <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
