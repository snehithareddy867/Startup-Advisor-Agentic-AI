import { NextRequest } from 'next/server'
import { ZodSchema } from 'zod'
import { ValidationError, handleApiError } from './errors'

// ─── Request Parser ───────────────────────────────────────────────────────────
export async function parseBody<T>(req: NextRequest, schema: ZodSchema<T>): Promise<T> {
  try {
    const body = await req.json()
    const result = schema.safeParse(body)

    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join(', ')
      throw new ValidationError(message)
    }

    return result.data
  } catch (error) {
    if (error instanceof ValidationError) throw error
    throw new ValidationError('Invalid request body')
  }
}

export function parseSearchParams<T>(
  searchParams: URLSearchParams,
  schema: ZodSchema<T>
): T {
  const params = Object.fromEntries(searchParams.entries())
  const result = schema.safeParse(params)

  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join(', ')
    throw new ValidationError(message)
  }

  return result.data
}

// ─── Route Handler Wrapper ────────────────────────────────────────────────────
type HandlerFn = (req: NextRequest) => Promise<Response>

export function withErrorHandling(handler: HandlerFn): HandlerFn {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      return handleApiError(error)
    }
  }
}
