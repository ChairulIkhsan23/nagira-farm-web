'use client';

import { useEffect, useState } from 'react';
import { ternakApi, Ternak, KategoriTernak } from '@/lib/api/endpoints/ternak';
import TernakCard from '@/components/ternak/TernakCard';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/ui/Pagination';

// Helper function untuk mendapatkan nilai kategori sebagai string
const getKategoriString = (kategori: Ternak['kategori']): string => {
    if (!kategori) return '';
    if (typeof kategori === 'string') return kategori;
    return kategori.value;
};

// Helper function untuk mendapatkan label kategori
const getKategoriLabel = (kategori: Ternak['kategori']): string => {
    if (!kategori) return '';
    if (typeof kategori === 'string') {
        const map: Record<string, string> = {
            'regular': 'Regular',
            'breeding': 'Breeding',
            'fattening': 'Fattening'
        };
        return map[kategori] || kategori;
    }
    return kategori.label;
};

export default function TernakListPage() {
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

    // app/ternak/page.tsx - update fetchAllTernaks

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
            
            // 🔄 URUTKAN RANDOM (acak)
            const shuffledData = [...allData];
            for (let i = shuffledData.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
            }
            setAllTernaks(shuffledData);
            
            // ATAU 🔄 URUTKAN BERDASARKAN TANGGAL TERBARU
            // const sortedByDate = [...allData].sort((a, b) => {
            //     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            // });
            // setAllTernaks(sortedByDate);
            
            // Ambil unique kategori dan jenis
            const uniqueKategori: string[] = [];
            const uniqueJenis: string[] = [];
            
            allData.forEach((t: Ternak) => {
                const kategoriValue = getKategoriString(t.kategori);
                if (kategoriValue && !uniqueKategori.includes(kategoriValue)) {
                    uniqueKategori.push(kategoriValue);
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
        
        // Handle kategori yang bisa berupa string atau object
        const kategoriValue = getKategoriString(ternak.kategori);
        const matchKategori = !selectedKategori || kategoriValue === selectedKategori;
        
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

    const resetFilters = () => {
        setSelectedKategori('');
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900 pt-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
                    <p className="mt-4 text-white">Memuat data ternak...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900 pt-20">
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
        <main className="min-h-screen bg-green-900 pt-20 md:pt-24">
            <section className="py-12 md:py-16">
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
                <SearchBar 
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    onSearchSubmit={handleSearchSubmit}
                    placeholder="Cari ternak berdasarkan nama, kode, atau jenis..."
                    variant="dark"
                />
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
                                {opt === 'regular' ? 'Regular' : opt === 'breeding' ? 'Breeding' : 'Fattening'}
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
                                <TernakCard key={ternak.id} ternak={ternak} />
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
        </main>
    );
}