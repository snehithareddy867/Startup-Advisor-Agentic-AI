'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Rocket,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const startups = [
  {
    id: '1',
    name: 'StudySync AI',
    founder: 'Alex Chen',
    industry: 'EdTech',
    stage: 'Seed',
    funding: '$2M',
    status: 'active',
    created: '2024-01-15',
    lastActivity: '2 hours ago',
    validationScore: 85,
  },
  {
    id: '2',
    name: 'GreenCommute',
    founder: 'Sarah Johnson',
    industry: 'CleanTech',
    stage: 'Pre-seed',
    funding: '$500K',
    status: 'active',
    created: '2024-02-20',
    lastActivity: '1 day ago',
    validationScore: 72,
  },
  {
    id: '3',
    name: 'HealthPulse',
    founder: 'Mike Rodriguez',
    industry: 'HealthTech',
    stage: 'MVP',
    funding: '$150K',
    status: 'pending',
    created: '2024-03-10',
    lastActivity: '3 days ago',
    validationScore: 68,
  },
  {
    id: '4',
    name: 'FinanceFlow',
    founder: 'Emily Davis',
    industry: 'FinTech',
    stage: 'Growth',
    funding: '$5M',
    status: 'active',
    created: '2023-11-05',
    lastActivity: '5 hours ago',
    validationScore: 92,
  },
  {
    id: '5',
    name: 'DataVault',
    founder: 'James Wilson',
    industry: 'Cybersecurity',
    stage: 'Seed',
    funding: '$1.5M',
    status: 'inactive',
    created: '2024-01-28',
    lastActivity: '2 weeks ago',
    validationScore: 55,
  },
]

const stats = [
  { label: 'Total Startups', value: '486', change: '+12', icon: Rocket, color: 'text-primary' },
  { label: 'Active This Month', value: '342', change: '+28', icon: TrendingUp, color: 'text-emerald-500' },
  { label: 'Pending Review', value: '45', change: '-5', icon: Clock, color: 'text-yellow-500' },
  { label: 'Total Funding', value: '$24.5M', change: '+$2.1M', icon: DollarSign, color: 'text-accent' },
]

export default function AdminStartupsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [stageFilter, setStageFilter] = useState('all')

  const filteredStartups = startups.filter((startup) => {
    const matchesSearch = startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.founder.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || startup.status === statusFilter
    const matchesStage = stageFilter === 'all' || startup.stage.toLowerCase() === stageFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesStage
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/20 text-emerald-500"><CheckCircle className="mr-1 h-3 w-3" />Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-500"><Clock className="mr-1 h-3 w-3" />Pending</Badge>
      case 'inactive':
        return <Badge className="bg-muted text-muted-foreground"><XCircle className="mr-1 h-3 w-3" />Inactive</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Startups Management</h1>
        <p className="text-muted-foreground">Manage and monitor all startups on the platform</p>
      </div>

      {/* Stats */}
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
                <div className="flex items-center justify-between">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-sm text-emerald-500">{stat.change}</span>
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

      {/* Filters */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search startups or founders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="mvp">MVP</SelectItem>
                <SelectItem value="pre-seed">Pre-seed</SelectItem>
                <SelectItem value="seed">Seed</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>All Startups</CardTitle>
          <CardDescription>{filteredStartups.length} startups found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Startup</TableHead>
                <TableHead>Founder</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Funding</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStartups.map((startup) => (
                <TableRow key={startup.id}>
                  <TableCell className="font-medium">{startup.name}</TableCell>
                  <TableCell>{startup.founder}</TableCell>
                  <TableCell><Badge variant="outline">{startup.industry}</Badge></TableCell>
                  <TableCell>{startup.stage}</TableCell>
                  <TableCell>{startup.funding}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-secondary">
                        <div 
                          className="h-full rounded-full bg-primary" 
                          style={{ width: `${startup.validationScore}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{startup.validationScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(startup.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
