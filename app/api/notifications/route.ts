import { Server as SocketIOServer } from 'socket.io'
import { NextRequest, NextResponse } from 'next/server'

// Store socket connections (in production, use Redis)
const connectedUsers = new Map<string, string>()

let io: SocketIOServer | null = null

export async function GET(req: NextRequest) {
  return NextResponse.json({ 
    status: 'Socket.IO endpoint active',
    connectedUsers: connectedUsers.size 
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, type, data } = body

    // Emit notification to specific user or broadcast
    if (io) {
      if (userId && connectedUsers.has(userId)) {
        const socketId = connectedUsers.get(userId)
        io.to(socketId!).emit('notification', data)
      } else {
        // Broadcast to all connected clients
        io.emit('notification', data)
      }
    }

    return NextResponse.json({ success: true, message: 'Notification sent' })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

// Note: Socket.IO requires a custom server setup in Next.js
// This API route is for sending notifications via HTTP
// For full WebSocket support, configure socket.io in a custom server
