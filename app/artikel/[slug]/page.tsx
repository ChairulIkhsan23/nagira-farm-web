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
            <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat artikel...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20">
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
        <article className="min-h-screen bg-gray-50 pt-20 md:pt-24">
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
                            Kembali ke Insight
                        </Link>
                    </div>
                </footer>
            </div>
        </article>
    );
}