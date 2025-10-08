import { NextRequest, NextResponse } from 'next/server'
import { queryOpenAI } from '@/lib/ai/openai'
import { generatePreviewLeadPrompt, generateCopySynthesisPrompt } from '@/lib/ai/prompts'
import { CompanyIntelligence, CopyVariations, PreviewLead } from '@/types/database.types'

export const runtime = 'nodejs'
export const maxDuration = 60 // 60 seconds for AI synthesis

function cleanJsonResponse(response: string): string {
  let cleaned = response.trim()
  
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
    const { companyData } = body

    if (!companyData) {
      return NextResponse.json(
        { error: 'Company data is required' },
        { status: 400 }
      )
    }

    const companyIntelligence: CompanyIntelligence = companyData

    // Step 1: Generate preview lead
    console.log('Generating preview lead...')
    const previewLeadPrompt = generatePreviewLeadPrompt(companyIntelligence)
    const previewLeadResponse = await queryOpenAI(previewLeadPrompt)
    const cleanedLeadResponse = cleanJsonResponse(previewLeadResponse)
    
    let previewLead: PreviewLead
    try {
      previewLead = JSON.parse(cleanedLeadResponse)
    } catch (parseError) {
      console.error('Failed to parse preview lead:', cleanedLeadResponse)
      throw new Error('Invalid JSON response for preview lead')
    }

    // Step 2: Generate copy variations
    console.log('Generating copy variations...')
    const copySynthesisPrompt = generateCopySynthesisPrompt(companyIntelligence, previewLead)
    const copyResponse = await queryOpenAI(copySynthesisPrompt)
    const cleanedCopyResponse = cleanJsonResponse(copyResponse)
    
    let copyVariations: CopyVariations
    try {
      copyVariations = JSON.parse(cleanedCopyResponse)
    } catch (parseError) {
      console.error('Failed to parse copy variations:', cleanedCopyResponse)
      throw new Error('Invalid JSON response for copy variations')
    }

    // Return both preview lead and copy variations
    return NextResponse.json({
      success: true,
      data: {
        previewLead,
        copyVariations,
      },
      meta: {
        timestamp: new Date().toISOString(),
        companyName: companyIntelligence.companyName,
      },
    })

  } catch (error) {
    console.error('Copy synthesis error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return NextResponse.json(
      { 
        error: 'Failed to generate copy variations',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}
