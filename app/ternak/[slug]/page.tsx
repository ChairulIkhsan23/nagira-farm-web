// app/ternak/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
// Import tipe yang sudah didefinisikan
import { 
    ternakApi, 
    Ternak, 
    DataKategori, 
    RiwayatTimbang,
    DataKategoriFattening,
    DataKategoriBreeding
} from '@/lib/api/endpoints/ternak';

// Type guard untuk mengecek apakah suatu nilai adalah object
const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null;
};

// Type guard untuk KategoriTernak
const isKategoriObject = (kategori: unknown): kategori is { value: string; label: string; badge_color: string } => {
    return isObject(kategori) && 
           typeof kategori.value === 'string' && 
           typeof kategori.label === 'string';
};

// Type guard untuk JenisKelaminTernak
const isJenisKelaminObject = (jk: unknown): jk is { value: string; icon: string } => {
    return isObject(jk) && 
           typeof jk.value === 'string' && 
           typeof jk.icon === 'string';
};

// Type guard untuk DataKategori Fattening - HANYA SATU DEKLARASI
const isFatteningData = (data: DataKategori): data is DataKategoriFattening => {
    return data !== null && data.type === 'fattening';
};

// Type guard untuk DataKategori Breeding - HANYA SATU DEKLARASI
const isBreedingData = (data: DataKategori): data is DataKategoriBreeding => {
    return data !== null && data.type === 'breeding';
};

