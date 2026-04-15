'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type { ValueItem } from '@/types'
import {
  HeartIcon,
  ShieldCheckIcon,
  HandThumbUpIcon,
  GlobeAltIcon,
  UserGroupIcon,
  TrophyIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline'

// Definisikan icon 
const ICONS = {
  'Kualitas Terbaik': HeartIcon,
  'Kualitas': HeartIcon,
  'Terpercaya': ShieldCheckIcon,
  'Kepercayaan': ShieldCheckIcon,
  'Berkelanjutan': GlobeAltIcon,
  'Keberlanjutan': GlobeAltIcon,
  'Inovasi': RocketLaunchIcon,
  'Profesional': UserGroupIcon,
  'Integritas': HandThumbUpIcon,
  'Prestasi': TrophyIcon,
  'Ramah Lingkungan': GlobeAltIcon,
} as const

interface ValueCardProps {
  item: ValueItem
  index: number
}

export default function ValueCard({ item, index }: ValueCardProps) {
  const Icon = ICONS[item.title as keyof typeof ICONS] || HeartIcon
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white rounded-2xl p-8 shadow-sm border border-stone-100 
                hover:shadow-xl hover:border-stone-200 transition-all duration-300 overflow-hidden cursor-pointer"
      style={{ transform: isHovered ? 'translateY(-6px)' : 'translateY(0)' }}
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-stone-100 text-stone-600 mb-5 transition-all duration-300"
        style={{
          backgroundColor: isHovered ? '#22c55e' : '#f5f5f4',
          color: isHovered ? 'white' : '#57534e'
        }}
      >
        <Icon className="w-7 h-7" />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-stone-800 text-lg mb-3 tracking-tight transition-colors duration-300"
        style={{ color: isHovered ? '#16a34a' : '#1c1917' }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-stone-500 text-sm leading-relaxed">
        {item.description}
      </p>

      {/* Animated line from left to right on hover */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-green-500 to-emerald-500 transition-all duration-300 ease-out"
        style={{ width: isHovered ? '100%' : '0%' }}
      />
    </motion.div>
  )
}