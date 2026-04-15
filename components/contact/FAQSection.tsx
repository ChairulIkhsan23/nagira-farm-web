'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "Apakah domba di Nagira Farm sudah divaksin?",
        answer: "Ya, semua domba di Nagira Farm sudah melalui program vaksinasi lengkap dan rutin. Kami bekerja sama dengan dokter hewan berpengalaman untuk memastikan kesehatan domba terjaga dengan baik."
    },
    {
        question: "Berapa harga domba di Nagira Farm?",
        answer: "Harga domba bervariasi tergantung jenis, usia, dan bobot. Untuk informasi harga terbaru, silakan hubungi tim kami atau kunjungi langsung peternakan."
    },
    {
        question: "Apakah bisa konsultasi sebelum membeli?",
        answer: "Tentu bisa! Kami menyediakan layanan konsultasi gratis untuk membantu Anda memilih domba yang sesuai kebutuhan."
    },
    {
        question: "Bagaimana cara pengiriman domba?",
        answer: "Kami menyediakan layanan pengiriman ke berbagai daerah dengan kendaraan khusus ternak dan penanganan profesional."
    },
    {
        question: "Apakah Nagira Farm menyediakan pelatihan?",
        answer: "Ya, kami membuka program pelatihan peternakan domba modern dari dasar hingga bisnis."
    },
    {
        question: "Apakah bisa kerjasama?",
        answer: "Kami terbuka untuk kerjasama dengan peternak, investor, maupun instansi."
    },
    {
        question: "Apakah tersedia daging frozen?",
        answer: "Ya, kami menyediakan daging domba frozen berkualitas tinggi dengan standar higienis."
    },
    {
        question: "Berapa minimal pembelian?",
        answer: "Minimal 1 ekor untuk pribadi dan 5 ekor untuk pembelian dalam jumlah besar."
    }
];

interface FAQSectionProps {
    title?: string;
    subtitle?: string;
}

export default function FAQSection({
    title = "Pertanyaan yang Sering Diajukan",
    subtitle = "Temukan jawaban atas pertanyaan umum seputar Nagira Farm"
}: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const midIndex = Math.ceil(faqData.length / 2);
    const leftColumn = faqData.slice(0, midIndex);
    const rightColumn = faqData.slice(midIndex);

    const cardStyle =
        "bg-white rounded-2xl border border-gray-200 " +
        "shadow-[0_1px_2px_rgba(0,0,0,0.04)] " +
        "hover:shadow-[0_2px_6px_rgba(0,0,0,0.06)] " +
        "hover:scale-[1.01] transition-all duration-200";

    return (
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>

                    <div className="w-20 h-1 bg-green-500 rounded-full mx-auto mb-6"></div>

                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>

                {/* FAQ Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Left */}
                    <div className="space-y-4">
                        {leftColumn.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={cardStyle}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-5 flex justify-between items-center text-left"
                                >
                                    <span className="font-medium text-gray-800 text-base md:text-lg pr-4">
                                        {faq.question}
                                    </span>

                                    <motion.span
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.span>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 border-t border-gray-100">
                                                <p className="text-gray-600 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="space-y-4">
                        {rightColumn.map((faq, index) => {
                            const actualIndex = midIndex + index;

                            return (
                                <motion.div
                                    key={actualIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className={cardStyle}
                                >
                                    <button
                                        onClick={() => toggleFAQ(actualIndex)}
                                        className="w-full px-6 py-5 flex justify-between items-center text-left"
                                    >
                                        <span className="font-medium text-gray-800 text-base md:text-lg pr-4">
                                            {faq.question}
                                        </span>

                                        <motion.span
                                            animate={{ rotate: openIndex === actualIndex ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </motion.span>
                                    </button>

                                    <AnimatePresence>
                                        {openIndex === actualIndex && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-5 border-t border-gray-100">
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                        <h3 className="text-xl font-medium text-gray-800 mb-4">
                            Masih punya pertanyaan?
                        </h3>

                        <a
                            href="https://wa.me/62821124177"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            {/* WhatsApp Icon */}
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.52 3.48A11.8 11.8 0 0012.04 0C5.41 0 .05 5.36.05 11.99c0 2.11.55 4.17 1.6 5.99L0 24l6.17-1.62a11.94 11.94 0 005.87 1.5h.01c6.63 0 11.99-5.36 11.99-11.99 0-3.2-1.25-6.21-3.52-8.41zM12.05 21.6h-.01a9.9 9.9 0 01-5.04-1.38l-.36-.21-3.66.96.98-3.57-.24-.37a9.88 9.88 0 01-1.51-5.28c0-5.49 4.46-9.95 9.95-9.95 2.66 0 5.16 1.04 7.04 2.92a9.86 9.86 0 012.91 7.03c0 5.49-4.47 9.95-9.96 9.95zm5.45-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.1 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                            </svg>

                            Chat WhatsApp
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}