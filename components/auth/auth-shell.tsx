'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Logo } from '@/components/shared/logo'
import { Particles } from '@/components/shared/particles'
import { agents } from '@/lib/data'

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div className="hero-glow absolute inset-0" />
      <Particles className="absolute inset-0 h-full w-full opacity-50" />
      <div className="grid-pattern absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl glass-strong lg:grid-cols-2">
        {/* Left brand panel */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-primary/20 via-accent/10 to-transparent p-10 lg:flex">
          <Link href="/">
            <Logo />
          </Link>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-balance text-3xl font-semibold leading-tight"
            >
              Your AI co-founding team is ready.
            </motion.h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Six specialized agents working together to turn your idea into an investor-ready
              business.
            </p>
            <div className="mt-8 space-y-3">
              {agents.slice(0, 4).map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/40 px-3 py-2.5"
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${a.color}22`, color: a.color }}
                  >
                    <a.icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-sm font-medium">{a.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Trusted by 12,000+ founders worldwide.</p>
        </div>

        {/* Right form panel */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <div className="mb-6 lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
