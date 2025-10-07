"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingDown, TrendingUp, DollarSign, BarChart3 } from "lucide-react"

export default function EconomicsPage() {
  const [companyName, setCompanyName] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const analyzeInsolvency = () => {
    setAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        riskScore: 42,
        riskLevel: "Medium",
        factors: [
          { name: "Debt-to-Equity Ratio", value: "2.3", status: "warning" },
          { name: "Current Ratio", value: "1.2", status: "good" },
          { name: "Cash Flow", value: "-$2.4M", status: "critical" },
          { name: "Revenue Growth", value: "-8%", status: "warning" },
        ],
        commodityPrices: [
          { commodity: "Corn", price: "$4.85/bu", change: "+2.3%" },
          { commodity: "Soybeans", price: "$12.40/bu", change: "-1.2%" },
          { commodity: "Wheat", price: "$6.20/bu", change: "+0.8%" },
        ],
        recommendation: "Monitor closely. Consider debt restructuring and diversification strategies.",
      })
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Economics & Insolvency Risk</h1>
        <p className="text-muted-foreground mt-2">Analyze bankruptcy risk and track commodity prices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Analysis</CardTitle>
          <CardDescription>
            Enter a company name to analyze insolvency risk using AI-powered financial modeling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <div className="flex gap-2">
              <Input
                id="company"
                placeholder="e.g., Midwest Grain Co."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Button onClick={analyzeInsolvency} disabled={!companyName || analyzing}>
                {analyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>

          {results && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
                <div>
                  <p className="text-sm text-muted-foreground">Insolvency Risk Score</p>
                  <p className="text-3xl font-bold">{results.riskScore}/100</p>
                </div>
                <Badge
                  variant={
                    results.riskLevel === "Low"
                      ? "default"
                      : results.riskLevel === "Medium"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-lg px-4 py-2"
                >
                  {results.riskLevel} Risk
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Key Financial Indicators
                </h3>
                <div className="grid gap-3">
                  {results.factors.map((factor: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                      <span className="text-sm">{factor.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold">{factor.value}</span>
                        {factor.status === "good" && <TrendingUp className="h-4 w-4 text-primary" />}
                        {factor.status === "warning" && <AlertCircle className="h-4 w-4 text-secondary" />}
                        {factor.status === "critical" && <TrendingDown className="h-4 w-4 text-destructive" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-muted/50">
                <p className="text-sm font-semibold mb-2">AI Recommendation</p>
                <p className="text-sm text-muted-foreground">{results.recommendation}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Live Commodity Prices
          </CardTitle>
          <CardDescription>Real-time agricultural commodity market data</CardDescription>
        </CardHeader>
        <CardContent>
          {results ? (
            <div className="grid gap-3">
              {results.commodityPrices.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                  <span className="font-semibold">{item.commodity}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-lg">{item.price}</span>
                    <Badge variant={item.change.startsWith("+") ? "default" : "secondary"} className="font-mono">
                      {item.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Analyze a company to view commodity prices</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
