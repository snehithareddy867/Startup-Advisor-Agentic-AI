'use client'

import { motion } from 'framer-motion'
import { 
  Briefcase, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ExternalLink,
  MoreHorizontal,
  Calendar,
  ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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
} from 'recharts'

const portfolioCompanies = [
  {
    id: 1,
    name: 'MLOps.io',
    stage: 'Seed',
    invested: '$500K',
    currentValue: '$1.2M',
    ownership: '8%',
    returnMultiple: '2.4x',
    status: 'Growing',
    lastUpdate: '2 days ago',
    metrics: { mrr: '$85K', growth: '+28%', runway: '18mo' },
  },
  {
    id: 2,
    name: 'DataVault',
    stage: 'Series A',
    invested: '$2M',
    currentValue: '$3.8M',
    ownership: '12%',
    returnMultiple: '1.9x',
    status: 'Growing',
    lastUpdate: '1 week ago',
    metrics: { mrr: '$220K', growth: '+15%', runway: '24mo' },
  },
  {
    id: 3,
    name: 'CloudNative',
    stage: 'Seed',
    invested: '$750K',
    currentValue: '$600K',
    ownership: '10%',
    returnMultiple: '0.8x',
    status: 'At Risk',
    lastUpdate: '3 days ago',
    metrics: { mrr: '$25K', growth: '-5%', runway: '6mo' },
  },
  {
    id: 4,
    name: 'SecureID',
    stage: 'Series B',
    invested: '$5M',
    currentValue: '$12M',
    ownership: '6%',
    returnMultiple: '2.4x',
    status: 'Exit Ready',
    lastUpdate: '1 day ago',
    metrics: { mrr: '$450K', growth: '+12%', runway: '30mo+' },
  },
]

const portfolioValueData = [
  { month: 'Jan', value: 8.2 },
  { month: 'Feb', value: 8.8 },
  { month: 'Mar', value: 9.5 },
  { month: 'Apr', value: 10.2 },
  { month: 'May', value: 11.8 },
  { month: 'Jun', value: 12.5 },
  { month: 'Jul', value: 14.2 },
  { month: 'Aug', value: 15.8 },
  { month: 'Sep', value: 17.6 },
]

const portfolioMetrics = [
  { label: 'Total Invested', value: '$8.25M' },
  { label: 'Current Value', value: '$17.6M' },
  { label: 'Total Return', value: '2.13x', isPositive: true },
  { label: 'IRR', value: '42%', isPositive: true },
]

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and portfolio performance</p>
        </div>
        <Button className="gap-2">
          <DollarSign className="h-4 w-4" />
          Record Investment
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {portfolioMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className={`mt-2 text-3xl font-bold ${metric.isPositive ? 'text-emerald-500' : ''}`}>
                  {metric.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Portfolio Value Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Portfolio Value Over Time
            </CardTitle>
            <CardDescription>Total portfolio value in millions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioValueData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v}M`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`$${value}M`, 'Value']}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Portfolio Companies */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Portfolio Companies</h2>
        {portfolioCompanies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Company Info */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{company.name}</h3>
                        <Badge variant="outline">{company.stage}</Badge>
                        <Badge 
                          variant={
                            company.status === 'Growing' ? 'default' : 
                            company.status === 'At Risk' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {company.status}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Invested: {company.invested}</span>
                        <span>Ownership: {company.ownership}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {company.lastUpdate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Current Value</p>
                      <p className="text-xl font-bold">{company.currentValue}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Return</p>
                      <p className={`text-xl font-bold ${
                        parseFloat(company.returnMultiple) >= 1 ? 'text-emerald-500' : 'text-destructive'
                      }`}>
                        {company.returnMultiple}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Details
                      </Button>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Company Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg bg-muted/30 p-3">
                  <div className="text-center">
                    <p className="text-sm font-medium">{company.metrics.mrr}</p>
                    <p className="text-xs text-muted-foreground">MRR</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${
                      company.metrics.growth.startsWith('+') ? 'text-emerald-500' : 'text-destructive'
                    }`}>
                      {company.metrics.growth}
                    </p>
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{company.metrics.runway}</p>
                    <p className="text-xs text-muted-foreground">Runway</p>
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
