'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
    ternakApi, 
    Ternak, 
    DataKategori, 
    RiwayatTimbang,
    DataKategoriFattening,
    DataKategoriBreeding
} from '@/lib/api/endpoints/ternak';

// Animasi variants untuk detail ternak
const heroVariants: Variants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1, 
        transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } 
    }
};

const contentVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut" } 
    }
};

const imageSlideVariants: Variants = {
    hidden: { x: -100, opacity: 0, rotateY: -30 },
    visible: { 
        x: 0, 
        opacity: 1, 
        rotateY: 0,
        transition: { 
            duration: 0.8, 
            type: "spring", 
            stiffness: 100,
            damping: 15
        } 
    }
};

const infoCardVariants: Variants = {
    hidden: { x: 100, opacity: 0, rotateY: 30 },
    visible: { 
        x: 0, 
        opacity: 1, 
        rotateY: 0,
        transition: { 
            duration: 0.8, 
            type: "spring", 
            stiffness: 100,
            damping: 15,
            delay: 0.2
        } 
    }
};

const infoItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.4 } 
    },
    hover: { 
        scale: 1.02,
        transition: { duration: 0.2, type: "spring", stiffness: 300 }
    }
};

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.5, type: "spring", stiffness: 200 }
    }
};

const badgeVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
        scale: 1, 
        rotate: 0,
        transition: { 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.3
        } 
    },
    hover: { scale: 1.1, rotate: 5 }
};

const progressVariants: Variants = {
    hidden: { width: 0 },
    visible: (percent: number) => ({ 
        width: `${percent}%`,
        transition: { duration: 1, ease: "easeOut", delay: 0.5 }
    })
};

// Type guards
const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null;
};

const isKategoriObject = (kategori: unknown): kategori is { value: string; label: string; badge_color: string } => {
    return isObject(kategori) && 
           typeof kategori.value === 'string' && 
           typeof kategori.label === 'string';
};

const isJenisKelaminObject = (jk: unknown): jk is { value: string; icon: string } => {
    return isObject(jk) && 
           typeof jk.value === 'string' && 
           typeof jk.icon === 'string';
};

const isFatteningData = (data: DataKategori): data is DataKategoriFattening => {
    return data !== null && data.type === 'fattening';
};

const isBreedingData = (data: DataKategori): data is DataKategoriBreeding => {
    return data !== null && data.type === 'breeding';
};

