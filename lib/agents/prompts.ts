// AI prompts for each agent in the multi-agent system

import type { StartupInput, FounderAgentOutput, MarketResearchOutput, BusinessPlanOutput, FinancialOutput, InvestorMatchOutput, MentorMatchOutput } from './types'

export function getFounderAgentPrompt(input: StartupInput): string {
  return `You are the Founder Agent in a multi-agent startup advisory system. Your role is to understand and refine the startup idea, extract key information, and prepare it for downstream agents.

Analyze this startup:
- Name: ${input.name}
- Description: ${input.description}
- Industry: ${input.industry}
- Stage: ${input.stage}
${input.targetMarket ? `- Target Market: ${input.targetMarket}` : ''}
${input.problemStatement ? `- Problem Statement: ${input.problemStatement}` : ''}
${input.solution ? `- Solution: ${input.solution}` : ''}

Provide a JSON response with EXACTLY this structure (no markdown, just pure JSON):
{
  "refinedIdea": "A clear, compelling 2-3 sentence description of the startup concept",
  "industry": "The primary industry category",
  "problemStatement": "A clear articulation of the problem being solved",
  "targetAudience": "Specific description of the target customers",
  "uniqueValueProposition": "What makes this startup unique and valuable",
  "keyFeatures": ["feature1", "feature2", "feature3", "feature4", "feature5"]
}`
}

export function getMarketResearchPrompt(input: StartupInput, founderOutput: FounderAgentOutput): string {
  return `You are the Market Research Agent. Analyze the market opportunity for this startup.

Startup: ${input.name}
Industry: ${founderOutput.industry}
Problem: ${founderOutput.problemStatement}
Target Audience: ${founderOutput.targetAudience}
Value Proposition: ${founderOutput.uniqueValueProposition}

Provide market analysis as JSON (no markdown, just pure JSON):
{
  "tam": { "value": 50000000000, "description": "Total Addressable Market explanation" },
  "sam": { "value": 5000000000, "description": "Serviceable Available Market explanation" },
  "som": { "value": 500000000, "description": "Serviceable Obtainable Market in first 5 years" },
  "trends": ["trend1", "trend2", "trend3", "trend4"],
  "competitors": [
    {
      "name": "Competitor 1",
      "description": "Brief description",
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"]
    },
    {
      "name": "Competitor 2",
      "description": "Brief description",
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"]
    },
    {
      "name": "Competitor 3",
      "description": "Brief description",
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1", "weakness2"]
    }
  ],
  "marketGrowthRate": 15.5
}

Use realistic market values in USD. The values should be numbers, not strings.`
}

export function getBusinessPlanPrompt(
  input: StartupInput, 
  founderOutput: FounderAgentOutput, 
  marketOutput: MarketResearchOutput
): string {
  return `You are the Business Plan Agent. Create a comprehensive business plan.

Startup: ${input.name}
Refined Idea: ${founderOutput.refinedIdea}
Industry: ${founderOutput.industry}
Target Audience: ${founderOutput.targetAudience}
Value Proposition: ${founderOutput.uniqueValueProposition}
TAM: $${(marketOutput.tam.value / 1e9).toFixed(1)}B
Market Growth: ${marketOutput.marketGrowthRate}%

Generate a business plan as JSON (no markdown, just pure JSON):
{
  "executiveSummary": "2-3 paragraph executive summary",
  "missionStatement": "One sentence mission",
  "visionStatement": "One sentence vision",
  "revenueModel": "Detailed description of how the company will make money",
  "pricingStrategy": "Pricing approach and tiers",
  "goToMarketStrategy": "How to acquire customers and grow",
  "keyMilestones": [
    { "milestone": "MVP Launch", "timeline": "Q1 2025" },
    { "milestone": "First 100 customers", "timeline": "Q2 2025" },
    { "milestone": "Series A Ready", "timeline": "Q4 2025" },
    { "milestone": "Market Expansion", "timeline": "Q2 2026" }
  ],
  "riskAssessment": [
    { "risk": "Risk description", "mitigation": "Mitigation strategy" },
    { "risk": "Risk description", "mitigation": "Mitigation strategy" },
    { "risk": "Risk description", "mitigation": "Mitigation strategy" }
  ],
  "swotAnalysis": {
    "strengths": ["strength1", "strength2", "strength3"],
    "weaknesses": ["weakness1", "weakness2", "weakness3"],
    "opportunities": ["opportunity1", "opportunity2", "opportunity3"],
    "threats": ["threat1", "threat2", "threat3"]
  }
}`
}

