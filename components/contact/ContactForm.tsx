// components/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import FormInput from '@/components/ui/FormInput';
import FormTextarea from '@/components/ui/FormTextarea';
import FormSelect from '@/components/ui/FormSelect';
import SubmitButton from '@/components/ui/SubmitButton';
import SuccessMessage from '@/components/ui/SuccessMessage';
import { pengaduanApi, type KategoriPengaduan } from '@/lib/api/endpoints/pengaduan';

const kategoriOptions = [
    { value: '', label: 'Pilih kategori' },
    { value: 'saran', label: 'Saran' },
    { value: 'kritik', label: 'Kritik' },
    { value: 'keluhan', label: 'Keluhan' },
    { value: 'pertanyaan', label: 'Pertanyaan' },
    { value: 'laporan', label: 'Laporan' },
    { value: 'informasi', label: 'Informasi' },
    { value: 'lainnya', label: 'Lainnya' }
];

interface FormData {
    name: string;
    email: string;
    phone: string;
    kategori: string;
    message: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        kategori: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const payload = {
                nama_pengirim: formData.name,
                email: formData.email,
                kategori: formData.kategori as KategoriPengaduan,
                pesan: formData.message,
            };

            console.log('📤 Sending payload:', payload);

            const response = await pengaduanApi.create(payload);

            console.log('📥 Response:', response);

            if (response.success) {
                setIsSubmitted(true);
                setFormData({ name: '', email: '', phone: '', kategori: '', message: '' });
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                setError(response.message || 'Gagal mengirim pesan. Silakan coba lagi.');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Terjadi kesalahan. Silakan coba lagi nanti.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xs p-6 md:p-8 border border-gray-200"
        >
            <SectionHeader
                title="Kirim Pesan"
                subtitle="Isi form di bawah, kami akan membalas pesan Anda secepatnya."
            />

            {isSubmitted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <SuccessMessage message="Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda." />
                </motion.div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                >
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    <FormInput
                        label="Nama Lengkap"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Masukkan nama lengkap"
                    />
                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="email@example.com"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    <FormSelect
                        label="Kategori"
                        name="kategori"
                        value={formData.kategori}
                        onChange={handleChange}
                        options={kategoriOptions}
                        required
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <FormTextarea
                        label="Pesan"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tulis pesan Anda di sini..."
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    <SubmitButton
                        isSubmitting={isSubmitting}
                        text="Kirim Pesan"
                        submittingText="Mengirim..."
                    />
                </motion.div>
            </form>
        </motion.div>
    );
}