export default function TernakDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    
    const [ternak, setTernak] = useState<Ternak | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const getImageUrl = (path: string | null): string | null => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://127.0.0.1:8000/storage/${path}`;
    };
    
    const imageUrl = useMemo(() => {
        return getImageUrl(ternak?.foto ?? null);
    }, [ternak?.foto]);

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
            return (
                <motion.span 
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block"
                >
                    Aktif
                </motion.span>
            );
        } else if (statusValue === 'mati') {
            return (
                <motion.span 
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium inline-block"
                >
                    Mati
                </motion.span>
            );
        } else {
            return (
                <motion.span 
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium inline-block"
                >
                    Terjual
                </motion.span>
            );
        }
    };

    const renderDataKategori = () => {
        if (!ternak?.data_kategori) return null;
        
        if (isFatteningData(ternak.data_kategori)) {
            const program = ternak.data_kategori.program;
            return (
                <motion.div 
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-6 p-4 bg-green-50 rounded-lg"
                >
                    <h3 className="font-bold text-green-800 mb-3">Program Penggemukan</h3>
                    <div className="space-y-2 text-sm">
                        <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                            <span className="text-gray-600">Bobot Awal:</span>
                            <span className="font-semibold">{program.bobot_awal ?? '-'} kg</span>
                        </motion.div>
                        <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                            <span className="text-gray-600">Bobot Terakhir:</span>
                            <span className="font-semibold">{program.bobot_terakhir ?? '-'} kg</span>
                        </motion.div>
                        <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                            <span className="text-gray-600">Target Bobot:</span>
                            <span className="font-semibold text-green-600">{program.target_bobot ?? '-'} kg</span>
                        </motion.div>
                        {program.progress_persen > 0 && (
                            <motion.div className="mt-2">
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Progress</span>
                                    <span>{program.progress_persen}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <motion.div 
                                        className="bg-green-600 rounded-full h-2" 
                                        custom={program.progress_persen}
                                        variants={progressVariants}
                                        initial="hidden"
                                        animate="visible"
                                    ></motion.div>
                                </div>
                            </motion.div>
                        )}
                        <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                            <span className="text-gray-600">Tanggal Mulai:</span>
                            <span>{formatTanggal(program.tanggal_mulai)}</span>
                        </motion.div>
                        <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                            <span className="text-gray-600">Target Selesai:</span>
                            <span>{formatTanggal(program.tanggal_target_selesai)}</span>
                        </motion.div>
                        <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`font-semibold ${
                                program.status === 'progres' ? 'text-blue-600' : 
                                program.status === 'selesai' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {program.status === 'progres' ? 'Sedang Berjalan' : 
                                 program.status === 'selesai' ? 'Selesai' : 'Gagal'}
                            </span>
                        </motion.div>
                        {program.keterangan && (
                            <motion.div 
                                variants={infoItemVariants}
                                initial="hidden"
                                animate="visible"
                                className="mt-2 pt-2 border-t border-green-200"
                            >
                                <span className="text-gray-600">Keterangan:</span>
                                <p className="text-gray-700 mt-1">{program.keterangan}</p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            );
        }
        
        if (isBreedingData(ternak.data_kategori)) {
            if (ternak.data_kategori.message) {
                return (
                    <motion.div 
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-6 p-4 bg-yellow-50 rounded-lg"
                    >
                        <p className="text-yellow-800">{ternak.data_kategori.message}</p>
                    </motion.div>
                );
            }
            
            const perkawinan = ternak.data_kategori.perkawinan_terakhir;
            if (!perkawinan) return null;
            
            return (
                <motion.div 
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-6 p-4 bg-yellow-50 rounded-lg"
                >
                    <h3 className="font-bold text-yellow-800 mb-3">Program Perkawinan</h3>
                    <div className="space-y-2 text-sm">
                        <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                            <span className="text-gray-600">Tanggal Kawin:</span>
                            <span>{formatTanggal(perkawinan.tanggal_kawin)}</span>
                        </motion.div>
                        <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                            <span className="text-gray-600">Jenis Kawin:</span>
                            <span className="font-semibold">{perkawinan.jenis_kawin_label}</span>
                        </motion.div>
                        {perkawinan.pejantan && (
                            <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                                <span className="text-gray-600">Pejantan:</span>
                                <Link href={`/ternak/${perkawinan.pejantan.slug}`} className="text-blue-600 hover:underline">
                                    {perkawinan.pejantan.nama || perkawinan.pejantan.kode}
                                </Link>
                            </motion.div>
                        )}
                        <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`font-semibold ${
                                perkawinan.status_siklus === 'bunting' ? 'text-purple-600' :
                                perkawinan.status_siklus === 'melahirkan' ? 'text-green-600' :
                                perkawinan.status_siklus === 'kawin' ? 'text-blue-600' :
                                perkawinan.status_siklus === 'gagal' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                                {perkawinan.status_label}
                            </span>
                        </motion.div>
                        {perkawinan.status_siklus === 'bunting' && perkawinan.perkiraan_lahir && (
                            <>
                                <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                                    <span className="text-gray-600">Perkiraan Lahir:</span>
                                    <span>{formatTanggal(perkawinan.perkiraan_lahir)}</span>
                                </motion.div>
                                {perkawinan.hari_menuju_lahir !== undefined && (
                                    <motion.div 
                                        variants={infoItemVariants}
                                        whileHover="hover"
                                        className="flex justify-between"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <span className="text-gray-600">Hari Menuju Lahir:</span>
                                        <span className="font-semibold text-purple-600">
                                            {perkawinan.hari_menuju_lahir > 0 ? `${perkawinan.hari_menuju_lahir} hari lagi` : 'Segera!'}
                                        </span>
                                    </motion.div>
                                )}
                            </>
                        )}
                        {perkawinan.keterangan && (
                            <motion.div 
                                variants={infoItemVariants}
                                initial="hidden"
                                animate="visible"
                                className="mt-2 pt-2 border-t border-yellow-200"
                            >
                                <span className="text-gray-600">Keterangan:</span>
                                <p className="text-gray-700 mt-1">{perkawinan.keterangan}</p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            );
        }
        
        return null;
    };

    const renderRiwayatTimbangan = () => {
        if (!ternak?.riwayat_timbangan || ternak.riwayat_timbangan.length === 0) return null;
        
        return (
            <motion.div 
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="mt-6 p-4 bg-gray-50 rounded-lg"
            >
                <h3 className="font-bold text-gray-800 mb-3">Riwayat Timbangan</h3>
                <div className="space-y-2">
                    {ternak.riwayat_timbangan.map((item: RiwayatTimbang, idx: number) => (
                        <motion.div 
                            key={idx} 
                            variants={infoItemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            whileHover="hover"
                            className="flex justify-between text-sm border-b border-gray-200 py-2"
                        >
                            <span className="text-gray-600">{formatTanggal(item.tanggal)}</span>
                            <span className="font-semibold text-green-600">{item.bobot} kg</span>
                            {item.keterangan && <span className="text-gray-500 text-xs">{item.keterangan}</span>}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900 pt-20">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="rounded-full h-12 w-12 border-b-2 border-yellow-200 mx-auto"
                    ></motion.div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-white"
                    >
                        Memuat data ternak...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    if (error || !ternak) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900 pt-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-center"
                >
                    <motion.p
                        animate={{ x: [-10, 10, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                    >
                        {error || 'Ternak tidak ditemukan'}
                    </motion.p>
                    <Link href="/ternak" className="text-yellow-200 hover:text-yellow-300 mt-4 inline-block">
                        ← Kembali ke daftar ternak
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-green-900 flex flex-col overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-48 md:pt-40 md:pb-56 overflow-hidden">
                <motion.div
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/bg-1.png')" }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
                </motion.div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 text-sm text-white/70"
                    >
                        <Link href="/" className="hover:text-yellow-200 transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/ternak" className="hover:text-yellow-200 transition-colors">Ternak</Link>
                        <span className="mx-2">/</span>
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-yellow-200"
                        >
                            {ternak.nama_ternak || ternak.kode_ternak}
                        </motion.span>
                    </motion.div>
                </div>
            </section>

            {/* Content Container */}
            <motion.div 
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-4 max-w-5xl -mt-32 mb-12 relative z-10"
            >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        <motion.div 
                            variants={imageSlideVariants}
                            initial="hidden"
                            animate="visible"
                            className="md:w-1/2 relative h-80 md:h-auto bg-gradient-to-br from-green-400 to-emerald-500"
                        >
                            {imageUrl ? (
                                <OptimizedImage
                                    src={imageUrl}
                                    alt={ternak.nama_ternak || ternak.kode_ternak}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-white/50">
                                    <motion.svg 
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="w-24 h-24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </motion.svg>
                                </div>
                            )}
                        </motion.div>
                        
                        <motion.div 
                            variants={infoCardVariants}
                            initial="hidden"
                            animate="visible"
                            className="md:w-1/2 p-6 md:p-8"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-sm text-gray-400"
                                    >
                                        {ternak.kode_ternak}
                                    </motion.p>
                                    <motion.h1 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-2xl md:text-3xl font-bold text-gray-800 mt-1"
                                    >
                                        {ternak.nama_ternak || 'Tanpa Nama'}
                                    </motion.h1>
                                </div>
                                {getStatusBadge(ternak.status_aktif)}
                            </div>

                            <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="flex gap-1.5 mb-6 w-full"
                            >
                                <div className="flex-1 h-1 rounded-full bg-green-700"></div>
                                <div className="flex-1 h-1 rounded-full bg-lime-400"></div>
                            </motion.div>

                            <div className="space-y-4">
                                <motion.div 
                                    variants={infoItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.4 }}
                                    whileHover="hover"
                                    className="flex justify-between items-center py-2 border-b border-gray-100"
                                >
                                    <span className="text-gray-500">Jenis Ternak</span>
                                    <span className="font-semibold text-gray-800">{ternak.jenis_ternak}</span>
                                </motion.div>
                                <motion.div 
                                    variants={infoItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.5 }}
                                    whileHover="hover"
                                    className="flex justify-between items-center py-2 border-b border-gray-100"
                                >
                                    <span className="text-gray-500">Kategori</span>
                                    <span className="font-semibold text-gray-800">{getKategoriLabel(ternak.kategori)}</span>
                                </motion.div>
                                <motion.div 
                                    variants={infoItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.6 }}
                                    whileHover="hover"
                                    className="flex justify-between items-center py-2 border-b border-gray-100"
                                >
                                    <span className="text-gray-500">Jenis Kelamin</span>
                                    <span className="font-semibold text-gray-800">{getJenisKelaminDisplay(ternak.jenis_kelamin)}</span>
                                </motion.div>
                                <motion.div 
                                    variants={infoItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.7 }}
                                    whileHover="hover"
                                    className="flex justify-between items-center py-2 border-b border-gray-100"
                                >
                                    <span className="text-gray-500">Tanggal Lahir</span>
                                    <span className="font-semibold text-gray-800">{formatTanggal(ternak.tanggal_lahir)}</span>
                                </motion.div>
                                <motion.div 
                                    variants={infoItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.8 }}
                                    whileHover="hover"
                                    className="flex justify-between items-center py-2 border-b border-gray-100"
                                >
                                    <span className="text-gray-500">Umur</span>
                                    <span className="font-semibold text-gray-800">{hitungUmur(ternak.tanggal_lahir)}</span>
                                </motion.div>
                                <motion.div 
                                    variants={infoItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.9 }}
                                    whileHover="hover"
                                    className="flex justify-between items-center py-2"
                                >
                                    <span className="text-gray-500">Bobot</span>
                                    <motion.span 
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.5, delay: 1.2 }}
                                        className="font-bold text-2xl text-green-600"
                                    >
                                        {(() => {
                                            if (ternak.data_kategori && isFatteningData(ternak.data_kategori)) {
                                                const bobotFattening = ternak.data_kategori.program.bobot_terakhir;
                                                return bobotFattening !== null && bobotFattening !== undefined 
                                                    ? `${bobotFattening} kg` 
                                                    : `${ternak.bobot ?? 0} kg`;
                                            }
                                            return `${ternak.bobot ?? 0} kg`;
                                        })()}
                                    </motion.span>
                                </motion.div>
                            </div>

                            {renderDataKategori()}
                            {renderRiwayatTimbangan()}
                        </motion.div>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-center pb-12"
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link 
                            href="/ternak" 
                            className="inline-flex items-center gap-2 text-yellow-200 hover:text-yellow-300 font-medium transition-colors"
                        >
                            ← Kembali ke daftar ternak
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </main>
    );
}