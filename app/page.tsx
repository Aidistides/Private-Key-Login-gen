import { Button } from "@/components/ui/button"
import { Shield, Lock } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Orpheus Technologies</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Log In
            </Link>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            Protect Your Identity. Secure Your Supply Chain.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Sign up securely with your private key and gain real-time access to land valuation, supply chain analysis,
            and economic modeling
          </p>
          <div className="flex flex-col items-center gap-4 pt-4">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <Link href="/signup">Generate Private Key to Sign Up</Link>
            </Button>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Your identity is secured. No email or name required. Blockchain-based login.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Land Value"
            description="Real-time valuation of agricultural land based on satellite data, AI modeling, and market trends"
          />
          <FeatureCard
            title="Supply Chain"
            description="Control your supply chain with AI-powered verification and quality checks for manufacturers and suppliers"
          />
          <FeatureCard
            title="Economics"
            description="Stay ahead of market collapse with bankruptcy risk analysis and commodity trend correlations"
          />
          <FeatureCard
            title="Transact"
            description="Manage trades and hedge your position with smart futures contracts and counterparty matching"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center space-y-6 bg-card border border-border rounded-lg p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to secure your agricultural business?</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Join the future of agricultural technology with blockchain-secured identity and AI-powered insights
          </p>
          <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
            <Link href="/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">Orpheus Technologies</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Orpheus Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-4 p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
