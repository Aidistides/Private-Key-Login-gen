import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Link2, BarChart3, DollarSign, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your agricultural technology command center</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Land Parcels" value="12" description="Total tracked properties" trend="+2 this month" />
        <StatCard title="Supply Chain" value="8" description="Active suppliers" trend="All verified" />
        <StatCard title="Risk Score" value="Low" description="Insolvency risk" trend="Stable" />
        <StatCard title="Active Contracts" value="3" description="Futures positions" trend="$125K value" />
      </div>

      {/* Feature Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <FeatureCard
          icon={<TrendingUp className="h-8 w-8" />}
          title="Land Value"
          description="Real-time valuation of agricultural land based on satellite data, AI modeling, and market trends"
          href="/dashboard/land-value"
        />
        <FeatureCard
          icon={<Link2 className="h-8 w-8" />}
          title="Supply Chain"
          description="Control your supply chain with AI-powered verification and quality checks"
          href="/dashboard/supply-chain"
        />
        <FeatureCard
          icon={<BarChart3 className="h-8 w-8" />}
          title="Economics & Risk"
          description="Stay ahead of market collapse with bankruptcy risk analysis and commodity trends"
          href="/dashboard/economics"
        />
        <FeatureCard
          icon={<DollarSign className="h-8 w-8" />}
          title="Transact"
          description="Manage trades and hedge your position with smart futures contracts"
          href="/dashboard/transact"
        />
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  description,
  trend,
}: {
  title: string
  value: string
  description: string
  trend: string
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">{description}</div>
        <div className="text-sm text-primary font-medium mt-1">{trend}</div>
      </CardContent>
    </Card>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="text-primary">{icon}</div>
          <Button variant="ghost" size="icon" asChild>
            <Link href={href}>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="leading-relaxed">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
