'use client'

import { motion } from 'framer-motion'
import {
  Brain,
  LineChart,
  FileText,
  DollarSign,
  Handshake,
  GraduationCap,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts'
import { startupGrowth, fundingProgress, revenueForecast, agents } from '@/lib/data'

const stats = [
  {
    label: 'Startup Health Score',
    value: 82,
    suffix: '/100',
    change: '+5',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'emerald',
  },
  {
    label: 'Total Users',
    value: '3,200',
    change: '+12%',
    trend: 'up' as const,
    icon: Users,
    color: 'accent',
  },
  {
    label: 'MRR',
    value: '$92K',
    change: '+18%',
    trend: 'up' as const,
    icon: DollarSign,
    color: 'primary',
  },
  {
    label: 'Runway',
    value: '14 mo',
    change: '-2 mo',
    trend: 'down' as const,
    icon: Clock,
    color: 'chart-4',
  },
]

const agentStatuses = [
  { id: 'founder', status: 'active' as const, lastRun: '2 min ago' },
  { id: 'market', status: 'completed' as const, lastRun: '1 hour ago' },
  { id: 'plan', status: 'completed' as const, lastRun: '3 hours ago' },
  { id: 'financial', status: 'pending' as const, lastRun: 'Scheduled' },
  { id: 'investor', status: 'completed' as const, lastRun: '1 day ago' },
  { id: 'mentor', status: 'completed' as const, lastRun: '2 days ago' },
]

const statusConfig = {
  active: { icon: Play, color: 'text-emerald', bg: 'bg-emerald/10', label: 'Running' },
  completed: { icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10', label: 'Completed' },
  pending: { icon: Clock, color: 'text-chart-4', bg: 'bg-chart-4/10', label: 'Pending' },
  error: { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Error' },
}

export function FounderDashboard() {
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
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${stat.color}/10`}>
                    <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-emerald' : 'text-destructive'}`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
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

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Growth Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Growth Metrics</CardTitle>
                <CardDescription>Users and MRR over time</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                View Details
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={startupGrowth}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(17,26,46,0.9)',
                        border: '1px solid rgba(148,163,184,0.2)',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                      }}
                    />
                    <Area type="monotone" dataKey="users" stroke="#7c3aed" fill="url(#colorUsers)" strokeWidth={2} />
                    <Area type="monotone" dataKey="mrr" stroke="#10b981" fill="url(#colorMrr)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald" />
                  <span className="text-xs text-muted-foreground">MRR ($K)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Funding Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle className="text-base">Funding Progress</CardTitle>
              <CardDescription>Track your fundraising milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {fundingProgress.map((round) => {
                const progress = (round.raised / round.target) * 100
                const isComplete = progress >= 100
                return (
                  <div key={round.stage}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{round.stage}</span>
                      <span className="text-xs text-muted-foreground">
                        ${round.raised}K / ${round.target}K
                      </span>
                    </div>
                    <Progress
                      value={progress}
                      className="h-2"
                    />
                    {isComplete && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-emerald">
                        <CheckCircle className="h-3 w-3" />
                        Completed
                      </p>
                    )}
                  </div>
                )
              })}
              <Button className="mt-4 w-full bg-gradient-to-r from-primary to-accent">
                <Sparkles className="mr-2 h-4 w-4" />
                Find Investors
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Agents Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">AI Agent Pipeline</CardTitle>
              <CardDescription>Your intelligent startup co-pilots</CardDescription>
            </div>
            <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
              <Play className="mr-2 h-4 w-4" />
              Run All Agents
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent) => {
                const statusData = agentStatuses.find(s => s.id === agent.id)
                const status = statusData?.status || 'pending'
                const statusCfg = statusConfig[status]
                const StatusIcon = statusCfg.icon

                return (
                  <div
                    key={agent.id}
                    className="group relative flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/30 hover:bg-card"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
                    >
                      <agent.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-foreground truncate">{agent.name}</h4>
                        <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusCfg.bg} ${statusCfg.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusCfg.label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{agent.desc}</p>
                      <p className="mt-2 text-[10px] text-muted-foreground">{statusData?.lastRun}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Revenue Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Revenue Forecast</CardTitle>
            <CardDescription>AI-generated projections for next 4 quarters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="quarter" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(17,26,46,0.9)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '8px',
                      color: '#f1f5f9',
                    }}
                  />
                  <Bar dataKey="conservative" fill="#64748b" radius={[4, 4, 0, 0]} name="Conservative" />
                  <Bar dataKey="expected" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Expected" />
                  <Bar dataKey="optimistic" fill="#10b981" radius={[4, 4, 0, 0]} name="Optimistic" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                <span className="text-xs text-muted-foreground">Conservative</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Expected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald" />
                <span className="text-xs text-muted-foreground">Optimistic</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
