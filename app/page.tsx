'use client'

import { useState } from 'react'
import { AlertCircle, Map, Truck, Zap, Menu, Bell, Settings, LogOut } from 'lucide-react'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { ConvoyMap } from '@/components/convoy-map'
import { FleetStatus } from '@/components/fleet-status'
import { RouteOptimization } from '@/components/route-optimization'
import { AlertsPanel } from '@/components/alerts-panel'
import { MetricsOverview } from '@/components/metrics-overview'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Top Metrics */}
            <MetricsOverview />

            {/* Main Content Grid */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ConvoyMap />
                </div>
                <div className="space-y-6">
                  <AlertsPanel />
                  <FleetStatus />
                </div>
              </div>
            )}

            {activeTab === 'optimization' && (
              <RouteOptimization />
            )}

            {activeTab === 'fleet' && (
              <FleetStatus fullPage />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
