'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  LineChart,
  FileText,
  DollarSign,
  Handshake,
  GraduationCap,
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { agents } from '@/lib/data'
import type { AgentId, StartupInput, WorkflowState } from '@/lib/agents/types'
import { AGENT_ORDER, AGENT_NAMES } from '@/lib/agents/types'
import { demoStartupInput, demoWorkflowResults } from '@/lib/agents/demo-data'

const agentIcons: Record<AgentId, typeof Brain> = {
  founder: Brain,
  market: LineChart,
  plan: FileText,
  financial: DollarSign,
  investor: Handshake,
  mentor: GraduationCap,
}

const agentColors: Record<AgentId, string> = {
  founder: '#7c3aed',
  market: '#2563eb',
  plan: '#06b6d4',
  financial: '#10b981',
  investor: '#f59e0b',
  mentor: '#ec4899',
}

type AgentStatus = 'idle' | 'running' | 'completed' | 'error'

interface AgentNodeData {
  label: string
  icon: typeof Brain
  color: string
  status: AgentStatus
  description: string
}

const initialNodes: Node<AgentNodeData>[] = AGENT_ORDER.map((id, index) => ({
  id,
  type: 'default',
  position: { x: 250, y: index * 140 + 50 },
  data: {
    label: AGENT_NAMES[id],
    icon: agentIcons[id],
    color: agentColors[id],
    status: 'idle' as AgentStatus,
    description: agents.find(a => a.id === id)?.desc || '',
  },
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
}))

