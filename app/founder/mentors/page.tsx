'use client'

import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock,
  Calendar,
  MessageSquare,
  Sparkles,
  Briefcase,
  Award,
  Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

const mentors = [
  {
    id: 1,
    name: 'Dr. Emily Zhang',
    title: 'Former VP of Product at Stripe',
    location: 'San Francisco, CA',
    expertise: ['Product Strategy', 'B2B SaaS', 'Scaling'],
    experience: '15+ years',
    matchScore: 96,
    rating: 4.9,
    sessions: 128,
    availability: 'Available this week',
    bio: 'Led product teams at Stripe and Square. Helped 20+ startups reach product-market fit.',
    hourlyRate: 250,
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'Serial Entrepreneur, 3x Exit',
    location: 'New York, NY',
    expertise: ['Fundraising', 'Go-to-Market', 'Team Building'],
    experience: '20+ years',
    matchScore: 91,
    rating: 4.8,
    sessions: 95,
    availability: 'Next available: Tomorrow',
    bio: 'Founded and sold 3 companies. Angel investor in 40+ startups. YC mentor.',
    hourlyRate: 300,
  },
  {
    id: 3,
    name: 'Sarah Chen',
    title: 'Partner at Sequoia Capital',
    location: 'Menlo Park, CA',
    expertise: ['VC Strategy', 'Pitch Deck', 'Series A'],
    experience: '12+ years',
    matchScore: 88,
    rating: 4.9,
    sessions: 67,
    availability: 'Available next week',
    bio: 'Led investments in 15+ unicorns. Former founder with successful exit.',
    hourlyRate: 400,
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'CTO at Datadog',
    location: 'Remote',
    expertise: ['Technical Architecture', 'AI/ML', 'Engineering Leadership'],
    experience: '18+ years',
    matchScore: 85,
    rating: 4.7,
    sessions: 82,
    availability: 'Limited availability',
    bio: 'Built and scaled engineering teams from 5 to 500. Expert in cloud infrastructure.',
    hourlyRate: 275,
  },
]

const sessionStats = {
  totalSessions: 12,
  upcomingSessions: 2,
  totalHours: 18,
  savedMentors: 8,
}

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mentor Match</h1>
          <p className="text-muted-foreground">Connect with experienced mentors in your industry</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-primary to-accent">
          <Sparkles className="h-4 w-4" />
          Find Mentors
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(sessionStats).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
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
              placeholder="Search mentors by name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Expertise
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Clock className="h-4 w-4" />
              Availability
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Star className="h-4 w-4" />
              Rating
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mentor List */}
      <div className="grid gap-6 lg:grid-cols-2">
        {mentors.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-emerald/20">
                      <span className="text-xl font-bold text-primary">
                        {mentor.name.split(' ').map(w => w[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{mentor.location}</span>
                        <span className="text-muted-foreground">•</span>
                        <Briefcase className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{mentor.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{mentor.matchScore}%</div>
                    <p className="text-xs text-muted-foreground">Match</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="mt-4 text-sm text-muted-foreground">{mentor.bio}</p>

                {/* Expertise */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{mentor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Video className="h-4 w-4" />
                    <span>{mentor.sessions} sessions</span>
                  </div>
                  <Badge 
                    variant={mentor.availability.includes('this week') ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {mentor.availability}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="text-lg font-semibold">${mentor.hourlyRate}/hr</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Button>
                    <Button size="sm" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      Book Session
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
