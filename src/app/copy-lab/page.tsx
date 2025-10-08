'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CompanyIntelligence, CopyVariations, PreviewLead } from '@/types/database.types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { CopyControls } from '@/components/copy-controls'
import { CopyPreview } from '@/components/copy-preview'

interface CopyConfig {
  subject: string
  opening: string
  painPoint: string
  framework: string
  tone: string
  socialProof: string
  cta: string
  psLine: string
  urgency: string
}

export default function CopyLabPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [companyData, setCompanyData] = useState<CompanyIntelligence | null>(null)
  const [previewLead, setPreviewLead] = useState<PreviewLead | null>(null)
  const [copyVariations, setCopyVariations] = useState<CopyVariations | null>(null)
  
  const [config, setConfig] = useState<CopyConfig>({
    subject: 'curiosity',
    opening: 'observation',
    painPoint: 'competitive',
    framework: 'PAS',
    tone: 'data_driven',
    socialProof: 'none',
    cta: 'medium',
    psLine: 'none',
    urgency: 'gentle',
  })

  useEffect(() => {
    // Load company data from localStorage
    const savedCompanyData = localStorage.getItem('send_company_data')
    if (!savedCompanyData) {
      router.push('/')
      return
    }

    const data: CompanyIntelligence = JSON.parse(savedCompanyData)
    setCompanyData(data)

    // Fetch copy synthesis
    const fetchCopySynthesis = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/copy-synthesis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ companyData: data }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.details || 'Failed to generate copy')
        }

        const result = await response.json()
        setPreviewLead(result.data.previewLead)
        setCopyVariations(result.data.copyVariations)
        
        // Store for later use
        localStorage.setItem('send_preview_lead', JSON.stringify(result.data.previewLead))
        localStorage.setItem('send_copy_variations', JSON.stringify(result.data.copyVariations))
        
      } catch (err) {
        console.error('Copy synthesis error:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCopySynthesis()
  }, [router])

  const handleBack = () => {
    router.push('/research?url=' + encodeURIComponent(localStorage.getItem('send_company_url') || ''))
  }

  const handleContinue = () => {
    // Save current configuration
    localStorage.setItem('send_copy_config', JSON.stringify(config))
    
    // Navigate to configuration screen
    router.push('/config')
  }

  if (!companyData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-alice-blue/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to research
          </Button>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Step 3 of 5</p>
            <h1 className="heading-primary text-4xl md:text-5xl font-bold text-deep-ink mb-2">
              Copy Lab
            </h1>
            <p className="text-lg text-charcoal">
              Craft your perfect outbound sequence with AI-powered copy
            </p>
          </div>
        </div>

        {/* Main Content */}
        {isLoading && (
          <div className="max-w-5xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-12 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-burgundy mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Generating your copy variations...</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Creating preview lead and synthesizing copy for all frameworks and tones
                </p>
                <div className="space-y-2 text-sm text-charcoal">
                  <p>✅ Generating representative preview lead</p>
                  <p>✅ Creating subject line variations</p>
                  <p>🔄 Synthesizing opening hooks...</p>
                  <p className="text-muted-foreground">⏱️ Generating framework-based arguments</p>
                  <p className="text-muted-foreground">⏱️ Creating CTAs and closing elements</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {error && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-destructive mb-2">Copy Generation Failed</h3>
              <p className="text-sm text-destructive/90 mb-4">{error}</p>
              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
                <Button onClick={() => window.location.reload()} className="bg-burgundy hover:bg-burgundy/90">
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && copyVariations && previewLead && (
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[400px_1fr] gap-6">
              {/* Left Panel - Controls */}
              <div>
                <CopyControls
                  config={config}
                  onChange={setConfig}
                  copyVariations={copyVariations}
                />
              </div>

              {/* Right Panel - Preview */}
              <div>
                <CopyPreview
                  config={config}
                  copyVariations={copyVariations}
                  previewLead={previewLead}
                  companyData={companyData}
                />
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-between items-center pt-8 border-t mt-8">
              <Button onClick={handleBack} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleContinue}
                className="bg-burgundy hover:bg-burgundy/90"
                size="lg"
              >
                Continue to Configuration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
