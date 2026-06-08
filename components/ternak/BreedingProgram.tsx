// components/ternak/BreedingProgram.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { PerkawinanTerakhir, Ternak } from '@/lib/api/endpoints/ternak';

interface BreedingProgramProps {
    perkawinan: PerkawinanTerakhir;
    currentGender: string;
    pasanganData: Ternak | null;
    formatTanggal: (date: string | null) => string;
    anakData?: Ternak[];
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

// Format hari - bulatkan ke bawah (floor) karena hari tidak bisa pecahan
const formatHariSaja = (hari: number): string => {
    const hariBulat = Math.floor(hari);
    if (hariBulat <= 0) return 'Segera!';
    return `${hariBulat} hari lagi`;
};

// Format hari ke bulan dan hari - bulatkan ke bawah
const formatHariKeBulanHari = (hari: number): string => {
    const hariBulat = Math.floor(hari);
    if (hariBulat <= 0) return 'Segera!';
    
    const bulan = Math.floor(hariBulat / 30);
    const sisaHari = hariBulat % 30;
    
    if (bulan > 0 && sisaHari > 0) {
        return `${bulan} bulan ${sisaHari} hari lagi`;
    } else if (bulan > 0) {
        return `${bulan} bulan lagi`;
    } else {
        return `${hariBulat} hari lagi`;
    }
};

export default function BreedingProgram({ 
    perkawinan, 
    currentGender, 
    pasanganData, 
    formatTanggal,
    anakData = []
}: BreedingProgramProps) {
    const [isOpen, setIsOpen] = useState(true);

    if (!perkawinan) return null;

    // Untuk JANTAN, cari pasangan betina
    let pasangan = pasanganData;
    
    if (currentGender === 'jantan') {
        if (!pasangan && perkawinan.betina) {
            pasangan = perkawinan.betina as unknown as Ternak;
        }
    } 
    else if (currentGender === 'betina') {
        if (!pasangan && perkawinan.pejantan) {
            pasangan = perkawinan.pejantan as unknown as Ternak;
        }
    }

    // Jika ternak adalah JANTAN
    if (currentGender === 'jantan') {
        return (
            <motion.div 
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="mt-6 p-4 bg-yellow-50 rounded-lg"
            >
                <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h3 className="font-bold text-yellow-800">Program Perkawinan</h3>
                    <motion.button
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-yellow-600 hover:text-yellow-800"
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
                            className="space-y-2 text-sm mt-3"
                        >
                            <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                                <span className="text-gray-600">Tanggal Kawin:</span>
                                <span>{formatTanggal(perkawinan.tanggal_kawin)}</span>
                            </motion.div>
                            <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                                <span className="text-gray-600">Metode Kawin:</span>
                                <span className="font-semibold">{perkawinan.jenis_kawin_label}</span>
                            </motion.div>
                            
                            {pasangan ? (
                                <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                                    <span className="text-gray-600">Pasangan (Betina):</span>
                                    <Link href={`/ternak/${pasangan.slug}`} className="text-blue-600 hover:underline font-semibold">
                                        {pasangan.nama_ternak || pasangan.kode_ternak}
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                                    <span className="text-gray-600">Pasangan (Betina):</span>
                                    <span className="text-gray-500">-</span>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }

    // Jika ternak adalah BETINA
    return (
        <motion.div 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 p-4 bg-yellow-50 rounded-lg"
        >
            <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-bold text-yellow-800">Program Perkawinan</h3>
                <motion.button
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-yellow-600 hover:text-yellow-800"
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
                        className="space-y-2 text-sm mt-3"
                    >
                        <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                            <span className="text-gray-600">Tanggal Kawin:</span>
                            <span>{formatTanggal(perkawinan.tanggal_kawin)}</span>
                        </motion.div>
                        <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                            <span className="text-gray-600">Metode Kawin:</span>
                            <span className="font-semibold">{perkawinan.jenis_kawin_label}</span>
                        </motion.div>
                        
                        {pasangan && (
                            <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                                <span className="text-gray-600">Pasangan (Pejantan):</span>
                                <Link href={`/ternak/${pasangan.slug}`} className="text-blue-600 hover:underline font-semibold">
                                    {pasangan.nama_ternak || pasangan.kode_ternak}
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
                        
                        {/* Perkiraan lahir - pakai formatHariSaja */}
                        {perkawinan.status_siklus === 'bunting' && perkawinan.hari_menuju_lahir !== undefined && (
                            <motion.div variants={infoItemVariants} whileHover="hover" className="flex justify-between">
                                <span className="text-gray-600">Perkiraan Lahir:</span>
                                <span className="font-semibold text-purple-600">
                                    {formatHariSaja(perkawinan.hari_menuju_lahir)}
                                </span>
                            </motion.div>
                        )}
                        
                        {/* Tampilkan data anak jika ada */}
                        {perkawinan.status_siklus === 'melahirkan' && anakData.length > 0 && (
                            <motion.div 
                                variants={infoItemVariants}
                                initial="hidden"
                                animate="visible"
                                className="mt-2 pt-2 border-t border-yellow-200"
                            >
                                <span className="text-gray-600 block mb-2">Anak yang Dilahirkan:</span>
                                <div className="space-y-1">
                                    {anakData.map((anak) => (
                                        <div key={anak.id} className="flex justify-between items-center pl-2">
                                            <Link 
                                                href={`/ternak/${anak.slug}`} 
                                                className="text-blue-600 hover:underline"
                                            >
                                                {anak.nama_ternak || anak.kode_ternak}
                                            </Link>
                                            <span className="text-xs text-gray-500">
                                                {typeof anak.jenis_kelamin === 'string' 
                                                    ? (anak.jenis_kelamin === 'jantan' ? '♂ Jantan' : '♀ Betina')
                                                    : (anak.jenis_kelamin?.value === 'jantan' ? '♂ Jantan' : '♀ Betina')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        
                        {/* Keterangan */}
                        {pasangan && (
                            <motion.div 
                                variants={infoItemVariants}
                                initial="hidden"
                                animate="visible"
                                className="mt-2 pt-2 border-t border-yellow-200"
                            >
                                <span className="text-gray-600">Keterangan:</span>
                                <p className="text-gray-700 mt-1">
                                    Perkawinan dengan pejantan {pasangan.nama_ternak || pasangan.kode_ternak}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}