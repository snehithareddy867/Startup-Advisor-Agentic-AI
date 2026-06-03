'use client'

import { Sidebar } from '@/components/portal/sidebar'
import { PortalHeader } from '@/components/portal/portal-header'

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="founder" />
      <div className="md:pl-64">
        <PortalHeader
          title="Dashboard"
          subtitle="Welcome back, Alex"
          userName="Alex Chen"
          userRole="founder"
        />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