export default function TernakDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    
    const [ternak, setTernak] = useState<Ternak | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTernak = async () => {
            if (!slug) return;
            
            try {
                setLoading(true);
                const data = await ternakApi.getBySlug(slug);
                setTernak(data);
            } catch (err) {
                console.error('Error:', err);
                setError('Gagal memuat data ternak');
            } finally {
                setLoading(false);
            }
        };

        fetchTernak();
    }, [slug]);

    // Helper function untuk mendapatkan value dari object atau string
    const getKategoriValue = (kategori: Ternak['kategori']): string => {
        if (!kategori) return '-';
        if (typeof kategori === 'string') return kategori;
        if (isKategoriObject(kategori)) return kategori.value;
        return '-';
    };

    const getKategoriLabel = (kategori: Ternak['kategori']): string => {
        if (!kategori) return '-';
        if (typeof kategori === 'string') return kategori;
        if (isKategoriObject(kategori)) return kategori.label;
        return '-';
    };

    const getJenisKelaminDisplay = (jenisKelamin: Ternak['jenis_kelamin']): string => {
        if (!jenisKelamin) return '-';
        if (typeof jenisKelamin === 'string') {
            return jenisKelamin === 'jantan' ? '♂ Jantan' : '♀ Betina';
        }
        if (isJenisKelaminObject(jenisKelamin)) {
            return jenisKelamin.value === 'jantan' ? '♂ Jantan' : '♀ Betina';
        }
        return '-';
    };

    const getStatusValue = (status: Ternak['status_aktif']): string => {
        if (!status) return '-';
        if (typeof status === 'string') return status;
        return '-';
    };

    // Hitung umur dari tanggal lahir
    const hitungUmur = (tanggalLahir: string) => {
        if (!tanggalLahir) return '-';
        const lahir = new Date(tanggalLahir);
        const today = new Date();
        let bulan = (today.getFullYear() - lahir.getFullYear()) * 12;
        bulan -= lahir.getMonth();
        bulan += today.getMonth();
        
        if (bulan < 0) return '-';
        
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

    const formatTanggal = (date: string | null) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status: Ternak['status_aktif']) => {
        const statusValue = getStatusValue(status);
        if (statusValue === 'aktif') {
            return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Aktif</span>;
        } else if (statusValue === 'mati') {
            return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">Mati</span>;
        } else {
            return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">Terjual</span>;
        }
    };

    // Render data kategori berdasarkan jenisnya
    const renderDataKategori = () => {
        if (!ternak?.data_kategori) return null;
        
        if (isFatteningData(ternak.data_kategori)) {
            const program = ternak.data_kategori.program;
            return (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">Program Penggemukan</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Bobot Awal:</span>
                            <span className="font-semibold">{program.bobot_awal ?? '-'} kg</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Bobot Terakhir:</span>
                            <span className="font-semibold">{program.bobot_terakhir ?? '-'} kg</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Target Bobot:</span>
                            <span className="font-semibold text-green-600">{program.target_bobot ?? '-'} kg</span>
                        </div>
                        {program.progress_persen > 0 && (
                            <div className="mt-2">
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Progress</span>
                                    <span>{program.progress_persen}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-green-600 rounded-full h-2" 
                                        style={{ width: `${Math.min(program.progress_persen, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tanggal Mulai:</span>
                            <span>{formatTanggal(program.tanggal_mulai)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Target Selesai:</span>
                            <span>{formatTanggal(program.tanggal_target_selesai)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`font-semibold ${
                                program.status === 'progres' ? 'text-blue-600' : 
                                program.status === 'selesai' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {program.status === 'progres' ? 'Sedang Berjalan' : 
                                 program.status === 'selesai' ? 'Selesai' : 'Gagal'}
                            </span>
                        </div>
                        {program.keterangan && (
                            <div className="mt-2 pt-2 border-t border-green-200">
                                <span className="text-gray-600">Keterangan:</span>
                                <p className="text-gray-700 mt-1">{program.keterangan}</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        
        if (isBreedingData(ternak.data_kategori)) {
            if (ternak.data_kategori.message) {
                return (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                        <p className="text-yellow-800">{ternak.data_kategori.message}</p>
                    </div>
                );
            }
            
            const perkawinan = ternak.data_kategori.perkawinan_terakhir;
            if (!perkawinan) return null;
            
            return (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-bold text-yellow-800 mb-3">Program Perkawinan</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tanggal Kawin:</span>
                            <span>{formatTanggal(perkawinan.tanggal_kawin)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Jenis Kawin:</span>
                            <span className="font-semibold">{perkawinan.jenis_kawin_label}</span>
                        </div>
                        {perkawinan.pejantan && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Pejantan:</span>
                                <Link href={`/ternak/${perkawinan.pejantan.slug}`} className="text-blue-600 hover:underline">
                                    {perkawinan.pejantan.nama || perkawinan.pejantan.kode}
                                </Link>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`font-semibold ${
                                perkawinan.status_siklus === 'bunting' ? 'text-purple-600' :
                                perkawinan.status_siklus === 'melahirkan' ? 'text-green-600' :
                                perkawinan.status_siklus === 'kawin' ? 'text-blue-600' :
                                perkawinan.status_siklus === 'gagal' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                                {perkawinan.status_label}
                            </span>
                        </div>
                        {perkawinan.status_siklus === 'bunting' && perkawinan.perkiraan_lahir && (
                            <>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Perkiraan Lahir:</span>
                                    <span>{formatTanggal(perkawinan.perkiraan_lahir)}</span>
                                </div>
                                {perkawinan.hari_menuju_lahir !== undefined && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Hari Menuju Lahir:</span>
                                        <span className="font-semibold text-purple-600">
                                            {perkawinan.hari_menuju_lahir > 0 ? `${perkawinan.hari_menuju_lahir} hari lagi` : 'Segera!'}
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                        {perkawinan.keterangan && (
                            <div className="mt-2 pt-2 border-t border-yellow-200">
                                <span className="text-gray-600">Keterangan:</span>
                                <p className="text-gray-700 mt-1">{perkawinan.keterangan}</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        
        return null;
    };

    // Render riwayat timbangan
    const renderRiwayatTimbangan = () => {
        if (!ternak?.riwayat_timbangan || ternak.riwayat_timbangan.length === 0) return null;
        
        return (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3">Riwayat Timbangan</h3>
                <div className="space-y-2">
                    {ternak.riwayat_timbangan.map((item: RiwayatTimbang, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm border-b border-gray-200 py-2">
                            <span className="text-gray-600">{formatTanggal(item.tanggal)}</span>
                            <span className="font-semibold text-green-600">{item.bobot} kg</span>
                            {item.keterangan && <span className="text-gray-500 text-xs">{item.keterangan}</span>}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900 pt-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-200 mx-auto"></div>
                    <p className="mt-4 text-white">Memuat data ternak...</p>
                </div>
            </div>
        );
    }

    if (error || !ternak) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900 pt-20">
                <div className="text-red-400 text-center">
                    <p>{error || 'Ternak tidak ditemukan'}</p>
                    <Link href="/ternak" className="text-yellow-200 hover:text-yellow-300 mt-4 inline-block">
                        Kembali ke daftar ternak
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-green-900 flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-32 pb-48 md:pt-40 md:pb-56 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/bg-1.png')" }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 text-sm text-white/70">
                        <Link href="/" className="hover:text-yellow-200">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/ternak" className="hover:text-yellow-200">Ternak</Link>
                        <span className="mx-2">/</span>
                        <span className="text-yellow-200">{ternak.nama_ternak || ternak.kode_ternak}</span>
                    </div>
                </div>
            </section>

            {/* Content Container */}
            <div className="container mx-auto px-4 max-w-5xl -mt-32 mb-12 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2 relative h-80 md:h-auto bg-gradient-to-br from-green-400 to-emerald-500">
                            {ternak.foto ? (
                                <Image
                                    src={ternak.foto}
                                    alt={ternak.nama_ternak || ternak.kode_ternak}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-white/50">
                                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <div className="md:w-1/2 p-6 md:p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-400">{ternak.kode_ternak}</p>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                                        {ternak.nama_ternak || 'Tanpa Nama'}
                                    </h1>
                                </div>
                                {getStatusBadge(ternak.status_aktif)}
                            </div>

                            <div className="flex gap-1.5 mb-6 w-full">
                                <div className="flex-1 h-1 rounded-full bg-green-700"></div>
                                <div className="flex-1 h-1 rounded-full bg-lime-400"></div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Jenis Ternak</span>
                                    <span className="font-semibold text-gray-800">{ternak.jenis_ternak}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Kategori</span>
                                    <span className="font-semibold text-gray-800">{getKategoriLabel(ternak.kategori)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Jenis Kelamin</span>
                                    <span className="font-semibold text-gray-800">{getJenisKelaminDisplay(ternak.jenis_kelamin)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Tanggal Lahir</span>
                                    <span className="font-semibold text-gray-800">{formatTanggal(ternak.tanggal_lahir)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Umur</span>
                                    <span className="font-semibold text-gray-800">{hitungUmur(ternak.tanggal_lahir)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-500">Bobot</span>
                                    <span className="font-bold text-2xl text-green-600">
                                        {(() => {
                                            // Jika ada data kategori dan type fattening, pakai bobot_terakhir
                                            if (ternak.data_kategori && isFatteningData(ternak.data_kategori)) {
                                                const bobotFattening = ternak.data_kategori.program.bobot_terakhir;
                                                return bobotFattening !== null && bobotFattening !== undefined 
                                                    ? `${bobotFattening} kg` 
                                                    : `${ternak.bobot ?? 0} kg`;
                                            }
                                            // Selain itu pakai bobot dari ternak
                                            return `${ternak.bobot ?? 0} kg`;
                                        })()}
                                    </span>
                                </div>
                            </div>

                            {/* Render data kategori (fattening/breeding) */}
                            {renderDataKategori()}
                            
                            {/* Render riwayat timbangan */}
                            {renderRiwayatTimbangan()}
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center pb-12">
                    <Link 
                        href="/ternak" 
                        className="inline-flex items-center gap-2 text-yellow-200 hover:text-yellow-300 font-medium transition-colors"
                    >
                        Kembali ke daftar ternak
                    </Link>
                </div>
            </div>
        </main>
    );
}