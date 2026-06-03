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
  GraduationCap,
  Star,
  Calendar,
  CheckCircle,
  Clock,
  Briefcase,
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

const mentors = [
  {
    id: '1',
    name: 'Dr. Angela Williams',
    title: 'Former CLO at Coursera',
    email: 'angela@example.com',
    expertise: ['Learning Science', 'Product Development', 'Content Strategy'],
    industries: ['EdTech', 'Online Learning'],
    yearsExperience: 20,
    sessionsCompleted: 156,
    rating: 4.9,
    availability: 'high',
    status: 'active',
  },
  {
    id: '2',
    name: 'David Kim',
    title: 'Founder & CEO of StudyBlue',
    email: 'david@example.com',
    expertise: ['Startup Growth', 'Fundraising', 'EdTech Strategy'],
    industries: ['EdTech', 'Consumer Tech'],
    yearsExperience: 15,
    sessionsCompleted: 89,
    rating: 4.8,
    availability: 'medium',
    status: 'active',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    title: 'VP of AI at Duolingo',
    email: 'sarah.j@example.com',
    expertise: ['AI/ML', 'Personalization', 'Mobile Learning'],
    industries: ['EdTech', 'AI', 'Consumer'],
    yearsExperience: 12,
    sessionsCompleted: 45,
    rating: 4.7,
    availability: 'low',
    status: 'active',
  },
  {
    id: '4',
    name: 'Robert Chen',
    title: 'Partner at GSV Ventures',
    email: 'robert@gsv.com',
    expertise: ['EdTech Investing', 'Market Strategy', 'Board Governance'],
    industries: ['EdTech', 'Venture Capital'],
    yearsExperience: 18,
    sessionsCompleted: 78,
    rating: 4.9,
    availability: 'medium',
    status: 'active',
  },
  {
    id: '5',
    name: 'Maria Garcia',
    title: 'Superintendent, Austin ISD',
    email: 'maria@aisd.edu',
    expertise: ['K-12 Education', 'District Partnerships', 'EdTech Adoption'],
    industries: ['K-12 Education', 'Government'],
    yearsExperience: 25,
    sessionsCompleted: 34,
    rating: 4.6,
    availability: 'high',
    status: 'pending',
  },
]

const stats = [
  { label: 'Total Mentors', value: '128', change: '+8', icon: GraduationCap, color: 'text-primary' },
  { label: 'Active Sessions', value: '45', change: '+12', icon: Calendar, color: 'text-emerald-500' },
  { label: 'Avg Rating', value: '4.8', change: '+0.1', icon: Star, color: 'text-yellow-500' },
  { label: 'Total Hours', value: '2,847', change: '+156', icon: Clock, color: 'text-accent' },
]

export default function AdminMentorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || mentor.status === statusFilter
    const matchesAvailability = availabilityFilter === 'all' || mentor.availability === availabilityFilter
    return matchesSearch && matchesStatus && matchesAvailability
  })

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'high':
        return <Badge className="bg-emerald-500/20 text-emerald-500">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-500/20 text-yellow-500">Medium</Badge>
      case 'low':
        return <Badge className="bg-red-500/20 text-red-500">Low</Badge>
      default:
        return <Badge>{availability}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/20 text-emerald-500"><CheckCircle className="mr-1 h-3 w-3" />Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-500"><Clock className="mr-1 h-3 w-3" />Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mentors Management</h1>
        <p className="text-muted-foreground">Manage mentor profiles and sessions</p>
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
                placeholder="Search mentors..."
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
              </SelectContent>
            </Select>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>All Mentors</CardTitle>
          <CardDescription>{filteredMentors.length} mentors found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mentor</TableHead>
                <TableHead>Expertise</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMentors.map((mentor) => (
                <TableRow key={mentor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{mentor.name}</p>
                        <p className="text-xs text-muted-foreground">{mentor.title}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 2).map((e) => (
                        <Badge key={e} variant="outline" className="text-xs">{e}</Badge>
                      ))}
                      {mentor.expertise.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{mentor.expertise.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-muted-foreground" />
                      {mentor.yearsExperience} years
                    </div>
                  </TableCell>
                  <TableCell>{mentor.sessionsCompleted}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      {mentor.rating}
                    </div>
                  </TableCell>
                  <TableCell>{getAvailabilityBadge(mentor.availability)}</TableCell>
                  <TableCell>{getStatusBadge(mentor.status)}</TableCell>
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
