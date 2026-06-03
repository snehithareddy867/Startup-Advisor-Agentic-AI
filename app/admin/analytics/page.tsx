'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  Rocket,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  LineChart,
  BarChart3,
  PieChart,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  LineChart as RechartsLineChart,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts'

const userGrowthData = [
  { month: 'Jan', users: 1200, startups: 150, investors: 45 },
  { month: 'Feb', users: 1450, startups: 185, investors: 52 },
  { month: 'Mar', users: 1680, startups: 210, investors: 58 },
  { month: 'Apr', users: 1920, startups: 265, investors: 67 },
  { month: 'May', users: 2340, startups: 340, investors: 78 },
  { month: 'Jun', users: 2847, startups: 486, investors: 95 },
]

const revenueData = [
  { month: 'Jan', revenue: 12500, mrr: 8500 },
  { month: 'Feb', revenue: 18200, mrr: 12200 },
  { month: 'Mar', revenue: 24800, mrr: 16800 },
  { month: 'Apr', revenue: 31500, mrr: 22500 },
  { month: 'May', revenue: 38200, mrr: 28200 },
  { month: 'Jun', revenue: 42350, mrr: 32350 },
]

const industryDistribution = [
  { name: 'EdTech', value: 32, color: '#7c3aed' },
  { name: 'FinTech', value: 24, color: '#2563eb' },
  { name: 'HealthTech', value: 18, color: '#10b981' },
  { name: 'CleanTech', value: 14, color: '#f59e0b' },
  { name: 'AI/ML', value: 12, color: '#ec4899' },
]

const agentUsageData = [
  { name: 'Founder Agent', count: 1245 },
  { name: 'Market Research', count: 1180 },
  { name: 'Business Plan', count: 1056 },
  { name: 'Financial Agent', count: 892 },
  { name: 'Investor Match', count: 756 },
  { name: 'Mentor Match', count: 634 },
]

const stats = [
  {
    label: 'Total Revenue',
    value: '$42,350',
    change: '+23.1%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Active Users',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    label: 'Startups Created',
    value: '486',
    change: '+8.2%',
    trend: 'up',
    icon: Rocket,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    label: 'Agent Requests',
    value: '5,763',
    change: '+45.8%',
    trend: 'up',
    icon: Activity,
    color: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
  },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Platform performance and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-emerald-500' : 'text-destructive'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="growth" className="space-y-6">
        <TabsList>
          <TabsTrigger value="growth" className="gap-2">
            <LineChart className="h-4 w-4" />
            User Growth
          </TabsTrigger>
          <TabsTrigger value="revenue" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="distribution" className="gap-2">
            <PieChart className="h-4 w-4" />
            Distribution
          </TabsTrigger>
          <TabsTrigger value="agents" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Agent Usage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="growth">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly growth of users, startups, and investors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorStartups" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorInvestors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#111a2e', 
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="users" stroke="#7c3aed" fillOpacity={1} fill="url(#colorUsers)" />
                    <Area type="monotone" dataKey="startups" stroke="#2563eb" fillOpacity={1} fill="url(#colorStartups)" />
                    <Area type="monotone" dataKey="investors" stroke="#10b981" fillOpacity={1} fill="url(#colorInvestors)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue and MRR growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#111a2e', 
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                    <Line type="monotone" dataKey="mrr" stroke="#7c3aed" strokeWidth={2} dot={{ fill: '#7c3aed' }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Industry Distribution</CardTitle>
              <CardDescription>Startups by industry category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={industryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {industryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#111a2e', 
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Agent Usage</CardTitle>
              <CardDescription>Number of requests per agent type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={agentUsageData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" width={120} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#111a2e', 
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