export function getFinancialPrompt(
  input: StartupInput,
  founderOutput: FounderAgentOutput,
  marketOutput: MarketResearchOutput,
  planOutput: BusinessPlanOutput
): string {
  const fundingNeeded = input.fundingNeeded || 1500000
  return `You are the Financial Agent. Create financial projections and funding requirements.

Startup: ${input.name}
Stage: ${input.stage}
Industry: ${founderOutput.industry}
Revenue Model: ${planOutput.revenueModel}
SOM: $${(marketOutput.som.value / 1e6).toFixed(1)}M
Funding Needed: $${(fundingNeeded / 1e6).toFixed(1)}M

Generate financial projections as JSON (no markdown, just pure JSON):
{
  "revenueForecast": [
    { "year": 1, "conservative": 100000, "expected": 250000, "optimistic": 400000 },
    { "year": 2, "conservative": 400000, "expected": 800000, "optimistic": 1200000 },
    { "year": 3, "conservative": 1000000, "expected": 2000000, "optimistic": 3500000 },
    { "year": 4, "conservative": 2500000, "expected": 5000000, "optimistic": 8000000 },
    { "year": 5, "conservative": 5000000, "expected": 10000000, "optimistic": 18000000 }
  ],
  "fundingRequirements": {
    "amount": ${fundingNeeded},
    "useOfFunds": [
      { "category": "Product Development", "percentage": 40, "amount": ${fundingNeeded * 0.4} },
      { "category": "Sales & Marketing", "percentage": 30, "amount": ${fundingNeeded * 0.3} },
      { "category": "Operations", "percentage": 15, "amount": ${fundingNeeded * 0.15} },
      { "category": "Team & Hiring", "percentage": 15, "amount": ${fundingNeeded * 0.15} }
    ],
    "runway": 18
  },
  "unitEconomics": {
    "cac": 150,
    "ltv": 1200,
    "ltvCacRatio": 8,
    "paybackPeriod": 4,
    "grossMargin": 75
  },
  "burnRate": ${Math.round(fundingNeeded / 18)},
  "breakEvenPoint": { "months": 24, "revenue": 2000000 }
}

All monetary values should be numbers representing USD.`
}

export function getInvestorMatchPrompt(
  input: StartupInput,
  founderOutput: FounderAgentOutput,
  marketOutput: MarketResearchOutput,
  financialOutput: FinancialOutput
): string {
  return `You are the Investor Match Agent. Find suitable investors for this startup.

Startup: ${input.name}
Stage: ${input.stage}
Industry: ${founderOutput.industry}
Funding Needed: $${(financialOutput.fundingRequirements.amount / 1e6).toFixed(1)}M
TAM: $${(marketOutput.tam.value / 1e9).toFixed(1)}B
Gross Margin: ${financialOutput.unitEconomics.grossMargin}%

Generate investor matches as JSON (no markdown, just pure JSON):
{
  "topInvestors": [
    {
      "id": "inv1",
      "name": "Sarah Chen",
      "firm": "Sequoia Capital",
      "investmentFocus": ["SaaS", "AI", "Enterprise"],
      "stagePreference": ["Seed", "Series A"],
      "checkSize": { "min": 500000, "max": 5000000 },
      "compatibilityScore": 92,
      "matchReasons": ["Deep expertise in ${founderOutput.industry}", "Active portfolio in similar space", "Hands-on operational support"],
      "riskAppetite": "moderate"
    },
    {
      "id": "inv2",
      "name": "Michael Torres",
      "firm": "Andreessen Horowitz",
      "investmentFocus": ["Consumer Tech", "Marketplace", "Fintech"],
      "stagePreference": ["Seed", "Series A", "Series B"],
      "checkSize": { "min": 1000000, "max": 10000000 },
      "compatibilityScore": 87,
      "matchReasons": ["Strong network in target market", "Experience scaling similar companies", "Platform resources available"],
      "riskAppetite": "aggressive"
    },
    {
      "id": "inv3",
      "name": "Emily Watson",
      "firm": "First Round Capital",
      "investmentFocus": ["B2B", "Developer Tools", "Healthcare"],
      "stagePreference": ["Pre-seed", "Seed"],
      "checkSize": { "min": 250000, "max": 3000000 },
      "compatibilityScore": 84,
      "matchReasons": ["Focus on early-stage companies", "Founder-friendly terms", "Strong community support"],
      "riskAppetite": "moderate"
    },
    {
      "id": "inv4",
      "name": "David Park",
      "firm": "Accel Partners",
      "investmentFocus": ["SaaS", "Security", "Infrastructure"],
      "stagePreference": ["Seed", "Series A"],
      "checkSize": { "min": 750000, "max": 8000000 },
      "compatibilityScore": 79,
      "matchReasons": ["Track record with similar business models", "Global expansion expertise", "Strong LP network"],
      "riskAppetite": "conservative"
    },
    {
      "id": "inv5",
      "name": "Rachel Kim",
      "firm": "Founders Fund",
      "investmentFocus": ["Moonshots", "AI", "Biotech"],
      "stagePreference": ["Seed", "Series A", "Series B"],
      "checkSize": { "min": 2000000, "max": 20000000 },
      "compatibilityScore": 75,
      "matchReasons": ["Appetite for ambitious visions", "Patient capital", "Network access to top talent"],
      "riskAppetite": "aggressive"
    }
  ],
  "overallFundingFit": 85,
  "recommendations": [
    "Focus on investors with ${founderOutput.industry} expertise",
    "Prepare detailed unit economics presentation",
    "Highlight the ${(marketOutput.marketGrowthRate).toFixed(0)}% market growth rate"
  ]
}`
}

