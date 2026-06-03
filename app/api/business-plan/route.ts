import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

interface BusinessPlanInput {
  startupName: string
  description: string
  industry: string
  stage: string
  targetMarket?: string
  sectionToRegenerate?: string
}

export async function POST(req: NextRequest) {
  try {
    const input = await req.json() as BusinessPlanInput

    const sectionPrompts: Record<string, string> = {
      'executive-summary': 'Write a compelling executive summary for this startup. Include the problem being solved, the solution, target market, business model, and key differentiators.',
      'problem-solution': 'Detail the problem this startup solves and explain the unique solution approach. Include pain points, current alternatives, and why this solution is better.',
      'market-analysis': 'Provide a comprehensive market analysis including TAM, SAM, SOM calculations, market trends, and growth projections.',
      'competitive-analysis': 'Analyze the competitive landscape including direct and indirect competitors, their strengths/weaknesses, and this startup\'s competitive advantages.',
      'business-model': 'Define the business model including revenue streams, pricing strategy, cost structure, and path to profitability.',
      'go-to-market': 'Create a go-to-market strategy including customer acquisition channels, marketing approach, sales strategy, and growth tactics.',
      'team': 'Outline the ideal team structure, key roles needed, and organizational considerations for this startup.',
      'risk-analysis': 'Identify key risks (market, technical, financial, operational) and propose mitigation strategies.',
    }

    const sectionKey = input.sectionToRegenerate || 'executive-summary'
    const sectionPrompt = sectionPrompts[sectionKey] || sectionPrompts['executive-summary']

    const prompt = `You are an expert business plan writer and startup advisor. Generate content for a business plan section.

Startup: ${input.startupName}
Description: ${input.description}
Industry: ${input.industry}
Stage: ${input.stage}
${input.targetMarket ? `Target Market: ${input.targetMarket}` : ''}

Task: ${sectionPrompt}

Respond with a JSON object containing:
{
  "sectionId": "${sectionKey}",
  "title": "Section Title",
  "content": "Detailed section content with multiple paragraphs...",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "actionItems": ["Action item 1", "Action item 2"],
  "estimatedCompleteness": 85
}

Be specific, actionable, and professional. Use real industry data and benchmarks where relevant.`

    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4-20250514',
      prompt,
      maxTokens: 2500,
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
