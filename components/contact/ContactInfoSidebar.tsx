// components/contact/ContactInfoSidebar.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import InfoCard from '@/components/ui/InfoCard';
import SocialIcons from '@/components/ui/SocialIcons';
import { DEFAULT_CONTACT_INFO, DEFAULT_SOCIAL_MEDIA } from '@/constants';

export default function ContactInfoSidebar() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xs p-6 sticky top-24 border border-gray-200"
        >
            <SectionHeader title="Informasi Kontak" />

            <div className="space-y-5">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <InfoCard
                        icon={
                            <svg className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        }
                        title="Alamat"
                    >
                        {DEFAULT_CONTACT_INFO.address.split(', ').map((line, i) => (
                            <span key={i}>
                                {line}
                                {i < DEFAULT_CONTACT_INFO.address.split(', ').length - 1 && <br />}
                            </span>
                        ))}
                    </InfoCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <InfoCard
                        icon={
                            <svg className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        }
                        title="Email"
                        href={`mailto:${DEFAULT_CONTACT_INFO.email}`}
                    >
                        {DEFAULT_CONTACT_INFO.email}
                    </InfoCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <InfoCard
                        icon={
                            <svg className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        }
                        title="Telepon"
                        href={`tel:${DEFAULT_CONTACT_INFO.phone}`}
                    >
                        {DEFAULT_CONTACT_INFO.phone}
                    </InfoCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    <InfoCard
                        icon={
                            <svg className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        title="Jam Operasional"
                    >
                        <p>Senin - Sabtu: 08.00 - 17.00</p>
                        <p>Minggu: Tutup</p>
                    </InfoCard>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-8 pt-6 border-t border-gray-100"
            >
                <h3 className="font-semibold text-gray-800 text-sm mb-3">Ikuti Kami</h3>
                <SocialIcons socialMedia={DEFAULT_SOCIAL_MEDIA} />
            </motion.div>
        </motion.div>
    );
}