import { generateText } from 'ai'
import { NextRequest } from 'next/server'
import type { AgentId } from '@/lib/agents/types'
import { AGENT_ORDER, AGENT_NAMES } from '@/lib/agents/types'
import {
  getFounderAgentPrompt,
  getMarketResearchPrompt,
  getBusinessPlanPrompt,
  getFinancialPrompt,
  getInvestorMatchPrompt,
  getMentorMatchPrompt,
} from '@/lib/agents/prompts'
import { successResponse, handleApiError, parseJsonResponse } from '@/lib/api/errors'
import { parseBody, withErrorHandling } from '@/lib/api/handlers'
import { agentRequestSchema } from '@/lib/validation'
import { AI_MODEL, AI_MAX_TOKENS } from '@/lib/constants'

async function runSingleAgent(
  agentId: AgentId,
  input: Record<string, unknown>,
  results: Record<string, unknown>
) {
  let prompt: string

  switch (agentId) {
    case 'founder':
      prompt = getFounderAgentPrompt(input as never)
      break
    case 'market':
      if (!results.founder) throw new Error('Founder agent must run first')
      prompt = getMarketResearchPrompt(input as never, results.founder as never)
      break
    case 'plan':
      if (!results.founder || !results.market) throw new Error('Previous agents must run first')
      prompt = getBusinessPlanPrompt(input as never, results.founder as never, results.market as never)
      break
    case 'financial':
      if (!results.founder || !results.market || !results.plan) throw new Error('Previous agents must run first')
      prompt = getFinancialPrompt(input as never, results.founder as never, results.market as never, results.plan as never)
      break
    case 'investor':
      if (!results.founder || !results.market || !results.financial) throw new Error('Previous agents must run first')
      prompt = getInvestorMatchPrompt(input as never, results.founder as never, results.market as never, results.financial as never)
      break
    case 'mentor':
      if (!results.founder || !results.plan) throw new Error('Previous agents must run first')
      prompt = getMentorMatchPrompt(input as never, results.founder as never, results.plan as never)
      break
    default:
      throw new Error(`Unknown agent: ${agentId}`)
  }

  const { text } = await generateText({
    model: AI_MODEL as never,
    prompt,
    maxTokens: AI_MAX_TOKENS,
  })

  return parseJsonResponse(text)
}

export const POST = withErrorHandling(async (req: NextRequest) => {
  const { input, agentId, previousResults } = await parseBody(req, agentRequestSchema)

  // Run a specific agent
  if (agentId) {
    const result = await runSingleAgent(agentId as AgentId, input as never, previousResults ?? {})
    return successResponse({ agentId, result })
  }

  // Run the full workflow sequentially
  const results: Record<string, unknown> = {}
  const logs: Array<{ agent: AgentId; status: 'success' | 'error'; message: string }> = []

  for (const agent of AGENT_ORDER) {
    try {
      const result = await runSingleAgent(agent, input as never, results)
      results[agent] = result
      logs.push({ agent, status: 'success', message: `${AGENT_NAMES[agent]} completed` })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      logs.push({ agent, status: 'error', message })
      throw new Error(`Agent ${agent} failed: ${message}`)
    }
  }

  return successResponse({ results, logs })
})
