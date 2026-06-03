'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Lightbulb } from 'lucide-react'

const TIPS = [
  '👋 Welcome Founder! Need help generating a business plan?',
  '💡 Tip: Start with the Startup Idea form to unlock all AI agents.',
  '📈 Your Health Score updates as you complete your business plan.',
  '🤝 Investors are matched automatically once your plan is ready.',
  '🚀 Try the Pitch Deck Generator to get investor-ready in minutes.',
]

export function AivaGuide() {
  const [open, setOpen] = useState(false)
  const [tip, setTip] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!open) return
    const i = setInterval(() => setTip((t) => (t + 1) % TIPS.length), 6000)
    return () => clearInterval(i)
  }, [open])

  if (dismissed) return null

  return (
    <div className="fixed bottom-5 left-4 z-40 flex items-end gap-3 sm:left-6">
      {/* Robot */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-primary shadow-xl shadow-accent/40"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        aria-label="AIVA guide"
      >
        <svg viewBox="0 0 64 64" className="h-9 w-9" fill="none" aria-hidden="true">
          <rect x="16" y="20" width="32" height="26" rx="8" fill="white" />
          <circle cx="26" cy="33" r="4" fill="#2563eb">
            <animate attributeName="r" values="4;2.5;4" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="38" cy="33" r="4" fill="#2563eb">
            <animate attributeName="r" values="4;2.5;4" dur="3s" repeatCount="indefinite" />
          </circle>
          <rect x="27" y="40" width="10" height="2.5" rx="1.25" fill="#7c3aed" />
          <line x1="32" y1="12" x2="32" y2="20" stroke="white" strokeWidth="2.5" />
          <circle cx="32" cy="11" r="3" fill="#10b981" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -16, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -16, scale: 0.95 }}
            className="relative mb-1 max-w-[16rem] rounded-2xl rounded-bl-sm glass-strong px-4 py-3 glow-blue"
          >
            <button
              onClick={() => setDismissed(true)}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground"
              aria-label="Dismiss AIVA"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-accent">
              <Lightbulb className="h-3.5 w-3.5" />
              AIVA
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={tip}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-sm leading-relaxed text-foreground"
              >
                {TIPS[tip]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
