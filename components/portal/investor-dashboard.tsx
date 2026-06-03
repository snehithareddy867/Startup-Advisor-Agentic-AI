'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  ChevronRight,
  Filter,
  Search,
  PieChart,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { discoverStartups, investorInterest, fundingPipeline } from '@/lib/data'

const stats = [
  {
    label: 'Total Deployed',
    value: '$4.2M',
    change: '+$800K',
    trend: 'up' as const,
    icon: DollarSign,
  },
  {
    label: 'Active Deals',
    value: '12',
    change: '+3',
    trend: 'up' as const,
    icon: Briefcase,
  },
  {
    label: 'Avg ROI',
    value: '3.4x',
    change: '+0.6x',
    trend: 'up' as const,
    icon: TrendingUp,
  },
  {
    label: 'Watching',
    value: '28',
    change: '-4',
    trend: 'down' as const,
    icon: Eye,
  },
]

const COLORS = ['#7c3aed', '#2563eb', '#10b981', '#f59e0b']

const riskColors = {
  Low: 'bg-emerald/10 text-emerald border-emerald/20',
  Medium: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
  High: 'bg-destructive/10 text-destructive border-destructive/20',
}

const pipelineStages = ['Sourced', 'Screening', 'Due Diligence', 'Committed']

export function InvestorDashboard() {
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
                  <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-emerald' : 'text-destructive'}`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Discover Startups */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Discover Startups</CardTitle>
                <CardDescription>AI-curated deal flow based on your thesis</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search..." className="w-48 bg-muted/50 pl-9 text-sm" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {discoverStartups.map((startup, i) => (
                  <motion.div
                    key={startup.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-all hover:border-primary/30 hover:bg-card"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                      <span className="text-sm font-semibold text-foreground">{startup.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-foreground">{startup.name}</h4>
                        <Badge variant="outline" className="text-[10px]">{startup.stage}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{startup.industry}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-6 text-xs">
                      <div className="text-center">
                        <p className="font-medium text-foreground">{startup.health}</p>
                        <p className="text-muted-foreground">Health</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">${startup.need}M</p>
                        <p className="text-muted-foreground">Raising</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">{startup.roi}x</p>
                        <p className="text-muted-foreground">Est. ROI</p>
                      </div>
                      <Badge variant="outline" className={`text-[10px] ${riskColors[startup.risk]}`}>
                        {startup.risk} Risk
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interest by Sector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle className="text-base">Interest by Sector</CardTitle>
              <CardDescription>Your investment focus areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={investorInterest}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {investorInterest.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(17,26,46,0.9)',
                        border: '1px solid rgba(148,163,184,0.2)',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                      }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {investorInterest.map((sector, i) => (
                  <div key={sector.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-xs text-muted-foreground">{sector.name}</span>
                    </div>
                    <span className="text-xs font-medium text-foreground">{sector.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Deal Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base">Deal Pipeline</CardTitle>
            <CardDescription>Track your investment opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pipelineStages.map((stage, i) => {
                const deals = fundingPipeline[stage] || []
                return (
                  <div
                    key={stage}
                    className="rounded-xl border border-border/50 bg-card/30 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">{stage}</h4>
                      <Badge variant="secondary" className="text-xs">{deals.length}</Badge>
                    </div>
                    <div className="space-y-2">
                      {deals.map((deal) => {
                        const startup = discoverStartups.find(s => s.name === deal)
                        return (
                          <div
                            key={deal}
                            className="rounded-lg border border-border/30 bg-card/50 p-3 transition-colors hover:border-primary/30"
                          >
                            <p className="text-sm font-medium text-foreground">{deal}</p>
                            {startup && (
                              <p className="mt-1 text-xs text-muted-foreground">{startup.industry}</p>
                            )}
                          </div>
                        )
                      })}
                      {deals.length === 0 && (
                        <p className="text-center text-xs text-muted-foreground py-4">No deals</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        <Card className="glass group cursor-pointer transition-all hover:border-primary/30">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">AI Scout</h4>
              <p className="text-xs text-muted-foreground">Find thesis-matched startups</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass group cursor-pointer transition-all hover:border-primary/30">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
              <PieChart className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Portfolio Analysis</h4>
              <p className="text-xs text-muted-foreground">View performance metrics</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass group cursor-pointer transition-all hover:border-primary/30">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 group-hover:bg-emerald/20 transition-colors">
              <Star className="h-6 w-6 text-emerald" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Top Picks</h4>
              <p className="text-xs text-muted-foreground">AI recommended this week</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
