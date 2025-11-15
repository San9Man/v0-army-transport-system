'use client'

import { Card } from '@/components/ui/card'
import { Truck, AlertCircle, CheckCircle } from 'lucide-react'

interface FleetStatusProps {
  fullPage?: boolean
}

export function FleetStatus({ fullPage }: FleetStatusProps) {
  const vehicles = [
    { id: 'V-101', type: 'Heavy Cargo', status: 'active', capacity: '95%', health: 'Good' },
    { id: 'V-102', type: 'Personnel', status: 'active', capacity: '78%', health: 'Good' },
    { id: 'V-103', type: 'Supply', status: 'maintenance', capacity: '0%', health: 'Maintenance' },
    { id: 'V-104', type: 'Fuel', status: 'standby', capacity: '60%', health: 'Good' },
    { id: 'V-105', type: 'Command', status: 'active', capacity: '50%', health: 'Alert' },
  ]

  return (
    <Card className={`bg-card border-border ${fullPage ? 'p-6' : 'p-6'}`}>
      <div className="flex items-center gap-2 mb-6">
        <Truck className="h-5 w-5 text-secondary" />
        <h2 className="text-lg font-semibold text-foreground">Fleet Status</h2>
      </div>

      <div className={fullPage ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-3'}>
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-foreground text-sm">{vehicle.id}</p>
                <p className="text-xs text-muted-foreground">{vehicle.type}</p>
              </div>
              {vehicle.status === 'active' && (
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              )}
              {vehicle.health === 'Alert' && (
                <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
              )}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Capacity</span>
                <span className="text-foreground">{vehicle.capacity}</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: vehicle.capacity }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Health: {vehicle.health}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
