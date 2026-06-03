'use client'

import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Rocket, 
  MapPin, 
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Bookmark,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const startups = [
  {
    id: 1,
    name: 'TechFlow AI',
    tagline: 'AI-powered workflow automation',
    stage: 'Seed',
    industry: 'Enterprise SaaS',
    location: 'San Francisco, CA',
    raising: '$2M',
    mrr: '$55K',
    growth: '+31%',
    teamSize: 8,
    matchScore: 94,
    highlights: ['Ex-Stripe team', 'Growing 30% MoM', '50+ customers'],
    isSaved: true,
  },
  {
    id: 2,
    name: 'DataSync Pro',
    tagline: 'Real-time data synchronization platform',
    stage: 'Seed',
    industry: 'Developer Tools',
    location: 'Austin, TX',
    raising: '$1.5M',
    mrr: '$42K',
    growth: '+28%',
    teamSize: 6,
    matchScore: 89,
    highlights: ['YC W24', 'API-first approach', '200+ developers'],
    isSaved: false,
  },
  {
    id: 3,
    name: 'FinanceBot',
    tagline: 'AI financial advisor for SMBs',
    stage: 'Pre-seed',
    industry: 'Fintech',
    location: 'New York, NY',
    raising: '$750K',
    mrr: '$18K',
    growth: '+45%',
    teamSize: 4,
    matchScore: 86,
    highlights: ['Goldman alum founders', 'B2B focus', 'Strong retention'],
    isSaved: true,
  },
  {
    id: 4,
    name: 'CloudSecure',
    tagline: 'Zero-trust security for cloud infrastructure',
    stage: 'Series A',
    industry: 'Cybersecurity',
    location: 'Seattle, WA',
    raising: '$8M',
    mrr: '$120K',
    growth: '+22%',
    teamSize: 15,
    matchScore: 82,
    highlights: ['Enterprise customers', 'SOC2 certified', 'AWS partner'],
    isSaved: false,
  },
]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Discover Startups</h1>
          <p className="text-muted-foreground">AI-curated deal flow matching your investment thesis</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-primary to-accent">
          <Sparkles className="h-4 w-4" />
          Refresh Matches
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search startups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Stage
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Raising
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Rocket className="h-4 w-4" />
              Industry
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Startup Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {startups.map((startup, index) => (
          <motion.div
            key={startup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-emerald/20">
                      <Rocket className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{startup.name}</h3>
                        <Badge variant="outline">{startup.stage}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{startup.tagline}</p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {startup.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-2xl font-bold text-primary">{startup.matchScore}%</div>
                    <p className="text-xs text-muted-foreground">Match</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-4 gap-4 rounded-lg bg-muted/30 p-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold">{startup.raising}</p>
                    <p className="text-xs text-muted-foreground">Raising</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">{startup.mrr}</p>
                    <p className="text-xs text-muted-foreground">MRR</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-emerald-500">{startup.growth}</p>
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">{startup.teamSize}</p>
                    <p className="text-xs text-muted-foreground">Team</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {startup.highlights.map((highlight) => (
                    <Badge key={highlight} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                  <Badge>{startup.industry}</Badge>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={startup.isSaved ? 'default' : 'outline'} 
                      className="gap-2"
                    >
                      <Bookmark className={`h-4 w-4 ${startup.isSaved ? 'fill-current' : ''}`} />
                      {startup.isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Details
                    </Button>
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
