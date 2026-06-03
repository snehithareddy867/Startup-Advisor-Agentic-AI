import {
  LayoutDashboard,
  Rocket,
  FileText,
  LineChart,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Sparkles,
  Briefcase,
  TrendingUp,
  Calendar,
  GraduationCap,
  CheckCircle,
  BarChart3,
  ShieldCheck,
} from 'lucide-react'
import type { NavItem } from '@/lib/types'
import { ROUTES } from '@/lib/constants'

export const founderNav: NavItem[] = [
  { href: ROUTES.FOUNDER.ROOT, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.FOUNDER.STARTUP, label: 'My Startup', icon: Rocket },
  { href: ROUTES.FOUNDER.BUSINESS_PLAN, label: 'Business Plan', icon: FileText },
  { href: ROUTES.FOUNDER.FINANCIALS, label: 'Financials', icon: LineChart },
  { href: ROUTES.FOUNDER.INVESTORS, label: 'Investor Match', icon: Users },
  { href: ROUTES.FOUNDER.MENTORS, label: 'Mentor Match', icon: GraduationCap },
  { href: ROUTES.FOUNDER.TEAM, label: 'Team', icon: Users },
  { href: ROUTES.FOUNDER.PITCH_PRACTICE, label: 'Pitch Practice', icon: Sparkles },
  { href: ROUTES.FOUNDER.VALIDATION, label: 'Validation', icon: CheckCircle },
  { href: ROUTES.FOUNDER.AI_CHAT, label: 'AI Chat', icon: MessageSquare },
]

export const investorNav: NavItem[] = [
  { href: ROUTES.INVESTOR.ROOT, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.INVESTOR.DISCOVER, label: 'Discover', icon: Rocket },
  { href: ROUTES.INVESTOR.PIPELINE, label: 'Pipeline', icon: TrendingUp },
  { href: ROUTES.INVESTOR.PORTFOLIO, label: 'Portfolio', icon: Briefcase },
  { href: ROUTES.INVESTOR.ANALYTICS, label: 'Analytics', icon: LineChart },
  { href: ROUTES.INVESTOR.AI_CHAT, label: 'AI Chat', icon: MessageSquare },
]

export const mentorNav: NavItem[] = [
  { href: ROUTES.MENTOR.ROOT, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.MENTOR.REQUESTS, label: 'Requests', icon: Users },
  { href: ROUTES.MENTOR.MATCHES, label: 'Matches', icon: Sparkles },
  { href: ROUTES.MENTOR.SESSIONS, label: 'Sessions', icon: Calendar },
  { href: ROUTES.MENTOR.AI_CHAT, label: 'AI Chat', icon: MessageSquare },
]

export const adminNav: NavItem[] = [
  { href: ROUTES.ADMIN.ROOT, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.ADMIN.ANALYTICS, label: 'Analytics', icon: BarChart3 },
  { href: ROUTES.ADMIN.USERS, label: 'Users', icon: Users },
  { href: ROUTES.ADMIN.STARTUPS, label: 'Startups', icon: Rocket },
  { href: ROUTES.ADMIN.INVESTORS, label: 'Investors', icon: Briefcase },
  { href: ROUTES.ADMIN.MENTORS, label: 'Mentors', icon: GraduationCap },
]

export const globalFooterNav: NavItem[] = [
  { href: ROUTES.SETTINGS, label: 'Settings', icon: Settings },
  { href: ROUTES.HOME, label: 'Sign Out', icon: LogOut },
]

export type SidebarRole = 'founder' | 'investor' | 'mentor' | 'admin'

export function getNavItems(role: SidebarRole): NavItem[] {
  switch (role) {
    case 'founder':
      return founderNav
    case 'investor':
      return investorNav
    case 'mentor':
      return mentorNav
    case 'admin':
      return adminNav
    default:
      return []
  }
}
