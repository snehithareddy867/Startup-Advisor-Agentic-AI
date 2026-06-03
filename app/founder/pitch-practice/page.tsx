'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

interface Feedback {
  id: string
  category: 'strength' | 'improvement'
  text: string
  timestamp?: string
}

interface PitchScore {
  category: string
  score: number
  maxScore: number
  feedback: string
}

const pitchTemplates = [
  { id: 'elevator', name: 'Elevator Pitch', duration: '30 seconds', description: 'Quick intro for networking' },
  { id: 'investor', name: 'Investor Pitch', duration: '3 minutes', description: 'Comprehensive pitch for funding' },
  { id: 'demo-day', name: 'Demo Day', duration: '5 minutes', description: 'Full presentation with product demo' },
]

const sampleFeedback: Feedback[] = [
  { id: '1', category: 'strength', text: 'Clear problem statement - you immediately grabbed attention' },
  { id: '2', category: 'strength', text: 'Strong market size data with credible sources' },
  { id: '3', category: 'improvement', text: 'Consider adding more specifics about your competitive advantage' },
  { id: '4', category: 'improvement', text: 'The ask could be more specific - what exactly will funds be used for?' },
]

const sampleScores: PitchScore[] = [
  { category: 'Problem Definition', score: 85, maxScore: 100, feedback: 'Clearly articulated pain point' },
  { category: 'Solution Clarity', score: 78, maxScore: 100, feedback: 'Good, but could be more concise' },
  { category: 'Market Opportunity', score: 92, maxScore: 100, feedback: 'Excellent TAM/SAM/SOM analysis' },
  { category: 'Business Model', score: 70, maxScore: 100, feedback: 'Revenue model needs more detail' },
  { category: 'Team Strength', score: 88, maxScore: 100, feedback: 'Strong founding team credentials' },
  { category: 'Delivery & Confidence', score: 82, maxScore: 100, feedback: 'Good pace, maintain eye contact' },
]

export default function PitchPracticePage() {
  const [selectedTemplate, setSelectedTemplate] = useState('investor')
  const [isRecording, setIsRecording] = useState(false)
  const [isPracticing, setIsPracticing] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const template = pitchTemplates.find(t => t.id === selectedTemplate)

  useEffect(() => {
    if (isPracticing) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPracticing])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartPractice = () => {
    setIsPracticing(true)
    setIsRecording(true)
    setElapsedTime(0)
    setShowResults(false)
    toast.info('Recording started. Deliver your pitch!')
  }

  const handleStopPractice = async () => {
    setIsPracticing(false)
    setIsRecording(false)
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsAnalyzing(false)
    setShowResults(true)
    toast.success('Pitch analyzed! Check your feedback.')
  }

  const handleReset = () => {
    setIsPracticing(false)
    setIsRecording(false)
    setElapsedTime(0)
    setShowResults(false)
    setIsAnalyzing(false)
  }

  const overallScore = Math.round(
    sampleScores.reduce((acc, s) => acc + s.score, 0) / sampleScores.length
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pitch Practice</h1>
        <p className="text-muted-foreground">Practice and perfect your startup pitch with AI feedback</p>
      </div>

      {/* Template Selection */}
      <div className="grid gap-4 sm:grid-cols-3">
        {pitchTemplates.map((t) => (
          <Card
            key={t.id}
            className={`cursor-pointer border-2 transition-colors ${
              selectedTemplate === t.id
                ? 'border-primary bg-primary/5'
                : 'border-border/50 hover:border-primary/50'
            }`}
            onClick={() => setSelectedTemplate(t.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{t.name}</h3>
                <Badge variant="secondary">
                  <Clock className="mr-1 h-3 w-3" />
                  {t.duration}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Practice Area */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            Practice Session
          </CardTitle>
          <CardDescription>
            {template?.name} - Target duration: {template?.duration}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            {/* Timer Display */}
            <div className="mb-8 text-center">
              <p className="text-6xl font-mono font-bold text-foreground">
                {formatTime(elapsedTime)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {isPracticing ? 'Recording...' : 'Ready to start'}
              </p>
            </div>

            {/* Recording Indicator */}
            <AnimatePresence>
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-8 flex items-center gap-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="h-3 w-3 rounded-full bg-destructive"
                  />
                  <span className="text-sm text-destructive">Recording</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analysis State */}
            {isAnalyzing && (
              <div className="mb-8 flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Analyzing your pitch with AI...</p>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-4">
              {!isPracticing ? (
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary to-accent"
                  onClick={handleStartPractice}
                  disabled={isAnalyzing}
                >
                  <Mic className="h-5 w-5" />
                  Start Practice
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="destructive"
                  className="gap-2"
                  onClick={handleStopPractice}
                >
                  <MicOff className="h-5 w-5" />
                  Stop & Analyze
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                disabled={!elapsedTime && !showResults}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Overall Score */}
            <Card className="border-border/50 bg-gradient-to-r from-primary/10 via-accent/10 to-emerald/10 backdrop-blur">
              <CardContent className="flex items-center justify-between pt-6">
                <div>
                  <h3 className="text-xl font-semibold">Overall Pitch Score</h3>
                  <p className="text-sm text-muted-foreground">Based on AI analysis of your delivery</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-4xl font-bold text-primary">{overallScore}</p>
                    <p className="text-sm text-muted-foreground">out of 100</p>
                  </div>
                  <Progress value={overallScore} className="h-3 w-32" />
                </div>
              </CardContent>
            </Card>

            {/* Detailed Feedback */}
            <Tabs defaultValue="scores" className="space-y-4">
              <TabsList>
                <TabsTrigger value="scores">Score Breakdown</TabsTrigger>
                <TabsTrigger value="feedback">Detailed Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="scores">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="pt-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {sampleScores.map((score, index) => (
                        <motion.div
                          key={score.category}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-lg border border-border bg-muted/30 p-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{score.category}</span>
                            <Badge variant={score.score >= 80 ? 'default' : 'secondary'}>
                              {score.score}%
                            </Badge>
                          </div>
                          <Progress value={score.score} className="mt-2 h-2" />
                          <p className="mt-2 text-xs text-muted-foreground">{score.feedback}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Strengths */}
                  <Card className="border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ThumbsUp className="h-5 w-5 text-emerald-500" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {sampleFeedback
                        .filter(f => f.category === 'strength')
                        .map((feedback, index) => (
                          <motion.div
                            key={feedback.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3"
                          >
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            <p className="text-sm">{feedback.text}</p>
                          </motion.div>
                        ))}
                    </CardContent>
                  </Card>

                  {/* Areas for Improvement */}
                  <Card className="border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ThumbsDown className="h-5 w-5 text-chart-4" />
                        Areas for Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {sampleFeedback
                        .filter(f => f.category === 'improvement')
                        .map((feedback, index) => (
                          <motion.div
                            key={feedback.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 rounded-lg border border-chart-4/20 bg-chart-4/5 p-3"
                          >
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-chart-4" />
                            <p className="text-sm">{feedback.text}</p>
                          </motion.div>
                        ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* AI Suggestions */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Coach Suggestions
                </CardTitle>
                <CardDescription>Personalized tips to improve your next pitch</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">1</span>
                    <p className="text-sm">Try starting with a compelling hook or statistic to immediately capture investor attention.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">2</span>
                    <p className="text-sm">Practice your 30-second elevator pitch version for quick networking opportunities.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">3</span>
                    <p className="text-sm">Include 2-3 customer testimonials or case studies to build credibility.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
