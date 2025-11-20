"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ConvoyMap } from "@/components/convoy-map"
import { FleetStatus } from "@/components/fleet-status"
import { RouteOptimization } from "@/components/route-optimization"
import { AlertsPanel } from "@/components/alerts-panel"
import { MetricsOverview } from "@/components/metrics-overview"
import { InteractiveMap } from "@/components/interactive-map"
import { DeploymentWorkflow } from "@/components/deployment-workflow"
import { VehicleTracking } from "@/components/vehicle-tracking"
import { TripAnalytics } from "@/components/trip-analytics"

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
  status: "in-transit" | "completed" | "alert"
  lastUpdate: Date
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [confirmedRoute, setConfirmedRoute] = useState<{
    start: Location
    end: Location
    distance: number
    eta: number
  } | null>(null)
  const [deployedVehicles, setDeployedVehicles] = useState<DeployedVehicle[]>([])

  useEffect(() => {
    const demoVehicle: DeployedVehicle = {
      deploymentId: "DEMO-001",
      vehicle: {
        id: "heavy-cargo",
        name: "Heavy Cargo Truck",
        capacity: 15000,
        speed: 80,
        icon: "🚛",
      },
      startLocation: { lat: 40.7128, lng: -74.006, name: "Base Alpha" },
      endLocation: { lat: 34.0522, lng: -118.2437, name: "Base Bravo" },
      distance: 3944,
      eta: 49.3,
      currentLocation: { lat: 40.7128, lng: -74.006, name: "Base Alpha" },
      progress: 0,
      status: "in-transit",
      lastUpdate: new Date(),
    }
    setDeployedVehicles([demoVehicle])
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDeployedVehicles((prev) =>
        prev.map((vehicle) => {
          if (vehicle.status !== "in-transit") return vehicle

          const newProgress = Math.min(vehicle.progress + 0.5, 100)
          const progressRatio = newProgress / 100

          const newLat =
            vehicle.startLocation.lat + (vehicle.endLocation.lat - vehicle.startLocation.lat) * progressRatio
          const newLng =
            vehicle.startLocation.lng + (vehicle.endLocation.lng - vehicle.startLocation.lng) * progressRatio

          return {
            ...vehicle,
            progress: newProgress,
            currentLocation: { lat: newLat, lng: newLng, name: "En Route" },
            status: newProgress >= 100 ? "completed" : "in-transit",
            lastUpdate: new Date(),
          }
        }),
      )
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const handleRouteConfirm = (start: Location, end: Location) => {
    const distance = calculateDistance(start, end)
    const eta = distance / 80
    setConfirmedRoute({ start, end, distance, eta })
  }

  const handleVehicleDeploy = (vehicle: Vehicle) => {
    if (!confirmedRoute) return

    const newDeployment: DeployedVehicle = {
      deploymentId: `VEH-${Date.now()}`,
      vehicle,
      startLocation: confirmedRoute.start,
      endLocation: confirmedRoute.end,
      distance: confirmedRoute.distance,
      eta: confirmedRoute.eta,
      currentLocation: confirmedRoute.start,
      progress: 0,
      status: "in-transit",
      lastUpdate: new Date(),
    }

    setDeployedVehicles((prev) => [...prev, newDeployment])
    setConfirmedRoute(null)
  }

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

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Top Metrics */}
            <MetricsOverview />

            {/* Main Content Grid */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <ConvoyMap />
                  {confirmedRoute ? (
                    <DeploymentWorkflow
                      startLocation={confirmedRoute.start}
                      endLocation={confirmedRoute.end}
                      distance={confirmedRoute.distance}
                      eta={confirmedRoute.eta}
                      onDeploy={handleVehicleDeploy}
                      onCancel={() => setConfirmedRoute(null)}
                    />
                  ) : (
                    <InteractiveMap onRouteConfirm={handleRouteConfirm} />
                  )}
                </div>
                <div className="space-y-6">
                  <AlertsPanel />
                  <VehicleTracking deployedVehicles={deployedVehicles} />
                </div>
              </div>
            )}

            {activeTab === "optimization" && <RouteOptimization />}

            {activeTab === "fleet" && <FleetStatus fullPage />}

            {activeTab === "tracking" && (
              <div className="grid grid-cols-1 gap-6">
                <VehicleTracking deployedVehicles={deployedVehicles} />
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="grid grid-cols-1 gap-6">
                <TripAnalytics />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
