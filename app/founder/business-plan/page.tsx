'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Target,
  Users,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Shield,
  Loader2,
  Map,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { exportBusinessPlanPDF, exportSWOTPDF } from '@/lib/pdf-export'

interface BusinessPlanSection {
  id: string
  title: string
  icon: typeof FileText
  status: 'complete' | 'in-progress' | 'not-started'
  progress: number
  description: string
  content?: string
  keyPoints?: string[]
}

const initialSections: BusinessPlanSection[] = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    icon: FileText,
    status: 'complete',
    progress: 100,
    description: 'High-level overview of your business',
  },
  {
    id: 'problem-solution',
    title: 'Problem & Solution',
    icon: Lightbulb,
    status: 'complete',
    progress: 100,
    description: 'The problem you solve and your unique approach',
  },
  {
    id: 'market-analysis',
    title: 'Market Analysis',
    icon: TrendingUp,
    status: 'complete',
    progress: 100,
    description: 'TAM, SAM, SOM and market trends',
  },
  {
    id: 'competitive-analysis',
    title: 'Competitive Analysis',
    icon: Target,
    status: 'in-progress',
    progress: 65,
    description: 'Competitor landscape and your advantages',
  },
  {
    id: 'business-model',
    title: 'Business Model',
    icon: BarChart3,
    status: 'in-progress',
    progress: 40,
    description: 'Revenue streams and pricing strategy',
  },
  {
    id: 'go-to-market',
    title: 'Go-to-Market Strategy',
    icon: TrendingUp,
    status: 'not-started',
    progress: 0,
    description: 'Customer acquisition and growth plan',
  },
  {
    id: 'team',
    title: 'Team & Organization',
    icon: Users,
    status: 'complete',
    progress: 100,
    description: 'Key team members and org structure',
  },
  {
    id: 'risk-analysis',
    title: 'Risk Analysis',
    icon: Shield,
    status: 'not-started',
    progress: 0,
    description: 'Potential risks and mitigation strategies',
  },
]

const aiSuggestions = [
  {
    section: 'Competitive Analysis',
    suggestion: 'Consider adding Notion AI and ClickUp as emerging competitors in the productivity space.',
    priority: 'high',
  },
  {
    section: 'Business Model',
    suggestion: 'Your pricing tiers could benefit from a free trial option to reduce friction.',
    priority: 'medium',
  },
  {
    section: 'Go-to-Market',
    suggestion: 'Based on your target market, product-led growth with a freemium model could be effective.',
    priority: 'high',
  },
]

