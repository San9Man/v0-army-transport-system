"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Route, Fuel, PackageIcon, Users, MapPin, Check, AlertCircle } from "lucide-react"
import { useState } from "react"

interface Checkpoint {
  id: string
  name: string
  type: "fuel" | "supplies" | "rest"
  distance: number
  services: string[]
  restTime: number
}

const CHECKPOINTS: Checkpoint[] = [
  {
    id: "CP-001",
    name: "Service Station Alpha",
    type: "fuel",
    distance: 50,
    services: ["Diesel Fuel", "Premium Fuel"],
    restTime: 15,
  },
  {
    id: "CP-002",
    name: "Supply Hub Beta",
    type: "supplies",
    distance: 100,
    services: ["Rations", "Medical Kits", "Ammunition", "Equipment"],
    restTime: 20,
  },
  {
    id: "CP-003",
    name: "Rest Camp Gamma",
    type: "rest",
    distance: 150,
    services: ["Personnel Rest Area", "Accommodation", "Dining Facility"],
    restTime: 45,
  },
  {
    id: "CP-004",
    name: "Emergency Outpost Delta",
    type: "fuel",
    distance: 180,
    services: ["Emergency Fuel", "Medical Support", "Vehicle Repair"],
    restTime: 30,
  },
]

interface ApprovedRoute {
  id: string
  from: string
  to: string
  distance: number
  time: string
  efficiency: string
  vehicles: number
  approvalDate: string
  status: "approved"
}

