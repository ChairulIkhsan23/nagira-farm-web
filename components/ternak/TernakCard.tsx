'use client';

import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { Ternak } from '@/lib/api/endpoints/ternak';
import { motion, Variants } from 'framer-motion';

interface TernakCardProps {
    ternak: Ternak;
    index?: number;
}

// Animasi variants - semua animasi dipindahkan ke sini
const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -10 },
    visible: (delay: number) => ({ 
        opacity: 1, 
        scale: 1, 
        rotateY: 0,
        transition: { 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            duration: 0.4,
            delay: delay
        } 
    }),
    hover: { 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        transition: { duration: 0.2, ease: "easeOut" }
    }
};

// Animasi untuk gambar di dalam card
const imageVariants: Variants = {
    hover: { 
        scale: 1.1,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

export default function TernakCard({ ternak, index = 0 }: TernakCardProps) {
    const delay = index * 0.05;

    const getImageUrl = (path: string | null): string | null => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://127.0.0.1:8000/storage/${path}`;
    };

    const imageUrl = getImageUrl(ternak.foto);

    const getKategoriDisplay = (kategori: string | { value: string; label: string; badge_color: string }) => {
        if (!kategori) return '-';
        if (typeof kategori === 'string') {
            const map: Record<string, string> = {
                regular: 'Reguler',
                breeding: 'Indukan',
                fattening: 'Penggemukan',
            };
            return map[kategori] || kategori;
        }
        return kategori.label;
    };
    
    const getStatusBadge = (status: string | { value: string; badge_color: string }) => {
        const statusValue = typeof status === 'string' ? status : status.value;
        if (statusValue === 'aktif') {
            return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Aktif</span>;
        } else if (statusValue === 'mati') {
            return <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Mati</span>;
        } else {
            return <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Terjual</span>;
        }
    };

    const getGenderBadge = (gender: string | { value: string; icon: string }) => {
        const genderValue = typeof gender === 'string' ? gender : gender.value;
        if (genderValue === 'jantan') {
            return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">♂ Jantan</span>;
        } else {
            return <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">♀ Betina</span>;
        }
    };

    const getBobotDisplay = (ternak: Ternak): number => ternak.bobot ?? 0;

    return (
        <Link href={`/ternak/${ternak.slug}`} className="block">
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={delay}
                className="bg-white rounded-2xl overflow-hidden shadow-md h-full flex flex-col"
            >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500">
                    {imageUrl ? (
                        <motion.div
                            variants={imageVariants}
                            whileHover="hover"
                            className="w-full h-full"
                        >
                            <OptimizedImage
                                src={imageUrl}
                                alt={ternak.nama_ternak || ternak.kode_ternak}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-white/50">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                    )}

                    {ternak.kategori && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.15 + delay, type: "spring", stiffness: 260, damping: 20 }}
                            className="absolute top-3 right-3"
                        >
                            <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full inline-block">
                                {getKategoriDisplay(ternak.kategori)}
                            </span>
                        </motion.div>
                    )}
                </div>
                
                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* LINE - motion scaleX dari 0 ke 1 */}
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.1 + delay, duration: 0.4, ease: "easeOut" }}
                        className="flex gap-1.5 mb-3 w-full origin-left"
                    >
                        <div className="flex-1 h-1 rounded-full bg-green-700"></div>
                        <div className="flex-1 h-1 rounded-full bg-lime-400"></div>
                    </motion.div>

                    <div className="mb-2">
                        <p className="text-xs text-gray-400">{ternak.kode_ternak}</p>
                        <h2 className="text-base font-bold text-gray-800 line-clamp-1">
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
                            <span className="font-medium text-green-600">
                                {getBobotDisplay(ternak)} kg
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
                        {getGenderBadge(ternak.jenis_kelamin)}
                        {getStatusBadge(ternak.status_aktif)}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
