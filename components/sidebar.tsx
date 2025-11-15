'use client'

import { Map, Truck, Zap, AlertCircle, BarChart3, Settings, Radar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: Map },
  { id: 'optimization', label: 'Route Optimization', icon: Zap },
  { id: 'fleet', label: 'Fleet Management', icon: Truck },
  { id: 'tracking', label: 'Vehicle Tracking', icon: Radar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
]

export function Sidebar({ open, setOpen, activeTab, setActiveTab }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out flex flex-col",
          !open && "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-sidebar-border">
          <div className="text-sm font-semibold text-sidebar-foreground">NAVIGATION</div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className={cn(
                  "w-full justify-start gap-3",
                  activeTab === item.id && "bg-sidebar-primary text-sidebar-primary-foreground"
                )}
                onClick={() => {
                  setActiveTab(item.id)
                  setOpen(false)
                }}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <div className="text-xs text-sidebar-foreground/60">SYSTEM STATUS</div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-sidebar-foreground">All Systems Online</span>
          </div>
        </div>
      </aside>
    </>
  )
}
