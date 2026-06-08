// components/ternak/RiwayatTimbangan.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { RiwayatTimbang } from '@/lib/api/endpoints/ternak';

interface RiwayatTimbanganProps {
    riwayatTimbangan: RiwayatTimbang[];
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

export default function RiwayatTimbangan({ riwayatTimbangan, formatTanggal }: RiwayatTimbanganProps) {
    const [isOpen, setIsOpen] = useState(true);
    
    if (!riwayatTimbangan || riwayatTimbangan.length === 0) return null;

    return (
        <motion.div 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
            <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-bold text-gray-800">Riwayat Timbangan</h3>
                <motion.button
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 hover:text-gray-800"
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
                        className="space-y-2 mt-3"
                    >
                        {riwayatTimbangan.map((item: RiwayatTimbang, idx: number) => (
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
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}