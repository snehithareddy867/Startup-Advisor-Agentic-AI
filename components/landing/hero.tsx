'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, TrendingUp, Users, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Particles } from '@/components/shared/particles'
import { AnimatedCounter } from '@/components/shared/animated-counter'

function Globe() {
  return (
    <div className="relative flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96">
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-primary/20"
            style={{ transform: `rotateX(${70 + i * 10}deg) rotateY(${i * 30}deg)` }}
          />
        ))}
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="relative flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-primary via-accent to-emerald shadow-2xl shadow-primary/40 sm:h-56 sm:w-56"
      >
        <div className="absolute inset-2 rounded-full bg-background/30 backdrop-blur-sm" />
        <Sparkles className="relative h-16 w-16 text-white" />
      </motion.div>
      {/* Orbiting nodes */}
      {[
        { icon: TrendingUp, color: 'from-accent to-blue-400', delay: 0 },
        { icon: Users, color: 'from-emerald to-green-400', delay: 1 },
        { icon: DollarSign, color: 'from-primary to-purple-400', delay: 2 },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 14 + i * 3, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
        >
          <div
            className="absolute flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg"
            style={{
              transform: `translateX(${130 + i * 14}px)`,
            }}
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${node.color}`}>
              <node.icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div className="hero-glow absolute inset-0" />
      <Particles className="absolute inset-0 h-full w-full opacity-60" />
      <div className="grid-pattern absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary-foreground">
            <span className="flex h-2 w-2 rounded-full bg-emerald" />
            Agentic AI-Powered Business Ecosystem
          </div>

          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Turn Startup Ideas Into{' '}
            <span className="text-gradient">Investor-Ready Businesses</span> Using AI
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Generate business plans, investor matches, mentor recommendations, market insights, and
            startup roadmaps using intelligent AI agents.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-primary to-accent text-base shadow-lg shadow-primary/30"
            >
              <Link href="/signup">
                Start Building
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border bg-card/40 text-base">
              <Link href="#workflow">
                <Play className="mr-1 h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {[
              { value: 12000, suffix: '+', label: 'Startups built' },
              { value: 340, suffix: 'M', prefix: '$', label: 'Funding matched' },
              { value: 98, suffix: '%', label: 'Founder rating' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-semibold text-foreground sm:text-3xl">
                  <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <Globe />
        </motion.div>
      </div>
    </section>
  )
}
