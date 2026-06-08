// components/ternak/RiwayatKelahiran.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { Kelahiran, DetailAnak } from '@/lib/api/endpoints/ternak';

interface RiwayatKelahiranProps {
    kelahirans: Kelahiran[];
    formatTanggal: (date: string | null) => string;
}

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.5, type: "spring", stiffness: 200 }
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

const contentVariants: Variants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
        opacity: 1, 
        height: "auto",
        transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
        opacity: 0, 
        height: 0,
        transition: { duration: 0.3, ease: "easeIn" }
    }
};

export default function RiwayatKelahiran({ kelahirans, formatTanggal }: RiwayatKelahiranProps) {
    const [isOpen, setIsOpen] = useState(true);
    
    if (!kelahirans || kelahirans.length === 0) return null;

    // Urutkan dari yang terbaru
    const sortedKelahiran = [...kelahirans].sort((a, b) => 
        new Date(b.tanggal_melahirkan).getTime() - new Date(a.tanggal_melahirkan).getTime()
    );

    return (
        <motion.div 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 p-4 bg-pink-50 rounded-lg"
        >
            <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-bold text-pink-800">Riwayat Kelahiran</h3>
                <motion.button
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-pink-600 hover:text-pink-800"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.button>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-4 mt-3"
                    >
                        {sortedKelahiran.map((kelahiran, idx) => (
                            <motion.div 
                                key={kelahiran.id}
                                variants={infoItemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: idx * 0.1 }}
                                className="border-b border-pink-200 pb-3 last:border-0"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-pink-700">
                                        {formatTanggal(kelahiran.tanggal_melahirkan)}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {kelahiran.jumlah_anak_lahir} anak
                                    </span>
                                </div>
                                
                                {/* Statistik kelahiran */}
                                <div className="flex gap-4 text-sm mb-2">
                                    <span className="text-green-600">
                                        Hidup: {kelahiran.jumlah_anak_hidup}
                                    </span>
                                    <span className="text-red-600">
                                        Mati: {kelahiran.jumlah_anak_mati}
                                    </span>
                                    {kelahiran.tanggal_sapih && (
                                        <span className="text-blue-600">
                                            Sapih: {formatTanggal(kelahiran.tanggal_sapih)}
                                        </span>
                                    )}
                                </div>
                                
                                {/* Daftar anak */}
                                {kelahiran.detail_anak && kelahiran.detail_anak.length > 0 && (
                                    <div className="mt-2">
                                        <span className="text-xs text-gray-500 block mb-1">Anak-anak:</span>
                                        <div className="flex flex-wrap gap-2">
                                            {kelahiran.detail_anak.map((anak: DetailAnak, anakIdx: number) => (
                                                <span 
                                                    key={anakIdx}
                                                    className={`text-xs px-2 py-1 rounded-full ${
                                                        anak.jenis_kelamin === 'jantan' 
                                                            ? 'bg-blue-100 text-blue-700' 
                                                            : 'bg-pink-100 text-pink-700'
                                                    }`}
                                                >
                                                    {anak.nama_ternak || `Anak ${anakIdx + 1}`}
                                                    {anak.berat_lahir && ` (${anak.berat_lahir} kg)`}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {kelahiran.keterangan && (
                                    <p className="text-xs text-gray-500 mt-1">{kelahiran.keterangan}</p>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}