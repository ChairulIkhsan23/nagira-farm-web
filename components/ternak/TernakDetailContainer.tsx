// components/ternak/TernakDetailContainer.tsx
'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface TernakDetailContainerProps {
    children: ReactNode;
    slug?: string;
}

// Animasi variants untuk container
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            duration: 0.5,
            staggerChildren: 0.1
        } 
    }
};

const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5 } 
    }
};

export default function TernakDetailContainer({ children, slug }: TernakDetailContainerProps) {
    return (
        <main className="min-h-screen bg-green-900 flex flex-col overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-32 pb-48 md:pt-40 md:pb-56 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/bg-1.png')" }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
                </motion.div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        variants={headerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-6 text-sm text-white/70"
                    >
                        <Link href="/" className="hover:text-yellow-200 transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/ternak" className="hover:text-yellow-200 transition-colors">Ternak</Link>
                        <span className="mx-2">/</span>
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-yellow-200"
                        >
                            {slug || 'Detail'}
                        </motion.span>
                    </motion.div>
                </div>
            </section>

            {/* Content Container */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-4 max-w-5xl -mt-32 mb-12 relative z-10"
            >
                {children}
            </motion.div>
        </main>
    );
}