// ─── App Metadata ───────────────────────────────────────────────────────────
export const APP_NAME = 'StartupAdvisor'
export const APP_DESCRIPTION =
  'Turn startup ideas into investor-ready businesses using intelligent AI agents.'
export const APP_KEYWORDS = ['startup', 'AI agents', 'business plan', 'investor matching', 'pitch deck', 'SaaS']

// ─── AI Model ────────────────────────────────────────────────────────────────
export const AI_MODEL = 'google/gemini-2.5-flash'
export const AI_MAX_TOKENS = 4000

// ─── Roles ───────────────────────────────────────────────────────────────────
export const ROLES = {
  FOUNDER: 'founder',
  INVESTOR: 'investor',
  MENTOR: 'mentor',
  ADMIN: 'admin',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

// ─── Portal Labels ────────────────────────────────────────────────────────────
export const PORTAL_LABELS: Record<string, string> = {
  founder: 'Founder Portal',
  investor: 'Investor Portal',
  mentor: 'Mentor Portal',
  admin: 'Admin Portal',
}

// ─── Routes ──────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SETTINGS: '/settings',
  FORGOT_PASSWORD: '/forgot-password',
  FOUNDER: {
    ROOT: '/founder',
    STARTUP: '/founder/startup',
    BUSINESS_PLAN: '/founder/business-plan',
    FINANCIALS: '/founder/financials',
    INVESTORS: '/founder/investors',
    MENTORS: '/founder/mentors',
    TEAM: '/founder/team',
    PITCH_PRACTICE: '/founder/pitch-practice',
    AI_CHAT: '/founder/ai-chat',
    VALIDATION: '/founder/validation',
    AGENTS: '/agents',
  },
  INVESTOR: {
    ROOT: '/investor',
    DISCOVER: '/investor/discover',
    PIPELINE: '/investor/pipeline',
    PORTFOLIO: '/investor/portfolio',
    ANALYTICS: '/investor/analytics',
    AI_CHAT: '/investor/ai-chat',
  },
  MENTOR: {
    ROOT: '/mentor',
    REQUESTS: '/mentor/requests',
    MATCHES: '/mentor/matches',
    SESSIONS: '/mentor/sessions',
    AI_CHAT: '/mentor/ai-chat',
  },
  ADMIN: {
    ROOT: '/admin',
    ANALYTICS: '/admin/analytics',
    USERS: '/admin/users',
    STARTUPS: '/admin/startups',
    INVESTORS: '/admin/investors',
    MENTORS: '/admin/mentors',
  },
} as const

// ─── API Endpoints ────────────────────────────────────────────────────────────
export const API = {
  AGENTS: '/api/agents',
  CHAT: '/api/chat',
  BUSINESS_PLAN: '/api/business-plan',
  INVESTORS: '/api/investors',
  MENTORS: '/api/mentors',
  STARTUPS: '/api/startups',
  USERS: '/api/users',
  VALIDATE: '/api/validate',
  NOTIFICATIONS: '/api/notifications',
} as const

// ─── Pagination ───────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100
