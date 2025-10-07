"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Copy, Check, Download, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [privateKey, setPrivateKey] = useState<string>("")
  const [publicKey, setPublicKey] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  const generateKeys = () => {
    // Generate a simple key pair (in production, use proper cryptographic library)
    const randomPrivateKey = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
    const randomPublicKey = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

    setPrivateKey(randomPrivateKey)
    setPublicKey(randomPublicKey)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(privateKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadKey = () => {
    const element = document.createElement("a")
    const file = new Blob([`Private Key: ${privateKey}\nPublic Key: ${publicKey}`], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "orpheus-keys.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleContinue = () => {
    if (saved) {
      // Store public key in localStorage (in production, use proper auth)
      localStorage.setItem("orpheus_public_key", publicKey)
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <Shield className="h-6 w-6" />
            <span className="font-semibold">Orpheus Technologies</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Create Your Secure Identity</h1>
          <p className="text-muted-foreground">Generate your blockchain-based private key to sign up</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Private Key Generation
            </CardTitle>
            <CardDescription>
              Your private key is your identity. Keep it safe and never share it with anyone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!privateKey ? (
              <div className="space-y-4">
                <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-3">
                  <h3 className="font-semibold text-foreground">What you need to know:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Your private key is generated locally and never sent to our servers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>You must save your private key - we cannot recover it if lost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>No email, name, or personal information required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>Your key is your only way to access your account</span>
                    </li>
                  </ul>
                </div>
                <Button onClick={generateKeys} size="lg" className="w-full">
                  Generate Private Key
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Your Private Key</label>
                  <div className="bg-muted border border-border rounded-lg p-4 font-mono text-sm break-all">
                    {privateKey}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex-1 bg-transparent">
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadKey} className="flex-1 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Your Public Address</label>
                  <div className="bg-muted border border-border rounded-lg p-4 font-mono text-sm break-all">
                    {publicKey}
                  </div>
                </div>

                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-destructive">Important Security Notice</p>
                  <p className="text-sm text-muted-foreground">
                    Make sure you have saved your private key in a secure location. You will need it to log in. We
                    cannot recover lost keys.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="saved"
                    checked={saved}
                    onChange={(e) => setSaved(e.target.checked)}
                    className="h-4 w-4 rounded border-border"
                  />
                  <label htmlFor="saved" className="text-sm text-foreground cursor-pointer">
                    I have securely saved my private key
                  </label>
                </div>

                <Button onClick={handleContinue} disabled={!saved} size="lg" className="w-full">
                  Continue to Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have a key?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  )
}
