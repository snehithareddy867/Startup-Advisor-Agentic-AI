'use client'

import { Sidebar } from '@/components/portal/sidebar'
import { PortalHeader } from '@/components/portal/portal-header'

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="investor" />
      <div className="md:pl-64">
        <PortalHeader
          title="Investor Dashboard"
          subtitle="Your deal flow at a glance"
          userName="Sarah Kim"
          userRole="investor"
        />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
