'use client';

import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { Artikel } from '@/lib/api/endpoints/artikel';

interface ArtikelCardProps {
    artikel: Artikel;
}

export default function ArtikelCard({ artikel }: ArtikelCardProps) {
    const formatDate = (date: string | null) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getImageUrl = (path: string | null): string | null => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://127.0.0.1:8000/storage/${path}`;
    };

    const imageUrl = getImageUrl(artikel.foto);
    
    return (
        <Link href={`/artikel/${artikel.slug}`} className="group block">
            <article className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                {/* Image Container */}
                <div className="p-4 pb-0">
                    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-green-400 to-emerald-500">
                        {imageUrl ? ( 
                            <OptimizedImage
                                src={imageUrl}
                                alt={artikel.judul}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/50 transition-transform duration-500 group-hover:scale-110">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        )}
                        
                        {/* KATEGORI */}
                        {artikel.kategori && (
                            <div className="absolute top-3 right-3">
                                <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-black/70 group-hover:scale-105 transition-all duration-300">
                                    {artikel.kategori.nama_kategori}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 pt-3 flex-1 flex flex-col">
                    <div className="flex gap-1.5 mb-3 w-full">
                        <div className="flex-1 h-1 rounded-full bg-green-700 group-hover:bg-green-600 transition-colors duration-300"></div>
                        <div className="flex-1 h-1 rounded-full bg-lime-400 group-hover:bg-lime-500 transition-colors duration-300"></div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
                        {artikel.judul}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3 flex-1 group-hover:text-gray-700 transition-colors duration-300">
                        {artikel.excerpt || (artikel.isi ? artikel.isi.replace(/<[^>]*>/g, '').substring(0, 120) + '...' : '')}
                    </p>
                    
                    {/* Date dan Baca Artikel Button */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="text-gray-400 text-xs group-hover:text-green-600 transition-colors duration-300">
                            {formatDate(artikel.tanggal_publish || artikel.created_at)}
                        </div>
                        
                        <div className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-md">
                            Baca Artikel
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}