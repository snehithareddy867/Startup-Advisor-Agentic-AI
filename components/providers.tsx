'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { NotificationProvider } from '@/components/notifications/notification-provider'
import { AuthProvider } from '@/components/auth/auth-provider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <NotificationProvider>
        <AuthProvider>{children}</AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}
