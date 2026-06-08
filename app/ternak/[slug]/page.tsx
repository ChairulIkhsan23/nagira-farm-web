// app/ternak/[slug]/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import TernakDetailContainer from '@/components/ternak/TernakDetailContainer';
import TernakInfoCard from '@/components/ternak/TernakInfoCard';
import { 
    ternakApi, 
    Ternak, 
    KategoriTernakType,
    JenisKelamin,
    StatusAktif
} from '@/lib/api/endpoints/ternak';

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

// Helper functions
const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null;
};

const isJenisKelaminObject = (jk: unknown): jk is { value: string; icon: string } => {
    return isObject(jk) && 
           typeof jk.value === 'string' && 
           typeof jk.icon === 'string';
};

const isKategoriObject = (kategori: unknown): kategori is { value: string; label: string; badge_color: string } => {
    return isObject(kategori) &&
           typeof kategori.value === 'string' &&
           typeof kategori.label === 'string';
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

    const getKategoriLabel = (kategori: KategoriTernakType): string => {
        if (!kategori) return '-';
        if (typeof kategori === 'string') {
            const map: Record<string, string> = {
                regular: 'Reguler',
                breeding: 'Indukan',
                fattening: 'Penggemukan',
            };
            return map[kategori] || kategori;
        }
        if (isKategoriObject(kategori)) {
            return kategori.label;
        }
        return '-';
    };

    const getJenisKelaminDisplay = (jenisKelamin: JenisKelamin): string => {
        if (!jenisKelamin) return '-';
        if (typeof jenisKelamin === 'string') {
            return jenisKelamin === 'jantan' ? '♂ Jantan' : '♀ Betina';
        }
        if (isJenisKelaminObject(jenisKelamin)) {
            return jenisKelamin.value === 'jantan' ? '♂ Jantan' : '♀ Betina';
        }
        return '-';
    };

    const getStatusValue = (status: StatusAktif): string => {
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

    const getStatusBadge = (status: StatusAktif) => {
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

    const getBobotDisplay = (): string => {
        if (!ternak) return '0 kg';
        return `${ternak.bobot ?? 0} kg`;
    };

    if (loading) {
        return (
            <TernakDetailContainer slug={slug}>
                <div className="min-h-[400px] flex items-center justify-center">
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
            </TernakDetailContainer>
        );
    }

    if (error || !ternak) {
        return (
            <TernakDetailContainer slug={slug}>
                <div className="min-h-[400px] flex items-center justify-center">
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
            </TernakDetailContainer>
        );
    }

    return (
        <TernakDetailContainer slug={ternak.nama_ternak || ternak.kode_ternak}>
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
                    
                    <TernakInfoCard
                        ternak={ternak}
                        getKategoriLabel={getKategoriLabel}
                        getJenisKelaminDisplay={getJenisKelaminDisplay}
                        getStatusBadge={getStatusBadge}
                        hitungUmur={hitungUmur}
                        formatTanggal={formatTanggal}
                        getBobotDisplay={getBobotDisplay}
                    />
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
        </TernakDetailContainer>
    );
}