const initialEdges: Edge[] = AGENT_ORDER.slice(0, -1).map((id, index) => ({
  id: `${id}-${AGENT_ORDER[index + 1]}`,
  source: id,
  target: AGENT_ORDER[index + 1],
  animated: false,
  style: { stroke: 'rgba(124, 58, 237, 0.5)', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(124, 58, 237, 0.7)' },
}))

function AgentNode({ data }: { data: AgentNodeData }) {
  const Icon = data.icon
  const statusConfig = {
    idle: { bg: 'bg-muted', border: 'border-border', iconClass: '' },
    running: { bg: 'bg-primary/20', border: 'border-primary', iconClass: 'animate-pulse' },
    completed: { bg: 'bg-emerald/20', border: 'border-emerald', iconClass: '' },
    error: { bg: 'bg-destructive/20', border: 'border-destructive', iconClass: '' },
  }
  const config = statusConfig[data.status]

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border-2 ${config.border} ${config.bg} px-4 py-3 transition-all`}
      style={{ minWidth: 220 }}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.iconClass}`}
        style={{ backgroundColor: `${data.color}30`, color: data.color }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{data.label}</p>
        <p className="text-[10px] text-muted-foreground truncate">{data.description}</p>
      </div>
      {data.status === 'running' && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
      {data.status === 'completed' && <CheckCircle className="h-4 w-4 text-emerald" />}
      {data.status === 'error' && <AlertCircle className="h-4 w-4 text-destructive" />}
      {data.status === 'idle' && <Clock className="h-4 w-4 text-muted-foreground" />}
    </div>
  )
}

const nodeTypes = { default: AgentNode }

export default function AgentsPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [isRunning, setIsRunning] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<AgentId | null>(null)
  const [logs, setLogs] = useState<Array<{ timestamp: Date; agent: AgentId; message: string; type: 'info' | 'success' | 'error' }>>([])
  const [results, setResults] = useState<Record<string, unknown>>({})
  const [input, setInput] = useState<StartupInput>(demoStartupInput)
  const [showResults, setShowResults] = useState(false)

  const updateNodeStatus = useCallback((agentId: AgentId, status: AgentStatus) => {
    setNodes(nds =>
      nds.map(node =>
        node.id === agentId
          ? { ...node, data: { ...node.data, status } }
          : node
      )
    )
    // Animate edge when agent completes
    if (status === 'completed') {
      setEdges(eds =>
        eds.map(edge =>
          edge.source === agentId
            ? { ...edge, animated: true, style: { ...edge.style, stroke: '#10b981' } }
            : edge
        )
      )
    }
  }, [setNodes, setEdges])

  const addLog = useCallback((agent: AgentId, message: string, type: 'info' | 'success' | 'error') => {
    setLogs(prev => [...prev, { timestamp: new Date(), agent, message, type }])
  }, [])

  const runWorkflow = async () => {
    setIsRunning(true)
    setLogs([])
    setResults({})
    setShowResults(false)

    // Reset all nodes to idle
    setNodes(nds => nds.map(n => ({ ...n, data: { ...n.data, status: 'idle' as AgentStatus } })))
    setEdges(initialEdges)

    const collectedResults: Record<string, unknown> = {}

    for (const agentId of AGENT_ORDER) {
      setCurrentAgent(agentId)
      updateNodeStatus(agentId, 'running')
      addLog(agentId, `Starting ${AGENT_NAMES[agentId]}...`, 'info')

      try {
        const response = await fetch('/api/agents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input,
            agentId,
            previousResults: collectedResults,
          }),
        })

        const data = await response.json()

        if (data.success) {
          collectedResults[agentId] = data.result
          updateNodeStatus(agentId, 'completed')
          addLog(agentId, `${AGENT_NAMES[agentId]} completed successfully`, 'success')
        } else {
          updateNodeStatus(agentId, 'error')
          addLog(agentId, `${AGENT_NAMES[agentId]} failed: ${data.error}`, 'error')
          break
        }
      } catch (error) {
        updateNodeStatus(agentId, 'error')
        addLog(agentId, `${AGENT_NAMES[agentId]} failed: ${error}`, 'error')
        break
      }

      // Small delay between agents for visual effect
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    setResults(collectedResults)
    setCurrentAgent(null)
    setIsRunning(false)
    if (Object.keys(collectedResults).length === AGENT_ORDER.length) {
      setShowResults(true)
    }
  }

  const loadDemoResults = () => {
    setResults(demoWorkflowResults)
    setShowResults(true)
    // Update all nodes to completed
    setNodes(nds => nds.map(n => ({ ...n, data: { ...n.data, status: 'completed' as AgentStatus } })))
    setEdges(eds => eds.map(e => ({ ...e, animated: true, style: { ...e.style, stroke: '#10b981' } })))
    addLog('founder', 'Demo data loaded successfully', 'success')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-emerald">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Agent Workflow</h1>
                <p className="text-xs text-muted-foreground">LangGraph Multi-Agent System</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={loadDemoResults} disabled={isRunning}>
              Load Demo
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-accent"
              onClick={runWorkflow}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Workflow
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl p-4">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-base">Startup Input</CardTitle>
              <CardDescription>Enter your startup details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Startup Name</label>
                <Input
                  value={input.name}
                  onChange={e => setInput({ ...input, name: e.target.value })}
                  placeholder="e.g., StudySync AI"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Description</label>
                <Textarea
                  value={input.description}
                  onChange={e => setInput({ ...input, description: e.target.value })}
                  placeholder="Describe your startup idea..."
                  className="mt-1 h-20"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Industry</label>
                  <Input
                    value={input.industry}
                    onChange={e => setInput({ ...input, industry: e.target.value })}
                    placeholder="e.g., EdTech"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Stage</label>
                  <Select value={input.stage} onValueChange={v => setInput({ ...input, stage: v as StartupInput['stage'] })}>
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
                <label className="text-xs font-medium text-muted-foreground">Funding Needed ($)</label>
                <Input
                  type="number"
                  value={input.fundingNeeded || ''}
                  onChange={e => setInput({ ...input, fundingNeeded: Number(e.target.value) || undefined })}
                  placeholder="e.g., 2000000"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Workflow Visualization */}
          <Card className="glass lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Agent Pipeline</CardTitle>
              <CardDescription>Visual workflow of AI agents processing your startup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] rounded-lg border border-border bg-background/50">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.3 }}
                  nodesDraggable={false}
                  nodesConnectable={false}
                  elementsSelectable={false}
                  panOnDrag={false}
                  zoomOnScroll={false}
                  zoomOnPinch={false}
                  zoomOnDoubleClick={false}
                >
                  <Background color="rgba(124, 58, 237, 0.1)" gap={24} />
                  <Controls showInteractive={false} />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logs */}
        <Card className="glass mt-6">
          <CardHeader>
            <CardTitle className="text-base">Execution Logs</CardTitle>
            <CardDescription>Real-time agent execution status</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-40">
              {logs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No logs yet. Run the workflow to see execution logs.</p>
              ) : (
                <div className="space-y-2">
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="text-xs text-muted-foreground">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                      <Badge
                        variant={log.type === 'success' ? 'default' : log.type === 'error' ? 'destructive' : 'secondary'}
                        className="text-[10px]"
                      >
                        {AGENT_NAMES[log.agent]}
                      </Badge>
                      <span className={log.type === 'error' ? 'text-destructive' : log.type === 'success' ? 'text-emerald' : 'text-foreground'}>
                        {log.message}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Results Preview */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6"
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-base">Workflow Results</CardTitle>
                  <CardDescription>Summary of agent outputs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {AGENT_ORDER.map(agentId => (
                      <div
                        key={agentId}
                        className="rounded-lg border border-border bg-card/50 p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {(() => {
                            const Icon = agentIcons[agentId]
                            return (
                              <div
                                className="flex h-8 w-8 items-center justify-center rounded-lg"
                                style={{ backgroundColor: `${agentColors[agentId]}20`, color: agentColors[agentId] }}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                            )
                          })()}
                          <span className="text-sm font-medium">{AGENT_NAMES[agentId]}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {results[agentId] ? 'Completed' : 'No data'}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Link href="/founder">
                      <Button variant="outline" size="sm">
                        View in Dashboard
                      </Button>
                    </Link>
                    <Link href="/founder/business-plan">
                      <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                        View Business Plan
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
