'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Quote, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'
import { WorkflowGraph } from '@/components/agents/workflow-graph'
import { features, agents, pricing, testimonials } from '@/lib/data'
import { cn } from '@/lib/utils'

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 text-pretty text-muted-foreground">{subtitle}</p>
    </motion.div>
  )
}

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="Features"
        title="Everything you need to build a fundable startup"
        subtitle="A complete AI toolkit that takes you from raw idea to investor-ready company."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary/40 hover:glow-purple"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function AgentsSection() {
  return (
    <section id="agents" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 hero-glow opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="AI Agents"
          title="Six specialized agents, one mission"
          subtitle="Each agent is an expert. Together they form your AI co-founding team."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="gradient-border group p-6 transition-all duration-300 hover:glow-purple"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${a.color}22`, color: a.color }}
              >
                <a.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-semibold">{a.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WorkflowSection() {
  return (
    <section id="workflow" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="Startup Workflow"
        title="Watch your company get built, step by step"
        subtitle="Our LangGraph-style pipeline orchestrates every agent in sequence. Click any node to explore."
      />
      <WorkflowGraph />
    </section>
  )
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Testimonials"
          title="Loved by founders, investors, and mentors"
          subtitle="Join thousands building the next generation of startups."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-border bg-card/50 p-6"
            >
              <Quote className="mb-4 h-8 w-8 text-primary/40" />
              <p className="flex-1 text-pretty leading-relaxed text-foreground">{t.quote}</p>
              <div className="mt-5 flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="mt-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="Pricing"
        title="Simple, scalable pricing"
        subtitle="Start free. Upgrade when you're ready to raise."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {pricing.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              'relative flex flex-col rounded-2xl border p-7',
              p.highlighted
                ? 'gradient-border bg-card glow-purple lg:-translate-y-3'
                : 'border-border bg-card/50',
            )}
          >
            {p.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-medium text-white">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-4xl font-semibold">${p.price}</span>
              <span className="text-sm text-muted-foreground">/{p.period}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {p.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                  <span className="text-muted-foreground">{feat}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className={cn(
                'mt-7 w-full',
                p.highlighted
                  ? 'bg-gradient-to-r from-primary to-accent'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
              )}
            >
              <Link href="/signup">{p.cta}</Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The agentic AI-powered business ecosystem where founders, investors, and mentors build
              the future together.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent">
                <Link href="/signup">Start Building</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
          {[
            { title: 'Product', items: ['Features', 'AI Agents', 'Workflow', 'Pricing'] },
            { title: 'Company', items: ['About', 'Blog', 'Careers', 'Contact'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-sm font-semibold">{col.title}</p>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StartupAdvisor. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Built with intelligent AI agents.</p>
        </div>
      </div>
    </footer>
  )
}
