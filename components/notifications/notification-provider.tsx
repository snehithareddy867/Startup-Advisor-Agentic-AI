'use client'

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import { toast } from 'sonner'

export type NotificationType = 
  | 'investor_interested'
  | 'mentor_accepted'
  | 'startup_match'
  | 'business_plan_generated'
  | 'funding_milestone'
  | 'system'
  | 'success'
  | 'error'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionLabel?: string
  avatar?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  connected: boolean
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotification: (id: string) => void
  clearAll: () => void
  simulateNotification: (type: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const DEMO_NOTIFICATIONS: Omit<Notification, 'id' | 'timestamp' | 'read'>[] = [
  {
    type: 'investor_interested',
    title: 'Investor Interest',
    message: 'Sarah Chen from Reach Capital wants to schedule a call about StudySync AI',
    actionUrl: '/founder/investors',
    actionLabel: 'View Profile',
    avatar: 'SC',
  },
  {
    type: 'mentor_accepted',
    title: 'Mentor Request Accepted',
    message: 'Dr. Angela Williams has accepted your mentorship request',
    actionUrl: '/founder/mentors',
    actionLabel: 'Schedule Session',
    avatar: 'AW',
  },
  {
    type: 'business_plan_generated',
    title: 'Business Plan Ready',
    message: 'Your AI-generated business plan is complete and ready for review',
    actionUrl: '/founder/business-plan',
    actionLabel: 'View Plan',
  },
  {
    type: 'funding_milestone',
    title: 'Funding Milestone',
    message: "Congratulations! You've reached 80% of your seed funding goal",
    actionUrl: '/founder/financials',
    actionLabel: 'View Progress',
  },
]

// Notification templates for simulating real-time events
const NOTIFICATION_TEMPLATES: Record<NotificationType, Omit<Notification, 'id' | 'timestamp' | 'read'>[]> = {
  investor_interested: [
    {
      type: 'investor_interested',
      title: 'New Investor Interest',
      message: 'James Martinez from Owl Ventures viewed your pitch deck and wants to connect',
      actionUrl: '/founder/investors',
      actionLabel: 'View Investor',
      avatar: 'JM',
    },
    {
      type: 'investor_interested',
      title: 'Investment Inquiry',
      message: 'Emily Rodriguez from GSV Ventures requested access to your data room',
      actionUrl: '/founder/investors',
      actionLabel: 'Grant Access',
      avatar: 'ER',
    },
  ],
  mentor_accepted: [
    {
      type: 'mentor_accepted',
      title: 'Mentorship Confirmed',
      message: 'David Kim has accepted your mentorship request for growth strategy',
      actionUrl: '/founder/mentors',
      actionLabel: 'Schedule Call',
      avatar: 'DK',
    },
    {
      type: 'mentor_accepted',
      title: 'Session Scheduled',
      message: 'Sarah Johnson confirmed your mentoring session for tomorrow at 2pm',
      actionUrl: '/founder/mentors',
      actionLabel: 'View Calendar',
      avatar: 'SJ',
    },
  ],
  startup_match: [
    {
      type: 'startup_match',
      title: 'New Match Found',
      message: 'Your startup has a 95% match with 3 new investors in your space',
      actionUrl: '/founder/investors',
      actionLabel: 'View Matches',
    },
    {
      type: 'startup_match',
      title: 'Portfolio Fit Alert',
      message: 'TechStart Ventures flagged your startup as a strong portfolio fit',
      actionUrl: '/founder/investors',
      actionLabel: 'Learn More',
    },
  ],
  business_plan_generated: [
    {
      type: 'business_plan_generated',
      title: 'Analysis Complete',
      message: 'Your competitive analysis has been updated with 5 new market insights',
      actionUrl: '/founder/business-plan',
      actionLabel: 'Review',
    },
    {
      type: 'business_plan_generated',
      title: 'SWOT Updated',
      message: 'AI has identified 2 new opportunities based on market trends',
      actionUrl: '/founder/business-plan',
      actionLabel: 'See Changes',
    },
  ],
  funding_milestone: [
    {
      type: 'funding_milestone',
      title: 'Funding Progress',
      message: 'You just passed 50% of your funding goal! Keep the momentum going',
      actionUrl: '/founder/financials',
      actionLabel: 'View Dashboard',
    },
    {
      type: 'funding_milestone',
      title: 'Term Sheet Received',
      message: 'Reach Capital has submitted a term sheet for review',
      actionUrl: '/founder/investors',
      actionLabel: 'Review Terms',
    },
  ],
  system: [
    {
      type: 'system',
      title: 'System Update',
      message: 'New features available: Enhanced pitch deck generator',
      actionUrl: '/settings',
      actionLabel: 'Learn More',
    },
  ],
  success: [
    {
      type: 'success',
      title: 'Action Completed',
      message: 'Your changes have been saved successfully',
    },
  ],
  error: [
    {
      type: 'error',
      title: 'Action Failed',
      message: 'Something went wrong. Please try again.',
    },
  ],
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [connected, setConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  // Load initial notifications
  useEffect(() => {
    const loadNotifications = () => {
      const storedNotifications = localStorage.getItem('startupadvisor:notifications')
      if (storedNotifications) {
        const parsed = JSON.parse(storedNotifications)
        setNotifications(parsed.map((n: Notification) => ({ ...n, timestamp: new Date(n.timestamp) })))
      } else {
        // Add demo notifications with staggered timestamps
        const demoWithTimestamps = DEMO_NOTIFICATIONS.map((n, i) => ({
          ...n,
          id: `demo-${i}`,
          timestamp: new Date(Date.now() - (i * 60 * 60 * 1000)),
          read: false,
        }))
        setNotifications(demoWithTimestamps)
      }
    }
    loadNotifications()
  }, [])

  // Initialize Socket.IO connection
  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || ''
    
    // Only connect if socket URL is configured
    if (socketUrl) {
      socketRef.current = io(socketUrl, {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      })

      socketRef.current.on('connect', () => {
        console.log('[v0] Socket connected')
        setConnected(true)
      })

      socketRef.current.on('disconnect', () => {
        console.log('[v0] Socket disconnected')
        setConnected(false)
      })

      socketRef.current.on('notification', (data: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
        const newNotification: Notification = {
          ...data,
          id: `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          timestamp: new Date(),
          read: false,
        }
        setNotifications(prev => [newNotification, ...prev])
        
        // Show toast for new notifications
        toast(data.title, {
          description: data.message,
          action: data.actionUrl ? {
            label: data.actionLabel || 'View',
            onClick: () => window.location.href = data.actionUrl!,
          } : undefined,
        })
      })

      return () => {
        socketRef.current?.disconnect()
      }
    }
  }, [])

  // Persist notifications
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('startupadvisor:notifications', JSON.stringify(notifications))
    }
  }, [notifications])

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      timestamp: new Date(),
      read: false,
    }
    setNotifications(prev => [newNotification, ...prev])
    
    // Show toast
    toast(notification.title, {
      description: notification.message,
      action: notification.actionUrl ? {
        label: notification.actionLabel || 'View',
        onClick: () => window.location.href = notification.actionUrl!,
      } : undefined,
    })
  }, [])

  const simulateNotification = useCallback((type: NotificationType) => {
    const templates = NOTIFICATION_TEMPLATES[type]
    const template = templates[Math.floor(Math.random() * templates.length)]
    addNotification(template)
  }, [addNotification])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const clearNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    localStorage.removeItem('startupadvisor:notifications')
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        connected,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAll,
        simulateNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}
