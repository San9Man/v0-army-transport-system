'use client'

import { Card } from '@/components/ui/card'
import { MapPin, Navigation2, AlertTriangle } from 'lucide-react'

export function ConvoyMap() {
  const convoys = [
    { id: 'C-001', status: 'on-route', position: 'NH-1, 45 km from destination', eta: '14:30' },
    { id: 'C-002', status: 'on-route', position: 'Route-7, checkpoint 3 cleared', eta: '15:45' },
    { id: 'C-003', status: 'alert', position: 'Route-12, minor traffic congestion', eta: '16:20' },
    { id: 'C-004', status: 'completed', position: 'Base-A, unloading in progress', eta: 'Completed' },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Real-Time Convoy Tracking
        </h2>
        <div className="text-xs text-muted-foreground">Last updated: 2 min ago</div>
      </div>

      {/* Map placeholder */}
      <div className="w-full h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border flex items-center justify-center mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(68,68,68,.05)_25%,rgba(68,68,68,.05)_26%,transparent_27%,transparent_74%,rgba(68,68,68,.05)_75%,rgba(68,68,68,.05)_76%,transparent_77%,transparent),linear-gradient(0deg,transparent_24%,rgba(68,68,68,.05)_25%,rgba(68,68,68,.05)_26%,transparent_27%,transparent_74%,rgba(68,68,68,.05)_75%,rgba(68,68,68,.05)_76%,transparent_77%,transparent)] bg-[50px_50px]"></div>
        <div className="relative z-10 text-center">
          <Navigation2 className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">GIS Map Integration</p>
          <p className="text-xs text-muted-foreground mt-1">Real-time geospatial visualization</p>
        </div>
      </div>

      {/* Convoy list */}
      <div className="space-y-3">
        {convoys.map((convoy) => (
          <div
            key={convoy.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
          >
            <div className={`h-3 w-3 rounded-full mt-1.5 flex-shrink-0 ${
              convoy.status === 'on-route' ? 'bg-primary' :
              convoy.status === 'alert' ? 'bg-destructive' :
              'bg-green-500'
            }`}></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground text-sm">{convoy.id}</p>
                {convoy.status === 'alert' && (
                  <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{convoy.position}</p>
              <p className="text-xs text-muted-foreground mt-1">ETA: {convoy.eta}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
