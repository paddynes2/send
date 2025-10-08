'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CompanyIntelligence } from '@/types/database.types'
import { ResearchProgress } from '@/components/research-progress'
import { CompanyIntelligenceForm } from '@/components/company-intelligence-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function ResearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const url = searchParams.get('url')

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [companyData, setCompanyData] = useState<CompanyIntelligence | null>(null)

  useEffect(() => {
    if (!url) {
      router.push('/')
      return
    }

    // Fetch company research
    const fetchResearch = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/research', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.details || 'Failed to research company')
        }

        const result = await response.json()
        setCompanyData(result.data)
      } catch (err) {
        console.error('Research error:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchResearch()
  }, [url, router])

  const handleBack = () => {
    router.push('/')
  }

  const handleContinue = () => {
    if (!companyData) return
    
    // Save to session/local storage for now (will save to Supabase later)
    localStorage.setItem('send_company_data', JSON.stringify(companyData))
    localStorage.setItem('send_company_url', url || '')
    
    // Navigate to copy lab
    router.push('/copy-lab')
  }

  if (!url) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-alice-blue/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Button>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Step 2 of 5</p>
            <h1 className="heading-primary text-4xl md:text-5xl font-bold text-deep-ink mb-2">
              Company Intelligence
            </h1>
            <p className="text-lg text-charcoal">
              Review and refine the AI-generated insights about your company
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {isLoading && (
            <div className="space-y-6">
              <ResearchProgress />
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Analyzing: <span className="font-semibold text-burgundy">{url}</span></p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-destructive mb-2">Research Failed</h3>
              <p className="text-sm text-destructive/90 mb-4">{error}</p>
              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="bg-burgundy hover:bg-burgundy/90"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {!isLoading && !error && companyData && (
            <div className="space-y-6">
              <CompanyIntelligenceForm
                data={companyData}
                onChange={setCompanyData}
              />

              {/* Continue Button */}
              <div className="flex justify-between items-center pt-6 border-t">
                <Button onClick={handleBack} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleContinue}
                  className="bg-burgundy hover:bg-burgundy/90"
                  size="lg"
                >
                  Continue to Copy Lab
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResearchPageContent />
    </Suspense>
  )
}
