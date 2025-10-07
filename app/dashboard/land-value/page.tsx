"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, TrendingUp, Layers, DollarSign } from "lucide-react"

export default function LandValuePage() {
  const [location, setLocation] = useState("")
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)
  const [valuation, setValuation] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate geocoding and coordinate generation
    setTimeout(() => {
      const mockCoords = {
        lat: 40.7128 + Math.random() * 10,
        lng: -74.006 + Math.random() * 10,
      }
      setCoordinates(mockCoords)
      setLoading(false)
    }, 1000)
  }

  const handleRunValuation = () => {
    setLoading(true)

    // Simulate AI valuation model
    setTimeout(() => {
      setValuation({
        estimatedValue: 2450000,
        pricePerAcre: 12250,
        acres: 200,
        soilProductivity: 87,
        marketTrend: "+12.5%",
        confidence: 94,
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Land Value</h1>
        <p className="text-muted-foreground">
          Real-time valuation of agricultural land based on satellite data, AI modeling, and market trends
        </p>
      </div>

      {/* Location Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Farm Location
          </CardTitle>
          <CardDescription>Enter your farm location or upload parcel coordinates</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLocationSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location or Address</Label>
              <Input
                id="location"
                placeholder="e.g., 123 Farm Road, Iowa City, IA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={!location || loading}>
              {loading ? "Locating..." : "Get Coordinates"}
            </Button>
          </form>

          {coordinates && (
            <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
              <p className="text-sm font-medium text-foreground">Geospatial Coordinates</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Latitude:</span>
                  <span className="ml-2 font-mono text-foreground">{coordinates.lat.toFixed(6)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Longitude:</span>
                  <span className="ml-2 font-mono text-foreground">{coordinates.lng.toFixed(6)}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Map Visualization */}
      {coordinates && (
        <Card>
          <CardHeader>
            <CardTitle>Property Visualization</CardTitle>
            <CardDescription>Drag the marker to adjust your parcel location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              <img src="/satellite-map-view-of-agricultural-farmland-with-p.jpg" alt="Satellite map view" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-destructive drop-shadow-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Run Valuation */}
      {coordinates && !valuation && (
        <Card>
          <CardHeader>
            <CardTitle>AI Valuation Model</CardTitle>
            <CardDescription>Run our proprietary AI model to estimate land value</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleRunValuation} disabled={loading} size="lg">
              {loading ? "Analyzing..." : "Run Valuation Model"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Valuation Results */}
      {valuation && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<DollarSign className="h-5 w-5" />}
              title="Estimated Value"
              value={`$${valuation.estimatedValue.toLocaleString()}`}
              trend={valuation.marketTrend}
            />
            <StatCard
              icon={<TrendingUp className="h-5 w-5" />}
              title="Price per Acre"
              value={`$${valuation.pricePerAcre.toLocaleString()}`}
              trend={`${valuation.acres} acres`}
            />
            <StatCard
              icon={<Layers className="h-5 w-5" />}
              title="Soil Productivity"
              value={`${valuation.soilProductivity}/100`}
              trend="Above average"
            />
            <StatCard
              icon={<TrendingUp className="h-5 w-5" />}
              title="Confidence Score"
              value={`${valuation.confidence}%`}
              trend="High accuracy"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Historical Price Trends</CardTitle>
              <CardDescription>Land value changes over the past 5 years</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[2/1] bg-muted rounded-lg flex items-center justify-center">
                <img
                  src="/line-chart-showing-increasing-land-value-trend-ove.jpg"
                  alt="Historical price trends"
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
              <CardDescription>Comprehensive breakdown of valuation factors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnalysisRow label="Soil Quality Index" value="87/100" description="Based on USDA soil surveys" />
              <AnalysisRow
                label="Water Access"
                value="Excellent"
                description="Irrigation rights and natural water sources"
              />
              <AnalysisRow
                label="Market Comparables"
                value="$11,800 - $12,700"
                description="Recent sales within 10 miles"
              />
              <AnalysisRow label="Crop Yield Potential" value="High" description="Corn and soybean suitability" />
              <AnalysisRow label="Infrastructure" value="Good" description="Road access and utility availability" />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  trend,
}: {
  icon: React.ReactNode
  title: string
  value: string
  trend: string
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          {icon}
          <CardDescription>{title}</CardDescription>
        </div>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-primary font-medium">{trend}</div>
      </CardContent>
    </Card>
  )
}

function AnalysisRow({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-0">
      <div className="space-y-1">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-foreground">{value}</p>
      </div>
    </div>
  )
}
