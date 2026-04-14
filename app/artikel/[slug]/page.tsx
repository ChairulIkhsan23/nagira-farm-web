// app/artikel/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { artikelApi, Artikel } from '@/lib/api/endpoints/artikel';

// Tipe untuk error
interface ApiError {
    message?: string;
    response?: {
        status?: number;
        data?: unknown;
    };
}

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

    // Hitung waktu baca
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
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat artikel...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-center">
                    <p>{error}</p>
                    <Link href="/artikel" className="text-green-600 mt-4 inline-block">
                        ← Kembali ke daftar artikel
                    </Link>
                </div>
            </div>
        );
    }

    if (!artikel) {
        return notFound();
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = encodeURIComponent(`${artikel.judul} - ${shareUrl}`);

    return (
        <article className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-500">
                    <Link href="/" className="hover:text-green-600">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/artikel" className="hover:text-green-600">Insight</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700">{artikel.judul}</span>
                </div>

                {/* Header */}
                <header className="mb-8 bg-white rounded-xl p-6 shadow-sm">
                    {/* kategori badge */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        {artikel.kategori && (
                            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                                {artikel.kategori.nama_kategori}
                            </span>
                        )}
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                        {artikel.judul}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                        <span>{formatDate(artikel.tanggal_publish || artikel.created_at)}</span>
                        <span>•</span>
                        <span>{artikel.views} views</span>
                        <span>•</span>
                        <span>Waktu baca: {getReadingTime(artikel.isi)}</span>
                    </div>
                </header>

                {/* Content wrapper with white background */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Featured Image */}
                            {imageUrl && (
                                <div className="relative h-96 w-full">
                                    <Image
                                        src={imageUrl}
                                        alt={artikel.judul}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                </div>
                            )}
                    {/* Content body */}
                    <div className="p-6 md:p-8">
                        {artikel.excerpt && (
                            <div className="bg-green-50 border-l-4 border-green-700 p-4 mb-6 italic text-gray-700 rounded-r">
                                {artikel.excerpt}
                            </div>
                        )}

                        <div 
                            className="prose prose-lg prose-green max-w-none
                                       prose-headings:text-gray-800 prose-headings:font-bold
                                       prose-p:text-gray-600 prose-p:leading-relaxed
                                       prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline
                                       prose-img:rounded-lg prose-img:shadow-md"
                            dangerouslySetInnerHTML={{ __html: artikel.isi }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Link 
                            href="/artikel" 
                            className="text-green-700 hover:text-green-800 flex items-center gap-2 font-medium"
                        >
                            ← Kembali ke Insight
                        </Link>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={() => window.open(`https://wa.me/?text=${shareText}`)}
                                className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                                </svg>
                                WhatsApp
                            </button>
                            <button 
                                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(artikel.judul)}&url=${encodeURIComponent(shareUrl)}`)}
                                className="bg-blue-400 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-500 transition flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.38-11.667c0-.21-.005-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                                Twitter
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </article>
    );
}