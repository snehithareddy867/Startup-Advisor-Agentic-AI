'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, CheckCircle2 } from 'lucide-react'
import { agents } from '@/lib/data'
import { cn } from '@/lib/utils'

export function WorkflowGraph({ interactive = true }: { interactive?: boolean }) {
  const [active, setActive] = useState(0)

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center">
      {agents.map((agent, i) => {
        const Icon = agent.icon
        const isActive = i <= active
        return (
          <div key={agent.id} className="flex w-full flex-col items-center">
            <motion.button
              type="button"
              onClick={() => interactive && setActive(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={interactive ? { scale: 1.02 } : undefined}
              className={cn(
                'group relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300',
                isActive
                  ? 'border-transparent gradient-border bg-card glow-purple'
                  : 'border-border bg-card/40 opacity-70 hover:opacity-100',
              )}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${agent.color}22`, color: agent.color }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{agent.name}</p>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
                    style={{ backgroundColor: `${agent.color}22`, color: agent.color }}
                  >
                    {agent.role}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{agent.desc}</p>
              </div>
              {isActive && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald" />
              )}
            </motion.button>

            {i < agents.length - 1 && (
              <div className="relative flex h-10 items-center justify-center">
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowDown
                    className={cn('h-5 w-5', i < active ? 'text-primary' : 'text-muted-foreground/50')}
                  />
                </motion.div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
