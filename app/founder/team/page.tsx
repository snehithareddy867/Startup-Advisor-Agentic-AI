'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  UserPlus,
  Mail,
  Linkedin,
  Github,
  MoreHorizontal,
  Briefcase,
  Crown,
  Settings,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  title: string
  avatar?: string
  linkedin?: string
  github?: string
  joinedAt: string
  isFounder: boolean
}

const initialTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex@studysync.ai',
    role: 'CEO & Founder',
    title: 'Chief Executive Officer',
    linkedin: 'https://linkedin.com/in/alexchen',
    github: 'https://github.com/alexchen',
    joinedAt: 'Jan 2025',
    isFounder: true,
  },
  {
    id: '2',
    name: 'Jordan Lee',
    email: 'jordan@studysync.ai',
    role: 'CTO & Co-Founder',
    title: 'Chief Technology Officer',
    linkedin: 'https://linkedin.com/in/jordanlee',
    github: 'https://github.com/jordanlee',
    joinedAt: 'Jan 2025',
    isFounder: true,
  },
  {
    id: '3',
    name: 'Maya Patel',
    email: 'maya@studysync.ai',
    role: 'Head of Product',
    title: 'VP of Product',
    linkedin: 'https://linkedin.com/in/mayapatel',
    joinedAt: 'Feb 2025',
    isFounder: false,
  },
  {
    id: '4',
    name: 'Chris Wilson',
    email: 'chris@studysync.ai',
    role: 'Lead Engineer',
    title: 'Senior Software Engineer',
    github: 'https://github.com/chriswilson',
    joinedAt: 'Mar 2025',
    isFounder: false,
  },
]

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '',
    title: '',
  })

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.role) return

    const member: TeamMember = {
      id: `${Date.now()}`,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      title: newMember.title || newMember.role,
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      isFounder: false,
    }

    setTeam([...team, member])
    setNewMember({ name: '', email: '', role: '', title: '' })
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground">Manage your startup team members</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent">
              <UserPlus className="h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Invite a new member to your startup team.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="john@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newMember.role}
                  onValueChange={(v) => setNewMember({ ...newMember, role: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Co-Founder">Co-Founder</SelectItem>
                    <SelectItem value="Engineer">Engineer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Product Manager">Product Manager</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Advisor">Advisor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  value={newMember.title}
                  onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
                  placeholder="Senior Software Engineer"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember}>Add Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{team.length}</p>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <Crown className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{team.filter(m => m.isFounder).length}</p>
                <p className="text-sm text-muted-foreground">Founders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Briefcase className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{new Set(team.map(m => m.role)).size}</p>
                <p className="text-sm text-muted-foreground">Roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur transition-colors hover:bg-card/80">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-lg text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{member.name}</h3>
                        {member.isFounder && (
                          <Crown className="h-4 w-4 text-emerald-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <Badge variant="outline" className="mt-1 text-xs">{member.title}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  {member.email}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {member.linkedin && (
                    <Button variant="ghost" size="icon" asChild>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {member.github && (
                    <Button variant="ghost" size="icon" asChild>
                      <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <span className="ml-auto text-xs text-muted-foreground">
                    Joined {member.joinedAt}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
