// components/contact/HeroContact.tsx
'use client';

import { motion } from 'framer-motion';

interface HeroContactProps {
    title: string;
    subtitle: string;
    backgroundImage?: string;
}

export default function HeroContact({
    title,
    subtitle,
    backgroundImage = '/images/bg-1.png'
}: HeroContactProps) {
    return (
        <section className="relative h-screen min-h-150 flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
            </div>

            {/* Content - Posisi tengah sempurna */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow">
                        {subtitle}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}