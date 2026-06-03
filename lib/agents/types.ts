// Types for the LangGraph multi-agent system

export type AgentId = 'founder' | 'market' | 'plan' | 'financial' | 'investor' | 'mentor'

export type AgentStatus = 'idle' | 'running' | 'completed' | 'error'

export interface AgentState {
  id: AgentId
  status: AgentStatus
  progress: number
  result?: unknown
  error?: string
  startedAt?: number
  completedAt?: number
}

export interface StartupInput {
  name: string
  description: string
  industry: string
  stage: 'idea' | 'mvp' | 'seed' | 'growth'
  targetMarket?: string
  problemStatement?: string
  solution?: string
  teamSize?: number
  fundingNeeded?: number
}

export interface FounderAgentOutput {
  refinedIdea: string
  industry: string
  problemStatement: string
  targetAudience: string
  uniqueValueProposition: string
  keyFeatures: string[]
}

export interface MarketResearchOutput {
  tam: { value: number; description: string }
  sam: { value: number; description: string }
  som: { value: number; description: string }
  trends: string[]
  competitors: Array<{
    name: string
    description: string
    strengths: string[]
    weaknesses: string[]
  }>
  marketGrowthRate: number
}

export interface BusinessPlanOutput {
  executiveSummary: string
  missionStatement: string
  visionStatement: string
  revenueModel: string
  pricingStrategy: string
  goToMarketStrategy: string
  keyMilestones: Array<{ milestone: string; timeline: string }>
  riskAssessment: Array<{ risk: string; mitigation: string }>
  swotAnalysis: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
}

export interface FinancialOutput {
  revenueForecast: Array<{
    year: number
    conservative: number
    expected: number
    optimistic: number
  }>
  fundingRequirements: {
    amount: number
    useOfFunds: Array<{ category: string; percentage: number; amount: number }>
    runway: number
  }
  unitEconomics: {
    cac: number
    ltv: number
    ltvCacRatio: number
    paybackPeriod: number
    grossMargin: number
  }
  burnRate: number
  breakEvenPoint: { months: number; revenue: number }
}

export interface InvestorMatch {
  id: string
  name: string
  firm: string
  investmentFocus: string[]
  stagePreference: string[]
  checkSize: { min: number; max: number }
  compatibilityScore: number
  matchReasons: string[]
  riskAppetite: 'conservative' | 'moderate' | 'aggressive'
}

export interface InvestorMatchOutput {
  topInvestors: InvestorMatch[]
  overallFundingFit: number
  recommendations: string[]
}

export interface MentorMatch {
  id: string
  name: string
  title: string
  expertise: string[]
  industries: string[]
  yearsExperience: number
  compatibilityScore: number
  matchReasons: string[]
  availability: 'high' | 'medium' | 'low'
}

export interface MentorMatchOutput {
  topMentors: MentorMatch[]
  overallMatch: number
  recommendations: string[]
}

export interface WorkflowState {
  input: StartupInput
  currentAgent: AgentId | null
  agents: Record<AgentId, AgentState>
  results: {
    founder?: FounderAgentOutput
    market?: MarketResearchOutput
    plan?: BusinessPlanOutput
    financial?: FinancialOutput
    investor?: InvestorMatchOutput
    mentor?: MentorMatchOutput
  }
  logs: Array<{ timestamp: number; agent: AgentId; message: string; type: 'info' | 'success' | 'error' }>
  startedAt: number
  completedAt?: number
  status: 'idle' | 'running' | 'completed' | 'error'
}

export const AGENT_ORDER: AgentId[] = ['founder', 'market', 'plan', 'financial', 'investor', 'mentor']

export const AGENT_NAMES: Record<AgentId, string> = {
  founder: 'Founder Agent',
  market: 'Market Research Agent',
  plan: 'Business Plan Agent',
  financial: 'Financial Agent',
  investor: 'Investor Match Agent',
  mentor: 'Mentor Match Agent',
}
