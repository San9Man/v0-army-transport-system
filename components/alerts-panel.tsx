'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, AlertTriangle, Info } from 'lucide-react'

export function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Route Blockage',
      message: 'NH-1 North blocked due to accident, 8 km backup',
      time: '5 min ago',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Fuel Alert',
      message: 'Vehicle V-105 fuel level below 20%',
      time: '12 min ago',
    },
    {
      id: 3,
      type: 'info',
      title: 'Checkpoint Update',
      message: 'Checkpoint-3 reports clear conditions',
      time: '18 min ago',
    },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-destructive" />
        Active Alerts
      </h2>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border ${
              alert.type === 'critical'
                ? 'bg-destructive/10 border-destructive/30'
                : alert.type === 'warning'
                ? 'bg-accent/10 border-accent/30'
                : 'bg-primary/10 border-primary/30'
            }`}
          >
            <div className="flex gap-3">
              {alert.type === 'critical' && (
                <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
              )}
              {alert.type === 'warning' && (
                <AlertCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              )}
              {alert.type === 'info' && (
                <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{alert.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                <p className="text-xs text-muted-foreground/70 mt-2">{alert.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
