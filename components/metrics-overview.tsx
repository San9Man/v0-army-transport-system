'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, AlertCircle, Zap, Truck } from 'lucide-react'

export function MetricsOverview() {
  const metrics = [
    {
      label: 'Active Convoys',
      value: '12',
      change: '+3 from yesterday',
      icon: Truck,
      color: 'from-primary',
    },
    {
      label: 'Fleet Utilization',
      value: '87%',
      change: '+5% improvement',
      icon: TrendingUp,
      color: 'from-secondary',
    },
    {
      label: 'Route Efficiency',
      value: '92%',
      change: '+2 average routes',
      icon: Zap,
      color: 'from-accent',
    },
    {
      label: 'Active Alerts',
      value: '3',
      change: '1 critical alert',
      icon: AlertCircle,
      color: 'from-destructive',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.label} className="p-6 bg-card border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{metric.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{metric.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color} to-transparent opacity-10`}>
                <Icon className="h-6 w-6 text-foreground" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
