'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
    tag: string
    title: string
    subtitle?: string
    light?: boolean
}

export default function SectionTitle({ tag, title, subtitle, light = false }: SectionTitleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
        >
            <span
                className={`inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-4
        ${light ? 'bg-white/20 text-green-100' : 'bg-green-50 text-green-600'}`}
            >
                {tag}
            </span>
            <h2
                className={`text-3xl md:text-4xl font-bold tracking-tight mb-4
        ${light ? 'text-white' : 'text-stone-800'}`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`text-base max-w-xl mx-auto leading-relaxed
        ${light ? 'text-green-100' : 'text-stone-400'}`}
                >
                    {subtitle}
                </p>
            )}
        </motion.div>
    )
}