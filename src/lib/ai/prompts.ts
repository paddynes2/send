/**
 * AI Prompts for company research and copy generation
 */

import { CompanyIntelligence, PreviewLead } from '@/types/database.types'

export function generatePreviewLeadPrompt(companyData: CompanyIntelligence): string {
  return `You are a world-class B2B researcher and outbound specialist. Using the following ICP and company intelligence, generate ONE highly representative lead profile for personalized outbound preview. The lead should match the ICP fields, contain realistic personal and company data, and include recent company activity for contextual hooks.

ICP:
${JSON.stringify(companyData.icp, null, 2)}

Sender Company:
${JSON.stringify({
  name: companyData.companyName,
  industry: companyData.companyDetails.industry,
  usp: companyData.companyDetails.usp
}, null, 2)}

Return ONLY valid JSON (no markdown formatting):
{
  "firstName": "string",
  "lastName": "string",
  "company": "string",
  "title": "string",
  "industry": "string",
  "companySize": "string",
  "recentActivity": "string (e.g., 'Raised $50M Series B, hiring SDRs, expanded to Europe')"
}`
}

export function generateCopySynthesisPrompt(companyData: CompanyIntelligence, previewLead: PreviewLead): string {
  return `You are an expert outbound copywriter. Based on the sender company, ICP, and preview lead context below, generate a comprehensive JSON object containing creative cold email snippets for all categories: openings, hooks, arguments (by framework), CTAs, urgency elements, PS lines, social proof, and customizable variables.

Use {{prospect_name}}, {{prospect_company}}, {{recent_activity}}, etc. in all snippets for later personalization. Do NOT assemble entire emails—return only mapped snippets.

SENDER CONTEXT:
${JSON.stringify({
  companyName: companyData.companyName,
  tagline: companyData.tagline,
  usp: companyData.companyDetails.usp,
  industry: companyData.companyDetails.industry,
  copyHooks: companyData.copyHooks,
  messagingAngles: companyData.messagingAngles
}, null, 2)}

ICP CONTEXT:
${JSON.stringify(companyData.icp, null, 2)}

PREVIEW LEAD:
${JSON.stringify(previewLead, null, 2)}

Return ONLY valid JSON (no markdown formatting) in this EXACT structure:
{
  "subjects": {
    "curiosity": ["string", "string", "string"],
    "direct": ["string", "string", "string"],
    "personal": ["string", "string", "string"],
    "urgency": ["string", "string"],
    "pattern_break": ["string", "string"]
  },
  "openings": {
    "observation": ["string", "string", "string"],
    "problem": ["string", "string", "string"],
    "trigger_event": ["string", "string"],
    "question": ["string", "string", "string"]
  },
  "pain_points": {
    "competitive": ["string", "string"],
    "scaling": ["string", "string"],
    "efficiency": ["string", "string"]
  },
  "arguments": {
    "PAS": {
      "data_driven": ["string", "string"],
      "emotional": ["string", "string"]
    },
    "AIDA": {
      "data_driven": ["string", "string"],
      "emotional": ["string", "string"]
    },
    "BAB": {
      "data_driven": ["string", "string"],
      "emotional": ["string", "string"]
    }
  },
  "social_proof": {
    "none": [""],
    "similar": ["string", "string"],
    "impressive": ["string", "string"],
    "results": ["string", "string"]
  },
  "ctas": {
    "micro": ["Thoughts?", "Make sense?", "Interested?"],
    "small": ["Worth a chat?", "Open to learning more?"],
    "medium": ["15 minutes to discuss?", "Quick call this week?"],
    "large": ["30 minute demo?", "Full walkthrough?"]
  },
  "ps_lines": {
    "none": [""],
    "personal": ["string", "string"],
    "urgency": ["string", "string"],
    "value_add": ["string", "string"]
  },
  "urgency_elements": {
    "none": [""],
    "gentle": ["when you're ready", "at your convenience"],
    "moderate": ["this quarter", "in the coming weeks"],
    "high": ["this week", "before Friday"]
  }
}

Make sure ALL strings include appropriate placeholders like {{prospect_name}}, {{prospect_company}}, {{recent_activity}}, etc.`
}

