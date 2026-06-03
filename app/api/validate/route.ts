import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

interface ValidationInput {
  name: string
  description: string
  industry: string
  stage: string
  problemStatement?: string
  targetMarket?: string
  solution?: string
}

export async function POST(req: NextRequest) {
  try {
    const input = await req.json() as ValidationInput

    const prompt = `You are a startup validation expert. Analyze this startup idea and provide detailed scoring.

Startup: ${input.name}
Description: ${input.description}
Industry: ${input.industry}
Stage: ${input.stage}
${input.problemStatement ? `Problem: ${input.problemStatement}` : ''}
${input.targetMarket ? `Target Market: ${input.targetMarket}` : ''}
${input.solution ? `Solution: ${input.solution}` : ''}

Provide a validation analysis as JSON (no markdown, just pure JSON):
{
  "scores": {
    "innovation": {
      "score": 75,
      "label": "Innovation Score",
      "description": "How unique and innovative is this solution"
    },
    "marketDemand": {
      "score": 82,
      "label": "Market Demand",
      "description": "Is there real market demand for this solution"
    },
    "competition": {
      "score": 68,
      "label": "Competition Score",
      "description": "How differentiated from competitors (higher = less competition)"
    },
    "fundingPotential": {
      "score": 78,
      "label": "Funding Potential",
      "description": "Likelihood of attracting investor interest"
    },
    "executionFeasibility": {
      "score": 71,
      "label": "Execution Feasibility",
      "description": "How feasible is it to build and scale this"
    }
  },
  "overallScore": 75,
  "successProbability": 68,
  "insights": [
    "Strong market timing with growing demand in ${input.industry}",
    "Clear problem-solution fit for target audience",
    "Moderate competitive landscape requires differentiation"
  ],
  "recommendations": [
    {
      "category": "Product",
      "priority": "high",
      "action": "Focus on building a strong MVP with core differentiated features"
    },
    {
      "category": "Market",
      "priority": "medium",
      "action": "Conduct customer discovery interviews to validate assumptions"
    },
    {
      "category": "Team",
      "priority": "high",
      "action": "Consider adding a technical co-founder if not already present"
    },
    {
      "category": "Funding",
      "priority": "medium",
      "action": "Prepare pitch materials highlighting market opportunity"
    }
  ],
  "riskFactors": [
    {
      "risk": "Market risk",
      "level": "medium",
      "description": "Market size assumptions need validation"
    },
    {
      "risk": "Competition risk",
      "level": "high",
      "description": "Large players may enter this space"
    },
    {
      "risk": "Execution risk",
      "level": "medium",
      "description": "Technical complexity requires skilled team"
    }
  ]
}

All scores should be between 0-100. Be realistic and provide actionable feedback.`

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4-20250514',
      prompt,
      maxTokens: 2000,
    })

    // Parse JSON response
    let jsonStr = text.trim()
    if (jsonStr.startsWith('```json')) jsonStr = jsonStr.slice(7)
    else if (jsonStr.startsWith('```')) jsonStr = jsonStr.slice(3)
    if (jsonStr.endsWith('```')) jsonStr = jsonStr.slice(0, -3)
    
    const result = JSON.parse(jsonStr.trim())
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
