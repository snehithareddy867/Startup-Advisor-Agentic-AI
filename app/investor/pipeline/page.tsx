'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Filter, 
  MoreHorizontal,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Calendar,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const pipelineStages = [
  {
    id: 'screening',
    title: 'Screening',
    count: 12,
    deals: [
      { name: 'CloudSync', stage: 'Seed', raising: '$1.5M', daysInStage: 3 },
      { name: 'AIWriter', stage: 'Pre-seed', raising: '$500K', daysInStage: 5 },
      { name: 'DevTools Pro', stage: 'Seed', raising: '$2M', daysInStage: 1 },
    ],
  },
  {
    id: 'first-call',
    title: 'First Call',
    count: 5,
    deals: [
      { name: 'TechFlow AI', stage: 'Seed', raising: '$2M', daysInStage: 7 },
      { name: 'DataSync Pro', stage: 'Seed', raising: '$1.5M', daysInStage: 4 },
    ],
  },
  {
    id: 'due-diligence',
    title: 'Due Diligence',
    count: 3,
    deals: [
      { name: 'FinanceBot', stage: 'Seed', raising: '$1.8M', daysInStage: 14 },
      { name: 'SecureCloud', stage: 'Series A', raising: '$5M', daysInStage: 21 },
    ],
  },
  {
    id: 'term-sheet',
    title: 'Term Sheet',
    count: 1,
    deals: [
      { name: 'CloudSecure', stage: 'Series A', raising: '$8M', daysInStage: 10 },
    ],
  },
  {
    id: 'closed',
    title: 'Closed',
    count: 2,
    deals: [
      { name: 'MLOps.io', stage: 'Seed', raising: '$2M', daysInStage: 0 },
    ],
  },
]

const pipelineMetrics = [
  { label: 'Total Active Deals', value: '23' },
  { label: 'Avg. Time to Close', value: '45 days' },
  { label: 'Win Rate', value: '18%' },
  { label: 'Deals This Quarter', value: '8' },
]

export default function PipelinePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Deal Pipeline</h1>
          <p className="text-muted-foreground">Track and manage your investment opportunities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2">
            Add Deal
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pipelineMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-2 text-3xl font-bold">{metric.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
          {pipelineStages.map((stage, stageIndex) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: stageIndex * 0.1 }}
              className="w-72 shrink-0"
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{stage.title}</CardTitle>
                    <Badge variant="secondary">{stage.count}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stage.deals.map((deal, dealIndex) => (
                    <motion.div
                      key={deal.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: stageIndex * 0.1 + dealIndex * 0.05 }}
                      className="group cursor-pointer rounded-lg border border-border/50 bg-muted/30 p-3 transition-all hover:border-primary/50 hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{deal.name}</h4>
                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{deal.stage}</Badge>
                        <span className="text-xs text-muted-foreground">{deal.raising}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {deal.daysInStage}d in stage
                        </span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <Calendar className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {stage.id !== 'closed' && (
                    <div className="flex items-center justify-center gap-1 pt-2 text-xs text-muted-foreground">
                      <ArrowRight className="h-3 w-3" />
                      <span>Drag to move</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
