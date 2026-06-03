'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  X,
  Check,
  CheckCheck,
  Trash2,
  Users,
  GraduationCap,
  FileText,
  DollarSign,
  Sparkles,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { useNotifications, type Notification, type NotificationType } from './notification-provider'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

const notificationIcons: Record<NotificationType, typeof Bell> = {
  investor_interested: Users,
  mentor_accepted: GraduationCap,
  startup_match: Sparkles,
  business_plan_generated: FileText,
  funding_milestone: DollarSign,
  system: Bell,
  success: Check,
  error: AlertCircle,
}

const notificationColors: Record<NotificationType, string> = {
  investor_interested: 'bg-chart-4/20 text-chart-4',
  mentor_accepted: 'bg-chart-5/20 text-chart-5',
  startup_match: 'bg-primary/20 text-primary',
  business_plan_generated: 'bg-accent/20 text-accent',
  funding_milestone: 'bg-emerald/20 text-emerald',
  system: 'bg-muted text-muted-foreground',
  success: 'bg-emerald/20 text-emerald',
  error: 'bg-destructive/20 text-destructive',
}

function NotificationItem({ notification, onRead, onClear }: { 
  notification: Notification
  onRead: () => void
  onClear: () => void
}) {
  const Icon = notificationIcons[notification.type]
  const colorClass = notificationColors[notification.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={cn(
        'group relative flex gap-3 rounded-lg border border-border/50 p-3 transition-colors',
        notification.read ? 'bg-card/30' : 'bg-card/80'
      )}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <div className="absolute left-1.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary" />
      )}

      {/* Avatar or Icon */}
      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', colorClass)}>
        {notification.avatar ? (
          <span className="text-sm font-semibold">{notification.avatar}</span>
        ) : (
          <Icon className="h-5 w-5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className={cn('text-sm font-medium', notification.read ? 'text-muted-foreground' : 'text-foreground')}>
            {notification.title}
          </h4>
          <span className="shrink-0 text-[10px] text-muted-foreground">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
        
        {notification.actionUrl && (
          <Link
            href={notification.actionUrl}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            onClick={onRead}
          >
            {notification.actionLabel || 'View'}
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {!notification.read && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onRead}
          >
            <Check className="h-3 w-3" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
          onClick={onClear}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  )
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
  } = useNotifications()

  return (
    <>
      {/* Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9"
        onClick={() => setIsOpen(true)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-border bg-card shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                      <CheckCheck className="mr-1 h-3 w-3" />
                      Mark all read
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <ScrollArea className="h-[calc(100vh-120px)]">
                <div className="space-y-2 p-4">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground/30" />
                      <p className="mt-4 text-sm text-muted-foreground">No notifications yet</p>
                    </div>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {notifications.map(notification => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          onRead={() => markAsRead(notification.id)}
                          onClear={() => clearNotification(notification.id)}
                        />
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </ScrollArea>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-card p-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs text-muted-foreground"
                    onClick={clearAll}
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Clear all notifications
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
