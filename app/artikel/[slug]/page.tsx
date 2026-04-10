// app/artikel/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
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
                    <Link href="/artikel" className="text-blue-600 mt-4 inline-block">
                        ← Kembali ke daftar artikel
                    </Link>
                </div>
            </div>
        );
    }

    if (!artikel) {
        return notFound();
    }

    // Buat URL gambar
    const getImageUrl = (path: string | null) => {
        if (!path) return null;
        return `http://localhost:8000/storage/${path}`;
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = encodeURIComponent(`${artikel.judul} - ${shareUrl}`);

    return (
        <>
            <Head>
                <title>{artikel.meta_title || artikel.judul} | Nagira Farm</title>
                <meta name="description" content={artikel.meta_description || artikel.excerpt || ''} />
                <meta property="og:title" content={artikel.judul} />
                <meta property="og:description" content={artikel.meta_description || artikel.excerpt || ''} />
                <meta property="og:type" content="article" />
                {getImageUrl(artikel.og_image || artikel.foto) && (
                    <meta property="og:image" content={getImageUrl(artikel.og_image || artikel.foto) || ''} />
                )}
            </Head>

            <article className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-500">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/artikel" className="hover:text-blue-600">Artikel</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700">{artikel.judul}</span>
                </div>

                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        {artikel.kategori && (
                            <Link 
                                href={`/artikel?kategori=${artikel.kategori.slug}`}
                                className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition"
                            >
                                {artikel.kategori.nama_kategori}
                            </Link>
                        )}
                        {artikel.is_featured === 1 && (
                            <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                                Artikel Unggulan
                            </span>
                        )}
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{artikel.judul}</h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm border-b pb-4">
                        <span>{formatDate(artikel.tanggal_publish || artikel.created_at)}</span>
                        <span>•</span>
                        <span>{artikel.views} views</span>
                        <span>•</span>
                        <span>Waktu baca: {getReadingTime(artikel.isi)}</span>
                    </div>
                </header>

                {/* Featured Image */}
                {getImageUrl(artikel.foto) && (
                    <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={getImageUrl(artikel.foto) || ''}
                            alt={artikel.judul}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Excerpt (if exists) */}
                {artikel.excerpt && (
                    <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-8 italic text-gray-700 rounded-r-lg">
                        {artikel.excerpt}
                    </div>
                )}

                {/* Main Content */}
                <div 
                    className="prose prose-lg prose-blue max-w-none
                               prose-headings:font-bold prose-headings:text-gray-800
                               prose-p:text-gray-600 prose-p:leading-relaxed
                               prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                               prose-img:rounded-lg prose-img:shadow-md
                               prose-ul:text-gray-600 prose-ol:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: artikel.isi }}
                />

                {/* Footer */}
                <footer className="mt-12 pt-6 border-t">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Link 
                            href="/artikel" 
                            className="text-blue-600 hover:underline flex items-center gap-2"
                        >
                            ← Kembali ke daftar artikel
                        </Link>
                        
                        {/* Share buttons */}
                        <div className="flex gap-2">
                            <button 
                                onClick={() => window.open(`https://wa.me/?text=${shareText}`)}
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                            >
                                WhatsApp
                            </button>
                            <button 
                                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(artikel.judul)}&url=${encodeURIComponent(shareUrl)}`)}
                                className="bg-blue-400 text-white px-3 py-1 rounded text-sm hover:bg-blue-500 transition"
                            >
                                Twitter
                            </button>
                        </div>
                    </div>
                </footer>
            </article>
        </>
    );
}