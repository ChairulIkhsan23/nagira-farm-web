// app/artikel/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { artikelApi, Artikel } from '@/lib/api/endpoints/artikel';
import ArtikelCard from '@/components/artikel/ArtikelCard';
import PreviewArtikelCard from '@/components/artikel/PreviewArtikelCard';

export default function ArtikelPage() {
    const [artikels, setArtikels] = useState<Artikel[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchArtikels = async () => {
            try {
                setLoading(true);
                const response = await artikelApi.getAll(1);
                setArtikels(response.data);
            } catch (err) {
                console.error(err);
                setArtikels([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArtikels();
    }, []);

    const showMoreArticles = () => {
        setVisibleCount(prev => prev + 3);
    };

    const filteredArtikels = searchQuery
        ? artikels.filter(artikel => 
            artikel.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artikel.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : artikels;
    const previewArtikels = [...artikels]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 2);
    
    const allArtikels = filteredArtikels.slice(0, visibleCount);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
                    <p className="mt-4 text-white">Memuat artikel...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-green-900">
            {/* Hero Section */}
            <div className="bg-green-900 py-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Insight From <span className="text-white-400 italic">Nagira Farm</span>
                    </h1>
                    <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                        Temukan kabar terbaru, cerita menarik, dan perjalanan kami dalam 
                        serta membangun ekosistem peternakan yang lebih baik.
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <p className="text-sm text-white/70 mb-2 font-medium text-left">
                            Cari Artikel dan Berita
                        </p>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 pr-10 border border-white/20 bg-white/10 text-white placeholder-white/50 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                                />
                                <svg 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button
                                onClick={() => setSearchQuery(searchQuery)}
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* PREVIEW SECTION - 2 card di tengah, tanpa swipe */}
            {previewArtikels.length > 0 && (
                <div className="container mx-auto px-4 max-w-5xl mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Artikel Terbaru</h2>
                    <div className="flex justify-center items-center gap-8">
                        {previewArtikels.map((artikel, index) => (
                            <PreviewArtikelCard 
                                key={artikel.id} 
                                artikel={artikel} 
                                isFirst={index === 0}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* ALL ARTICLES SECTION */}
            <div className="container mx-auto px-4 py-12 max-w-7xl border-t border-white/10">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">
                    {searchQuery ? 'Hasil Pencarian' : 'Semua Artikel'}
                </h2>
                
                {allArtikels.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-white/70">Artikel tidak ditemukan.</p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-4 text-yellow-400 hover:text-yellow-300 font-medium"
                            >
                                Reset pencarian
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allArtikels.map((artikel) => (
                                <ArtikelCard key={artikel.id} artikel={artikel} />
                            ))}
                        </div>

                        {visibleCount < filteredArtikels.length && !searchQuery && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={showMoreArticles}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                                >
                                    Lihat Lebih Banyak ↓
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}