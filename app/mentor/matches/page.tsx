'use client'

import { motion } from 'framer-motion'
import { 
  Sparkles, 
  MessageSquare, 
  Calendar,
  Star,
  MapPin,
  Briefcase,
  Video,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const activeMatches = [
  {
    id: 1,
    founder: 'Sarah Chen',
    startup: 'TechFlow AI',
    stage: 'Seed',
    topic: 'Product Strategy',
    location: 'San Francisco, CA',
    matchScore: 94,
    sessions: 5,
    lastSession: '3 days ago',
    nextSession: 'Tomorrow, 2:00 PM',
    status: 'active',
  },
  {
    id: 2,
    founder: 'David Kim',
    startup: 'CloudSecure',
    stage: 'Series A',
    topic: 'Scaling',
    location: 'Seattle, WA',
    matchScore: 91,
    sessions: 8,
    lastSession: '1 week ago',
    nextSession: null,
    status: 'active',
  },
  {
    id: 3,
    founder: 'Emily Rodriguez',
    startup: 'DataSync Pro',
    stage: 'Pre-seed',
    topic: 'Fundraising',
    location: 'Austin, TX',
    matchScore: 88,
    sessions: 3,
    lastSession: '2 weeks ago',
    nextSession: 'Friday, 10:00 AM',
    status: 'active',
  },
  {
    id: 4,
    founder: 'Michael Brown',
    startup: 'FinanceBot',
    stage: 'Seed',
    topic: 'Go-to-Market',
    location: 'New York, NY',
    matchScore: 85,
    sessions: 12,
    lastSession: '1 month ago',
    nextSession: null,
    status: 'completed',
  },
]

const matchStats = [
  { label: 'Active Matches', value: 3 },
  { label: 'Completed', value: 8 },
  { label: 'Total Sessions', value: 28 },
  { label: 'Avg. Rating', value: '4.9' },
]

export default function MatchesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Matches</h1>
          <p className="text-muted-foreground">Founders you are currently mentoring</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-primary to-accent">
          <Sparkles className="h-4 w-4" />
          Find New Matches
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {matchStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Matches Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {activeMatches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Card className={`border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 ${
              match.status === 'completed' ? 'opacity-60' : ''
            }`}>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-emerald/20">
                      <span className="text-lg font-bold text-primary">
                        {match.founder.split(' ').map(w => w[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{match.founder}</h3>
                        <Badge variant={match.status === 'active' ? 'default' : 'secondary'}>
                          {match.status === 'active' ? 'Active' : 'Completed'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{match.startup}</p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {match.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{match.matchScore}%</div>
                    <p className="text-xs text-muted-foreground">Match</p>
                  </div>
                </div>

                {/* Topic */}
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="outline">{match.stage}</Badge>
                  <Badge>{match.topic}</Badge>
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-muted/30 p-3">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary" />
                    <span className="text-sm">{match.sessions} sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Last: {match.lastSession}</span>
                  </div>
                </div>

                {/* Next Session */}
                {match.nextSession && (
                  <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Next: {match.nextSession}</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Video className="h-3 w-3" />
                        Join
                      </Button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Button>
                  <Button size="sm" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
