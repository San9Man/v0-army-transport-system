"use client"

import { Card } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Route, Clock } from "lucide-react"
import { useState } from "react"

interface TripReport {
  tripId: string
  vehicleType: string
  startLocation: string
  endLocation: string
  distance: number
  plannedEta: number
  actualDuration: number
  safetyStatus: "safe" | "detour" | "incident"
  detourReason?: string
  detouredDistance?: number
  incidents?: string[]
  completionPercentage: number
}

const mockTrips: TripReport[] = [
  {
    tripId: "TRIP-001",
    vehicleType: "Heavy Cargo Truck",
    startLocation: "Base Alpha",
    endLocation: "Base Bravo",
    distance: 3944,
    plannedEta: 49.3,
    actualDuration: 48.5,
    safetyStatus: "safe",
    completionPercentage: 100,
  },
  {
    tripId: "TRIP-002",
    vehicleType: "Personnel Transport",
    startLocation: "Base Bravo",
    endLocation: "Base Charlie",
    distance: 2156,
    plannedEta: 27,
    actualDuration: 33.2,
    safetyStatus: "detour",
    detourReason: "Road blockage at Mile 15",
    detouredDistance: 2456,
    completionPercentage: 100,
  },
  {
    tripId: "TRIP-003",
    vehicleType: "Supply Truck",
    startLocation: "Base Charlie",
    endLocation: "Checkpoint Delta",
    distance: 1876,
    plannedEta: 23.5,
    actualDuration: 45.8,
    safetyStatus: "incident",
    incidents: ["Suspected terrorist hinderance at Mile 8", "Emergency reroute activated", "Security protocol engaged"],
    detouredDistance: 2634,
    completionPercentage: 100,
  },
  {
    tripId: "TRIP-004",
    vehicleType: "Fuel Tanker",
    startLocation: "Base Delta",
    endLocation: "Base Echo",
    distance: 3200,
    plannedEta: 40,
    actualDuration: 39.8,
    safetyStatus: "safe",
    completionPercentage: 100,
  },
  {
    tripId: "TRIP-005",
    vehicleType: "Medical Unit",
    startLocation: "Base Echo",
    endLocation: "Forward Operating Base",
    distance: 2890,
    plannedEta: 36.1,
    actualDuration: 36.5,
    safetyStatus: "safe",
    completionPercentage: 100,
  },
  {
    tripId: "TRIP-006",
    vehicleType: "Command Vehicle",
    startLocation: "Forward Operating Base",
    endLocation: "Base Alpha",
    distance: 4156,
    plannedEta: 52,
    actualDuration: 61.2,
    safetyStatus: "detour",
    detourReason: "Weather conditions and road damage",
    detouredDistance: 4678,
    completionPercentage: 100,
  },
]

export function TripAnalytics() {
  const [expandedTrip, setExpandedTrip] = useState<string | null>(null)

  const safeTrips = mockTrips.filter((t) => t.safetyStatus === "safe").length
  const safetyPercentage = ((safeTrips / mockTrips.length) * 100).toFixed(1)
  const detourTrips = mockTrips.filter((t) => t.safetyStatus === "detour").length
  const incidentTrips = mockTrips.filter((t) => t.safetyStatus === "incident").length

  const avgTimeVariance = (
    mockTrips.reduce((sum, trip) => sum + Math.abs(trip.actualDuration - trip.plannedEta), 0) / mockTrips.length
  ).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Safety Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Safe Arrivals</p>
              <p className="text-3xl font-bold text-green-500 mt-2">{safetyPercentage}%</p>
              <p className="text-xs text-muted-foreground mt-2">
                {safeTrips} of {mockTrips.length} trips
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-500 opacity-10">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Detours Required</p>
              <p className="text-3xl font-bold text-yellow-500 mt-2">{detourTrips}</p>
              <p className="text-xs text-muted-foreground mt-2">Road/weather issues</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500 opacity-10">
              <Route className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Incidents</p>
              <p className="text-3xl font-bold text-red-500 mt-2">{incidentTrips}</p>
              <p className="text-xs text-muted-foreground mt-2">Security threats</p>
            </div>
            <div className="p-3 rounded-lg bg-red-500 opacity-10">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Time Variance</p>
              <p className="text-3xl font-bold text-blue-500 mt-2">+{avgTimeVariance}h</p>
              <p className="text-xs text-muted-foreground mt-2">From planned ETA</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500 opacity-10">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Trip Details */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Trip Details Report</h3>
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {mockTrips.map((trip) => (
            <div
              key={trip.tripId}
              className="border border-border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => setExpandedTrip(expandedTrip === trip.tripId ? null : trip.tripId)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      trip.safetyStatus === "safe"
                        ? "bg-green-500"
                        : trip.safetyStatus === "detour"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{trip.tripId}</p>
                    <p className="text-sm text-muted-foreground">
                      {trip.vehicleType} • {trip.startLocation} → {trip.endLocation}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {trip.safetyStatus === "safe" && "Safe Arrival"}
                    {trip.safetyStatus === "detour" && "Detour Required"}
                    {trip.safetyStatus === "incident" && "Security Incident"}
                  </p>
                  <p className="text-xs text-muted-foreground">{trip.distance} km</p>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedTrip === trip.tripId && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Planned ETA</p>
                      <p className="font-medium text-foreground">{trip.plannedEta.toFixed(1)}h</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Actual Duration</p>
                      <p className="font-medium text-foreground">{trip.actualDuration.toFixed(1)}h</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Variance</p>
                      <p
                        className={`font-medium ${
                          trip.actualDuration <= trip.plannedEta ? "text-green-500" : "text-yellow-500"
                        }`}
                      >
                        {(trip.actualDuration - trip.plannedEta).toFixed(1)}h
                      </p>
                    </div>
                  </div>

                  {trip.safetyStatus === "detour" && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                      <div className="flex gap-2">
                        <Route className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-600">Detour Details</p>
                          <p className="text-sm text-yellow-700 mt-1">{trip.detourReason}</p>
                          <p className="text-xs text-yellow-600 mt-1">Extra Distance: {trip.detouredDistance} km</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {trip.safetyStatus === "incident" && trip.incidents && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <div className="flex gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-600">Security Incident Report</p>
                          <ul className="text-sm text-red-700 mt-2 space-y-1">
                            {trip.incidents.map((incident, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-red-500">•</span>
                                <span>{incident}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-red-600 mt-2">Extra Distance: {trip.detouredDistance} km</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {trip.safetyStatus === "safe" && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <div className="flex gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-600">Trip Completed Successfully</p>
                          <p className="text-xs text-green-700 mt-1">No hinderance or incidents reported</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
