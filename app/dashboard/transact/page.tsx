"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, ArrowRightLeft, FileText, CheckCircle2 } from "lucide-react"

export default function TransactPage() {
  const [selectedCommodity, setSelectedCommodity] = useState("")
  const [quantity, setQuantity] = useState("")
  const [contractType, setContractType] = useState("")

  const [contracts, setContracts] = useState([
    {
      id: "FC-2024-001",
      commodity: "Corn",
      quantity: "5,000 bu",
      price: "$4.85/bu",
      expiry: "Dec 2024",
      status: "Active",
      pnl: "+$2,450",
    },
    {
      id: "FC-2024-002",
      commodity: "Soybeans",
      quantity: "2,000 bu",
      price: "$12.40/bu",
      expiry: "Nov 2024",
      status: "Active",
      pnl: "-$890",
    },
  ])

  const marketData = [
    { commodity: "Corn", spot: "$4.85", futures: "$4.92", change: "+1.4%" },
    { commodity: "Soybeans", spot: "$12.40", futures: "$12.55", change: "-0.8%" },
    { commodity: "Wheat", spot: "$6.20", futures: "$6.28", change: "+2.1%" },
    { commodity: "Cotton", spot: "$0.82", futures: "$0.84", change: "+0.5%" },
  ]

  const createContract = () => {
    if (!selectedCommodity || !quantity || !contractType) return

    const newContract = {
      id: `FC-2024-${String(contracts.length + 1).padStart(3, "0")}`,
      commodity: selectedCommodity,
      quantity: `${quantity} bu`,
      price: marketData.find((m) => m.commodity === selectedCommodity)?.futures || "$0.00",
      expiry: "Dec 2024",
      status: "Pending",
      pnl: "$0",
    }

    setContracts([...contracts, newContract])
    setSelectedCommodity("")
    setQuantity("")
    setContractType("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Transact</h1>
        <p className="text-muted-foreground mt-2">Trade futures contracts and manage commodity transactions</p>
      </div>

      <Tabs defaultValue="market" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="trade">Trade</TabsTrigger>
          <TabsTrigger value="contracts">My Contracts</TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Market Data</CardTitle>
              <CardDescription>Real-time spot and futures prices for agricultural commodities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {marketData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                    <div className="flex-1">
                      <p className="font-semibold">{item.commodity}</p>
                      <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                        <span>Spot: {item.spot}</span>
                        <span>Futures: {item.futures}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={item.change.startsWith("+") ? "default" : "secondary"} className="font-mono">
                        {item.change}
                      </Badge>
                      {item.change.startsWith("+") ? (
                        <TrendingUp className="h-5 w-5 text-primary" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-secondary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trade" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5" />
                Create Futures Contract
              </CardTitle>
              <CardDescription>Execute blockchain-secured commodity futures contracts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="commodity">Commodity</Label>
                  <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                    <SelectTrigger id="commodity">
                      <SelectValue placeholder="Select commodity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corn">Corn</SelectItem>
                      <SelectItem value="Soybeans">Soybeans</SelectItem>
                      <SelectItem value="Wheat">Wheat</SelectItem>
                      <SelectItem value="Cotton">Cotton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (bushels)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="e.g., 5000"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contract-type">Contract Type</Label>
                  <Select value={contractType} onValueChange={setContractType}>
                    <SelectTrigger id="contract-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy (Long)</SelectItem>
                      <SelectItem value="sell">Sell (Short)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input type="date" defaultValue="2024-12-31" />
                </div>
              </div>

              {selectedCommodity && (
                <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Current Futures Price</span>
                    <span className="text-lg font-bold font-mono">
                      {marketData.find((m) => m.commodity === selectedCommodity)?.futures}
                    </span>
                  </div>
                  {quantity && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Estimated Contract Value</span>
                      <span className="text-lg font-bold font-mono">
                        $
                        {(
                          Number.parseFloat(
                            marketData.find((m) => m.commodity === selectedCommodity)?.futures.replace("$", "") || "0",
                          ) * Number.parseFloat(quantity)
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <Button
                onClick={createContract}
                disabled={!selectedCommodity || !quantity || !contractType}
                className="w-full"
              >
                Create Contract
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Active Contracts
              </CardTitle>
              <CardDescription>Your blockchain-verified futures contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contracts.map((contract) => (
                  <div key={contract.id} className="p-4 border rounded-lg bg-card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{contract.commodity}</p>
                        <p className="text-sm text-muted-foreground font-mono">{contract.id}</p>
                      </div>
                      <Badge variant={contract.status === "Active" ? "default" : "secondary"}>
                        {contract.status === "Active" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {contract.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Quantity</p>
                        <p className="font-semibold">{contract.quantity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-semibold font-mono">{contract.price}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expiry</p>
                        <p className="font-semibold">{contract.expiry}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">P&L</p>
                        <p
                          className={`font-semibold font-mono ${contract.pnl.startsWith("+") ? "text-primary" : contract.pnl.startsWith("-") ? "text-destructive" : ""}`}
                        >
                          {contract.pnl}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
