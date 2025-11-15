'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VehicleSelector } from './vehicle-selector'
import { MapPin, Truck, CheckCircle } from 'lucide-react'

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

interface DeploymentWorkflowProps {
  startLocation: Location
  endLocation: Location
  distance: number
  eta: number
  onDeploy: (vehicle: Vehicle) => void
  onCancel: () => void
}

export function DeploymentWorkflow({
  startLocation,
  endLocation,
  distance,
  eta,
  onDeploy,
  onCancel,
}: DeploymentWorkflowProps) {
  const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(null)
  const [deployed, setDeployed] = React.useState(false)

  const handleDeploy = () => {
    if (selectedVehicle) {
      onDeploy(selectedVehicle)
      setDeployed(true)
      setTimeout(() => {
        setDeployed(false)
        onCancel()
      }, 2000)
    }
  }

  if (deployed) {
    return (
      <Card className="p-8 bg-card border-border text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Vehicle Deployed Successfully!</h3>
        <p className="text-sm text-muted-foreground">{selectedVehicle?.name} is now en route...</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Route Summary
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">From</p>
            <p className="font-semibold text-foreground">{startLocation.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">To</p>
            <p className="font-semibold text-foreground">{endLocation.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="font-semibold text-foreground">{distance.toFixed(2)} km</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Time</p>
              <p className="font-semibold text-foreground">{eta.toFixed(1)} hours</p>
            </div>
          </div>
        </div>
      </Card>

      <VehicleSelector selectedId={selectedVehicle?.id} onSelect={setSelectedVehicle} />

      <div className="flex gap-3">
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={handleDeploy}
          disabled={!selectedVehicle}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          <Truck className="h-4 w-4 mr-2" />
          Deploy Vehicle
        </Button>
      </div>
    </div>
  )
}

import React from 'react'
