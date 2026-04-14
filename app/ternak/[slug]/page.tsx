'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ternakApi, Ternak } from '@/lib/api/endpoints/ternak';

export default function TernakDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    
    const [ternak, setTernak] = useState<Ternak | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTernak = async () => {
            if (!slug) return;
            
            try {
                setLoading(true);
                const data = await ternakApi.getBySlug(slug);
                setTernak(data);
            } catch (err) {
                console.error('Error:', err);
                setError('Gagal memuat data ternak');
            } finally {
                setLoading(false);
            }
        };

        fetchTernak();
    }, [slug]);

    // Hitung umur dari tanggal lahir
    const hitungUmur = (tanggalLahir: string) => {
        if (!tanggalLahir) return '-';
        const lahir = new Date(tanggalLahir);
        const today = new Date();
        let bulan = (today.getFullYear() - lahir.getFullYear()) * 12;
        bulan -= lahir.getMonth();
        bulan += today.getMonth();
        
        if (bulan < 0) return '-';
        
        const tahun = Math.floor(bulan / 12);
        const sisaBulan = bulan % 12;
        
        if (tahun > 0 && sisaBulan > 0) {
            return `${tahun} tahun ${sisaBulan} bulan`;
        } else if (tahun > 0) {
            return `${tahun} tahun`;
        } else {
            return `${bulan} bulan`;
        }
    };

    const formatTanggal = (date: string) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        if (status === 'aktif') {
            return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Aktif</span>;
        } else if (status === 'mati') {
            return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">Mati</span>;
        } else {
            return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">Terjual</span>;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900 pt-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-200 mx-auto"></div>
                    <p className="mt-4 text-white">Memuat data ternak...</p>
                </div>
            </div>
        );
    }

    if (error || !ternak) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-900 pt-20">
                <div className="text-red-400 text-center">
                    <p>{error || 'Ternak tidak ditemukan'}</p>
                    <Link href="/ternak" className="text-yellow-200 hover:text-yellow-300 mt-4 inline-block">
                        ← Kembali ke daftar ternak
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-green-900 flex flex-col">
            {/* Hero Section - padding bottom lebih besar biar ada ruang buat nimpa */}
            <section className="relative pt-32 pb-48 md:pt-40 md:pb-56 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/bg-1.png')" }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 text-sm text-white/70">
                        <Link href="/" className="hover:text-yellow-200">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/ternak" className="hover:text-yellow-200">Ternak</Link>
                        <span className="mx-2">/</span>
                        <span className="text-yellow-200">{ternak.nama_ternak || ternak.kode_ternak}</span>
                    </div>
                </div>
            </section>

            {/* Content Container - pake margin negatif biar nimpa background kayak preview artikel */}
            <div className="container mx-auto px-4 max-w-5xl -mt-32 mb-12 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2 relative h-80 md:h-auto bg-gradient-to-br from-green-400 to-emerald-500">
                            {ternak.foto ? (
                                <Image
                                    src={ternak.foto}
                                    alt={ternak.nama_ternak || ternak.kode_ternak}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-white/50">
                                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <div className="md:w-1/2 p-6 md:p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-400">{ternak.kode_ternak}</p>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                                        {ternak.nama_ternak || 'Tanpa Nama'}
                                    </h1>
                                </div>
                                {getStatusBadge(ternak.status_aktif)}
                            </div>

                            <div className="flex gap-1.5 mb-6 w-full">
                                <div className="flex-1 h-1 rounded-full bg-green-700"></div>
                                <div className="flex-1 h-1 rounded-full bg-lime-400"></div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Jenis Ternak</span>
                                    <span className="font-semibold text-gray-800">{ternak.jenis_ternak}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Kategori</span>
                                    <span className="font-semibold text-gray-800">{ternak.kategori || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Jenis Kelamin</span>
                                    <span className="font-semibold text-gray-800">
                                        {ternak.jenis_kelamin === 'jantan' ? '♂ Jantan' : '♀ Betina'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Tanggal Lahir</span>
                                    <span className="font-semibold text-gray-800">{formatTanggal(ternak.tanggal_lahir)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Umur</span>
                                    <span className="font-semibold text-gray-800">{hitungUmur(ternak.tanggal_lahir)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-500">Bobot</span>
                                    <span className="font-bold text-2xl text-green-600">{ternak.bobot} kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center pb-12">
                    <Link 
                        href="/ternak" 
                        className="inline-flex items-center gap-2 text-yellow-200 hover:text-yellow-300 font-medium transition-colors"
                    >
                        Kembali ke daftar ternak
                    </Link>
                </div>
            </div>
        </main>
    );
}