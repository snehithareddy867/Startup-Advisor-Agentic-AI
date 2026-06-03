'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Lightbulb,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Loader2,
  Rocket,
  Shield,
  Zap,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Sidebar } from '@/components/portal/sidebar'
import { PortalHeader } from '@/components/portal/portal-header'

interface ScoreData {
  score: number
  label: string
  description: string
}

interface Recommendation {
  category: string
  priority: 'high' | 'medium' | 'low'
  action: string
}

interface RiskFactor {
  risk: string
  level: 'high' | 'medium' | 'low'
  description: string
}

interface ValidationResult {
  scores: {
    innovation: ScoreData
    marketDemand: ScoreData
    competition: ScoreData
    fundingPotential: ScoreData
    executionFeasibility: ScoreData
  }
  overallScore: number
  successProbability: number
  insights: string[]
  recommendations: Recommendation[]
  riskFactors: RiskFactor[]
}

const scoreIcons = {
  innovation: Lightbulb,
  marketDemand: TrendingUp,
  competition: Users,
  fundingPotential: DollarSign,
  executionFeasibility: Target,
}

const scoreColors = {
  innovation: '#7c3aed',
  marketDemand: '#2563eb',
  competition: '#06b6d4',
  fundingPotential: '#10b981',
  executionFeasibility: '#f59e0b',
}

function GaugeChart({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 60
  const strokeWidth = 10
  const circumference = Math.PI * radius
  const progress = (value / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="80" viewBox="0 0 140 80">
        <path
          d="M 10 70 A 60 60 0 0 1 130 70"
          fill="none"
          stroke="rgba(148, 163, 184, 0.2)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <motion.path
          d="M 10 70 A 60 60 0 0 1 130 70"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <text x="70" y="65" textAnchor="middle" className="fill-foreground text-2xl font-bold">
          {value}
        </text>
      </svg>
      <p className="mt-1 text-xs text-muted-foreground text-center">{label}</p>
    </div>
  )
}

function CircularProgress({ value, size = 120, strokeWidth = 12, color }: { value: number; size?: number; strokeWidth?: number; color: string }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = ((100 - value) / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148, 163, 184, 0.15)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{value}%</span>
      </div>
    </div>
  )
}

