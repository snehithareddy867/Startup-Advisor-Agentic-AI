'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Menu,
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
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const founderNav = [
  { href: '/founder', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/founder/startup', label: 'My Startup', icon: Rocket },
  { href: '/founder/business-plan', label: 'Business Plan', icon: FileText },
  { href: '/founder/financials', label: 'Financials', icon: LineChart },
  { href: '/founder/investors', label: 'Investor Match', icon: Users },
  { href: '/founder/mentors', label: 'Mentor Match', icon: GraduationCap },
  { href: '/founder/team', label: 'Team', icon: Users },
  { href: '/founder/pitch-practice', label: 'Pitch Practice', icon: Sparkles },
  { href: '/founder/ai-chat', label: 'AI Chat', icon: MessageSquare },
]

const investorNav = [
  { href: '/investor', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/investor/discover', label: 'Discover', icon: Rocket },
  { href: '/investor/pipeline', label: 'Pipeline', icon: TrendingUp },
  { href: '/investor/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/investor/analytics', label: 'Analytics', icon: LineChart },
  { href: '/investor/ai-chat', label: 'AI Chat', icon: MessageSquare },
]

const mentorNav = [
  { href: '/mentor', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/mentor/requests', label: 'Requests', icon: Users },
  { href: '/mentor/matches', label: 'Matches', icon: Sparkles },
  { href: '/mentor/sessions', label: 'Sessions', icon: Calendar },
  { href: '/mentor/ai-chat', label: 'AI Chat', icon: MessageSquare },
]

interface MobileSidebarProps {
  role: 'founder' | 'investor' | 'mentor'
}

export function MobileSidebar({ role }: MobileSidebarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const nav = role === 'founder' ? founderNav : role === 'investor' ? investorNav : mentorNav
  const roleLabel = role === 'founder' ? 'Founder Portal' : role === 'investor' ? 'Investor Portal' : 'Mentor Portal'

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b border-border px-4 py-3">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-emerald">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <span className="font-semibold text-foreground">StartupAdvisor</span>
              <p className="text-[10px] font-normal text-muted-foreground">{roleLabel}</p>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {nav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId={`mobile-sidebar-active-${role}`}
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <item.icon className="relative h-4 w-4" />
                <span className="relative">{item.label}</span>
                {isActive && (
                  <div className="absolute left-0 h-6 w-1 rounded-r-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
