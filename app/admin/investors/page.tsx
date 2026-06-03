'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  TrendingUp,
  Target,
  Building2,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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

const investors = [
  {
    id: '1',
    name: 'Sarah Chen',
    firm: 'Reach Capital',
    email: 'sarah@reachcapital.com',
    focus: ['EdTech', 'AI', 'Consumer'],
    checkSize: '$500K - $4M',
    portfolioCount: 32,
    activeDeals: 5,
    status: 'verified',
    joined: '2023-06-15',
  },
  {
    id: '2',
    name: 'James Martinez',
    firm: 'Owl Ventures',
    email: 'james@owlventures.com',
    focus: ['Education', 'Workforce', 'AI'],
    checkSize: '$1M - $10M',
    portfolioCount: 48,
    activeDeals: 8,
    status: 'verified',
    joined: '2023-04-20',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    firm: 'GSV Ventures',
    email: 'emily@gsv.com',
    focus: ['EdTech', 'Skills Training'],
    checkSize: '$250K - $5M',
    portfolioCount: 25,
    activeDeals: 3,
    status: 'pending',
    joined: '2024-01-10',
  },
  {
    id: '4',
    name: 'Michael Park',
    firm: 'NewSchools Fund',
    email: 'michael@newschools.org',
    focus: ['K-12', 'Learning Tools'],
    checkSize: '$500K - $3M',
    portfolioCount: 19,
    activeDeals: 2,
    status: 'verified',
    joined: '2023-08-05',
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    firm: 'Andreessen Horowitz',
    email: 'lisa@a16z.com',
    focus: ['AI/ML', 'Consumer', 'Enterprise'],
    checkSize: '$2M - $25M',
    portfolioCount: 156,
    activeDeals: 12,
    status: 'verified',
    joined: '2023-03-01',
  },
]

const stats = [
  { label: 'Total Investors', value: '234', change: '+18', icon: Users, color: 'text-primary' },
  { label: 'Total AUM', value: '$2.4B', change: '+$180M', icon: DollarSign, color: 'text-emerald-500' },
  { label: 'Active Deals', value: '67', change: '+12', icon: TrendingUp, color: 'text-accent' },
  { label: 'Avg Check Size', value: '$2.5M', change: '+$300K', icon: Target, color: 'text-chart-4' },
]

export default function AdminInvestorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredInvestors = investors.filter((investor) => {
    const matchesSearch = investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.firm.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || investor.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-emerald-500/20 text-emerald-500"><CheckCircle className="mr-1 h-3 w-3" />Verified</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-500"><Clock className="mr-1 h-3 w-3" />Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Investors Management</h1>
        <p className="text-muted-foreground">Manage investor profiles and activity</p>
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
                placeholder="Search investors or firms..."
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
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>All Investors</CardTitle>
          <CardDescription>{filteredInvestors.length} investors found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor</TableHead>
                <TableHead>Firm</TableHead>
                <TableHead>Focus Areas</TableHead>
                <TableHead>Check Size</TableHead>
                <TableHead>Portfolio</TableHead>
                <TableHead>Active Deals</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestors.map((investor) => (
                <TableRow key={investor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {investor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{investor.name}</p>
                        <p className="text-xs text-muted-foreground">{investor.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {investor.firm}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {investor.focus.slice(0, 2).map((f) => (
                        <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                      ))}
                      {investor.focus.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{investor.focus.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{investor.checkSize}</TableCell>
                  <TableCell>{investor.portfolioCount}</TableCell>
                  <TableCell>
                    <Badge className="bg-accent/20 text-accent">{investor.activeDeals} active</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(investor.status)}</TableCell>
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
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
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
