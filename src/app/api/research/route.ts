import { NextRequest, NextResponse } from 'next/server'
import { queryPerplexity } from '@/lib/ai/perplexity'
import { queryOpenAI } from '@/lib/ai/openai'
import { generateCompanyResearchPrompt } from '@/lib/ai/prompts'
import { CompanyIntelligence } from '@/types/database.types'

export const runtime = 'nodejs'
export const maxDuration = 60 // 60 seconds for AI research

function extractDomain(url: string): string {
  try {
    // Remove protocol if present
    let domain = url.replace(/^https?:\/\//, '')
    // Remove www. if present
    domain = domain.replace(/^www\./, '')
    // Remove path if present
    domain = domain.split('/')[0]
    // Remove port if present
    domain = domain.split(':')[0]
    return domain
  } catch (error) {
    return url
  }
}

function cleanJsonResponse(response: string): string {
  // Remove markdown code blocks if present
  let cleaned = response.trim()
  
  // Remove ```json and ``` if present
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\n?/, '')
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\n?/, '')
  }
  
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.replace(/\n?```$/, '')
  }
  
  return cleaned.trim()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Extract domain from URL
    const domain = extractDomain(url)

    // Generate the research prompt
    const prompt = generateCompanyResearchPrompt(domain)

    // Try Perplexity first (has web access), fall back to OpenAI
    let responseText: string
    let aiProvider: string = 'none'

    try {
      if (process.env.PERPLEXITY_API_KEY) {
        console.log('Using Perplexity AI for research...')
        responseText = await queryPerplexity(prompt)
        aiProvider = 'perplexity'
      } else if (process.env.OPENAI_API_KEY) {
        console.log('Using OpenAI for research...')
        responseText = await queryOpenAI(prompt)
        aiProvider = 'openai'
      } else {
        throw new Error('No AI provider configured. Please set PERPLEXITY_API_KEY or OPENAI_API_KEY')
      }
    } catch (error) {
      // If Perplexity fails, try OpenAI as fallback
      if (aiProvider === 'perplexity' && process.env.OPENAI_API_KEY) {
        console.log('Perplexity failed, falling back to OpenAI...')
        responseText = await queryOpenAI(prompt)
        aiProvider = 'openai'
      } else {
        throw error
      }
    }

    // Clean and parse the JSON response
    const cleanedResponse = cleanJsonResponse(responseText)
    
    let companyData: CompanyIntelligence
    try {
      companyData = JSON.parse(cleanedResponse)
    } catch (parseError) {
      console.error('Failed to parse AI response:', cleanedResponse)
      throw new Error('Invalid JSON response from AI provider')
    }

    // Return the structured company intelligence
    return NextResponse.json({
      success: true,
      data: companyData,
      meta: {
        domain,
        originalUrl: url,
        aiProvider,
        timestamp: new Date().toISOString(),
      },
    })

  } catch (error) {
    console.error('Research API error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return NextResponse.json(
      { 
        error: 'Failed to research company',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}