export default function ValidationPage() {
  const [input, setInput] = useState({
    name: '',
    description: '',
    industry: '',
    stage: 'idea',
    problemStatement: '',
    targetMarket: '',
    solution: '',
  })
  const [isValidating, setIsValidating] = useState(false)
  const [result, setResult] = useState<ValidationResult | null>(null)

  const handleValidate = async () => {
    if (!input.name || !input.description || !input.industry) return

    setIsValidating(true)
    setResult(null)

    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })

      const data = await response.json()
      if (data.success) {
        setResult(data)
      }
    } catch (error) {
      console.error('Validation failed:', error)
    } finally {
      setIsValidating(false)
    }
  }

  const loadDemo = () => {
    setInput({
      name: 'StudySync AI',
      description: 'An AI-powered study companion that creates personalized learning paths, generates practice questions, and provides real-time tutoring for students.',
      industry: 'EdTech',
      stage: 'seed',
      problemStatement: 'Students struggle with personalized learning and lack affordable access to quality tutoring.',
      targetMarket: 'High school and college students globally',
      solution: 'AI tutor that adapts to each student learning style with 24/7 availability at a fraction of human tutor cost.',
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="founder" />
      <div className="flex-1 pl-64">
        <PortalHeader title="Startup Validation" subtitle="AI-powered startup idea analysis" />
        <main className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Form */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Enter Your Startup Details</CardTitle>
                    <CardDescription>Get AI-powered validation and scoring</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={loadDemo}>
                    Load Demo
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Startup Name *</label>
                  <Input
                    value={input.name}
                    onChange={e => setInput({ ...input, name: e.target.value })}
                    placeholder="e.g., StudySync AI"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Description *</label>
                  <Textarea
                    value={input.description}
                    onChange={e => setInput({ ...input, description: e.target.value })}
                    placeholder="Describe your startup idea in detail..."
                    className="mt-1 h-24"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Industry *</label>
                    <Input
                      value={input.industry}
                      onChange={e => setInput({ ...input, industry: e.target.value })}
                      placeholder="e.g., EdTech"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Stage</label>
                    <Select value={input.stage} onValueChange={v => setInput({ ...input, stage: v })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea</SelectItem>
                        <SelectItem value="mvp">MVP</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="growth">Growth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Problem Statement</label>
                  <Textarea
                    value={input.problemStatement}
                    onChange={e => setInput({ ...input, problemStatement: e.target.value })}
                    placeholder="What problem are you solving?"
                    className="mt-1 h-16"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Target Market</label>
                  <Input
                    value={input.targetMarket}
                    onChange={e => setInput({ ...input, targetMarket: e.target.value })}
                    placeholder="Who are your customers?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Solution</label>
                  <Textarea
                    value={input.solution}
                    onChange={e => setInput({ ...input, solution: e.target.value })}
                    placeholder="How do you solve the problem?"
                    className="mt-1 h-16"
                  />
                </div>
                <Button
                  onClick={handleValidate}
                  disabled={isValidating || !input.name || !input.description || !input.industry}
                  className="w-full bg-gradient-to-r from-primary to-accent"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Validate Startup
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <AnimatePresence mode="wait">
              {isValidating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center"
                >
                  <Card className="glass w-full">
                    <CardContent className="flex flex-col items-center justify-center py-20">
                      <div className="relative">
                        <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                          <Sparkles className="h-10 w-10 text-primary animate-pulse" />
                        </div>
                      </div>
                      <p className="mt-6 text-lg font-medium text-foreground">Analyzing your startup...</p>
                      <p className="mt-2 text-sm text-muted-foreground">Our AI is evaluating your idea</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {result && !isValidating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Overall Score */}
                  <Card className="glass">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">Overall Validation</h3>
                          <p className="text-sm text-muted-foreground">Based on comprehensive AI analysis</p>
                        </div>
                        <CircularProgress value={result.overallScore} color="#7c3aed" />
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-emerald/10 p-4">
                          <div className="flex items-center gap-2">
                            <Rocket className="h-5 w-5 text-emerald" />
                            <span className="text-sm font-medium text-foreground">Success Probability</span>
                          </div>
                          <p className="mt-2 text-2xl font-bold text-emerald">{result.successProbability}%</p>
                        </div>
                        <div className="rounded-xl bg-primary/10 p-4">
                          <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium text-foreground">Validation Score</span>
                          </div>
                          <p className="mt-2 text-2xl font-bold text-primary">{result.overallScore}/100</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Detailed Scores */}
          {result && !isValidating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 space-y-6"
            >
              {/* Score Gauges */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-base">Detailed Scores</CardTitle>
                  <CardDescription>AI-analyzed metrics for your startup</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-around gap-4">
                    {Object.entries(result.scores).map(([key, data]) => {
                      const Icon = scoreIcons[key as keyof typeof scoreIcons]
                      const color = scoreColors[key as keyof typeof scoreColors]
                      return (
                        <div key={key} className="flex flex-col items-center">
                          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}20` }}>
                            <Icon className="h-5 w-5" style={{ color }} />
                          </div>
                          <GaugeChart value={data.score} label={data.label} color={color} />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Insights */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-base">Key Insights</CardTitle>
                    <CardDescription>AI-generated analysis of your startup</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.insights.map((insight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 shrink-0 text-emerald mt-0.5" />
                          <span className="text-sm text-foreground">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Risk Factors */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-base">Risk Factors</CardTitle>
                    <CardDescription>Areas requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.riskFactors.map((risk, i) => (
                        <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card/50 p-3">
                          <Shield
                            className={`h-5 w-5 shrink-0 mt-0.5 ${
                              risk.level === 'high' ? 'text-destructive' : risk.level === 'medium' ? 'text-chart-4' : 'text-emerald'
                            }`}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">{risk.risk}</span>
                              <Badge
                                variant={risk.level === 'high' ? 'destructive' : 'secondary'}
                                className="text-[10px]"
                              >
                                {risk.level}
                              </Badge>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{risk.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-base">Recommendations</CardTitle>
                  <CardDescription>Actionable next steps for your startup</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {result.recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-border bg-card/50 p-4"
                      >
                        <ArrowRight
                          className={`h-5 w-5 shrink-0 mt-0.5 ${
                            rec.priority === 'high' ? 'text-primary' : rec.priority === 'medium' ? 'text-accent' : 'text-muted-foreground'
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px]">
                              {rec.category}
                            </Badge>
                            <Badge
                              variant={rec.priority === 'high' ? 'default' : 'secondary'}
                              className="text-[10px]"
                            >
                              {rec.priority} priority
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm text-foreground">{rec.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
