// components/ternak/FatteningProgram.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { DataKategoriFattening } from '@/lib/api/endpoints/ternak';

interface FatteningProgramProps {
    program: DataKategoriFattening['program'];
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

const progressVariants: Variants = {
    hidden: { width: 0 },
    visible: (percent: number) => ({ 
        width: `${percent}%`,
        transition: { duration: 1, ease: "easeOut", delay: 0.5 }
    })
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

export default function FatteningProgram({ program, formatTanggal }: FatteningProgramProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <motion.div 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 p-4 bg-green-50 rounded-lg"
        >
            {/* Header dengan tombol toggle */}
            <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-bold text-green-800">Program Penggemukan</h3>
                <motion.button
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-green-600 hover:text-green-800"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.button>
            </div>

            {/* Content dengan animasi */}
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
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}