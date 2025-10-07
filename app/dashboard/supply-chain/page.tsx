"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Link2, CheckCircle2, AlertTriangle, MapPin, Sparkles } from "lucide-react"

interface Supplier {
  name: string
  type: string
  location: string
  verified: boolean
  qualityScore: number
  certifications: string[]
}

export default function SupplyChainPage() {
  const [manufacturer, setManufacturer] = useState("")
  const [seedSupplier, setSeedSupplier] = useState("")
  const [chemicalInput, setChemicalInput] = useState("")
  const [biocharSupplier, setBiocharSupplier] = useState("")
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [alternatives, setAlternatives] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(false)

  const handleAnalyze = () => {
    setLoading(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockSuppliers: Supplier[] = []

      if (manufacturer) {
        mockSuppliers.push({
          name: manufacturer,
          type: "Manufacturer",
          location: "Iowa, USA",
          verified: true,
          qualityScore: 92,
          certifications: ["ISO 9001", "USDA Organic"],
        })
      }

      if (seedSupplier) {
        mockSuppliers.push({
          name: seedSupplier,
          type: "Seed Supplier",
          location: "Illinois, USA",
          verified: true,
          qualityScore: 88,
          certifications: ["Non-GMO", "Certified Organic"],
        })
      }

      if (chemicalInput) {
        mockSuppliers.push({
          name: chemicalInput,
          type: "Chemical/Fertilizer",
          location: "Nebraska, USA",
          verified: false,
          qualityScore: 65,
          certifications: ["EPA Registered"],
        })
      }

      if (biocharSupplier) {
        mockSuppliers.push({
          name: biocharSupplier,
          type: "Biochar Supplier",
          location: "California, USA",
          verified: true,
          qualityScore: 95,
          certifications: ["Carbon Negative", "USDA Certified"],
        })
      }

      setSuppliers(mockSuppliers)
      setLoading(false)
    }, 1500)
  }

  const handleFindAlternatives = () => {
    setLoading(true)

    // Simulate AI finding alternatives
    setTimeout(() => {
      setAlternatives([
        {
          name: "GreenTech Fertilizers",
          type: "Chemical/Fertilizer",
          location: "Kansas, USA",
          verified: true,
          qualityScore: 89,
          certifications: ["EPA Registered", "Organic Certified", "Carbon Neutral"],
        },
        {
          name: "EcoGrow Solutions",
          type: "Chemical/Fertilizer",
          location: "Missouri, USA",
          verified: true,
          qualityScore: 91,
          certifications: ["EPA Registered", "USDA Organic", "B Corp"],
        },
      ])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Control Your Supply Chain</h1>
        <p className="text-muted-foreground">
          Verify suppliers, check quality, and find safer alternatives with AI-powered analysis
        </p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Supply Chain Inputs
          </CardTitle>
          <CardDescription>Enter your manufacturers and suppliers to analyze your supply chain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="manufacturer">
                Manufacturer <span className="text-destructive">*</span>
              </Label>
              <Input
                id="manufacturer"
                placeholder="e.g., John Deere"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seedSupplier">
                Seed Supplier <span className="text-destructive">*</span>
              </Label>
              <Input
                id="seedSupplier"
                placeholder="e.g., Pioneer Seeds"
                value={seedSupplier}
                onChange={(e) => setSeedSupplier(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chemicalInput">Chemical/Fertilizer Input (Optional)</Label>
              <Input
                id="chemicalInput"
                placeholder="e.g., Acme Fertilizers"
                value={chemicalInput}
                onChange={(e) => setChemicalInput(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="biocharSupplier">Biochar Supplier (Optional)</Label>
              <Input
                id="biocharSupplier"
                placeholder="e.g., Carbon Gold"
                value={biocharSupplier}
                onChange={(e) => setBiocharSupplier(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleAnalyze} disabled={!manufacturer || !seedSupplier || loading} size="lg">
            {loading ? "Analyzing..." : "Analyze Supply Chain"}
          </Button>
        </CardContent>
      </Card>

      {/* Supply Chain Visualization */}
      {suppliers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Map</CardTitle>
            <CardDescription>Visual representation of your supplier network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              <img
                src="/map-with-connected-nodes-showing-supply-chain-net.jpg"
                alt="Supply chain network map"
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supplier Analysis */}
      {suppliers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Supplier Analysis</h2>
            <Button onClick={handleFindAlternatives} variant="outline" disabled={loading}>
              <Sparkles className="h-4 w-4 mr-2" />
              {loading ? "Finding..." : "Find AI Alternatives"}
            </Button>
          </div>

          <div className="grid gap-4">
            {suppliers.map((supplier, index) => (
              <SupplierCard key={index} supplier={supplier} />
            ))}
          </div>
        </div>
      )}

      {/* AI Alternatives */}
      {alternatives.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">AI-Recommended Alternatives</h2>
          <p className="text-muted-foreground">
            Based on quality scores, certifications, and safety standards, we recommend these alternatives
          </p>

          <div className="grid gap-4">
            {alternatives.map((supplier, index) => (
              <SupplierCard key={index} supplier={supplier} isAlternative />
            ))}
          </div>
        </div>
      )}

      {/* Generate Report */}
      {suppliers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Report</CardTitle>
            <CardDescription>Download a comprehensive analysis of your supply chain</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg">Generate Supplier Report</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function SupplierCard({ supplier, isAlternative }: { supplier: Supplier; isAlternative?: boolean }) {
  return (
    <Card className={isAlternative ? "border-primary" : ""}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              {supplier.name}
              {supplier.verified && <CheckCircle2 className="h-5 w-5 text-primary" />}
              {!supplier.verified && <AlertTriangle className="h-5 w-5 text-destructive" />}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {supplier.location}
            </CardDescription>
          </div>
          <Badge variant={supplier.verified ? "default" : "destructive"}>
            {supplier.verified ? "Verified" : "Unverified"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Type</span>
          <span className="font-medium text-foreground">{supplier.type}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Quality Score</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  supplier.qualityScore >= 80
                    ? "bg-primary"
                    : supplier.qualityScore >= 60
                      ? "bg-secondary"
                      : "bg-destructive"
                }`}
                style={{ width: `${supplier.qualityScore}%` }}
              />
            </div>
            <span className="font-semibold text-foreground">{supplier.qualityScore}/100</span>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Certifications</span>
          <div className="flex flex-wrap gap-2">
            {supplier.certifications.map((cert, index) => (
              <Badge key={index} variant="outline">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        {isAlternative && (
          <div className="pt-2 border-t border-border">
            <p className="text-sm text-primary font-medium">Recommended as a safer, higher-quality alternative</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
