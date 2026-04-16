'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Link from 'next/link';
import { artikelApi, Artikel } from '@/lib/api/endpoints/artikel';
import { motion, AnimatePresence } from 'framer-motion';

// Tipe untuk error
interface ApiError {
    message?: string;
    response?: {
        status?: number;
        data?: unknown;
    };
}

// Animasi variants - PERBAIKAN: menggunakan properti ease yang benar
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.6, 
            ease: "easeOut" as const  // Tambahkan 'as const'
        } 
    }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            duration: 0.5,
            ease: "easeOut" as const
        } 
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1, 
        transition: { 
            duration: 0.7, 
            ease: "easeOut" as const
        } 
    }
};

export default function ArtikelDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    
    const [artikel, setArtikel] = useState<Artikel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArtikel = async () => {
            if (!slug) return;
            
            try {
                setLoading(true);
                const data = await artikelApi.getBySlug(slug);
                setArtikel(data);
            } catch (err: unknown) {
                const apiError = err as ApiError;
                if (apiError.message?.includes('404') || apiError.response?.status === 404) {
                    notFound();
                } else {
                    setError('Gagal memuat artikel');
                }
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtikel();
    }, [slug]);

    const formatDate = (date: string | null) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getReadingTime = (content: string) => {
        if (!content) return '1 menit';
        const text = content.replace(/<[^>]*>/g, '');
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} menit`;
    };

    const getImageUrl = (path: string | null): string | null => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://127.0.0.1:8000/storage/${path}`;
    };

    const imageUrl = getImageUrl(artikel?.foto ?? null);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"
                    ></motion.div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-gray-600"
                    >
                        Memuat artikel...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-center"
                >
                    <motion.p
                        animate={{ x: [-10, 10, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                    >
                        {error}
                    </motion.p>
                    <Link href="/artikel" className="text-green-600 mt-4 inline-block">
                        ← Kembali ke daftar artikel
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (!artikel) {
        return notFound();
    }

    return (
        <article className="min-h-screen bg-gray-50 pt-20 md:pt-24 overflow-hidden">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Breadcrumb */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="mb-6 text-sm text-gray-500"
                >
                    <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/artikel" className="hover:text-green-600 transition-colors">Insight</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700">{artikel.judul}</span>
                </motion.div>

                {/* Header */}
                <motion.header 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mb-8 bg-white rounded-xl p-6 shadow-sm"
                >
                    {/* kategori badge */}
                    <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4 flex-wrap">
                        {artikel.kategori && (
                            <motion.span 
                                whileHover={{ scale: 1.05 }}
                                className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium"
                            >
                                {artikel.kategori.nama_kategori}
                            </motion.span>
                        )}
                    </motion.div>
                    
                    <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                        {artikel.judul}
                    </motion.h1>
                    
                    <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                        <span>{formatDate(artikel.tanggal_publish || artikel.created_at)}</span>
                        <span>•</span>
                        <span>{artikel.views} views</span>
                        <span>•</span>
                        <span>Waktu baca: {getReadingTime(artikel.isi)}</span>
                    </motion.div>
                </motion.header>

                {/* Content wrapper with white background */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                    {/* Featured Image */}
                    {imageUrl && (
                        <motion.div 
                            variants={imageVariants}
                            className="relative h-96 w-full overflow-hidden"
                        >
                            <OptimizedImage
                                src={imageUrl}
                                alt={artikel.judul}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}
                    
                    {/* Content body */}
                    <motion.div variants={fadeInUp} className="p-6 md:p-8">
                        {artikel.excerpt && (
                            <motion.div 
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="bg-green-50 border-l-4 border-green-700 p-4 mb-6 italic text-gray-700 rounded-r"
                            >
                                {artikel.excerpt}
                            </motion.div>
                        )}

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="prose prose-lg prose-green max-w-none
                                       prose-headings:text-gray-800 prose-headings:font-bold
                                       prose-p:text-gray-600 prose-p:leading-relaxed
                                       prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline
                                       prose-img:rounded-lg prose-img:shadow-md"
                            dangerouslySetInnerHTML={{ __html: artikel.isi }}
                        />
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.footer 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 pt-6 border-t border-gray-200"
                >
                    <div className="mt-8 text-center pb-12">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link 
                                href="/artikel" 
                                className="inline-flex items-center gap-2 text-green-700 hover:text-lime-400 font-medium transition-colors"
                            >
                                ← Kembali ke daftar artikel
                            </Link>
                        </motion.div>
                    </div>
                </motion.footer>
            </div>
        </article>
    );
}