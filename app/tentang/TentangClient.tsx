'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import ValueCard from '@/components/tentang/ValueCard'
import TeamCard from '@/components/tentang/TeamCard'
import SectionTitle from '@/components/tentang/SectionTitle'
import { values, team, achievements, testimonials, partners } from '@/constants/tentang'

export default function TentangClient() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="min-h-screen bg-stone-50 font-sans overflow-x-hidden">
      {/* hero section */}
      <section
        ref={heroRef}
        className="relative h-[90vh] min-h-150 flex items-center justify-center pt-16 md:pt-20 overflow-hidden"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src="/images/bg-2.jpg"
            alt="Nagira Farm peternakan domba modern Majalengka"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-green-950/30" />
        </motion.div>

        <motion.div
          className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto mt-6 md:mt-10"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/40 bg-black/20 backdrop-blur-sm">
              Majalengka, Jawa Barat · Est. 2020
            </span>
          </motion.div>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4 sm:mb-6 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Quality Sheep for Stronger Food Security and Sustainable Self-Sufficiency
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-stone-100 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-10 px-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Peternakan Domba Modern dan Terpercaya di Majalengka, Menghadirkan Domba Berkualitas
            Tinggi dengan Harga yang Jujur
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <a
              href="#cerita"
              className="px-6 sm:px-7 py-3 sm:py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300 shadow-xs hover:-translate-y-0.5 text-center"
            >
              Cerita Kami
            </a>
            <a
              href="#tim"
              className="px-6 sm:px-7 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/25 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm text-center"
            >
              Kenali Tim Kami
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* company story section */}
      <section id="cerita" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6 bg-green-50 text-green-600">
                Cerita Kami
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 leading-tight mb-6 tracking-tight">
                Mengembangkan Peternakan Modern
                <span className="text-green-600 relative inline-block">
                  di Majalengka

                  {/* daun decor */}
                  <Image
                    src="/images/leaf.png"
                    alt=""
                    width={60}
                    height={60}
                    className="absolute -right-10 -top-3 w-12 h-12 md:w-16 md:h-16 object-contain opacity-90 drop-shadow-md"
                    style={{
                      transform: 'rotate(25deg)',
                    }}
                  />
                </span>
              </h2>
              <div className="space-y-4 text-stone-500 leading-relaxed text-[15px]">
                <p>
                  Nagira Farm hadir sebagai inisiatif untuk mengembangkan peternakan domba modern di Majalengka,
                  dengan mengedepankan kualitas, efisiensi, dan keberlanjutan dalam setiap prosesnya.
                </p>
                <p>
                  Berangkat dari lahan seluas 0,5 hektar dan 30 ekor domba, Nagira Farm kini telah
                  berkembang menjadi peternakan dengan{' '}
                  <strong className="text-stone-700">lebih dari 30 ekor domba</strong> di lahan 2
                  hektar, didukung oleh tim dokter hewan dan peternak berpengalaman.
                </p>
                <p>
                  Kami percaya bahwa kualitas dan kepercayaan adalah fondasi utama bisnis peternakan
                  yang berkelanjutan. Setiap domba yang keluar dari kandang Nagira Farm telah
                  melalui pemeriksaan kesehatan ketat dan dipastikan memenuhi standar halal.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs">
                  <div className="text-stone-800 font-semibold text-sm uppercase tracking-wider mb-2">
                    Visi
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Menjadi peternakan domba modern terbesar dan terpercaya di Jawa Barat.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs">
                  <div className="text-stone-800 font-semibold text-sm uppercase tracking-wider mb-2">
                    Misi
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Menyediakan domba berkualitas tinggi dengan harga terjangkau dan pelayanan prima.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative h-120 rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src="/images/founder-portrait.jpg"
                  alt="Didi Rasidin founder Nagira Farm"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4">
                    <div>
                      <p className="font-bold text-stone-800 text-sm">Didi Rasidin, S.Kep.Ners., M.A.P</p>
                      <p className="text-stone-500 text-xs">Founder : Domba sehat, pelanggan bahagia.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                <span className="text-2xl font-black leading-none">3+</span>
                <span className="text-[9px] font-semibold uppercase tracking-wide">Tahun</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* values section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle
            tag="Nilai Kami"
            title="Prinsip yang Memandu Kami"
            subtitle="Empat pilar utama yang menjadi landasan setiap keputusan dan tindakan Nagira Farm."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((item, i) => (
              <ValueCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* team section */}
      <section id="tim" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle
            tag="Tim Kami"
            title="Orang-orang di Balik Nagira Farm"
            subtitle="Tim profesional yang berdedikasi menghadirkan domba terbaik untuk Anda."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* achievements section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionTitle
            tag="Perjalanan Kami"
            title="Milestone Nagira Farm"
            subtitle="Dari kandang pertama hingga peternakan modern — perjalanan kami penuh dedikasi."
          />

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-px bg-green-100 hidden md:block" />
            <div className="space-y-10">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex md:items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      className={`inline-block p-5 bg-white rounded-2xl shadow-sm border border-stone-100 
                                    hover:shadow-md hover:border-green-100 transition-all duration-300 text-left`}
                    >
                      <p className="text-green-600 font-bold text-sm mb-1">{a.year}</p>
                      <h3 className="font-semibold text-stone-800 mb-1">{a.title}</h3>
                      <p className="text-stone-400 text-sm leading-relaxed">{a.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-md shrink-0 z-10" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* partners section */}
          <div className="mt-20">
            <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-8">
              Mitra & Institusi Terpercaya
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {partners.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="px-6 py-3 bg-white rounded-full border border-stone-200 hover:border-green-300 
                            hover:shadow-sm transition-all duration-300 cursor-default"
                >
                  <span className="text-stone-500 text-sm font-medium">{p.abbr}</span>
                  <span className="hidden sm:inline text-stone-300 mx-2">·</span>
                  <span className="hidden sm:inline text-stone-400 text-xs">{p.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* testimonials section */}
          <div className="mt-20">
            <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-8">
              Kata Pelanggan Kami
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white p-6 rounded-2xl 
                  border border-stone-100 shadow-sm hover:shadow-md 
                  hover:border-green-100 transition-all duration-300"
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <span key={s} className="text-amber-400 text-base">★</span>
                    ))}
                  </div>

                  <p className="text-stone-500 text-sm leading-relaxed mb-5 italic">
                    &ldquo;{t.message}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800 text-sm">{t.name}</p>
                      <p className="text-stone-400 text-xs">{t.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* cta section */}
      <section className="py-20 bg-linear-to-br from-stone-900 to-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/bg-1.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <motion.div
          className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            Siap Bermitra dengan Nagira Farm?
          </h2>
          <p className="text-stone-400 mb-8 leading-relaxed">
            Hubungi kami sekarang dan dapatkan konsultasi gratis tentang kebutuhan domba Anda.
            Qurban, aqiqah, atau kebutuhan komersial.
          </p>
        </motion.div>
      </section>
    </main>
  )
}