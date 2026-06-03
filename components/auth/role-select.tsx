'use client'

import { Rocket, TrendingUp, GraduationCap } from 'lucide-react'
import type { Role } from '@/components/auth/auth-provider'
import { cn } from '@/lib/utils'

const roles: { id: Role; label: string; desc: string; icon: typeof Rocket }[] = [
  { id: 'founder', label: 'Founder', desc: 'Build & raise', icon: Rocket },
  { id: 'investor', label: 'Investor', desc: 'Discover deals', icon: TrendingUp },
  { id: 'mentor', label: 'Mentor', desc: 'Guide founders', icon: GraduationCap },
]

export function RoleSelect({ value, onChange }: { value: Role; onChange: (r: Role) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {roles.map((r) => {
        const active = value === r.id
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onChange(r.id)}
            className={cn(
              'flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all',
              active
                ? 'border-primary bg-primary/10 glow-purple'
                : 'border-border bg-card/40 hover:border-primary/40',
            )}
          >
            <r.icon className={cn('h-5 w-5', active ? 'text-primary' : 'text-muted-foreground')} />
            <span className="text-sm font-medium">{r.label}</span>
            <span className="text-[11px] text-muted-foreground">{r.desc}</span>
          </button>
        )
      })}
    </div>
  )
}
