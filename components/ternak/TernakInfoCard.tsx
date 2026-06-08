// components/ternak/TernakInfoCard.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { Ternak, KategoriTernakType, JenisKelamin, StatusAktif } from '@/lib/api/endpoints/ternak';

interface TernakInfoCardProps {
    ternak: Ternak;
    getKategoriLabel: (kategori: KategoriTernakType) => string;
    getJenisKelaminDisplay: (jk: JenisKelamin) => string;
    getStatusBadge: (status: StatusAktif) => React.ReactNode;
    hitungUmur: (tanggal: string) => string;
    formatTanggal: (date: string | null) => string;
    getBobotDisplay: () => string;
}

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

export default function TernakInfoCard({
    ternak,
    getKategoriLabel,
    getJenisKelaminDisplay,
    getStatusBadge,
    hitungUmur,
    formatTanggal,
    getBobotDisplay
}: TernakInfoCardProps) {
    return (
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
                    <span className="text-gray-500">Jenis Kelamin</span>
                    <span className="font-semibold text-gray-800">{getJenisKelaminDisplay(ternak.jenis_kelamin)}</span>
                </motion.div>
                <motion.div 
                    variants={infoItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6 }}
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
                        {getBobotDisplay()}
                    </motion.span>
                </motion.div>
            </div>
        </motion.div>
    );
}
