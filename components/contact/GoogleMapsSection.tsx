// components/contact/GoogleMapsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface GoogleMapsSectionProps {
    title?: string;
    subtitle?: string;
    embedUrl?: string;
}

export default function GoogleMapsSection({
    title = "Lokasi Kami",
    subtitle = "Kunjungi peternakan kami di Majalengka",
    embedUrl = "https://www.google.com/maps?q=-6.7559964,108.2100782&hl=id&z=17&output=embed"
}: GoogleMapsSectionProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Kunjungi Kami
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <div className="w-20 h-1 bg-green-500 rounded-full mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Map Only */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl h-100 md:h-112.5 lg:h-125">
                        {!isLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                            </div>
                        )}
                        <iframe
                            src={embedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Nagira Farm"
                            onLoad={() => setIsLoaded(true)}
                            className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}