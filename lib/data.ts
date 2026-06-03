import {
  Brain,
  LineChart,
  FileText,
  DollarSign,
  Handshake,
  GraduationCap,
} from 'lucide-react'

export const agents = [
  {
    id: 'founder',
    name: 'Founder Agent',
    icon: Brain,
    color: '#7c3aed',
    desc: 'Captures your vision, refines the idea, and orchestrates the entire agent pipeline.',
    role: 'Orchestrator',
  },
  {
    id: 'market',
    name: 'Market Research Agent',
    icon: LineChart,
    color: '#2563eb',
    desc: 'Analyzes TAM/SAM/SOM, competitors, and emerging market trends in real time.',
    role: 'Analyst',
  },
  {
    id: 'plan',
    name: 'Business Plan Agent',
    icon: FileText,
    color: '#06b6d4',
    desc: 'Drafts executive summaries, GTM strategy, and a complete investor-ready plan.',
    role: 'Strategist',
  },
  {
    id: 'financial',
    name: 'Financial Agent',
    icon: DollarSign,
    color: '#10b981',
    desc: 'Builds revenue forecasts, unit economics, and funding requirement models.',
    role: 'Modeler',
  },
  {
    id: 'investor',
    name: 'Investor Match Agent',
    icon: Handshake,
    color: '#f59e0b',
    desc: 'Matches your startup with the most relevant investors based on thesis fit.',
    role: 'Connector',
  },
  {
    id: 'mentor',
    name: 'Mentor Match Agent',
    icon: GraduationCap,
    color: '#ec4899',
    desc: 'Recommends domain mentors and schedules guided growth sessions.',
    role: 'Advisor',
  },
] as const

export const features = [
  {
    title: 'AI Business Plan Generator',
    desc: 'Generate a complete, structured business plan with executive summary, market analysis, and risk assessment in seconds.',
    icon: FileText,
  },
  {
    title: 'Startup Health Score',
    desc: 'An AI-calculated 0–100 score across team, market, traction, and financials with actionable insights.',
    icon: LineChart,
  },
  {
    title: 'Investor Matching Engine',
    desc: 'Smart matching connects founders with investors whose thesis aligns with their startup stage and sector.',
    icon: Handshake,
  },
  {
    title: 'Mentor Recommendations',
    desc: 'Get paired with experienced operators and domain experts tuned to your biggest current challenges.',
    icon: GraduationCap,
  },
  {
    title: 'Financial Forecasting',
    desc: 'Revenue projections, burn rate, and runway modeling powered by intelligent financial agents.',
    icon: DollarSign,
  },
  {
    title: 'Agentic Workflow',
    desc: 'Six specialized AI agents collaborate through a LangGraph-style pipeline to build your company.',
    icon: Brain,
  },
] as const