export default function BusinessPlanPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null)
  const [sections, setSections] = useState(initialSections)

  const overallProgress = Math.round(
    sections.reduce((acc, s) => acc + s.progress, 0) / sections.length
  )

  const handleGenerateAll = async () => {
    setIsGenerating(true)
    
    try {
      // Generate all incomplete sections
      const incompleteSections = sections.filter(s => s.status !== 'complete')
      
      for (const section of incompleteSections) {
        await regenerateSection(section.id, false)
      }
      
      toast.success('Business plan generated successfully!')
    } catch (error) {
      console.error('Generation failed:', error)
      toast.error('Failed to generate some sections')
    } finally {
      setIsGenerating(false)
    }
  }

  const regenerateSection = async (sectionId: string, showToast = true) => {
    setIsRegenerating(sectionId)
    
    try {
      const response = await fetch('/api/business-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startupName: 'StudySync AI',
          description: 'An AI-powered study companion that creates personalized learning paths, generates practice questions, and provides real-time tutoring for students.',
          industry: 'EdTech',
          stage: 'Seed',
          targetMarket: 'High school and college students globally',
          sectionToRegenerate: sectionId,
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        setSections(prev => prev.map(s => 
          s.id === sectionId 
            ? { 
                ...s, 
                status: 'complete' as const, 
                progress: data.estimatedCompleteness || 100,
                content: data.content,
                keyPoints: data.keyPoints,
              } 
            : s
        ))
        if (showToast) {
          toast.success(`${sections.find(s => s.id === sectionId)?.title} regenerated!`)
        }
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Regeneration failed:', error)
      if (showToast) {
        toast.error('Failed to regenerate section')
      }
    } finally {
      setIsRegenerating(null)
    }
  }

  const handleRegenerateAll = async () => {
    setIsGenerating(true)
    
    try {
      for (const section of sections) {
        await regenerateSection(section.id, false)
      }
      toast.success('All sections regenerated!')
    } catch (error) {
      console.error('Regeneration failed:', error)
      toast.error('Failed to regenerate some sections')
    } finally {
      setIsGenerating(false)
    }
  }


  const handleExportPDF = async () => {
    try {
      toast.info('Generating PDF...')
      await exportBusinessPlanPDF(sections.map(s => ({ title: s.title, content: s.content, keyPoints: s.keyPoints })))
      toast.success('Business Plan exported!')
    } catch {
      toast.error('PDF export failed. Install jspdf: npm install jspdf')
    }
  }

  const handleExportSWOTPDF = async () => {
    try {
      toast.info('Generating SWOT PDF...')
      await exportSWOTPDF(swotItems)
      toast.success('SWOT Analysis exported!')
    } catch {
      toast.error('PDF export failed. Install jspdf: npm install jspdf')
    }
  }

  const swotItems = {
    strengths: ['Strong AI-powered automation differentiator', 'Experienced founding team (8+ years avg)', 'Early traction: 12 paying customers', 'Scalable SaaS revenue model'],
    weaknesses: ['Limited brand recognition in enterprise space', 'Long sales cycles for enterprise deals', 'Dependency on third-party AI APIs', 'Small team — resource-constrained'],
    opportunities: ['$47B workflow automation market growing at 23% CAGR', 'Remote work driving demand for async tools', 'AI adoption accelerating across SMBs', 'Partnership opportunities with major SaaS platforms'],
    threats: ['Zapier, Make.com scaling rapidly into AI features', 'Big Tech (Microsoft, Google) entering the space', 'Economic downturns reducing SaaS budgets', 'Data privacy regulations increasing compliance costs'],
  }

  const roadmap = [
    { month: 'Month 1–2', phase: 'Foundation', color: 'bg-purple-500', tasks: ['MVP feature hardening', 'Hire 2 engineers', 'Onboard 5 design partners', 'Set up analytics'] },
    { month: 'Month 3–4', phase: 'Growth', color: 'bg-blue-500', tasks: ['Launch Product Hunt', '50 paying customers', 'Close pre-seed ($500K)', 'Content marketing'] },
    { month: 'Month 5–6', phase: 'Expansion', color: 'bg-emerald-500', tasks: ['Enterprise tier rollout', 'Partner with 2 resellers', '$25K MRR milestone', 'Hire Head of Sales'] },
    { month: 'Month 7–9', phase: 'Scale', color: 'bg-amber-500', tasks: ['EU expansion', 'Launch integrations marketplace', '200 customers', 'Series A prep'] },
    { month: 'Month 10–12', phase: 'Fundraise', color: 'bg-rose-500', tasks: ['Close Series A ($3M–5M)', 'Scale to 20 people', '$100K MRR', 'Launch V2 platform'] },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Plan</h1>
          <p className="text-muted-foreground">AI-powered business plan generation and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleExportPDF}>
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button 
            className="gap-2 bg-gradient-to-r from-primary to-accent"
            onClick={handleGenerateAll}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate with AI
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Overall Progress */}


      {/* Tabs: Plan | SWOT | Roadmap */}
      <Tabs defaultValue="plan" className="w-full">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="plan" className="gap-2"><FileText className="h-4 w-4" />Business Plan</TabsTrigger>
          <TabsTrigger value="swot" className="gap-2"><Zap className="h-4 w-4" />SWOT Analysis</TabsTrigger>
          <TabsTrigger value="roadmap" className="gap-2"><Map className="h-4 w-4" />Roadmap</TabsTrigger>
        </TabsList>

        {/* ── Business Plan Tab ── */}
        <TabsContent value="plan">
      <Card className="border-border/50 bg-gradient-to-r from-primary/10 via-accent/10 to-emerald/10 backdrop-blur">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Overall Progress</CardTitle>
            <Badge variant="secondary" className="text-lg">{overallProgress}%</Badge>
          </div>
          <CardDescription>Complete all sections to have an investor-ready business plan</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="h-3" />
          <div className="mt-4 flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">
                {sections.filter(s => s.status === 'complete').length} Complete
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="text-muted-foreground">
                {sections.filter(s => s.status === 'in-progress').length} In Progress
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-muted" />
              <span className="text-muted-foreground">
                {sections.filter(s => s.status === 'not-started').length} Not Started
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sections List */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-xl font-semibold">Plan Sections</h2>
          <div className="grid gap-4">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur transition-colors hover:bg-card/80">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      section.status === 'complete' 
                        ? 'bg-emerald-500/20 text-emerald-500'
                        : section.status === 'in-progress'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <section.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{section.title}</h3>
                        {section.status === 'complete' && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        )}
                        {section.status === 'in-progress' && (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Progress value={section.progress} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground">{section.progress}%</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => regenerateSection(section.id)}
                      disabled={isRegenerating === section.id}
                    >
                      {isRegenerating === section.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        section.status === 'not-started' ? 'Start' : 'Edit'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">AI Suggestions</h2>
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-5 w-5 text-primary" />
                Recommendations
              </CardTitle>
              <CardDescription>AI-generated suggestions to improve your plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="rounded-lg border border-border/50 bg-muted/30 p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">{suggestion.section}</span>
                    <Badge 
                      variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.suggestion}</p>
                  <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-primary">
                    Apply suggestion
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={handleRegenerateAll}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Regenerate Sections
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Preview Full Plan
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="h-4 w-4" />
                Export to Notion
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

        </TabsContent>

        {/* ── SWOT Analysis Tab ── */}
        <TabsContent value="swot">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">SWOT Analysis</h2>
              <p className="text-muted-foreground">AI-generated strategic analysis of TechFlow AI</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Strengths */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-emerald-500/30 bg-emerald-500/5 backdrop-blur h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base text-emerald-400">
                      <CheckCircle2 className="h-5 w-5" /> Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {swotItems.strengths.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              {/* Weaknesses */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-red-500/30 bg-red-500/5 backdrop-blur h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base text-red-400">
                      <AlertCircle className="h-5 w-5" /> Weaknesses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {swotItems.weaknesses.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              {/* Opportunities */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="border-blue-500/30 bg-blue-500/5 backdrop-blur h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base text-blue-400">
                      <TrendingUp className="h-5 w-5" /> Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {swotItems.opportunities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              {/* Threats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="border-amber-500/30 bg-amber-500/5 backdrop-blur h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base text-amber-400">
                      <Shield className="h-5 w-5" /> Threats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {swotItems.threats.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            <div className="flex justify-end">
              <Button className="gap-2 bg-gradient-to-r from-primary to-accent">
                <Download className="h-4 w-4" /> Export SWOT as PDF
              </Button>
            </div>
          </div>
        </TabsContent>


        {/* ── Roadmap Tab ── */}
        <TabsContent value="roadmap">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Startup Roadmap</h2>
              <p className="text-muted-foreground">Month-by-month execution plan for the next 12 months</p>
            </div>
            <div className="relative space-y-4">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-emerald-500" />
              {roadmap.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-6 pl-16"
                >
                  {/* Dot */}
                  <div className={`absolute left-4 top-4 h-4 w-4 rounded-full ${item.color} ring-4 ring-background`} />
                  <Card className="flex-1 border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{item.phase}</CardTitle>
                        <span className="text-xs font-medium text-muted-foreground">{item.month}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-1.5 sm:grid-cols-2">
                        {item.tasks.map((task, ti) => (
                          <div key={ti} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                            {task}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button className="gap-2 bg-gradient-to-r from-primary to-accent">
                <Download className="h-4 w-4" /> Export Roadmap as PDF
              </Button>
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}

