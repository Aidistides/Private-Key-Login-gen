"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [privateKey, setPrivateKey] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation (in production, verify cryptographic signature)
    if (privateKey.length < 32) {
      setError("Invalid private key format")
      return
    }

    // Simulate authentication
    localStorage.setItem("orpheus_authenticated", "true")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <Shield className="h-6 w-6" />
            <span className="font-semibold">Orpheus Technologies</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground">Enter your private key to access your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Secure Login
            </CardTitle>
            <CardDescription>Your private key is never transmitted or stored on our servers</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="privateKey" className="text-sm font-medium text-foreground">
                  Private Key
                </label>
                <Input
                  id="privateKey"
                  type="password"
                  placeholder="Enter your private key"
                  value={privateKey}
                  onChange={(e) => {
                    setPrivateKey(e.target.value)
                    setError("")
                  }}
                  className="font-mono"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full">
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Generate your key
          </Link>
        </p>
      </div>
    </div>
  )
}