export const pricing = [
  {
    name: 'Starter',
    price: 0,
    period: 'forever',
    desc: 'For solo founders validating their first idea.',
    features: ['1 startup workspace', 'Business plan generator', 'Health score', 'Community support'],
    cta: 'Start free',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: 49,
    period: 'month',
    desc: 'For founders raising and scaling fast.',
    features: [
      'Unlimited workspaces',
      'All 6 AI agents',
      'Investor matching engine',
      'Pitch deck + PDF export',
      'Priority AI chat',
    ],
    cta: 'Start 14-day trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 199,
    period: 'month',
    desc: 'For accelerators, funds, and studios.',
    features: [
      'Everything in Growth',
      'Team & portfolio view',
      'Custom AI agents',
      'API access',
      'Dedicated success manager',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
] as const

export const testimonials = [
  {
    quote:
      'StartupAdvisor took our messy idea and produced an investor deck that got us 3 meetings in a week. The agent workflow feels like having a co-founder.',
    name: 'Priya Sharma',
    title: 'Founder, NeuralFarm',
  },
  {
    quote:
      'As an angel investor I review 50 startups a week. The risk and ROI predictions cut my screening time in half.',
    name: 'Marcus Lee',
    title: 'Partner, Vertex Capital',
  },
  {
    quote:
      'The mentor matching is uncanny. I get paired with founders where my experience actually moves the needle.',
    name: 'Elena Rossi',
    title: 'Operator & Mentor, ex-Stripe',
  },
]

// ---------- Portal mock data ----------

export const startupGrowth = [
  { month: 'Jan', users: 120, revenue: 4, mrr: 2 },
  { month: 'Feb', users: 240, revenue: 9, mrr: 5 },
  { month: 'Mar', users: 480, revenue: 18, mrr: 11 },
  { month: 'Apr', users: 820, revenue: 31, mrr: 19 },
  { month: 'May', users: 1340, revenue: 52, mrr: 34 },
  { month: 'Jun', users: 2100, revenue: 88, mrr: 57 },
  { month: 'Jul', users: 3200, revenue: 134, mrr: 92 },
]

export const fundingProgress = [
  { stage: 'Pre-seed', raised: 250, target: 250 },
  { stage: 'Seed', raised: 1200, target: 1500 },
  { stage: 'Series A', raised: 0, target: 6000 },
]

export const revenueForecast = [
  { quarter: 'Q1', conservative: 40, expected: 60, optimistic: 85 },
  { quarter: 'Q2', conservative: 70, expected: 110, optimistic: 160 },
  { quarter: 'Q3', conservative: 120, expected: 190, optimistic: 280 },
  { quarter: 'Q4', conservative: 190, expected: 310, optimistic: 460 },
]

export const investorInterest = [
  { name: 'SaaS', value: 38 },
  { name: 'Fintech', value: 24 },
  { name: 'AI/ML', value: 22 },
  { name: 'Health', value: 16 },
]

export const discoverStartups = [
  { name: 'NeuralFarm', industry: 'AgriTech AI', health: 87, need: 1.5, stage: 'Seed', risk: 'Low' as const, roi: 4.2 },
  { name: 'PayLoop', industry: 'Fintech', health: 79, need: 3.0, stage: 'Series A', risk: 'Medium' as const, roi: 3.1 },
  { name: 'MediSync', industry: 'HealthTech', health: 91, need: 2.2, stage: 'Seed', risk: 'Low' as const, roi: 5.0 },
  { name: 'VoltGrid', industry: 'CleanTech', health: 68, need: 5.0, stage: 'Series A', risk: 'High' as const, roi: 2.4 },
  { name: 'LearnLoop', industry: 'EdTech', health: 74, need: 0.8, stage: 'Pre-seed', risk: 'Medium' as const, roi: 3.6 },
  { name: 'CargoNova', industry: 'Logistics', health: 82, need: 4.1, stage: 'Series A', risk: 'Medium' as const, roi: 3.9 },
]

export const fundingPipeline = {
  Sourced: ['LearnLoop', 'VoltGrid'],
  Screening: ['CargoNova', 'PayLoop'],
  'Due Diligence': ['NeuralFarm'],
  Committed: ['MediSync'],
} as Record<string, string[]>

export const mentorRequests = [
  { founder: 'Priya Sharma', startup: 'NeuralFarm', topic: 'Go-to-market strategy', stage: 'Seed' },
  { founder: 'David Kim', startup: 'PayLoop', topic: 'Fundraising & pitch', stage: 'Series A' },
  { founder: 'Sara Lopez', startup: 'LearnLoop', topic: 'Product-market fit', stage: 'Pre-seed' },
]

export const mentorMatches = [
  { founder: 'Amir Khan', startup: 'CargoNova', fit: 94, focus: 'Operations scaling' },
  { founder: 'Lena Müller', startup: 'MediSync', fit: 88, focus: 'Regulatory strategy' },
  { founder: 'Tom Becker', startup: 'VoltGrid', fit: 81, focus: 'Hardware GTM' },
]

export const mentorSessions = [
  { founder: 'Priya Sharma', date: 'Mon, 10:00', topic: 'GTM review', status: 'Confirmed' },
  { founder: 'David Kim', date: 'Tue, 14:30', topic: 'Pitch rehearsal', status: 'Confirmed' },
  { founder: 'Sara Lopez', date: 'Thu, 16:00', topic: 'PMF deep dive', status: 'Pending' },
]
