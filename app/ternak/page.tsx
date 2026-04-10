// app/ternak/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ternakApi, Ternak } from '@/lib/api/endpoints/ternak';

export default function TernakListPage() {
    const [ternaks, setTernaks] = useState<Ternak[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        const fetchTernaks = async () => {
            try {
                setLoading(true);
                const response = await ternakApi.getAll(currentPage);
                setTernaks(response.data);
                setLastPage(response.meta?.last_page || 1);
            } catch (err) {
                console.error('Error:', err);
                setError('Gagal memuat data ternak');
                setTernaks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTernaks();
    }, [currentPage]);

    // Format umur
    const formatUmur = (umurString: string) => {
        if (!umurString) return '-';
        // Ubah "35 bulan" jadi "2 tahun 11 bulan"
        const bulan = parseInt(umurString);
        if (isNaN(bulan)) return umurString;
        
        const tahun = Math.floor(bulan / 12);
        const sisaBulan = bulan % 12;
        
        if (tahun > 0 && sisaBulan > 0) {
            return `${tahun} tahun ${sisaBulan} bulan`;
        } else if (tahun > 0) {
            return `${tahun} tahun`;
        } else {
            return `${bulan} bulan`;
        }
    };

    // Badge status
    const getStatusBadge = (status: string) => {
        if (status === 'aktif') {
            return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Aktif</span>;
        } else if (status === 'mati') {
            return <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Mati</span>;
        } else {
            return <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Terjual</span>;
        }
    };

    // Badge jenis kelamin
    const getGenderBadge = (gender: string) => {
        if (gender === 'jantan') {
            return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">♂ Jantan</span>;
        } else {
            return <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">♀ Betina</span>;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat data ternak...</p>
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
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    if (ternaks.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center text-gray-500">
                    <p>Belum ada data ternak.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-center flex-1">Data Ternak</h1>
                <Link 
                    href="/ternak/tambah"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    + Tambah Ternak
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ternaks.map((ternak) => (
                    <Link 
                        key={ternak.id} 
                        href={`/ternak/${ternak.slug}`}
                        className="group"
                    >
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                            {/* Foto */}
                            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                {ternak.foto ? (
                                    <Image
                                        src={ternak.foto}
                                        alt={ternak.nama_ternak || ternak.kode_ternak}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            
                            {/* Content */}
                            <div className="p-4 flex-1 flex flex-col">
                                {/* Kode & Nama */}
                                <div className="mb-2">
                                    <p className="text-sm text-gray-500">{ternak.kode_ternak}</p>
                                    <h2 className="text-lg font-semibold group-hover:text-green-600 transition-colors line-clamp-1">
                                        {ternak.nama_ternak || 'Tanpa Nama'}
                                    </h2>
                                </div>
                                
                                {/* Info Ringkas */}
                                <div className="space-y-1 text-sm text-gray-600 mb-3">
                                    <div className="flex justify-between">
                                        <span>Jenis:</span>
                                        <span className="font-medium">{ternak.jenis_ternak}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Bobot:</span>
                                        <span className="font-medium">{ternak.bobot} kg</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Umur:</span>
                                        <span className="font-medium">{formatUmur(ternak.umur)}</span>
                                    </div>
                                </div>
                                
                                {/* Badges */}
                                <div className="flex gap-2 mt-auto pt-3 border-t">
                                    {getGenderBadge(ternak.jenis_kelamin)}
                                    {getStatusBadge(ternak.status_aktif)}
                                </div>
                            </div>
                        </div>
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