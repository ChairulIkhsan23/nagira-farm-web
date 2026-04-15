// app/tentang/page.tsx
import type { Metadata } from 'next'
import TentangClient from './TentangClient'

export const metadata: Metadata = {
  title: 'Tentang Kami',

  description: 'Nagira Farm adalah peternakan domba dan kambing modern terpercaya di Majalengka, Jawa Barat. Berdiri sejak 2023, kami berkomitmen menyediakan ternak berkualitas untuk kebutuhan qurban dan aqiqah. Dengan pengalaman bertahun-tahun, kami mengutamakan kesehatan dan kesejahteraan hewan, serta pelayanan terbaik untuk pelanggan di seluruh Indonesia.',

  keywords: [
    'Nagira Farm',
    'peternakan domba Majalengka',
    'peternakan kambing Majalengka',
    'sejarah Nagira Farm',
    'profil peternakan',
    'peternakan Jawa Barat',
  ],

  alternates: {
    canonical: 'https://nagirafarm.com/tentang',
  },
}

export default function TentangPage() {
  return <TentangClient />
}