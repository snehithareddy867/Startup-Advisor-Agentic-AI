import { z } from 'zod'

// ─── Common ───────────────────────────────────────────────────────────────────
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
})

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['founder', 'investor', 'mentor']),
})

// ─── Startup ──────────────────────────────────────────────────────────────────
export const startupSchema = z.object({
  name: z.string().min(2, 'Startup name must be at least 2 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  industry: z.string().min(1, 'Industry is required'),
  stage: z.enum(['idea', 'pre-seed', 'seed', 'series-a', 'series-b', 'growth']),
  teamSize: z.number().int().positive().optional(),
  fundingGoal: z.number().positive().optional(),
  website: z.string().url().optional().or(z.literal('')),
  pitch: z.string().optional(),
})

// ─── Agent Input ──────────────────────────────────────────────────────────────
export const startupInputSchema = z.object({
  startupName: z.string().min(1, 'Startup name is required'),
  industry: z.string().min(1, 'Industry is required'),
  problem: z.string().min(10, 'Problem description is required'),
  solution: z.string().min(10, 'Solution description is required'),
  targetMarket: z.string().min(1, 'Target market is required'),
  businessModel: z.string().min(1, 'Business model is required'),
  stage: z.string().optional(),
  teamSize: z.number().optional(),
  fundingGoal: z.number().optional(),
})

export const agentRequestSchema = z.object({
  input: startupInputSchema,
  agentId: z.string().optional(),
  previousResults: z.record(z.unknown()).optional(),
})

// ─── Chat ─────────────────────────────────────────────────────────────────────
export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1, 'Message content is required'),
})

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1, 'At least one message is required'),
})

// ─── Investor ─────────────────────────────────────────────────────────────────
export const investorFilterSchema = z.object({
  industry: z.string().optional(),
  minTicket: z.coerce.number().optional(),
  maxTicket: z.coerce.number().optional(),
  stage: z.string().optional(),
})

// ─── Types ────────────────────────────────────────────────────────────────────
export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type StartupInput = z.infer<typeof startupSchema>
export type AgentRequest = z.infer<typeof agentRequestSchema>
export type ChatRequest = z.infer<typeof chatRequestSchema>
