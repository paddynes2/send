'use client'

import { useState } from 'react'
import { CompanyIntelligence } from '@/types/database.types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Edit2, Check, X, Plus, Trash2, TrendingUp } from 'lucide-react'

interface CompanyIntelligenceFormProps {
  data: CompanyIntelligence
  onChange: (data: CompanyIntelligence) => void
}

export function CompanyIntelligenceForm({ data, onChange }: CompanyIntelligenceFormProps) {
  const [editingField, setEditingField] = useState<string | null>(null)

  const updateField = (path: string, value: any) => {
    const pathParts = path.split('.')
    const newData = JSON.parse(JSON.stringify(data))
    
    let current: any = newData
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]]
    }
    current[pathParts[pathParts.length - 1]] = value
    
    onChange(newData)
  }

  const addArrayItem = (path: string, value: string) => {
    const pathParts = path.split('.')
    const newData = JSON.parse(JSON.stringify(data))
    
    let current: any = newData
    for (const part of pathParts) {
      current = current[part]
    }
    
    if (Array.isArray(current)) {
      current.push(value)
    }
    
    onChange(newData)
  }

  const removeArrayItem = (path: string, index: number) => {
    const pathParts = path.split('.')
    const newData = JSON.parse(JSON.stringify(data))
    
    let current: any = newData
    for (const part of pathParts) {
      current = current[part]
    }
    
    if (Array.isArray(current)) {
      current.splice(index, 1)
    }
    
    onChange(newData)
  }

  const gtmScoreColor = 
    data.gtmScore.score >= 80 ? 'text-green-600' :
    data.gtmScore.score >= 60 ? 'text-yellow-600' :
    'text-orange-600'

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{data.companyName}</CardTitle>
              <p className="text-muted-foreground mt-1">{data.tagline}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className={`font-bold ${gtmScoreColor}`}>{data.gtmScore.score}</span>
                <span className="text-muted-foreground ml-1">/ 100</span>
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold">One-Sentence Summary</Label>
              <p className="text-sm text-charcoal mt-1">{data.oneSentenceWriteUp}</p>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-sm font-semibold mb-2 block">GTM Readiness</Label>
              <p className="text-sm text-charcoal">{data.gtmScore.justification}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <Label className="text-xs text-muted-foreground">Data Confidence</Label>
                <p className="font-semibold">{data.dataConfidence.score}%</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Sources Used</Label>
                <p className="font-semibold">{data.dataConfidence.sources.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Details */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Industry</Label>
              <Input value={data.companyDetails.industry} readOnly className="mt-1" />
            </div>
            <div>
              <Label>Sub-Vertical</Label>
              <Input value={data.companyDetails.subVertical} readOnly className="mt-1" />
            </div>
          </div>
          
          <div>
            <Label>Business Model</Label>
            <Input value={data.companyDetails.businessModel} readOnly className="mt-1" />
          </div>
          
          <div>
            <Label>Unique Selling Proposition</Label>
            <Textarea 
              value={data.companyDetails.usp} 
              readOnly 
              className="mt-1 min-h-[80px]"
            />
          </div>

          <div>
            <Label className="mb-2 block">What They Do</Label>
            <div className="flex flex-wrap gap-2">
              {data.companyDetails.whatTheyDo.map((item, index) => (
                <Badge key={index} variant="secondary">{item}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ICP Card */}
      <Card className="border-2 border-burgundy/30">
        <CardHeader>
          <CardTitle className="text-burgundy">Ideal Customer Profile (ICP)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-2 block font-semibold">Pain Points</Label>
            <div className="space-y-2">
              {data.icp.painPoints.map((pain, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-alice-blue/50 rounded-lg">
                  <Badge variant="outline" className="mt-0.5">{index + 1}</Badge>
                  <p className="text-sm flex-1">{pain}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Company Size</Label>
              <Input value={data.icp.companySize} readOnly className="mt-1" />
            </div>
            <div>
              <Label>Industry</Label>
              <Input value={data.icp.companyIndustry} readOnly className="mt-1" />
            </div>
            <div>
              <Label>Geography</Label>
              <Input value={data.icp.geography} readOnly className="mt-1" />
            </div>
            <div>
              <Label>Annual Revenue</Label>
              <Input value={data.icp.annualRevenue} readOnly className="mt-1" />
            </div>
          </div>

          <div>
            <Label>Anti-ICP (Who to Avoid)</Label>
            <Textarea 
              value={data.icp.antiICP} 
              readOnly 
              className="mt-1 min-h-[60px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Buyer Personas */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Buyer Personas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-semibold text-burgundy mb-3 block">Decision Maker</Label>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Title</Label>
                <Input value={data.buyerPersona.decisionMaker.title} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Key Concerns</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.buyerPersona.decisionMaker.concerns.map((concern, index) => (
                    <Badge key={index} variant="secondary">{concern}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-base font-semibold text-burgundy mb-3 block">Influencer</Label>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Title</Label>
                <Input value={data.buyerPersona.influencer.title} readOnly className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Key Concerns</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.buyerPersona.influencer.concerns.map((concern, index) => (
                    <Badge key={index} variant="secondary">{concern}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Insights */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Strategic Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="font-semibold">Competitive Position</Label>
            <p className="text-sm text-charcoal mt-2">{data.strategicInsights.competitivePosition}</p>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="font-semibold mb-2 block">Blind Spots</Label>
              <ul className="space-y-1">
                {data.strategicInsights.blindSpots.map((spot, index) => (
                  <li key={index} className="text-sm text-charcoal flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    {spot}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Label className="font-semibold mb-2 block">Opportunities</Label>
              <ul className="space-y-1">
                {data.strategicInsights.opportunities.map((opp, index) => (
                  <li key={index} className="text-sm text-charcoal flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    {opp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Copy Hooks */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Copy Hooks & Messaging</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-2 block">Competitors</Label>
            <div className="flex flex-wrap gap-2">
              {data.copyHooks.competitors.map((comp, index) => (
                <Badge key={index} variant="outline">{comp}</Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Trigger Events</Label>
            <div className="flex flex-wrap gap-2">
              {data.copyHooks.triggerEvents.map((event, index) => (
                <Badge key={index} className="bg-alice-blue text-deep-ink">{event}</Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Tech Stack</Label>
            <div className="flex flex-wrap gap-2">
              {data.copyHooks.techStack.map((tech, index) => (
                <Badge key={index} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Quantified Value Prop</Label>
            <Input value={data.copyHooks.quantifiedValue} readOnly className="mt-1" />
          </div>

          <Separator />

          <div className="space-y-3">
            <div>
              <Label className="text-sm font-semibold">Primary Pain</Label>
              <p className="text-sm text-charcoal mt-1 italic">&quot;{data.messagingAngles.primaryPain}&quot;</p>
            </div>
            <div>
              <Label className="text-sm font-semibold">Competitive Threat</Label>
              <p className="text-sm text-charcoal mt-1 italic">&quot;{data.messagingAngles.competitiveThreat}&quot;</p>
            </div>
            <div>
              <Label className="text-sm font-semibold">Cost of Inaction</Label>
              <p className="text-sm text-charcoal mt-1 italic">&quot;{data.messagingAngles.costOfInaction}&quot;</p>
            </div>
            <div>
              <Label className="text-sm font-semibold">Transformation Story</Label>
              <p className="text-sm text-charcoal mt-1 italic">&quot;{data.messagingAngles.transformationStory}&quot;</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent News */}
      {data.news && data.news.length > 0 && data.news[0].type !== 'NONE' && (
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Recent News & Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.news.map((item, index) => (
                <div key={index} className="p-4 bg-alice-blue/30 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={
                      item.type === 'FUNDING' ? 'default' :
                      item.type === 'PRODUCT' ? 'secondary' :
                      'outline'
                    }>
                      {item.type}
                    </Badge>
                    <Badge variant="outline" className={
                      item.relevanceForOutreach === 'HIGH' ? 'border-green-600 text-green-600' :
                      item.relevanceForOutreach === 'MEDIUM' ? 'border-yellow-600 text-yellow-600' :
                      'border-gray-400 text-gray-600'
                    }>
                      {item.relevanceForOutreach}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.source} • {item.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
