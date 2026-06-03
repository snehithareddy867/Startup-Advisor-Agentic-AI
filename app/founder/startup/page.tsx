'use client'

import { motion } from 'framer-motion'
import { Rocket, Edit3, Save, Plus, Trash2, Building2, Users, Target, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'

const profileCompleteness = 78

const startupData = {
  name: 'TechFlow AI',
  tagline: 'AI-powered workflow automation for modern teams',
  stage: 'Seed',
  industry: 'Enterprise SaaS',
  founded: '2024',
  location: 'San Francisco, CA',
  teamSize: 8,
  website: 'https://techflow.ai',
  description: 'TechFlow AI revolutionizes how teams work by providing intelligent automation that learns and adapts to your workflows. Our platform uses advanced machine learning to identify repetitive tasks, suggest optimizations, and automate complex processes across your entire tech stack.',
  problem: 'Teams spend 40% of their time on repetitive tasks that could be automated. Existing automation tools are rigid, require technical expertise, and fail to adapt to changing workflows.',
  solution: 'AI-powered workflow automation that learns from user behavior, integrates with 200+ tools, and continuously optimizes processes without requiring any coding.',
  targetMarket: 'Mid-market and enterprise companies with 100-5000 employees looking to improve operational efficiency.',
  competitors: ['Zapier', 'Make.com', 'Workato', 'Power Automate'],
}

const teamMembers = [
  { name: 'Sarah Chen', role: 'CEO & Co-founder', image: '/team/sarah.jpg' },
  { name: 'Marcus Johnson', role: 'CTO & Co-founder', image: '/team/marcus.jpg' },
  { name: 'Emily Rodriguez', role: 'VP Product', image: '/team/emily.jpg' },
  { name: 'David Kim', role: 'Lead Engineer', image: '/team/david.jpg' },
]

export default function StartupPage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Startup</h1>
          <p className="text-muted-foreground">Manage your startup profile and information</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className="gap-2"
          variant={isEditing ? 'default' : 'outline'}
        >
          {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Completeness */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Profile Completeness</CardTitle>
            <Badge variant="secondary">{profileCompleteness}%</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={profileCompleteness} className="h-2" />
          <p className="mt-2 text-sm text-muted-foreground">
            Complete your profile to increase visibility to investors
          </p>
        </CardContent>
      </Card>

      {/* Main Info Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                  {isEditing ? (
                    <Input defaultValue={startupData.name} className="mt-1" />
                  ) : (
                    <p className="mt-1 font-medium">{startupData.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tagline</label>
                  {isEditing ? (
                    <Input defaultValue={startupData.tagline} className="mt-1" />
                  ) : (
                    <p className="mt-1 font-medium">{startupData.tagline}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Stage</label>
                  <p className="mt-1">
                    <Badge variant="outline">{startupData.stage}</Badge>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Industry</label>
                  <p className="mt-1 font-medium">{startupData.industry}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Founded</label>
                  <p className="mt-1 font-medium">{startupData.founded}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="mt-1 font-medium">{startupData.location}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                {isEditing ? (
                  <Textarea defaultValue={startupData.description} className="mt-1" rows={4} />
                ) : (
                  <p className="mt-1 text-muted-foreground">{startupData.description}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-accent" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm text-muted-foreground">Team Size</span>
                <span className="font-semibold">{startupData.teamSize}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm text-muted-foreground">Stage</span>
                <Badge>{startupData.stage}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm text-muted-foreground">Industry</span>
                <span className="text-sm font-medium">{startupData.industry}</span>
              </div>
              <div className="pt-2">
                <a
                  href={startupData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {startupData.website}
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Problem & Solution */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-destructive" />
                Problem
              </CardTitle>
              <CardDescription>The problem your startup solves</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea defaultValue={startupData.problem} rows={4} />
              ) : (
                <p className="text-muted-foreground">{startupData.problem}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Solution
              </CardTitle>
              <CardDescription>Your unique approach</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea defaultValue={startupData.solution} rows={4} />
              ) : (
                <p className="text-muted-foreground">{startupData.solution}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-500" />
                  Team Members
                </CardTitle>
                <CardDescription>Key people building your startup</CardDescription>
              </div>
              {isEditing && (
                <Button size="sm" variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Member
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="group relative rounded-xl border border-border/50 bg-muted/30 p-4 text-center transition-colors hover:bg-muted/50"
                >
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
                    <span className="text-xl font-semibold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