export function generateCompanyResearchPrompt(domain: string): string {
  return `You are an expert Go-to-Market (GTM) Strategist and Market Research Analyst with powerful, real-time access to web data. Your primary goal is to perform a deep analysis of a given company domain and synthesize your findings into a structured, actionable GTM profile. You must be analytical, precise, and infer information logically. Your output must be a single, valid JSON object and nothing else. Do not wrap the JSON in markdown backticks.

CONTEXT
You will be given a single company domain. You must use your internal knowledge and browsing capabilities to research this company thoroughly, following the enrichment priority specified in the instructions.

TASK & INSTRUCTIONS
Your task is to populate the JSON object based on your comprehensive research of the provided company domain. Follow these instructions carefully:

1. Research Priority: Conduct your research using sources in this order of importance:
   - Company website (Homepage, About, Pricing, Blog pages)
   - Recent press releases and authoritative news articles
   - LinkedIn company page (for employee count, hiring trends)
   - Review sites (G2, Capterra) for customer voice
   - Job postings (for growth signals and tech stack clues)

2. Signal Detection: Actively look for these specific signals during your research:
   - Pricing model: Per-seat, usage-based, flat-fee tiers
   - Social proof: Customer logos, testimonials, case studies
   - Growth indicators: Job postings, new office locations, funding news
   - Tech stack hints: Integrations pages, API documentation

3. Graceful Degradation (Fallbacks): If any information cannot be determined with confidence:
   - For factual fields (e.g., a specific competitor), use the string "Not publicly available"
   - For numerical estimates (e.g., revenue), use a tilde ~ prefix to indicate an educated guess (e.g., "~ $10M - $15M")
   - If fewer than two significant news items are found in the last 6 months, populate the news array with an entry where the type is "NONE"

4. Enhanced Anti-ICP Logic: When defining the antiICP, consider:
   - Industries the company does not mention
   - Company sizes that fall outside their pricing tiers or case study examples
   - Geographies where they have no stated presence or language support

COMPANY DOMAIN
${domain}

OUTPUT FORMAT (JSON ONLY)
{
  "dataConfidence": {
    "score": 0-100,
    "gaps": ["string", "string"],
    "sources": ["string", "string", "string"]
  },
  "companyName": "string",
  "tagline": "string",
  "oneSentenceWriteUp": "string",
  "companyDetails": {
    "industry": "string",
    "subVertical": "string",
    "businessModel": "string",
    "whatTheyDo": ["string", "string"],
    "usp": "string"
  },
  "gtmScore": {
    "score": 0-100,
    "justification": "string"
  },
  "icp": {
    "painPoints": ["string", "string", "string"],
    "companySize": "string",
    "companyIndustry": "string",
    "geography": "string",
    "annualRevenue": "string",
    "antiICP": "string"
  },
  "buyerPersona": {
    "decisionMaker": {
      "title": "string",
      "concerns": ["string", "string"]
    },
    "influencer": {
      "title": "string",
      "concerns": ["string", "string"]
    }
  },
  "strategicInsights": {
    "blindSpots": ["string"],
    "opportunities": ["string"],
    "competitivePosition": "string"
  },
  "copyHooks": {
    "competitors": ["string", "string"],
    "triggerEvents": ["string", "string"],
    "quantifiedValue": "string",
    "techStack": ["string", "string"]
  },
  "messagingAngles": {
    "primaryPain": "string",
    "competitiveThreat": "string",
    "costOfInaction": "string",
    "transformationStory": "string"
  },
  "news": [
    {
      "type": "FUNDING|PRODUCT|ACQUISITION|LEADERSHIP|NONE",
      "title": "string",
      "source": "string",
      "date": "YYYY-MM-DD",
      "relevanceForOutreach": "HIGH|MEDIUM|LOW"
    }
  ],
  "templateMatch": {
    "category": "string",
    "confidence": 0.0-1.0
  }
}

Return ONLY the JSON object with no additional text, markdown formatting, or code blocks.`
}
