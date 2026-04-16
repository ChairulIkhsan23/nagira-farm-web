'use client';

import { useEffect, useState } from 'react';
import { artikelApi, Artikel } from '@/lib/api/endpoints/artikel';
import ArtikelCard from '@/components/artikel/ArtikelCard';
import PreviewArtikelCard from '@/components/artikel/PreviewArtikelCard';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Animasi variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { 
        scale: 1.02, 
        transition: { duration: 0.2, type: "spring", stiffness: 300 }
    }
};

const buttonVariants: Variants = {
    idle: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
};

// Komponen untuk efek ngetik
function TypingText({ text, className, onComplete }: { text: string; className?: string; onComplete?: () => void }) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 100);
            return () => clearTimeout(timer);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, onComplete]);

    return (
        <span className={className}>
            {displayText}
            {currentIndex < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-8 md:h-12 bg-yellow-400 ml-1"
                />
            )}
        </span>
    );
}

export default function ArtikelPage() {
    const [allArtikels, setAllArtikels] = useState<Artikel[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAllArticles, setShowAllArticles] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [typingComplete, setTypingComplete] = useState(false);
    
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

    // Preview articles - 2 artikel terbaru
    const previewArtikels = [...allArtikels]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 2);

    // Untuk all articles (tanpa preview)
    const allArticlesExceptPreview = filteredArtikels.filter(
        artikel => !previewArtikels.some(preview => preview.id === artikel.id)
    );

    const totalPages = Math.ceil(allArticlesExceptPreview.length / itemsPerPage);
    const currentDisplayArtikels = (showAllArticles || searchQuery) 
        ? paginatedArtikels
        : [];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"
                    ></motion.div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-white"
                    >
                        Memuat artikel...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-green-900 overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-32 md:pt-40 md:pb-40 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/bg-1.png')" }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
                </motion.div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                    >
                        Insight From{" "}
                        <TypingText 
                            text="Nagira Farm" 
                            className="text-white italic"
                            onComplete={() => setTypingComplete(true)}
                        />
                    </motion.div>
                    
                    {/* Teks deskripsi */}
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow"
                    >
                        Temukan kabar terbaru, cerita menarik, dan perjalanan kami dalam 
                        membangun ekosistem peternakan yang lebih baik.
                    </motion.p>
                    
                    {/* Search bar - tanpa delay blur */}
                    <div className="max-w-2xl mx-auto mt-8">
                        <p className="text-sm text-white/80 mb-2 font-medium text-left">
                            Cari Artikel dan Berita
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <SearchBar 
                                searchQuery={searchQuery}
                                onSearchChange={handleSearchChange}
                                onSearchSubmit={handleSearchSubmit}
                                placeholder="Search..."
                                variant="dark"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* PREVIEW SECTION */}
            <AnimatePresence mode="wait">
                {previewArtikels.length > 0 && (
                    <motion.div 
                        key="preview-section"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="container mx-auto px-4 max-w-5xl -mt-16 mb-12 relative z-10"
                    >
                        <motion.div 
                            variants={staggerContainerFast}
                            initial="hidden"
                            animate="visible"
                            className="flex justify-center items-center gap-8 flex-wrap"
                        >
                            {previewArtikels.map((artikel) => (
                                <motion.div
                                    key={artikel.id}
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <PreviewArtikelCard 
                                        artikel={artikel} 
                                        isFirst={previewArtikels.indexOf(artikel) === 0}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* BUTTON LIHAT LEBIH BANYAK */}
            {!showAllArticles && !searchQuery && allArticlesExceptPreview.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="container mx-auto px-4 py-8 max-w-7xl text-center"
                >
                    <motion.button
                        variants={buttonVariants}
                        initial="idle"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleShowAllArticles}
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-md"
                    >
                        Lihat lebih banyak
                    </motion.button>
                </motion.div>
            )}

            {/* ALL ARTICLES SECTION */}
            <AnimatePresence mode="wait">
                {(showAllArticles || searchQuery) && (
                    <motion.div 
                        key="all-articles"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="container mx-auto px-4 py-12 max-w-7xl"
                    >
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex justify-between items-center mb-8"
                        >
                            <motion.h2 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-2xl font-bold text-white"
                            >
                                {searchQuery ? 'Hasil Pencarian' : 'Artikel Lainnya'}
                            </motion.h2>
                            {!searchQuery && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCloseArticles}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-6 py-2 rounded-full transition-all duration-300"
                                >
                                    Tutup
                                </motion.button>
                            )}
                        </motion.div>
                        
                        <AnimatePresence mode="wait">
                            {currentDisplayArtikels.length === 0 ? (
                                <motion.div 
                                    key="empty"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-2xl"
                                >
                                    <motion.p 
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="text-white/70"
                                    >
                                        Tidak ada artikel lainnya.
                                    </motion.p>
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
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="articles"
                                    variants={staggerContainerFast}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {currentDisplayArtikels.map((artikel) => (
                                            <motion.div
                                                key={artikel.id}
                                                variants={cardVariants}
                                                whileHover="hover"
                                            >
                                                <ArtikelCard artikel={artikel} />
                                            </motion.div>
                                        ))}
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Pagination 
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={setCurrentPage}
                                            variant="dark"
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}