import type { Role } from '@/lib/constants'

// ─── User ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  createdAt: string
  updatedAt: string
}

// ─── Startup ──────────────────────────────────────────────────────────────────
export interface Startup {
  id: string
  name: string
  description: string
  industry: string
  stage: FundingStage
  founderId: string
  teamSize: number
  fundingGoal?: number
  currentFunding?: number
  website?: string
  pitch?: string
  createdAt: string
  updatedAt: string
}

export type FundingStage = 'idea' | 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'growth'

// ─── Investor ─────────────────────────────────────────────────────────────────
export interface Investor {
  id: string
  name: string
  firm?: string
  bio: string
  focusAreas: string[]
  minTicket?: number
  maxTicket?: number
  portfolioCount?: number
  userId: string
}

// ─── Mentor ───────────────────────────────────────────────────────────────────
export interface Mentor {
  id: string
  name: string
  expertise: string[]
  bio: string
  company?: string
  title?: string
  yearsExperience?: number
  userId: string
}

// ─── Chat ─────────────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt?: string
}

// ─── Notification ─────────────────────────────────────────────────────────────
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
}
