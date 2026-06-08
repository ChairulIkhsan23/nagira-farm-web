'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ternakApi, Ternak } from '@/lib/api/endpoints/ternak';
import TernakCard from '@/components/ternak/TernakCard';
import Pagination from '@/components/ui/Pagination';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Animasi variants untuk halaman list ternak
const heroContentVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.6, type: "spring", stiffness: 100 } 
    }
};

// Filter wrapper - sekali motion aja
const filterWrapperVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, delay: 0.3 }
    }
};

export default function TernakListPage() {
    const searchParams = useSearchParams();
    const initialJenis = searchParams.get('jenis') ?? '';

    const [allTernaks, setAllTernaks] = useState<Ternak[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [animateTrigger, setAnimateTrigger] = useState(0);
    
    const [selectedJenis, setSelectedJenis] = useState(initialJenis);
    const [selectedTanggal, setSelectedTanggal] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [jenisOptions, setJenisOptions] = useState<string[]>([]);

    const filterSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchAllTernaks = async () => {
            try {
                setLoading(true);
                let currentPageNum = 1;
                let lastPage = 1;
                let allData: Ternak[] = [];
                
                do {
                    const response = await ternakApi.getAll(currentPageNum);
                    const ternakData: Ternak[] = response.data;
                    allData = [...allData, ...ternakData];
                    lastPage = response.meta?.last_page || 1;
                    currentPageNum++;
                } while (currentPageNum <= lastPage);
                
                // Acak data
                const shuffledData = [...allData];
                for (let i = shuffledData.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
                }
                setAllTernaks(shuffledData);
                
                const uniqueJenis: string[] = [];
                
                allData.forEach((t: Ternak) => {
                    if (t.jenis_ternak && !uniqueJenis.includes(t.jenis_ternak)) {
                        uniqueJenis.push(t.jenis_ternak);
                    }
                });
                
                setJenisOptions(uniqueJenis);
            } catch (err) {
                console.error('Error:', err);
                setError('Gagal memuat data ternak');
                setAllTernaks([]);
            } finally {
                setLoading(false);
                setAnimateTrigger(prev => prev + 1);
            }
        };

        fetchAllTernaks();
    }, []);

    useEffect(() => {
        setSelectedJenis(initialJenis);
        setCurrentPage(1);
    }, [initialJenis]);

    const filteredTernaks = allTernaks.filter(ternak => {
        const matchSearch = !searchQuery || 
            ternak.nama_ternak?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ternak.kode_ternak?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ternak.jenis_ternak?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchJenis = !selectedJenis || ternak.jenis_ternak === selectedJenis;
        let matchTanggal = true;
        
        if (selectedTanggal) {
            const tanggal = new Date(ternak.created_at);
            const today = new Date();
            const diffTime = Math.abs(today.getTime() - tanggal.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (selectedTanggal === '7') matchTanggal = diffDays <= 7;
            else if (selectedTanggal === '30') matchTanggal = diffDays <= 30;
            else if (selectedTanggal === '90') matchTanggal = diffDays <= 90;
        }
        
        return matchSearch && matchJenis && matchTanggal;
    });

    const totalPages = Math.ceil(filteredTernaks.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTernaks = filteredTernaks.slice(indexOfFirstItem, indexOfLastItem);

    const resetFilters = () => {
        setSelectedJenis('');
        setSelectedTanggal('');
        setSearchQuery('');
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleSearchSubmit = () => {
        setCurrentPage(1);
    };

    const scrollToFiltersAndAnimate = () => {
        // Trigger animasi ulang dengan increment counter
        setAnimateTrigger(prev => prev + 1);
        
        // Scroll ke filter section
        filterSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-200 pt-20">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"
                    ></motion.div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-gray-600"
                    >
                        Memuat data ternak...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-200 pt-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-center"
                >
                    <p>{error}</p>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition"
                    >
                        Coba Lagi
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-200">
            {/* Hero Section - Full screen height */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/bg-4.jpg')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                </motion.div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        variants={heroContentVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-2xl"
                    >
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                            Ternak Pilihan
                            <br />
                            <span className="text-white italic">Nagira Farm</span>
                        </h1>
                        <p className="text-lg text-gray-200 max-w-xl drop-shadow mb-8">
                            Temukan domba dan kambing unggulan yang siap untuk kebutuhan peternakan Anda.
                        </p>
                        
                        {/* Button Lihat Ternak - scroll ke filter section dan trigger animasi */}
                        <button
                            onClick={scrollToFiltersAndAnimate}
                            className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-full transition-all duration-300 shadow-lg flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m7-7v14" />
                            </svg>
                            Lihat Ternak
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Filter dan Search Bar Section - Capsule/Oval shape */}
            <div ref={filterSectionRef} className="bg-gray-200 py-8">
                <motion.div 
                    variants={filterWrapperVariants}
                    initial="hidden"
                    animate="visible"
                    className="container mx-auto px-4 max-w-7xl"
                >
                    <div className="flex justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full shadow-lg p-2 inline-flex flex-wrap items-center justify-center gap-2 border border-white/30">
                            {/* Search Bar - Rounded full */}
                            <div className="min-w-[250px]">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                                    placeholder="Cari ternak..."
                                    className="w-full px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                                />
                            </div>

                            <div className="h-8 w-px bg-white/50 hidden md:block"></div>

                            <select
                                value={selectedJenis}
                                onChange={(e) => setSelectedJenis(e.target.value)}
                                className="px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer transition-all duration-300 appearance-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 12px center',
                                    backgroundSize: '14px',
                                    paddingRight: '32px'
                                }}
                            >
                                <option value="">Jenis</option>
                                {jenisOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>

                            <div className="h-8 w-px bg-white/50 hidden md:block"></div>

                            <select
                                value={selectedTanggal}
                                onChange={(e) => setSelectedTanggal(e.target.value)}
                                className="px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer transition-all duration-300 appearance-none"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 12px center',
                                    backgroundSize: '14px',
                                    paddingRight: '32px'
                                }}
                            >
                                <option value="">Tanggal masuk</option>
                                <option value="7">7 Hari Terakhir</option>
                                <option value="30">30 Hari Terakhir</option>
                                <option value="90">90 Hari Terakhir</option>
                            </select>

                            {/* Reset Filter Button */}
                            {(selectedJenis || selectedTanggal || searchQuery) && (
                                <>
                                    <div className="h-8 w-px bg-white/50 hidden md:block"></div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={resetFilters}
                                        className="px-5 py-2 bg-red-500/80 hover:bg-red-600 backdrop-blur-sm text-white text-sm rounded-full transition-all duration-300 flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Reset
                                    </motion.button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* DAFTAR TERNAK SECTION */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6 text-right"
                >
                    <p className="text-gray-500 text-sm">
                        Menampilkan {currentTernaks.length} dari {filteredTernaks.length} ternak
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {currentTernaks.length === 0 ? (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center py-12 bg-white rounded-2xl"
                        >
                            <motion.p 
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-gray-500"
                            >
                                Tidak ada ternak yang sesuai dengan filter.
                            </motion.p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={resetFilters}
                                className="mt-4 text-yellow-600 hover:text-yellow-700 font-medium"
                            >
                                Reset Filter
                            </motion.button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentTernaks.map((ternak, index) => (
                                <TernakCard 
                                    key={`${ternak.id}-${animateTrigger}`}
                                    ternak={ternak} 
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                {currentTernaks.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8"
                    >
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            variant="light"
                        />
                    </motion.div>
                )}
            </div>
        </main>
    );
}
