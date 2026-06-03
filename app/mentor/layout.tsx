'use client'

import { Sidebar } from '@/components/portal/sidebar'
import { PortalHeader } from '@/components/portal/portal-header'

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="mentor" />
      <div className="md:pl-64">
        <PortalHeader
          title="Mentor Dashboard"
          subtitle="Guide the next generation"
          userName="Elena Rossi"
          userRole="mentor"
        />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
