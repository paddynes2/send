'use client'

import { useMemo } from 'react'
import { CompanyIntelligence, CopyVariations, PreviewLead } from '@/types/database.types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { User, Building2, Sparkles } from 'lucide-react'

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

interface CopyPreviewProps {
  config: CopyConfig
  copyVariations: CopyVariations
  previewLead: PreviewLead
  companyData: CompanyIntelligence
}

export function CopyPreview({ config, copyVariations, previewLead, companyData }: CopyPreviewProps) {
  // Real-time assembly logic - runs instantly on every config change
  const assembledEmail = useMemo(() => {
    // Step 1: Get snippets based on current configuration
    const subject = copyVariations.subjects[config.subject]?.[0] || ''
    const opening = copyVariations.openings[config.opening]?.[0] || ''
    const painPoint = copyVariations.pain_points[config.painPoint]?.[0] || ''
    
    // Get argument based on framework and tone
    const argument = copyVariations.arguments[config.framework]?.[config.tone]?.[0] || ''
    
    const socialProof = copyVariations.social_proof[config.socialProof]?.[0] || ''
    const cta = copyVariations.ctas[config.cta]?.[0] || ''
    const psLine = copyVariations.ps_lines[config.psLine]?.[0] || ''
    const urgency = copyVariations.urgency_elements[config.urgency]?.[0] || ''

    // Step 2: Assemble the email body
    let body = ''
    
    if (opening) body += `${opening}\n\n`
    if (painPoint) body += `${painPoint}\n\n`
    if (argument) body += `${argument}\n\n`
    if (socialProof) body += `${socialProof}\n\n`
    if (cta) {
      if (urgency && urgency !== '') {
        body += `${cta} ${urgency}\n\n`
      } else {
        body += `${cta}\n\n`
      }
    }
    
    body += `Best,\n${companyData.companyName}`
    
    if (psLine) body += `\n\n${psLine}`

    // Step 3: Replace placeholders with preview lead data
    const personalized = personalizeText(body, previewLead, companyData)
    const personalizedSubject = personalizeText(subject, previewLead, companyData)

    return {
      subject: personalizedSubject,
      body: personalized,
    }
  }, [config, copyVariations, previewLead, companyData])

  // Calculate metrics
  const wordCount = assembledEmail.body.split(/\s+/).length
  const readTimeMinutes = Math.max(1, Math.round(wordCount / 200))

  return (
    <div className="space-y-6">
      {/* Preview Lead Card */}
      <Card className="border-2 border-burgundy/30 bg-alice-blue/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            Preview Lead
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 text-burgundy" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {previewLead.firstName} {previewLead.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{previewLead.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <Building2 className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{previewLead.company}</span>
                <Badge variant="outline" className="text-xs">{previewLead.companySize}</Badge>
              </div>
              {previewLead.recentActivity && (
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Recent: {previewLead.recentActivity}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Preview Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-burgundy" />
              Email Preview
            </CardTitle>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{wordCount} words</span>
              <span>~{readTimeMinutes} min read</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Subject Line */}
          <div className="p-4 bg-alice-blue/50 rounded-lg border border-border">
            <Label className="text-xs text-muted-foreground mb-1 block">Subject</Label>
            <p className="font-semibold">{assembledEmail.subject}</p>
          </div>

          <Separator />

          {/* Email Body */}
          <div className="p-6 bg-background rounded-lg border border-border font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {assembledEmail.body}
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Badge variant="outline" className="text-xs">
              {config.framework} Framework
            </Badge>
            <Badge variant="outline" className="text-xs">
              {config.tone === 'data_driven' ? 'Data-Driven' : 'Emotional'} Tone
            </Badge>
            <Badge variant="outline" className="text-xs">
              {config.cta.charAt(0).toUpperCase() + config.cta.slice(1)} CTA
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-2 border-burgundy/20 bg-burgundy/5">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-burgundy" />
            Pro Tips
          </h4>
          <ul className="space-y-1 text-xs text-charcoal">
            <li>• Keep emails under 150 words for best response rates</li>
            <li>• Micro CTAs (like &quot;Thoughts?&quot;) get 2x more replies</li>
            <li>• Personalization beyond {'{'}firstName{'}'} increases engagement by 40%</li>
            <li>• Test 2-3 variations per campaign for optimal results</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function to personalize text with lead data
function personalizeText(text: string, lead: PreviewLead, companyData: CompanyIntelligence): string {
  return text
    .replace(/\{\{prospect_name\}\}/g, lead.firstName)
    .replace(/\{\{prospect_first_name\}\}/g, lead.firstName)
    .replace(/\{\{prospect_last_name\}\}/g, lead.lastName)
    .replace(/\{\{prospect_company\}\}/g, lead.company)
    .replace(/\{\{prospect_title\}\}/g, lead.title)
    .replace(/\{\{company\}\}/g, lead.company)
    .replace(/\{\{firstName\}\}/g, lead.firstName)
    .replace(/\{\{recent_activity\}\}/g, lead.recentActivity || '')
    .replace(/\{\{recent_event\}\}/g, lead.recentActivity || '')
    .replace(/\{\{company_size\}\}/g, lead.companySize || '')
    .replace(/\{\{sender_company\}\}/g, companyData.companyName)
}

// Label component (if not imported)
function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
