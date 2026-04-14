'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ternakApi, Ternak } from '@/lib/api/endpoints/ternak';

export default function TernakListPage() {
    const [ternaks, setTernaks] = useState<Ternak[]>([]);
    const [allTernaks, setAllTernaks] = useState<Ternak[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    
    const [selectedKategori, setSelectedKategori] = useState('');
    const [selectedJenis, setSelectedJenis] = useState('');
    const [selectedTanggal, setSelectedTanggal] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [kategoriOptions, setKategoriOptions] = useState<string[]>([]);
    const [jenisOptions, setJenisOptions] = useState<string[]>([]);

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
                
                setAllTernaks(allData);
                
                const uniqueKategori: string[] = [];
                const uniqueJenis: string[] = [];
                
                allData.forEach((t: Ternak) => {
                    if (t.kategori && !uniqueKategori.includes(t.kategori)) {
                        uniqueKategori.push(t.kategori);
                    }
                    if (t.jenis_ternak && !uniqueJenis.includes(t.jenis_ternak)) {
                        uniqueJenis.push(t.jenis_ternak);
                    }
                });
                
                setKategoriOptions(uniqueKategori);
                setJenisOptions(uniqueJenis);
            } catch (err) {
                console.error('Error:', err);
                setError('Gagal memuat data ternak');
                setAllTernaks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllTernaks();
    }, []);

    // Filter logic on ALL data
    const filteredTernaks = allTernaks.filter(ternak => {
        const matchSearch = !searchQuery || 
            ternak.nama_ternak?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ternak.kode_ternak?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ternak.jenis_ternak?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchKategori = !selectedKategori || ternak.kategori === selectedKategori;
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
        
        return matchSearch && matchKategori && matchJenis && matchTanggal;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredTernaks.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTernaks = filteredTernaks.slice(indexOfFirstItem, indexOfLastItem);

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

    const resetFilters = () => {
        setSelectedKategori('');
        setSelectedJenis('');
        setSelectedTanggal('');
        setSearchQuery('');
        setCurrentPage(1);
    };

    const getStatusBadge = (status: string) => {
        if (status === 'aktif') {
            return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Aktif</span>;
        } else if (status === 'mati') {
            return <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Mati</span>;
        } else {
            return <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Terjual</span>;
        }
    };

    const getGenderBadge = (gender: string) => {
        if (gender === 'jantan') {
            return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">♂ Jantan</span>;
        } else {
            return <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">♀ Betina</span>;
        }
    };

    const getKategoriDisplay = (kategori: string) => {
        const map: Record<string, string> = {
            'regular': 'Regular',
            'breeding': 'Breeding',
            'fattening': 'Fattening'
        };
        return map[kategori] || kategori;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
                    <p className="mt-4 text-white">Memuat data ternak...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900">
                <div className="text-red-400 text-center">
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-lg transition"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-green-900">
            <section className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Koleksi <span className="text-white italic">Ternak Kami</span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Temukan berbagai jenis ternak unggulan dari Nagira Farm
                    </p>
                </div>
            </section>

            {/* Search Bar */}
            <div className="container mx-auto px-4 max-w-3xl mb-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Cari ternak berdasarkan nama, kode, atau jenis..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
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
                            onClick={() => setSearchQuery(searchQuery)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
<div className="container mx-auto px-4 max-w-7xl mb-8">
    <div className="flex flex-wrap items-center justify-center gap-3">
        <select
            value={selectedKategori}
            onChange={(e) => setSelectedKategori(e.target.value)}
            className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 cursor-pointer transition-all duration-300 appearance-none"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px',
                paddingRight: '32px'
            }}
        >
            <option value="" className="text-gray-800 bg-green-900">Kategori</option>
            {kategoriOptions.map((opt) => (
                <option key={opt} value={opt} className="text-gray-800 bg-green-900">
                    {getKategoriDisplay(opt)}
                </option>
            ))}
        </select>

        <select
            value={selectedJenis}
            onChange={(e) => setSelectedJenis(e.target.value)}
            className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 cursor-pointer transition-all duration-300 appearance-none"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px',
                paddingRight: '32px'
            }}
        >
            <option value="" className="text-gray-800 bg-green-900">Jenis</option>
            {jenisOptions.map((opt) => (
                <option key={opt} value={opt} className="text-gray-800 bg-green-900">{opt}</option>
            ))}
        </select>

        <select
            value={selectedTanggal}
            onChange={(e) => setSelectedTanggal(e.target.value)}
            className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 cursor-pointer transition-all duration-300 appearance-none"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px',
                paddingRight: '32px'
            }}
        >
            <option value="" className="text-gray-800 bg-green-900">Tanggal masuk</option>
            <option value="7" className="text-gray-800 bg-green-900">7 Hari Terakhir</option>
            <option value="30" className="text-gray-800 bg-green-900">30 Hari Terakhir</option>
            <option value="90" className="text-gray-800 bg-green-900">90 Hari Terakhir</option>
        </select>

        {/* Reset Filter Button */}
        {(selectedKategori || selectedJenis || selectedTanggal || searchQuery) && (
            <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-red-500/80 hover:bg-red-600 backdrop-blur-sm text-white text-sm rounded-lg transition-all duration-300 flex items-center gap-2"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reset Filter
            </button>
        )}
    </div>
