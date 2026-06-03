'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  DollarSign,
  Building2,
  Send,
  Heart,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'

const investors = [
  {
    id: 1,
    name: 'Sequoia Capital',
    type: 'Venture Capital',
    location: 'Menlo Park, CA',
    checkSize: '$500K - $5M',
    stage: ['Seed', 'Series A'],
    industries: ['SaaS', 'AI/ML', 'Enterprise'],
    matchScore: 94,
    portfolio: ['Stripe', 'Airbnb', 'DoorDash'],
    status: 'interested',
  },
  {
    id: 2,
    name: 'a16z',
    type: 'Venture Capital',
    location: 'San Francisco, CA',
    checkSize: '$1M - $10M',
    stage: ['Seed', 'Series A', 'Series B'],
    industries: ['SaaS', 'AI/ML', 'Crypto'],
    matchScore: 89,
    portfolio: ['Coinbase', 'GitHub', 'Slack'],
    status: 'contacted',
  },
  {
    id: 3,
    name: 'Y Combinator',
    type: 'Accelerator',
    location: 'San Francisco, CA',
    checkSize: '$500K',
    stage: ['Pre-seed', 'Seed'],
    industries: ['SaaS', 'AI/ML', 'Fintech'],
    matchScore: 86,
    portfolio: ['Stripe', 'Airbnb', 'Reddit'],
    status: 'not-contacted',
  },
  {
    id: 4,
    name: 'Accel Partners',
    type: 'Venture Capital',
    location: 'Palo Alto, CA',
    checkSize: '$1M - $15M',
    stage: ['Seed', 'Series A', 'Series B'],
    industries: ['SaaS', 'Enterprise', 'Security'],
    matchScore: 82,
    portfolio: ['Slack', 'Dropbox', 'Spotify'],
    status: 'not-contacted',
  },
  {
    id: 5,
    name: 'Sarah Chen',
    type: 'Angel Investor',
    location: 'New York, NY',
    checkSize: '$25K - $100K',
    stage: ['Pre-seed', 'Seed'],
    industries: ['SaaS', 'AI/ML', 'Productivity'],
    matchScore: 78,
    portfolio: ['Linear', 'Notion'],
    status: 'not-contacted',
  },
]

const pipelineStats = {
  matched: 24,
  contacted: 8,
  interested: 3,
  meetings: 2,
}

export default function InvestorsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Investor Match</h1>
          <p className="text-muted-foreground">AI-powered investor recommendations based on your profile</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-primary to-accent">
          <Sparkles className="h-4 w-4" />
          Find More Matches
        </Button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(pipelineStats).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm capitalize text-muted-foreground">{key}</p>
                  {key === 'interested' && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                </div>
                <p className="mt-2 text-3xl font-bold">{value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search investors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Stage
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Check Size
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Building2 className="h-4 w-4" />
              Industry
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Investor List */}
      <div className="space-y-4">
        {investors.map((investor, index) => (
          <motion.div
            key={investor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Investor Info */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                      <span className="text-lg font-bold text-primary">
                        {investor.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{investor.name}</h3>
                        <Badge variant="outline">{investor.type}</Badge>
                        {investor.status === 'interested' && (
                          <Badge className="bg-emerald-500/20 text-emerald-500">Interested</Badge>
                        )}
                        {investor.status === 'contacted' && (
                          <Badge variant="secondary" className="gap-1">
                            <Clock className="h-3 w-3" />
                            Contacted
                          </Badge>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {investor.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {investor.checkSize}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {investor.stage.map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                        ))}
                        {investor.industries.map((i) => (
                          <Badge key={i} variant="outline" className="text-xs">{i}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Match Score and Actions */}
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="relative inline-flex">
                        <svg className="h-16 w-16 -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-muted"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${investor.matchScore * 1.76} 176`}
                            className="text-primary"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                          {investor.matchScore}%
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">Match Score</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="gap-2">
                        <Send className="h-3 w-3" />
                        Reach Out
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Heart className="h-3 w-3" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Portfolio */}
                <div className="mt-4 border-t border-border/50 pt-4">
                  <p className="text-xs text-muted-foreground">Notable Portfolio</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {investor.portfolio.map((company) => (
                      <span key={company} className="text-sm font-medium">{company}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
