'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CompanyAutocomplete } from './company-autocomplete'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Check, ArrowRight, Zap, Shield, Target, Sparkles, TrendingUp, Clock } from 'lucide-react'

export function Hero() {
  const [companyUrl, setCompanyUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleGetStarted = async () => {
    if (!companyUrl) return

    setIsSubmitting(true)
    // Navigate to research screen with the URL
    router.push(`/research?url=${encodeURIComponent(companyUrl)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-alice-blue/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        {/* Eyebrow */}
        <div className="text-center mb-6">
          <Badge variant="secondary" className="eyebrow px-4 py-2 bg-alice-blue/80 text-burgundy border-0">
            Built for builders who closed $47M last quarter
          </Badge>
        </div>

        {/* H1 */}
        <h1 className="heading-primary text-5xl md:text-7xl font-bold text-center mb-6 text-deep-ink">
          From URL to outbound in minutes
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-center text-charcoal mb-12 max-w-3xl mx-auto">
          Zero-setup AI outbound – email + LinkedIn in one campaign. No DNS. No domains. No blank page.
        </p>

        {/* Input + CTA */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full">
              <CompanyAutocomplete value={companyUrl} onChange={setCompanyUrl} />
            </div>
            <Button
              size="lg"
              className="px-8 py-7 text-lg bg-burgundy hover:bg-burgundy/90 w-full sm:w-auto whitespace-nowrap"
              onClick={handleGetStarted}
              disabled={!companyUrl || isSubmitting}
            >
              Get started free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Progress indicator */}
          <p className="text-center text-sm text-charcoal mt-4">
            <span className="font-semibold">Step 1 of 3:</span> Paste your URL. We&apos;ll generate your first GTM
            strategy in 60 seconds
          </p>
        </div>

        {/* Safety cues */}
        <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm text-charcoal">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-burgundy" />
            <span>No credit card</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-burgundy" />
            <span>No domain setup</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-burgundy" />
            <span>Live in 5 minutes</span>
          </div>
        </div>

        {/* Micro-trust */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          <span>Inbox-safe infrastructure</span>
          <span>Millions of leads enriched</span>
          <span>GDPR-aligned</span>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="bg-alice-blue/50 py-8 border-y border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-charcoal mb-4 font-medium">
            Trusted by technical founders and lean teams
          </p>
          <div className="flex justify-center items-center gap-8 overflow-x-auto">
            {/* Placeholder for animated logo row - you can add real logos later */}
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 bg-charcoal/10 rounded" />
              <span className="text-sm text-charcoal">Company A</span>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 bg-charcoal/10 rounded" />
              <span className="text-sm text-charcoal">Company B</span>
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-8 h-8 bg-charcoal/10 rounded" />
              <span className="text-sm text-charcoal">Company C</span>
            </div>
          </div>
        </div>
      </section>

      {/* The old way is broken */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="heading-primary text-3xl md:text-5xl font-bold text-deep-ink mb-4">
            The old way is broken
          </h2>
          <p className="text-xl text-charcoal">Stop duct-taping tools. Start running a system.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ComparisonCard before="Did I break DNS?" after="Never touch DNS again" />
          <ComparisonCard before="Blank-page dread" after="Copy ready – tweak tone and CTA" />
          <ComparisonCard before="Tool-stack Tetris" after="One calm screen" />
          <ComparisonCard
            before="Will this even work?"
            after="99% inbox, 0 anxiety—pre-flight checks built in"
          />
        </div>
      </section>

      {/* MEET SEND */}
      <section className="bg-alice-blue/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <Badge variant="secondary" className="eyebrow px-4 py-2 bg-burgundy/10 text-burgundy border-0">
              MEET SEND
            </Badge>
          </div>
          <h2 className="heading-primary text-4xl md:text-6xl font-bold text-center text-deep-ink mb-6">
            OUTBOUND THAT JUST WORKS
          </h2>

          <div className="max-w-3xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProcessStep number="1" title="Paste URL" description="we fingerprint product, audience, language" />
              <ProcessStep
                number="2"
                title="Review strategy"
                description="ICP, leads, email + LinkedIn cadence auto-generated"
              />
              <ProcessStep
                number="3"
                title="Hit &quot;Engage&quot;"
                description="Pre-flight gives green check, calendar fills while you sleep"
              />
            </div>
          </div>

          {/* Testimonial */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-2xl italic text-deep-ink mb-4">
              &quot;I went from 0 to 12 qualified calls in a week. Should be illegal.&quot;
            </p>
            <p className="text-charcoal">— Sarah Chen, Founder @ DataSync</p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="heading-primary text-4xl md:text-5xl font-bold text-center text-deep-ink mb-4">
          Your Entire Outbound Stack, Replaced.
        </h2>
        <p className="text-center text-xl text-charcoal mb-16">
          A complete go-to-market system that handles everything from infrastructure to intelligence.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-burgundy" />}
            title="Instant Infrastructure"
            description="Forget DNS and domain costs. We handle the aged domains, continuous inbox warming, and authentication (SPF, DKIM). You get a 99% deliverability machine that's inbox-safe from day one."
          />
          <FeatureCard
            icon={<Target className="h-8 w-8 text-burgundy" />}
            title="GTM Playbooks"
            description="Deploy complete go-to-market motions, not just campaigns. Each Playbook contains an ICP, leads, and multi-channel sequences that you can activate, duplicate, or turn off with a single click."
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-burgundy" />}
            title="AI Copy & Strategy Engine"
            description="Never start from a blank page. Our AI proposes your ICP, finds leads, and writes your campaigns. As you adjust tone or CTAs, the copy morphs in real-time, keeping your message coherent across email and LinkedIn."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-burgundy" />}
            title="Pre-Flight Safety Checks"
            description="Launch with zero anxiety. Before any campaign goes live, we audit everything: domain health, spam words, personalization depth, and LinkedIn safety limits. You only engage when the system shows all green."
          />
          <FeatureCard
            icon={<TrendingUp className="h-8 w-8 text-burgundy" />}
            title="Smart Automation & Routing"
            description="The system works for you. Sending windows adapt to recipient behavior for max engagement. Replies and meetings are automatically detected and routed to your existing stack—Slack, HubSpot, Calendly, or anywhere via webhooks."
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8 text-burgundy" />}
            title="You&apos;re Always in Control"
            description="This is your strategy, supercharged. You have final approval on all AI-generated lists and copy before anything is sent. Our system provides the intelligence; you make the final call."
          />
        </div>
      </section>

      {/* Stripe comparison */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="heading-primary text-4xl md:text-5xl font-bold text-deep-ink mb-4">
          Send is to outbound what Stripe was to payments.
        </h2>
        <p className="text-xl text-charcoal">The messy technical rails vanish. You just grow.</p>
      </section>

      {/* CTA */}
      <section className="bg-deep-ink text-paper py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-primary text-4xl md:text-5xl font-bold mb-4">
            You Shipped Code. Time to Ship Revenue.
          </h2>
          <p className="text-xl mb-8">Launch your first campaign before your coffee cools.</p>
          <Button
            size="lg"
            className="px-8 py-7 text-lg bg-burgundy hover:bg-burgundy/90"
            onClick={() => document.querySelector('input')?.focus()}
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm mt-6 text-paper/70">
            87 founders launched campaigns this week. Yours is ready in 5 minutes.
          </p>
        </div>
      </section>
    </div>
  )
}

function ComparisonCard({ before, after }: { before: string; after: string }) {
  return (
    <Card className="border-2 hover:border-burgundy/50 transition-all duration-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">You&apos;re feeling...</p>
            <p className="text-lg text-deep-ink font-medium">&quot;{before}&quot;</p>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-burgundy font-semibold mb-1">With Send</p>
            <p className="text-lg text-deep-ink font-semibold">{after}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProcessStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-burgundy text-paper rounded-full font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="font-semibold text-lg text-deep-ink mb-2">{title}</h3>
      <p className="text-sm text-charcoal">{description}</p>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-2 hover:border-burgundy/50 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="font-semibold text-xl text-deep-ink mb-3">{title}</h3>
        <p className="text-charcoal leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}
