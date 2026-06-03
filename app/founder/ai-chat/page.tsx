'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  FileText, 
  TrendingUp, 
  Users,
  Lightbulb,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const suggestedPrompts = [
  {
    icon: FileText,
    title: 'Review my business plan',
    prompt: 'Can you review my business plan and provide feedback on the market analysis section?',
  },
  {
    icon: TrendingUp,
    title: 'Analyze my financials',
    prompt: 'Analyze my current burn rate and suggest ways to extend our runway.',
  },
  {
    icon: Users,
    title: 'Find investor matches',
    prompt: 'Based on my startup profile, which investors should I prioritize reaching out to?',
  },
  {
    icon: Lightbulb,
    title: 'Pitch deck feedback',
    prompt: 'Can you help me improve my pitch deck for Series A fundraising?',
  },
]

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm AIVA, your AI startup advisor. I'm here to help you with business strategy, fundraising, market analysis, and more. How can I assist you today?",
    timestamp: new Date(),
  },
]

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">AI Chat</h1>
        <p className="text-muted-foreground">Get personalized advice from AIVA, your AI startup advisor</p>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Chat Area */}
        <Card className="flex flex-1 flex-col border-border/50 bg-card/50 backdrop-blur">
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-3',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50'
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.role === 'assistant' && (
                        <div className="mt-2 flex items-center gap-2 border-t border-border/50 pt-2">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <RefreshCw className="h-3 w-3" />
                          </Button>
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
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
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

          {/* Input */}
          <div className="border-t border-border/50 p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask AIVA anything about your startup..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                className="min-h-[60px] resize-none"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="h-auto gap-2 bg-gradient-to-r from-primary to-accent"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Sidebar */}
        <div className="hidden w-80 space-y-4 lg:block">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" />
                Suggested Prompts
              </CardTitle>
              <CardDescription>Quick actions to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto w-full justify-start gap-2 p-3 text-left"
                  onClick={() => handlePromptClick(prompt.prompt)}
                >
                  <prompt.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm">{prompt.title}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-base">AIVA Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Business plan review & generation
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Financial analysis & projections
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Investor & mentor recommendations
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Market research & competitor analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Pitch deck optimization
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function getAIResponse(input: string): string {
  const lowercaseInput = input.toLowerCase()
  
  if (lowercaseInput.includes('business plan') || lowercaseInput.includes('review')) {
    return `I'd be happy to review your business plan! Based on your TechFlow AI profile, here are my initial observations:

**Strengths:**
• Clear value proposition - AI-powered workflow automation is a growing market
• Strong founding team with relevant experience
• Good initial traction with early customers

**Areas for Improvement:**
1. **Market Analysis**: Consider adding more specific TAM/SAM/SOM calculations with cited sources
2. **Competitive Positioning**: Differentiate more clearly from Zapier and Make.com
3. **Go-to-Market**: Your GTM strategy could benefit from specific channel strategies

Would you like me to dive deeper into any of these areas?`
  }
  
  if (lowercaseInput.includes('investor') || lowercaseInput.includes('fundraising')) {
    return `Based on your startup profile and current stage, here are my top investor recommendations:

**Top Matches:**
1. **Sequoia Capital** (94% match) - Strong SaaS focus, loves AI companies
2. **a16z** (89% match) - Active in enterprise automation space
3. **Y Combinator** (86% match) - Perfect for your stage, great network

**Strategy Tips:**
• Lead with your AI differentiation vs traditional automation tools
• Highlight your 24% MoM revenue growth
• Prepare for questions about enterprise sales cycle

Shall I help you prepare a personalized outreach strategy for any of these investors?`
  }
  
  if (lowercaseInput.includes('financial') || lowercaseInput.includes('burn') || lowercaseInput.includes('runway')) {
    return `Looking at your financials, here's my analysis:

**Current Status:**
• Monthly Revenue: $55,000 (+31% MoM)
• Monthly Burn: $26,000
• Cash in Bank: $364,000
• Runway: ~14 months

**Recommendations:**
1. **Optimize CAC**: Your current CAC of $450 is above industry average. Consider:
   - Increasing content marketing (lower CAC channel)
   - Implementing a referral program
   
2. **Revenue Acceleration**: You could reach profitability faster by:
   - Introducing annual plans with 20% discount
   - Upselling enterprise features

3. **Cost Management**: Your cloud costs seem high at 17%. Consider reserved instances.

Want me to create detailed projections for different scenarios?`
  }
  
  return `Thank you for your question! I'm analyzing your request and will provide personalized advice based on your TechFlow AI profile.

To give you the most relevant guidance, could you provide more details about:
• What specific challenge you're facing?
• What outcome you're hoping to achieve?
• Any constraints or timelines I should know about?

I'm here to help with business strategy, fundraising, market analysis, financial planning, and more!`
}
