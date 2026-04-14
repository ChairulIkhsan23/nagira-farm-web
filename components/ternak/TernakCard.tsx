// components/ternak/TernakCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Ternak } from '@/lib/api/endpoints/ternak';

interface TernakCardProps {
    ternak: Ternak;
}

export default function TernakCard({ ternak }: TernakCardProps) {
    const getKategoriDisplay = (kategori: string) => {
        const map: Record<string, string> = {
            'regular': 'Regular',
            'breeding': 'Breeding',
            'fattening': 'Fattening'
        };
        return map[kategori] || kategori;
    };

    const getStatusBadge = (status: string) => {
        if (status === 'aktif') {
            return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Aktif</span>;
        } else if (status === 'mati') {
            return <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Mati</span>;
        } else {
            return <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Terjual</span>;
        }
    };

    const getGenderBadge = (gender: string) => {
        if (gender === 'jantan') {
            return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">♂ Jantan</span>;
        } else {
            return <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">♀ Betina</span>;
        }
    };

    return (
        <Link 
            href={`/ternak/${ternak.slug}`}
            className="group"
        >
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500">
                    {ternak.foto ? (
                        <Image
                            src={ternak.foto}
                            alt={ternak.nama_ternak || ternak.kode_ternak}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-white/50">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                    )}
                    
                    {/* KATEGORI BADGE DI ATAS GAMBAR */}
                    {ternak.kategori && (
                        <div className="absolute top-3 right-3">
                            <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-black/70 group-hover:scale-105 transition-all duration-300">
                                {getKategoriDisplay(ternak.kategori)}
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                    <div className="flex gap-1.5 mb-3 w-full">
                        <div className="flex-1 h-1 rounded-full bg-green-700 group-hover:bg-green-600 transition-colors"></div>
                        <div className="flex-1 h-1 rounded-full bg-lime-400 group-hover:bg-lime-500 transition-colors"></div>
                    </div>

                    <div className="mb-2">
                        <p className="text-xs text-gray-400">{ternak.kode_ternak}</p>
                        <h2 className="text-base font-bold text-gray-800 group-hover:text-green-700 transition-colors line-clamp-1">
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
                            <span className="font-medium text-green-600">{ternak.bobot} kg</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
                        {getGenderBadge(ternak.jenis_kelamin)}
                        {getStatusBadge(ternak.status_aktif)}
                    </div>
                </div>
            </div>
        </Link>
    );
}