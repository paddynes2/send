'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Loader2, CheckCircle2, Clock } from 'lucide-react'

interface ResearchStep {
  id: string
  label: string
  duration: number // ms
  status: 'pending' | 'in_progress' | 'completed'
}

export function ResearchProgress() {
  const [steps, setSteps] = useState<ResearchStep[]>([
    { id: '1', label: 'Analyzing company website', duration: 3000, status: 'pending' },
    { id: '2', label: 'Researching industry & competitors', duration: 4000, status: 'pending' },
    { id: '3', label: 'Identifying ideal customer profile', duration: 3000, status: 'pending' },
    { id: '4', label: 'Gathering buyer persona insights', duration: 2500, status: 'pending' },
    { id: '5', label: 'Finding recent news & events', duration: 2500, status: 'pending' },
    { id: '6', label: 'Generating GTM strategy', duration: 3000, status: 'pending' },
  ])

  useEffect(() => {
    let currentIndex = 0
    const timers: NodeJS.Timeout[] = []

    const processNextStep = () => {
      if (currentIndex >= steps.length) return

      // Set current step to in_progress
      setSteps(prev => 
        prev.map((step, idx) => 
          idx === currentIndex ? { ...step, status: 'in_progress' } : step
        )
      )

      // After duration, set to completed and move to next
      const timer = setTimeout(() => {
        setSteps(prev => 
          prev.map((step, idx) => 
            idx === currentIndex ? { ...step, status: 'completed' } : step
          )
        )
        currentIndex++
        processNextStep()
      }, steps[currentIndex].duration)

      timers.push(timer)
    }

    processNextStep()

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Loader2 className="h-5 w-5 animate-spin text-burgundy" />
            <h3 className="font-semibold text-lg">Researching your company...</h3>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {step.status === 'completed' && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                  {step.status === 'in_progress' && (
                    <Loader2 className="h-5 w-5 animate-spin text-burgundy" />
                  )}
                  {step.status === 'pending' && (
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    step.status === 'completed'
                      ? 'text-green-600 font-medium'
                      : step.status === 'in_progress'
                      ? 'text-burgundy font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              This typically takes 15-30 seconds. We&apos;re gathering data from multiple sources to give you the most
              comprehensive GTM strategy.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
