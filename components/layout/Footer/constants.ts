import { ContactInfo, FooterSection, SocialMedia } from './types';

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  address: '66V6+M36, Jl. Desa Kasokandel, Kasokandel, Kec. Kasokandel, Kabupaten Majalengka, Jawa Barat 45453',
  email: 'nagirafarm@gmail.com',
  phone: '+62 821124177'
};

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
      { title: 'Domba Siap Jual', url: '/produk/domba-siap-jual' },
      { title: 'Indukan Premium', url: '/produk/indukan' },
      { title: 'Anak Domba', url: '/produk/anak' },
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

export const DEFAULT_SOCIAL_MEDIA: SocialMedia[] = [
  { name: 'Facebook', url: 'https://facebook.com/nagirafarm' },
  { name: 'Instagram', url: 'https://instagram.com/nagirafarm' },
  { name: 'YouTube', url: 'https://youtube.com/nagirafarm' },
  { name: 'Tiktok', url: 'https://tiktok.com/nagirafarm' }
];