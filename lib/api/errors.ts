import { NextResponse } from 'next/server'

// ─── Error Types ──────────────────────────────────────────────────────────────
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends ApiError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

// ─── Response Helpers ─────────────────────────────────────────────────────────
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function createdResponse<T>(data: T) {
  return successResponse(data, 201)
}

export function errorResponse(message: string, status = 500, code?: string) {
  return NextResponse.json({ success: false, error: message, code }, { status })
}

// ─── Error Handler ────────────────────────────────────────────────────────────
export function handleApiError(error: unknown) {
  console.error('[API Error]', error)

  if (error instanceof ApiError) {
    return errorResponse(error.message, error.statusCode, error.code)
  }

  if (error instanceof Error) {
    return errorResponse(error.message)
  }

  return errorResponse('An unexpected error occurred')
}

// ─── JSON Parser ──────────────────────────────────────────────────────────────
export function parseJsonResponse<T>(text: string): T {
  let jsonStr = text.trim()
  if (jsonStr.startsWith('```json')) jsonStr = jsonStr.slice(7)
  else if (jsonStr.startsWith('```')) jsonStr = jsonStr.slice(3)
  if (jsonStr.endsWith('```')) jsonStr = jsonStr.slice(0, -3)
  return JSON.parse(jsonStr.trim()) as T
}
