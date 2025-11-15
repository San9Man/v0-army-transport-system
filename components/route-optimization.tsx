'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, Route, TrendingUp } from 'lucide-react'

export function RouteOptimization() {
  const routes = [
    {
      id: 'R-001',
      from: 'Base-A',
      to: 'Forward Post 1',
      distance: '145 km',
      time: '3h 20m',
      efficiency: '92%',
      vehicles: 3,
      status: 'optimized',
    },
    {
      id: 'R-002',
      from: 'Base-B',
      to: 'Supply Depot',
      distance: '89 km',
      time: '2h 15m',
      efficiency: '88%',
      vehicles: 2,
      status: 'optimized',
    },
    {
      id: 'R-003',
      from: 'Forward Post 2',
      to: 'Base-A',
      distance: '167 km',
      time: '3h 45m',
      efficiency: '85%',
      vehicles: 4,
      status: 'pending-approval',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Route Efficiency</p>
              <p className="text-3xl font-bold text-foreground mt-2">88%</p>
            </div>
            <Zap className="h-8 w-8 text-secondary opacity-30" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Distance</p>
              <p className="text-3xl font-bold text-foreground mt-2">401 km</p>
            </div>
            <Route className="h-8 w-8 text-primary opacity-30" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Est. Time Saved</p>
              <p className="text-3xl font-bold text-foreground mt-2">1h 40m</p>
            </div>
            <TrendingUp className="h-8 w-8 text-accent opacity-30" />
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-card border-border">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Route className="h-5 w-5" />
          Route Recommendations
        </h2>

        <div className="space-y-4">
          {routes.map((route) => (
            <div key={route.id} className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">{route.id}: {route.from} → {route.to}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {route.distance} | {route.time} | {route.vehicles} vehicles
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    route.efficiency >= 90 ? 'text-green-500' : 'text-accent'
                  }`}>
                    {route.efficiency} Efficient
                  </p>
                  <p className={`text-xs mt-1 ${
                    route.status === 'optimized' ? 'text-green-500' : 'text-accent'
                  }`}>
                    {route.status === 'optimized' ? 'Optimized' : 'Pending Approval'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="default" className="flex-1">
                  Approve Route
                </Button>
                <Button size="sm" variant="outline">
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
