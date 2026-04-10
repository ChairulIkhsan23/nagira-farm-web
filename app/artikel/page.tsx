// app/artikel/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { artikelApi, Artikel } from '@/lib/api/endpoints/artikel';

export default function ArtikelListPage() {
    const [artikels, setArtikels] = useState<Artikel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        const fetchArtikels = async () => {
            try {
                setLoading(true);
                const response = await artikelApi.getAll(currentPage);
                
                // response.data sudah berupa array dari artikelApi.getAll
                setArtikels(response.data);
                setLastPage(response.meta?.last_page || 1);
            } catch (err) {
                console.error('Error detail:', err);
                setError('Gagal memuat artikel');
                setArtikels([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArtikels();
    }, [currentPage]);

    // Format tanggal
    const formatDate = (date: string | null) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
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
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    if (artikels.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center text-gray-500">
                    <p>Belum ada artikel.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-4xl font-bold mb-8 text-center">Artikel Terbaru</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artikels.map((artikel) => (
                    <Link 
                        key={artikel.id} 
                        href={`/artikel/${artikel.slug}`}
                        className="group"
                    >
                        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            {/* Gambar */}
                            {artikel.foto && (
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={`http://localhost:8000/storage/${artikel.foto}`}
                                        alt={artikel.judul}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}
                            
                            {/* Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                {/* Kategori & Status */}
                                <div className="flex items-center gap-2 mb-3">
                                    {artikel.kategori && (
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                            {artikel.kategori.nama_kategori}
                                        </span>
                                    )}
                                    {artikel.is_featured === 1 && (
                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                
                                {/* Judul */}
                                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {artikel.judul}
                                </h2>
                                
                                {/* Excerpt */}
                                <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                                    {artikel.excerpt || (artikel.isi ? artikel.isi.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '')}
                                </p>
                                
                                {/* Meta info */}
                                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-3 border-t">
                                    <span>{formatDate(artikel.tanggal_publish || artikel.created_at)}</span>
                                    <span>{artikel.views} views</span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            {lastPage > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Sebelumnya
                    </button>
                    <span className="px-4 py-2">
                        Halaman {currentPage} dari {lastPage}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(lastPage, p + 1))}
                        disabled={currentPage === lastPage}
                        className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Selanjutnya
                    </button>
                </div>
            )}
        </div>
    );
}