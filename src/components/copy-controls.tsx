'use client'

import { CopyVariations } from '@/types/database.types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'

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

interface CopyControlsProps {
  config: CopyConfig
  onChange: (config: CopyConfig) => void
  copyVariations: CopyVariations
}

export function CopyControls({ config, onChange, copyVariations }: CopyControlsProps) {
  const updateConfig = (key: keyof CopyConfig, value: string) => {
    onChange({ ...config, [key]: value })
  }

  return (
    <Card className="border-2 sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Copy Controls</span>
          <Badge variant="secondary" className="text-xs">Instant Preview</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Adjust these settings to see real-time changes
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subject Line */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Subject Line Type</Label>
          <Select value={config.subject} onValueChange={(v) => updateConfig('subject', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="curiosity">Curiosity</SelectItem>
              <SelectItem value="direct">Direct Value</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="urgency">Urgency</SelectItem>
              <SelectItem value="pattern_break">Pattern Break</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            {config.subject === 'curiosity' && 'Intrigue without revealing everything'}
            {config.subject === 'direct' && 'Clear value proposition upfront'}
            {config.subject === 'personal' && 'Personalized to the recipient'}
            {config.subject === 'urgency' && 'Time-sensitive or scarcity-based'}
            {config.subject === 'pattern_break' && 'Unexpected or contrarian'}
          </p>
        </div>

        <Separator />

        {/* Opening Hook */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Opening Hook</Label>
          <Select value={config.opening} onValueChange={(v) => updateConfig('opening', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="observation">Observation</SelectItem>
              <SelectItem value="problem">Problem Statement</SelectItem>
              <SelectItem value="trigger_event">Trigger Event</SelectItem>
              <SelectItem value="question">Question</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pain Point Angle */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Pain Point Angle</Label>
          <Select value={config.painPoint} onValueChange={(v) => updateConfig('painPoint', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="competitive">Competitive Threat</SelectItem>
              <SelectItem value="scaling">Scaling Challenges</SelectItem>
              <SelectItem value="efficiency">Efficiency & Cost</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Framework */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Copy Framework</Label>
          <Select value={config.framework} onValueChange={(v) => updateConfig('framework', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PAS">PAS (Problem-Agitate-Solve)</SelectItem>
              <SelectItem value="AIDA">AIDA (Attention-Interest-Desire-Action)</SelectItem>
              <SelectItem value="BAB">BAB (Before-After-Bridge)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            {config.framework === 'PAS' && 'Identify problem → Amplify pain → Present solution'}
            {config.framework === 'AIDA' && 'Grab attention → Build interest → Create desire → Call to action'}
            {config.framework === 'BAB' && 'Show before → Paint after → Bridge the gap'}
          </p>
        </div>

        {/* Tone */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Tone</Label>
          <Select value={config.tone} onValueChange={(v) => updateConfig('tone', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="data_driven">Data-Driven</SelectItem>
              <SelectItem value="emotional">Emotional</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Social Proof */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Social Proof</Label>
          <Select value={config.socialProof} onValueChange={(v) => updateConfig('socialProof', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="similar">Similar Companies</SelectItem>
              <SelectItem value="impressive">Impressive Names</SelectItem>
              <SelectItem value="results">Results & Metrics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* CTA Size */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Call-to-Action</Label>
          <Select value={config.cta} onValueChange={(v) => updateConfig('cta', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="micro">Micro (Thoughts?)</SelectItem>
              <SelectItem value="small">Small (Worth a chat?)</SelectItem>
              <SelectItem value="medium">Medium (15 min call?)</SelectItem>
              <SelectItem value="large">Large (30 min demo?)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            Smaller asks typically get higher response rates
          </p>
        </div>

        <Separator />

        {/* PS Line */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">PS Line</Label>
          <Select value={config.psLine} onValueChange={(v) => updateConfig('psLine', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="personal">Personal Touch</SelectItem>
              <SelectItem value="urgency">Urgency</SelectItem>
              <SelectItem value="value_add">Value Add</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Urgency */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Urgency Level</Label>
          <Select value={config.urgency} onValueChange={(v) => updateConfig('urgency', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="gentle">Gentle</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
