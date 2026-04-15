// ─── Value Card ────────────────────────────────────────────────────────────────
// types/index.ts
export interface ValueItem {
  title: string
  description: string
  icon?: string  // dibuat opsional dengan ?
  accent?: string // dibuat opsional dengan ?
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
export interface StatItem {
  value: number
  suffix: string
  label: string
  icon: string
}

// ─── Team Card ─────────────────────────────────────────────────────────────────
export interface TeamMember {
  name: string
  position: string
  bio: string
  initials: string
  color: string
  instagram?: string
  linkedin?: string
}

// ─── Achievement ───────────────────────────────────────────────────────────────
export interface Achievement {
  year: string
  title: string
  description: string
}

// ─── Testimonial ───────────────────────────────────────────────────────────────
export interface Testimonial {
  name: string
  location: string
  message: string
  rating: number
  initials: string
}

// ─── Partner ───────────────────────────────────────────────────────────────────
export interface Partner {
  name: string
  abbr: string
}
