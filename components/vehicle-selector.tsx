'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Truck } from 'lucide-react'

interface Vehicle {
  id: string
  name: string
  capacity: number
  speed: number
  icon: string
}

const VEHICLE_TYPES: Vehicle[] = [
  { id: 'heavy-cargo', name: 'Heavy Cargo', capacity: 15000, speed: 80, icon: '🚛' },
  { id: 'personnel', name: 'Personnel Transport', capacity: 50, speed: 100, icon: '🚌' },
  { id: 'supply', name: 'Supply Truck', capacity: 8000, speed: 90, icon: '📦' },
  { id: 'fuel', name: 'Fuel Tanker', capacity: 30000, speed: 70, icon: '⛽' },
  { id: 'command', name: 'Command Vehicle', capacity: 20, speed: 110, icon: '📡' },
  { id: 'medical', name: 'Medical Unit', capacity: 30, speed: 100, icon: '🚑' },
]

interface VehicleSelectorProps {
  selectedId?: string
  onSelect: (vehicle: Vehicle) => void
}

export function VehicleSelector({ selectedId, onSelect }: VehicleSelectorProps) {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Truck className="h-5 w-5 text-primary" />
        Select Vehicle Type
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {VEHICLE_TYPES.map((vehicle) => (
          <Button
            key={vehicle.id}
            variant={selectedId === vehicle.id ? 'default' : 'outline'}
            className="h-auto flex flex-col items-center gap-2 p-3"
            onClick={() => onSelect(vehicle)}
          >
            <span className="text-2xl">{vehicle.icon}</span>
            <div className="text-center">
              <p className="text-xs font-semibold">{vehicle.name}</p>
              <p className="text-xs text-muted-foreground">{vehicle.capacity} kg</p>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  )
}
