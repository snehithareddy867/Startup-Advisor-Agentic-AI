'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Sparkles,
  Bot,
  User,
  GraduationCap,
  Calendar,
  Users,
  Lightbulb,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const suggestedPrompts = [
  {
    icon: Users,
    title: 'Founder match recommendations',
    prompt: 'Based on my expertise, which founders would be the best mentorship matches for me?',
  },
  {
    icon: GraduationCap,
    title: 'Improve my mentoring style',
    prompt: 'What techniques can I use to be a more effective startup mentor?',
  },
  {
    icon: Calendar,
    title: 'Session planning help',
    prompt: 'Help me structure a 60-minute mentoring session for a pre-seed founder.',
  },
  {
    icon: Lightbulb,
    title: 'Evaluate a startup idea',
    prompt: 'Help me evaluate if a founders idea is worth pursuing and what questions I should ask.',
  },
]

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hello Mentor! I'm AIVA, your AI advisor assistant. I can help you find the best founder matches, structure sessions, evaluate startup ideas, and improve your mentoring impact. How can I assist you today?",
    timestamp: new Date(),
  },
]

function getMentorAIResponse(input: string): string {
  const l = input.toLowerCase()

  if (l.includes('match') || l.includes('founder') || l.includes('recommend')) {
    return `Based on your expertise profile, here are your top founder matches this week:\n\n**Top Recommended Founders:**\n1. **Priya Sharma** (FinTech AI) — 96% match · Seed stage · Needs product-market fit guidance\n2. **Marcus Lee** (SaaS Analytics) — 91% match · Pre-seed · Looking for GTM strategy\n3. **Aisha Patel** (HealthTech) — 87% match · Idea stage · Needs validation framework\n\n**Why these matches?**\n• All three are in your domain (enterprise software)\n• Each is at a stage where your experience adds maximum value\n• Their challenge areas align with your strongest skills\n\nWould you like me to draft an introduction message for any of these founders?`
  }

  if (l.includes('session') || l.includes('structure') || l.includes('agenda')) {
    return `Here's a recommended structure for a 60-minute mentoring session:\n\n**Session Blueprint:**\n\n⏱ **0–5 min — Check-in**\n• How has the week been? Any wins?\n• Quick mood / energy calibration\n\n⏱ **5–20 min — Progress Review**\n• What did they commit to last session?\n• Honest assessment of what worked / didn't\n\n⏱ **20–40 min — Deep Dive**\n• Single focused problem (don't try to solve everything)\n• Ask questions before giving answers\n\n⏱ **40–55 min — Strategy & Next Steps**\n• Co-create 2–3 concrete actions\n• Set clear, measurable commitments\n\n⏱ **55–60 min — Reflection**\n• What was the most valuable insight today?\n• Schedule next session\n\nWould you like me to customize this for a specific founder challenge?`
  }

  if (l.includes('evaluate') || l.includes('idea') || l.includes('assess')) {
    return `Great question! Here's my founder-evaluation framework:\n\n**Key Questions to Ask:**\n\n🔍 **Problem Clarity**\n• Can they articulate the pain in one sentence?\n• Have they experienced this problem personally?\n\n📊 **Market Understanding**\n• Do they know who their first 10 customers are?\n• Can they name 3 competitors and explain why they're better?\n\n🧪 **Validation Status**\n• Have they spoken to 20+ potential customers?\n• Is anyone paying (even a small amount)?\n\n👥 **Team Strength**\n• Do skills complement each other?\n• What's their commitment level?\n\n**Red Flags to Watch:**\n• "No one else is doing this" (usually wrong)\n• Unwilling to pivot based on feedback\n• Feature-focused rather than problem-focused\n\nShall I turn this into a scorecard you can use in sessions?`
  }

  return `Thank you for reaching out! I'm analyzing your query to provide mentor-specific guidance.\n\nAs a mentor, I can help you with:\n• **Finding the right founders** to work with based on your expertise\n• **Structuring sessions** for maximum impact\n• **Evaluating startup ideas** objectively\n• **Tracking mentee progress** and setting milestones\n• **Navigating tricky situations** like pivots, team conflicts, or funding challenges\n\nWhat specific challenge are you working through right now?`
}

export default function MentorAIChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: getMentorAIResponse(input), timestamp: new Date() },
      ])
      setIsLoading(false)
    }, 1400)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">AI Chat</h1>
        <p className="text-muted-foreground">Get mentoring insights and founder recommendations from AIVA</p>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        <Card className="flex flex-1 flex-col border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn('flex gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-3',
                        message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted/50'
                      )}
                    >
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                      {message.role === 'assistant' && (
                        <div className="mt-2 flex items-center gap-2 border-t border-border/50 pt-2">
                          <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6"><ThumbsUp className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6"><ThumbsDown className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6"><RefreshCw className="h-3 w-3" /></Button>
                        </div>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-2xl bg-muted/50 px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <div className="border-t border-border/50 p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask AIVA for mentoring guidance..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                className="min-h-[60px] resize-none"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isLoading} className="h-auto gap-2 bg-gradient-to-r from-primary to-accent">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="hidden w-80 space-y-4 lg:block">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" />
                Suggested Prompts
              </CardTitle>
              <CardDescription>Quick mentor actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedPrompts.map((prompt, index) => (
                <Button key={index} variant="outline" className="h-auto w-full justify-start gap-2 p-3 text-left" onClick={() => setInput(prompt.prompt)}>
                  <prompt.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm">{prompt.title}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-base">AIVA Mentor Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  'Founder matching & recommendations',
                  'Session structure & agendas',
                  'Startup idea evaluation',
                  'Progress milestone setting',
                  'Conflict & pivot navigation',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
