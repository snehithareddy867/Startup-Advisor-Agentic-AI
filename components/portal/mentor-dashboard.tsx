'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Calendar,
  Clock,
  Star,
  MessageSquare,
  Video,
  ArrowUpRight,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Award,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { mentorRequests, mentorMatches, mentorSessions } from '@/lib/data'

const stats = [
  {
    label: 'Active Mentees',
    value: '8',
    change: '+2',
    trend: 'up' as const,
    icon: Users,
  },
  {
    label: 'Sessions This Month',
    value: '12',
    change: '+4',
    trend: 'up' as const,
    icon: Calendar,
  },
  {
    label: 'Hours Mentored',
    value: '24h',
    change: '+6h',
    trend: 'up' as const,
    icon: Clock,
  },
  {
    label: 'Avg Rating',
    value: '4.9',
    suffix: '/5',
    change: '+0.2',
    trend: 'up' as const,
    icon: Star,
  },
]

const expertise = [
  { name: 'Go-to-Market', level: 95 },
  { name: 'Fundraising', level: 88 },
  { name: 'Product Strategy', level: 82 },
  { name: 'Team Building', level: 75 },
]

const sessionStatusConfig = {
  Confirmed: { color: 'bg-emerald/10 text-emerald border-emerald/20', icon: CheckCircle },
  Pending: { color: 'bg-chart-4/10 text-chart-4 border-chart-4/20', icon: AlertCircle },
  Cancelled: { color: 'bg-destructive/10 text-destructive border-destructive/20', icon: AlertCircle },
}

export function MentorDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald">
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-semibold text-foreground">
                    {stat.value}{stat.suffix}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mentorship Requests */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Mentorship Requests</CardTitle>
                <CardDescription>Founders seeking your guidance</CardDescription>
              </div>
              <Badge variant="secondary">{mentorRequests.length} new</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {mentorRequests.map((request, i) => (
                <motion.div
                  key={request.founder}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/30 hover:bg-card"
                >
                  <Avatar className="h-11 w-11">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-sm">
                      {request.founder.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-foreground">{request.founder}</h4>
                      <Badge variant="outline" className="text-[10px]">{request.stage}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{request.startup}</p>
                    <p className="mt-1 text-xs text-accent">{request.topic}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      Decline
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-accent text-xs">
                      Accept
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Expertise Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle className="text-base">Your Expertise</CardTitle>
              <CardDescription>Areas founders seek you for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {expertise.map((area) => (
                <div key={area.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{area.name}</span>
                    <span className="text-xs text-muted-foreground">{area.level}%</span>
                  </div>
                  <Progress value={area.level} className="h-2" />
                </div>
              ))}
              <Button variant="outline" className="mt-4 w-full">
                <Award className="mr-2 h-4 w-4" />
                Update Skills
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Matches & Upcoming Sessions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Suggested Matches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">AI Suggested Matches</CardTitle>
                <CardDescription>Founders aligned with your expertise</CardDescription>
              </div>
              <Sparkles className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="space-y-3">
              {mentorMatches.map((match, i) => (
                <motion.div
                  key={match.founder}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/30 hover:bg-card"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-accent/20 to-emerald/20 text-sm">
                      {match.founder.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground">{match.founder}</h4>
                    <p className="text-xs text-muted-foreground">{match.startup}</p>
                    <p className="mt-1 text-xs text-accent">{match.focus}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-semibold text-emerald">
                      <TrendingUp className="h-3 w-3" />
                      {match.fit}%
                    </div>
                    <p className="text-[10px] text-muted-foreground">Match fit</p>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled mentorship calls</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {mentorSessions.map((session, i) => {
                const statusCfg = sessionStatusConfig[session.status as keyof typeof sessionStatusConfig]
                const StatusIcon = statusCfg.icon
                return (
                  <motion.div
                    key={session.founder}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                    className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4"
                  >
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-primary/10">
                      <span className="text-xs font-semibold text-primary">{session.date.split(',')[0]}</span>
                      <span className="text-[10px] text-muted-foreground">{session.date.split(',')[1]?.trim()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground">{session.founder}</h4>
                      <p className="text-xs text-muted-foreground">{session.topic}</p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${statusCfg.color}`}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {session.status}
                    </Badge>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                      <Video className="mr-1 h-3 w-3" />
                      Join
                    </Button>
                  </motion.div>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        <Card className="glass group cursor-pointer transition-all hover:border-primary/30">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Message Founders</h4>
              <p className="text-xs text-muted-foreground">Chat with your mentees</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass group cursor-pointer transition-all hover:border-primary/30">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Set Availability</h4>
              <p className="text-xs text-muted-foreground">Manage your schedule</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass group cursor-pointer transition-all hover:border-primary/30">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 group-hover:bg-emerald/20 transition-colors">
              <Award className="h-6 w-6 text-emerald" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">View Impact</h4>
              <p className="text-xs text-muted-foreground">Your mentee success stories</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