</div>

            {/* DAFTAR TERNAK SECTION */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-6 text-right">
                    <p className="text-white/60 text-sm">
                        Menampilkan {currentTernaks.length} dari {filteredTernaks.length} ternak
                    </p>
                </div>

                {currentTernaks.length === 0 ? (
                    <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <p className="text-white/70">Tidak ada ternak yang sesuai dengan filter.</p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 text-yellow-400 hover:text-yellow-500 font-medium"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentTernaks.map((ternak) => (
                                <Link 
                                    key={ternak.id} 
                                    href={`/ternak/${ternak.slug}`}
                                    className="group"
                                >
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500">
                                            {ternak.foto ? (
                                                <Image
                                                    src={ternak.foto}
                                                    alt={ternak.nama_ternak || ternak.kode_ternak}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-white/50">
                                                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="flex gap-1.5 mb-3 w-full">
                                                <div className="flex-1 h-1 rounded-full bg-green-700 group-hover:bg-green-600 transition-colors"></div>
                                                <div className="flex-1 h-1 rounded-full bg-lime-400 group-hover:bg-lime-500 transition-colors"></div>
                                            </div>

                                            <div className="mb-2">
                                                <p className="text-xs text-gray-400">{ternak.kode_ternak}</p>
                                                <h2 className="text-base font-bold text-gray-800 group-hover:text-green-700 transition-colors line-clamp-1">
                                                    {ternak.nama_ternak || 'Tanpa Nama'}
                                                </h2>
                                            </div>
                                            
                                            <div className="space-y-1 text-sm text-gray-600 mb-3">
                                                <div className="flex justify-between">
                                                    <span>Jenis:</span>
                                                    <span className="font-medium">{ternak.jenis_ternak}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Bobot:</span>
                                                    <span className="font-medium text-green-600">{ternak.bobot} kg</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
                                                {getGenderBadge(ternak.jenis_kelamin)}
                                                {getStatusBadge(ternak.status_aktif)}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* PAGINATION - MAKS 3 NOMOR */}
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
                                        {(() => {
                                            const pages = [];
                                            const maxVisible = 3;
                                            
                                            if (totalPages <= maxVisible) {
                                                // Tampilkan semua halaman
                                                for (let i = 1; i <= totalPages; i++) {
                                                    pages.push(i);
                                                }
                                            } else {
                                                // Selalu tampilkan halaman 1
                                                pages.push(1);
                                                
                                                if (currentPage > 3) {
                                                    pages.push('...');
                                                }
                                                
                                                // Tampilkan halaman di sekitar currentPage
                                                let start = Math.max(2, currentPage - 1);
                                                let end = Math.min(totalPages - 1, currentPage + 1);
                                                
                                                if (currentPage <= 3) {
                                                    start = 2;
                                                    end = 3;
                                                }
                                                
                                                if (currentPage >= totalPages - 2) {
                                                    start = totalPages - 2;
                                                    end = totalPages - 1;
                                                }
                                                
                                                for (let i = start; i <= end; i++) {
                                                    if (i !== 1 && i !== totalPages) {
                                                        pages.push(i);
                                                    }
                                                }
                                                
                                                if (currentPage < totalPages - 2) {
                                                    pages.push('...');
                                                }
                                                
                                                // Tampilkan halaman terakhir
                                                if (totalPages !== 1) {
                                                    pages.push(totalPages);
                                                }
                                            }
                                            
                                            return pages.map((page, idx) => (
                                                page === '...' ? (
                                                    <span key={`dots-${idx}`} className="w-10 h-10 flex items-center justify-center text-white">
                                                        ...
                                                    </span>
                                                ) : (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page as number)}
                                                        className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                                                            currentPage === page
                                                                ? 'bg-yellow-400 text-gray-800 font-bold'
                                                                : 'bg-white/10 backdrop-blur-sm text-white hover:bg-yellow-400 hover:text-gray-800'
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                )
                                            ));
                                        })()}
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
        </main>
    );
}