'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Truck, MapPin, Clock, AlertCircle } from 'lucide-react'

interface Location {
  lat: number
  lng: number
  name: string
}

interface Vehicle {
  id: string
  name: string
  capacity: number
  speed: number
  icon: string
}

interface DeployedVehicle {
  deploymentId: string
  vehicle: Vehicle
  startLocation: Location
  endLocation: Location
  distance: number
  eta: number
  currentLocation: Location
  progress: number
  status: 'in-transit' | 'completed' | 'alert'
  lastUpdate: Date
}

interface VehicleTrackingProps {
  deployedVehicles: DeployedVehicle[]
}

export function VehicleTracking({ deployedVehicles }: VehicleTrackingProps) {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
        <Truck className="h-5 w-5 text-secondary" />
        Active Vehicle Tracking
      </h2>

      {deployedVehicles.length === 0 ? (
        <div className="text-center py-8">
          <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-muted-foreground">No vehicles currently deployed</p>
        </div>
      ) : (
        <div className="space-y-4">
          {deployedVehicles.map((vehicle) => (
            <div
              key={vehicle.deploymentId}
              className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{vehicle.vehicle.icon}</span>
                    <div>
                      <p className="font-semibold text-foreground">{vehicle.vehicle.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {vehicle.deploymentId}</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    vehicle.status === 'in-transit'
                      ? 'bg-primary/20 text-primary'
                      : vehicle.status === 'alert'
                        ? 'bg-destructive/20 text-destructive'
                        : 'bg-green-500/20 text-green-600'
                  }`}
                >
                  {vehicle.status === 'in-transit' ? 'In Transit' : vehicle.status === 'alert' ? 'Alert' : 'Completed'}
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">
                    {vehicle.startLocation.name} → {vehicle.endLocation.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">
                    ETA: {(vehicle.eta - (vehicle.progress / 100) * vehicle.eta).toFixed(1)} hours remaining
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">{vehicle.progress.toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${vehicle.progress}%` }}
                  />
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                {vehicle.distance.toFixed(2)} km total • Last update: {vehicle.lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
