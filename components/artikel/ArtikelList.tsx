// components/artikel/ArtikelList.tsx
'use client';

import { Artikel } from '@/lib/api/endpoints/artikel';
import ArtikelCard from './ArtikelCard';

interface ArtikelListProps {
    artikels: Artikel[];
    title?: string;
    subtitle?: string;
}

export default function ArtikelList({ artikels, title, subtitle }: ArtikelListProps) {
    if (!artikels || artikels.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Belum ada artikel.</p>
            </div>
        );
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header Section */}
                {(title || subtitle) && (
                    <div className="text-center mb-12">
                        {title && (
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Grid Articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artikels.map((artikel) => (
                        <ArtikelCard key={artikel.id} artikel={artikel} />
                    ))}
                </div>
            </div>
        </section>
    );
}