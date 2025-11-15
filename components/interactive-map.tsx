'use client'

import { useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Navigation2, Crosshair, Zap } from 'lucide-react'

interface Location {
  lat: number
  lng: number
  name: string
}

const PREDEFINED_LOCATIONS: Location[] = [
  { lat: 40.7128, lng: -74.006, name: 'Base Alpha' },
  { lat: 34.0522, lng: -118.2437, name: 'Base Bravo' },
  { lat: 41.8781, lng: -87.6298, name: 'Depot Charlie' },
  { lat: 29.7604, lng: -95.3698, name: 'Depot Delta' },
  { lat: 37.7749, lng: -122.4194, name: 'Command Center' },
]

interface InteractiveMapProps {
  onRouteConfirm: (start: Location, end: Location) => void
}

export function InteractiveMap({ onRouteConfirm }: InteractiveMapProps) {
  const [startLocation, setStartLocation] = useState<Location | null>(null)
  const [endLocation, setEndLocation] = useState<Location | null>(null)
  const [selectingMode, setSelectingMode] = useState<'start' | 'end' | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const calculateDistance = (loc1: Location, loc2: Location) => {
    const R = 6371
    const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180
    const dLng = ((loc2.lng - loc1.lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((loc1.lat * Math.PI) / 180) *
        Math.cos((loc2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectingMode) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const lat = 40.7128 + (y - 256) / 512
    const lng = -74.006 + (x - 256) / 512

    const newLocation: Location = {
      lat,
      lng,
      name: selectingMode === 'start' ? 'Custom Start Point' : 'Custom Destination',
    }

    if (selectingMode === 'start') {
      setStartLocation(newLocation)
    } else {
      setEndLocation(newLocation)
    }
    setSelectingMode(null)
  }

  const handleUseCurrentLocation = async (mode: 'start' | 'end') => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      const newLocation: Location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        name: mode === 'start' ? 'Current Location (Start)' : 'Current Location (End)',
      }
      if (mode === 'start') {
        setStartLocation(newLocation)
      } else {
        setEndLocation(newLocation)
      }
    } catch (error) {
      console.error('Geolocation error:', error)
    }
  }

  const handleConfirm = () => {
    if (startLocation && endLocation) {
      onRouteConfirm(startLocation, endLocation)
    }
  }

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-primary" />
        Route Planner
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Starting Point</label>
          <select
            value={startLocation?.name || ''}
            onChange={(e) => {
              const loc = PREDEFINED_LOCATIONS.find((l) => l.name === e.target.value)
              if (loc) setStartLocation(loc)
            }}
            className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground text-sm"
          >
            <option value="">Select location or click map</option>
            {PREDEFINED_LOCATIONS.map((loc) => (
              <option key={loc.name} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
          {startLocation && (
            <p className="text-xs text-muted-foreground">
              {startLocation.name} ({startLocation.lat.toFixed(4)}, {startLocation.lng.toFixed(4)})
            </p>
          )}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectingMode(selectingMode === 'start' ? null : 'start')}
              className={selectingMode === 'start' ? 'bg-primary text-primary-foreground' : ''}
            >
              <Crosshair className="h-4 w-4 mr-1" />
              Click Map
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleUseCurrentLocation('start')}>
              <Zap className="h-4 w-4 mr-1" />
              Current
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Destination</label>
          <select
            value={endLocation?.name || ''}
            onChange={(e) => {
              const loc = PREDEFINED_LOCATIONS.find((l) => l.name === e.target.value)
              if (loc) setEndLocation(loc)
            }}
            className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground text-sm"
          >
            <option value="">Select location or click map</option>
            {PREDEFINED_LOCATIONS.map((loc) => (
              <option key={loc.name} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
          {endLocation && (
            <p className="text-xs text-muted-foreground">
              {endLocation.name} ({endLocation.lat.toFixed(4)}, {endLocation.lng.toFixed(4)})
            </p>
          )}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectingMode(selectingMode === 'end' ? null : 'end')}
              className={selectingMode === 'end' ? 'bg-primary text-primary-foreground' : ''}
            >
              <Crosshair className="h-4 w-4 mr-1" />
              Click Map
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleUseCurrentLocation('end')}>
              <Zap className="h-4 w-4 mr-1" />
              Current
            </Button>
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        width={512}
        height={512}
        className={`w-full h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border mb-4 ${
          selectingMode ? 'cursor-crosshair' : 'cursor-default'
        }`}
      />

      {startLocation && endLocation && (
        <div className="bg-muted/50 p-3 rounded-lg mb-4 text-sm">
          <p className="text-foreground font-semibold">
            Distance: {calculateDistance(startLocation, endLocation).toFixed(2)} km
          </p>
          <p className="text-muted-foreground text-xs">
            ETA: {(calculateDistance(startLocation, endLocation) / 80).toFixed(1)} hours at avg 80 km/h
          </p>
        </div>
      )}

      <Button
        onClick={handleConfirm}
        disabled={!startLocation || !endLocation}
        className="w-full bg-primary hover:bg-primary/90"
      >
        <Navigation2 className="h-4 w-4 mr-2" />
        Confirm Route
      </Button>
    </Card>
  )
}
