// app/ternak/[slug]/page.tsx
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

    const formatUmur = (umurString: string) => {
        if (!umurString) return '-';
        const bulan = parseInt(umurString);
        if (isNaN(bulan)) return umurString;
        
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
            return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Aktif</span>;
        } else if (status === 'mati') {
            return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Mati</span>;
        } else {
            return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Terjual</span>;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat data ternak...</p>
                </div>
            </div>
        );
    }

    if (error || !ternak) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-center">
                    <p>{error || 'Ternak tidak ditemukan'}</p>
                    <Link href="/ternak" className="text-green-600 mt-4 inline-block">
                        ← Kembali ke daftar ternak
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-500">
                <Link href="/" className="hover:text-green-600">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/ternak" className="hover:text-green-600">Ternak</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{ternak.nama_ternak || ternak.kode_ternak}</span>
            </div>

            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Foto */}
                    <div className="md:w-1/2 relative h-80 md:h-auto bg-gray-100">
                        {ternak.foto ? (
                            <Image
                                src={ternak.foto}
                                alt={ternak.nama_ternak || ternak.kode_ternak}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="md:w-1/2 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm text-gray-500">{ternak.kode_ternak}</p>
                                <h1 className="text-2xl font-bold">{ternak.nama_ternak || 'Tanpa Nama'}</h1>
                            </div>
                            {getStatusBadge(ternak.status_aktif)}
                        </div>

                        <div className="space-y-3 border-t pt-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Jenis Ternak:</span>
                                <span className="font-medium">{ternak.jenis_ternak}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Jenis Kelamin:</span>
                                <span className="font-medium">
                                    {ternak.jenis_kelamin === 'jantan' ? '♂ Jantan' : '♀ Betina'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tanggal Lahir:</span>
                                <span className="font-medium">{formatTanggal(ternak.tanggal_lahir)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Umur:</span>
                                <span className="font-medium">{formatUmur(ternak.umur)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Bobot:</span>
                                <span className="font-medium text-lg text-green-600">{ternak.bobot} kg</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tombol Kembali */}
            <div className="mt-8 text-center">
                <Link 
                    href="/ternak" 
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
                >
                    ← Kembali ke daftar ternak
                </Link>
            </div>
        </div>
    );
}