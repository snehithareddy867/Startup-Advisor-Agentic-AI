'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Rocket,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const stats = [
  {
    label: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    label: 'Active Startups',
    value: '486',
    change: '+8.2%',
    trend: 'up',
    icon: Rocket,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Monthly Revenue',
    value: '$42,350',
    change: '+23.1%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    label: 'Conversion Rate',
    value: '4.2%',
    change: '-0.3%',
    trend: 'down',
    icon: TrendingUp,
    color: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
  },
]

const recentActivity = [
  { user: 'Sarah Chen', action: 'Created a new startup', time: '2 min ago', type: 'create' },
  { user: 'Mike Johnson', action: 'Upgraded to Pro plan', time: '15 min ago', type: 'upgrade' },
  { user: 'Emily Davis', action: 'Generated business plan', time: '32 min ago', type: 'generate' },
  { user: 'Alex Kim', action: 'Requested mentor match', time: '1 hour ago', type: 'request' },
  { user: 'Jordan Lee', action: 'Completed validation', time: '2 hours ago', type: 'complete' },
]

const pendingActions = [
  { title: 'Review startup applications', count: 12, priority: 'high' },
  { title: 'Approve mentor profiles', count: 5, priority: 'medium' },
  { title: 'Process refund requests', count: 3, priority: 'high' },
  { title: 'Update system notifications', count: 1, priority: 'low' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform activity and metrics</p>
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-semibold">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-chart-4" />
              Pending Actions
            </CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${
                      action.priority === 'high' ? 'bg-destructive' : 
                      action.priority === 'medium' ? 'bg-chart-4' : 'bg-muted-foreground'
                    }`} />
                    <span className="text-sm font-medium">{action.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{action.count}</Badge>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
