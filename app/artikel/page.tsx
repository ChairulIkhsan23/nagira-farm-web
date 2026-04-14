'use client';

import { useEffect, useState } from 'react';
import { artikelApi, Artikel } from '@/lib/api/endpoints/artikel';
import ArtikelCard from '@/components/artikel/ArtikelCard';
import PreviewArtikelCard from '@/components/artikel/PreviewArtikelCard';

export default function ArtikelPage() {
    const [allArtikels, setAllArtikels] = useState<Artikel[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAllArticles, setShowAllArticles] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [paginatedArtikels, setPaginatedArtikels] = useState<Artikel[]>([]);

    useEffect(() => {
        const fetchArtikels = async () => {
            try {
                setLoading(true);
                const response = await artikelApi.getAll(1);
                setAllArtikels(response.data);
                setPaginatedArtikels(response.data.slice(0, itemsPerPage));
            } catch (err) {
                console.error(err);
                setAllArtikels([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArtikels();
    }, []);

    // Update pagination when currentPage changes
    useEffect(() => {
        if (showAllArticles || searchQuery) {
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            setPaginatedArtikels(allArtikels.slice(start, end));
        }
    }, [currentPage, allArtikels, showAllArticles, searchQuery]);

    const handleShowAllArticles = () => {
        setShowAllArticles(true);
        setCurrentPage(1);
    };

    const handleCloseArticles = () => {
        setShowAllArticles(false);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({ top: 600, behavior: 'smooth' });
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({ top: 600, behavior: 'smooth' });
        }
    };

    const filteredArtikels = searchQuery
        ? allArtikels.filter(artikel => 
            artikel.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artikel.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : allArtikels;

    const previewArtikels = [...allArtikels]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 2);

    // Pagination calculation for ALL articles (including preview)
    const totalPages = Math.ceil(filteredArtikels.length / itemsPerPage);
    const currentDisplayArtikels = (showAllArticles || searchQuery) 
        ? paginatedArtikels
        : [];

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
            {/* Hero Section - diperbesar padding bottomnya */}
            <section className="relative pt-32 pb-32 md:pt-40 md:pb-40 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/bg-1.png')" }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                        Insight From <span className="text-white italic">Nagira Farm</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow">
                        Temukan kabar terbaru, cerita menarik, dan perjalanan kami dalam 
                        membangun ekosistem peternakan yang lebih baik.
                    </p>
                    
                    <div className="max-w-2xl mx-auto mt-8">
                        <p className="text-sm text-white/80 mb-2 font-medium text-left">
                            Cari Artikel dan Berita
                        </p>
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        if (e.target.value === '') {
                                            setShowAllArticles(false);
                                            setCurrentPage(1);
                                        }
                                    }}
                                    className="w-full px-4 py-3 pr-10 border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                                />
                                <svg 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button
                                onClick={() => {
                                    if (searchQuery) {
                                        setShowAllArticles(true);
                                        setCurrentPage(1);
                                    }
                                }}
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* PREVIEW SECTION - dengan background transparan dan jarak yang pas */}
            {previewArtikels.length > 0 && (
                <div className="container mx-auto px-4 max-w-5xl -mt-16 mb-12 relative z-10">
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

            {/* BUTTON LIHAT LEBIH BANYAK */}
            {!showAllArticles && !searchQuery && (
                <div className="container mx-auto px-4 py-8 max-w-7xl text-center">
                    <button
                        onClick={handleShowAllArticles}
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                        Lihat lebih banyak
                    </button>
                </div>
            )}

            {/* ALL ARTICLES SECTION - SEMUA ARTIKEL TAMPIL (termasuk yang di preview) */}
            {(showAllArticles || searchQuery) && (
                <div className="container mx-auto px-4 py-12 max-w-7xl">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-white">
                            {searchQuery ? 'Hasil Pencarian' : 'Semua Artikel'}
                        </h2>
                        {!searchQuery && (
                            <button
                                onClick={handleCloseArticles}
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-6 py-2 rounded-full transition-all duration-300"
                            >
                                Tutup
                            </button>
                        )}
                    </div>
                    
                    {currentDisplayArtikels.length === 0 ? (
                        <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-2xl">
                            <p className="text-white/70">Tidak ada artikel.</p>
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setShowAllArticles(false);
                                    }}
                                    className="mt-4 text-yellow-400 hover:text-yellow-500 font-medium"
                                >
                                    Reset pencarian
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentDisplayArtikels.map((artikel) => (
                                    <ArtikelCard key={artikel.id} artikel={artikel} />
                                ))}
                            </div>

                            {/* PAGINATION */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-12">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 hover:text-gray-800 transition-all duration-300"
                                    >
                                        Sebelumnya
                                    </button>
                                    
                                    <div className="flex gap-2">
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }
                                            
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                                                        currentPage === pageNum
                                                            ? 'bg-yellow-400 text-gray-800 font-bold'
                                                            : 'bg-white/10 backdrop-blur-sm text-white hover:bg-yellow-400 hover:text-gray-800'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 hover:text-gray-800 transition-all duration-300"
                                    >
                                        Selanjutnya
                                    </button>
                                </div>
                            )}
                            
                            {/* Info halaman */}
                            {totalPages > 1 && (
                                <div className="text-center mt-4 text-white/50 text-sm">
                                    Halaman {currentPage} dari {totalPages}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </main>
    );
}