export function getMentorMatchPrompt(
  input: StartupInput,
  founderOutput: FounderAgentOutput,
  planOutput: BusinessPlanOutput
): string {
  return `You are the Mentor Match Agent. Find suitable mentors for this startup founder.

Startup: ${input.name}
Stage: ${input.stage}
Industry: ${founderOutput.industry}
Problem: ${founderOutput.problemStatement}
GTM Strategy: ${planOutput.goToMarketStrategy}

Generate mentor matches as JSON (no markdown, just pure JSON):
{
  "topMentors": [
    {
      "id": "mentor1",
      "name": "Jennifer Liu",
      "title": "Former CTO at Stripe",
      "expertise": ["Engineering Leadership", "Scaling Systems", "Developer Experience"],
      "industries": ["Fintech", "Developer Tools", "SaaS"],
      "yearsExperience": 18,
      "compatibilityScore": 94,
      "matchReasons": ["Deep technical expertise", "Experience scaling from 0-100 engineers", "Strong ${founderOutput.industry} background"],
      "availability": "high"
    },
    {
      "id": "mentor2",
      "name": "Marcus Johnson",
      "title": "Serial Entrepreneur, 3 Exits",
      "expertise": ["Fundraising", "Sales Strategy", "Market Expansion"],
      "industries": ["SaaS", "Enterprise", "Healthcare"],
      "yearsExperience": 22,
      "compatibilityScore": 89,
      "matchReasons": ["Multiple successful exits", "Strong investor relationships", "Hands-on GTM experience"],
      "availability": "medium"
    },
    {
      "id": "mentor3",
      "name": "Priya Sharma",
      "title": "VP Growth at Airbnb",
      "expertise": ["Growth Marketing", "Product-Led Growth", "International Expansion"],
      "industries": ["Consumer", "Marketplace", "Travel"],
      "yearsExperience": 15,
      "compatibilityScore": 86,
      "matchReasons": ["Expert in ${planOutput.goToMarketStrategy ? 'go-to-market' : 'growth'} strategies", "Data-driven approach", "Global market experience"],
      "availability": "low"
    },
    {
      "id": "mentor4",
      "name": "Alex Rivera",
      "title": "Partner at Y Combinator",
      "expertise": ["Product Development", "Startup Strategy", "Founder Coaching"],
      "industries": ["All Tech", "B2B", "B2C"],
      "yearsExperience": 12,
      "compatibilityScore": 82,
      "matchReasons": ["Helped 200+ startups", "Network of founders", "Product-market fit expertise"],
      "availability": "medium"
    },
    {
      "id": "mentor5",
      "name": "Sofia Martinez",
      "title": "CFO at Notion",
      "expertise": ["Financial Planning", "Fundraising Strategy", "Unit Economics"],
      "industries": ["SaaS", "Productivity", "Enterprise"],
      "yearsExperience": 20,
      "compatibilityScore": 78,
      "matchReasons": ["Financial modeling expert", "Experience with ${input.stage} stage companies", "Board presentation skills"],
      "availability": "high"
    }
  ],
  "overallMatch": 86,
  "recommendations": [
    "Schedule weekly 30-min sessions with top mentor",
    "Focus on ${founderOutput.industry} specific challenges first",
    "Prepare specific questions about your GTM strategy"
  ]
}`
}
