import { FooterSection } from '@/types';

export const DEFAULT_SECTIONS: FooterSection[] = [
    {
        title: 'Perusahaan',
        links: [
            { title: 'Tentang Kami', url: '/tentang' },
            { title: 'Profil', url: '/profil' },
            { title: 'Kontak', url: '/kontak' },
            { title: 'Karir', url: '/karir' },
            { title: 'FAQ', url: '/faq' }
        ]
    },
    {
        title: 'Layanan',
        links: [
            { title: 'Domba Siap Jual', url: '/ternak/domba-siap-jual' },
            { title: 'Indukan Premium', url: '/ternak/indukan' },
            { title: 'Anak Domba', url: '/ternak/anak' },
            { title: 'Konsultasi Ternak', url: '/layanan/konsultasi' },
            { title: 'Pelatihan', url: '/layanan/pelatihan' }
        ]
    },
    {
        title: 'Artikel & Berita',
        links: [
            { title: 'Edukasi Ternak', url: '/artikel/edukasi' },
            { title: 'Kabar Terbaru', url: '/artikel/kabar-terbaru' },
            { title: 'Hasil Ternak Lainnya', url: '/artikel/hasil-ternak' },
            { title: 'Tips & Trik', url: '/artikel/tips' },
            { title: 'Event & Promo', url: '/artikel/event' }
        ]
    },
    {
        title: 'Sumber Daya',
        links: [
            { title: 'Galeri', url: '/galeri' },
            { title: 'Testimoni', url: '/testimoni' },
            { title: 'Sertifikat', url: '/sertifikat' },
            { title: 'Mitra Kerja', url: '/mitra' },
            { title: 'Hubungi Kami', url: '/hubungi' }
        ]
    }
];