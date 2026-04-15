'use client';

import { useEffect, useState } from 'react';
import { artikelApi, Artikel } from '@/lib/api/endpoints/artikel';
import ArtikelCard from '@/components/artikel/ArtikelCard';
import PreviewArtikelCard from '@/components/artikel/PreviewArtikelCard';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';

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

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        if (value === '') {
            setShowAllArticles(false);
            setCurrentPage(1);
        }
    };

    const handleSearchSubmit = () => {
        if (searchQuery) {
            setShowAllArticles(true);
            setCurrentPage(1);
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
            {/* Hero Section */}
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
                        <SearchBar 
                            searchQuery={searchQuery}
                            onSearchChange={handleSearchChange}
                            onSearchSubmit={handleSearchSubmit}
                            placeholder="Search..."
                            variant="dark"
                        />
                    </div>
                </div>
            </section>

            {/* PREVIEW SECTION */}
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

            {/* ALL ARTICLES SECTION */}
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

                            {/* PAGINATION COMPONENT */}
                            <Pagination 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                variant="dark"
                            />
                        </>
                    )}
                </div>
            )}
        </main>
    );
}