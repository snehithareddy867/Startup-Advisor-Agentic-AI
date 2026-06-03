'use client'

import { motion } from 'framer-motion'
import { 
  LineChart as LineChartIcon, 
  BarChart3, 
  PieChart,
  TrendingUp,
  Target,
  Clock,
  DollarSign
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts'

const dealFlowData = [
  { month: 'Jan', reviewed: 45, passed: 38, invested: 2 },
  { month: 'Feb', reviewed: 52, passed: 44, invested: 1 },
  { month: 'Mar', reviewed: 48, passed: 41, invested: 3 },
  { month: 'Apr', reviewed: 61, passed: 52, invested: 2 },
  { month: 'May', reviewed: 55, passed: 48, invested: 1 },
  { month: 'Jun', reviewed: 58, passed: 50, invested: 2 },
]

const industryData = [
  { name: 'SaaS', value: 45, color: 'hsl(var(--primary))' },
  { name: 'Fintech', value: 25, color: 'hsl(var(--accent))' },
  { name: 'AI/ML', value: 20, color: 'hsl(142 76% 36%)' },
  { name: 'Other', value: 10, color: 'hsl(var(--muted-foreground))' },
]

const stageData = [
  { stage: 'Pre-seed', count: 8, value: 1.2 },
  { stage: 'Seed', count: 12, value: 4.5 },
  { stage: 'Series A', count: 5, value: 8.2 },
  { stage: 'Series B', count: 2, value: 3.7 },
]

const performanceMetrics = [
  { label: 'Deal Flow Rate', value: '58/mo', change: '+12%', isPositive: true },
  { label: 'Conversion Rate', value: '3.4%', change: '+0.8%', isPositive: true },
  { label: 'Avg Deal Size', value: '$1.2M', change: '-5%', isPositive: false },
  { label: 'Time to Close', value: '42 days', change: '-8 days', isPositive: true },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Investment performance and deal flow analytics</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <Badge variant={metric.isPositive ? 'default' : 'destructive'}>
                    {metric.change}
                  </Badge>
                </div>
                <p className="mt-2 text-3xl font-bold">{metric.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Deal Flow Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-primary" />
                Deal Flow Over Time
              </CardTitle>
              <CardDescription>Deals reviewed, passed, and invested</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dealFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="reviewed"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Reviewed"
                    />
                    <Line
                      type="monotone"
                      dataKey="passed"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      name="Passed"
                    />
                    <Line
                      type="monotone"
                      dataKey="invested"
                      stroke="hsl(142 76% 36%)"
                      strokeWidth={2}
                      name="Invested"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Industry Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-accent" />
                Portfolio by Industry
              </CardTitle>
              <CardDescription>Investment allocation breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {industryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, '']}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {industryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: item.color }} 
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Investment by Stage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-500" />
              Investments by Stage
            </CardTitle>
            <CardDescription>Number of investments and total value by funding stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stageData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="stage" stroke="hsl(var(--muted-foreground))" width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="# Investments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
