// app/kontak/page.tsx
import type { Metadata } from 'next'
import KontakClient from './KontakClient'

export const metadata: Metadata = {
    title: 'Kontak Kami',
    description: 'Hubungi Nagira Farm untuk konsultasi pemesanan domba dan kambing qurban, aqiqah, atau kebutuhan komersial. Kami siap membantu Anda 24/7.',
    keywords: [
        'kontak Nagira Farm',
        'nomor telepon Nagira Farm',
        'alamat peternakan Majalengka',
        'konsultasi domba qurban',
        'pemesanan kambing aqiqah',
        'WhatsApp Nagira Farm',
        'peternakan domba Majalengka',
    ],
    alternates: {
        canonical: 'https://nagirafarm.com/kontak',
    },
}

export default function KontakPage() {
    return <KontakClient />
}