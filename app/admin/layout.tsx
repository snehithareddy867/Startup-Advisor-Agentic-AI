'use client'

import { Sidebar } from '@/components/portal/sidebar'
import { PortalHeader } from '@/components/portal/portal-header'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="md:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">Platform management</p>
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