function JourneyProgress({ distance, checkpoints }: { distance: number; checkpoints: Checkpoint[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Journey Progress & Checkpoints</h3>
      <div className="relative">
        {/* Main progress line */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: "0%" }} />
        </div>

        {/* Checkpoint markers */}
        <div className="relative mt-8">
          {checkpoints.map((checkpoint, index) => {
            const position = (checkpoint.distance / distance) * 100
            const icon = checkpoint.type === "fuel" ? "⛽" : checkpoint.type === "supplies" ? "📦" : "🏕️"
            return (
              <div key={checkpoint.id} className="flex items-start gap-3">
                <div
                  className="absolute top-0 transition-all"
                  style={{
                    left: `${position}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className="bg-muted rounded px-2 py-1 text-xs whitespace-nowrap border border-border">
                      <p className="font-semibold text-foreground">{checkpoint.name}</p>
                      <p className="text-muted-foreground">{checkpoint.distance} km</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Start and End markers */}
          <div className="flex justify-between items-end mt-20">
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">🚀</div>
              <p className="text-xs font-semibold text-foreground">START</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-xs font-semibold text-foreground">END</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AerialMapView({ from, to, checkpoints }: { from: string; to: string; checkpoints: Checkpoint[] }) {
  return (
    <div className="w-full h-48 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-lg border border-border flex flex-col items-center justify-center relative overflow-hidden">
      {/* Simplified aerial view representation */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.2),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.2),transparent_50%)]" />
      <MapPin className="h-8 w-8 text-primary mb-2" />
      <p className="text-sm font-semibold text-foreground text-center">Aerial Route View</p>
      <p className="text-xs text-muted-foreground text-center mt-1">
        {from} → {to}
      </p>
      <div className="mt-2 flex gap-1 flex-wrap justify-center">
        {checkpoints.map((cp) => (
          <span key={cp.id} className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
            {cp.name.split(" ")[0]}
          </span>
        ))}
      </div>
    </div>
  )
}

export function RouteOptimization() {
  const initialRoutes = [
    {
      id: "R-001",
      from: "Base-A",
      to: "Forward Post 1",
      distance: 145,
      time: "3h 20m",
      efficiency: "92%",
      vehicles: 3,
      status: "optimized",
      checkpoints: CHECKPOINTS.slice(0, 2),
    },
    {
      id: "R-002",
      from: "Base-B",
      to: "Supply Depot",
      distance: 89,
      time: "2h 15m",
      efficiency: "88%",
      vehicles: 2,
      status: "optimized",
      checkpoints: [CHECKPOINTS[0]],
    },
    {
      id: "R-003",
      from: "Forward Post 2",
      to: "Base-A",
      distance: 167,
      time: "3h 45m",
      efficiency: "85%",
      vehicles: 4,
      status: "pending-approval",
      checkpoints: CHECKPOINTS.slice(0, 3),
    },
  ]

  const [expandedRoute, setExpandedRoute] = useState<string | null>(null)
  const [approvedRoutes, setApprovedRoutes] = useState<ApprovedRoute[]>([])
  const [showApproved, setShowApproved] = useState(false)
  const [approvalMessage, setApprovalMessage] = useState<{ routeId: string; show: boolean }>({
    routeId: "",
    show: false,
  })
  const [approvedRouteIds, setApprovedRouteIds] = useState<Set<string>>(new Set())

  const handleApproveRoute = (route: (typeof initialRoutes)[0]) => {
    const newApprovedRoute: ApprovedRoute = {
      id: route.id,
      from: route.from,
      to: route.to,
      distance: route.distance,
      time: route.time,
      efficiency: route.efficiency,
      vehicles: route.vehicles,
      approvalDate: new Date().toLocaleString(),
      status: "approved",
    }

    setApprovedRoutes((prev) => [newApprovedRoute, ...prev])
    setApprovedRouteIds((prev) => new Set([...prev, route.id]))
    setApprovalMessage({ routeId: route.id, show: true })

    setTimeout(() => {
      setApprovalMessage({ routeId: "", show: false })
    }, 3000)
  }

  const availableRoutes = initialRoutes.filter((route) => !approvedRouteIds.has(route.id))

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
              <p className="text-sm text-muted-foreground">Approved Routes</p>
              <p className="text-3xl font-bold text-foreground mt-2">{approvedRoutes.length}</p>
            </div>
            <Check className="h-8 w-8 text-green-500 opacity-30" />
          </div>
        </Card>
      </div>

      <div className="flex gap-2 border-b border-border">
        <Button
          variant={showApproved ? "outline" : "default"}
          onClick={() => setShowApproved(false)}
          className="rounded-b-none"
        >
          Route Suggestions ({availableRoutes.length})
        </Button>
        <Button
          variant={showApproved ? "default" : "outline"}
          onClick={() => setShowApproved(true)}
          className="rounded-b-none"
        >
          Approved Routes ({approvedRoutes.length})
        </Button>
      </div>

      {/* Route Suggestions View */}
      {!showApproved && (
        <Card className="p-6 bg-card border-border">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Route className="h-5 w-5" />
            Route Recommendations with Safe Checkpoints
          </h2>

          <div className="space-y-4">
            {availableRoutes.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">All routes have been approved. No suggestions available.</p>
              </div>
            ) : (
              availableRoutes.map((route) => (
                <div key={route.id} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  {approvalMessage.show && approvalMessage.routeId === route.id && (
                    <div className="mb-3 p-3 bg-green-500/20 border border-green-500/50 rounded flex items-center gap-2 text-green-500 text-sm">
                      <Check className="h-4 w-4" />
                      Route added to approved list successfully!
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {route.id}: {route.from} → {route.to}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {route.distance} km | {route.time} | {route.vehicles} vehicles
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${route.efficiency >= "90%" ? "text-green-500" : "text-accent"}`}
                      >
                        {route.efficiency} Efficient
                      </p>
                      <p className={`text-xs mt-1 ${route.status === "optimized" ? "text-green-500" : "text-accent"}`}>
                        {route.status === "optimized" ? "Optimized" : "Pending Approval"}
                      </p>
                    </div>
                  </div>

                  {/* Checkpoint summary */}
                  <div className="mb-3 grid grid-cols-3 gap-2 text-xs">
                    {route.checkpoints.map((cp) => (
                      <div key={cp.id} className="flex items-center gap-1 bg-muted rounded p-2">
                        {cp.type === "fuel" && <Fuel className="h-3 w-3 text-accent" />}
                        {cp.type === "supplies" && <PackageIcon className="h-3 w-3 text-primary" />}
                        {cp.type === "rest" && <Users className="h-3 w-3 text-secondary" />}
                        <span className="text-muted-foreground">{cp.name}</span>
                      </div>
                    ))}
                  </div>

                  {expandedRoute === route.id && (
                    <div className="mb-3 p-3 bg-muted/50 rounded border border-border/50 space-y-3">
                      <AerialMapView from={route.from} to={route.to} checkpoints={route.checkpoints} />
                      <JourneyProgress distance={route.distance} checkpoints={route.checkpoints} />
                      <div className="space-y-2">
                        {route.checkpoints.map((cp) => (
                          <div key={cp.id} className="text-xs p-2 bg-background rounded border border-border">
                            <p className="font-semibold text-foreground mb-1">{cp.name}</p>
                            <p className="text-muted-foreground mb-1">
                              Distance: {cp.distance} km | Rest Time: {cp.restTime} min
                            </p>
                            <p className="text-muted-foreground">Services: {cp.services.join(", ")}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      className="flex-1"
                      onClick={() => setExpandedRoute(expandedRoute === route.id ? null : route.id)}
                    >
                      {expandedRoute === route.id ? "Hide" : "View"} Checkpoints
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveRoute(route)}
                    >
                      Approve Route
                    </Button>
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}

      {showApproved && (
        <Card className="p-6 bg-card border-border">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            Approved Routes
          </h2>

          {approvedRoutes.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No approved routes yet. Approve a route to see it here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {approvedRoutes.map((route) => (
                <div key={route.id} className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        {route.id}: {route.from} → {route.to}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {route.distance} km | {route.time} | {route.vehicles} vehicles
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-500">{route.efficiency} Efficient</p>
                      <p className="text-xs text-muted-foreground mt-1">{route.approvalDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
