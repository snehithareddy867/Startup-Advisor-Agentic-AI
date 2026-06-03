import { Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
        <Rocket className="h-5 w-5 text-white" />
      </div>
      {showText && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Startup<span className="text-gradient-purple">Advisor</span>
        </span>
      )}
    </div>
  )
}
