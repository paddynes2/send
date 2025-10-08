/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          subscription_status: 'free' | 'trial' | 'paid' | 'cancelled'
          subscription_tier: string | null
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      campaigns: {
        Row: {
          id: string
          user_id: string
          name: string
          status: 'draft' | 'research' | 'copy' | 'config' | 'active' | 'paused' | 'completed'
          company_url: string
          company_data: any // JSON
          icp_data: any // JSON
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['campaigns']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['campaigns']['Insert']>
      }
      copy_variations: {
        Row: {
          id: string
          campaign_id: string
          variations_json: any // The big JSON with all copy snippets
          preview_lead: any // JSON for the preview lead data
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['copy_variations']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['copy_variations']['Insert']>
      }
      leads: {
        Row: {
          id: string
          campaign_id: string
          first_name: string
          last_name: string
          email: string
          company: string
          title: string
          linkedin_url: string | null
          enrichment_data: any // JSON
          status: 'pending' | 'contacted' | 'replied' | 'meeting' | 'unsubscribed'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      campaign_config: {
        Row: {
          id: string
          campaign_id: string
          daily_limit: number
          domain_setup: 'system' | 'custom'
          domains: string[] // JSON array
          sending_schedule: any // JSON
          routing_config: any // JSON
          preflight_status: any // JSON
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['campaign_config']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['campaign_config']['Insert']>
      }
    }
  }
}

// Company Intelligence Types
export interface CompanyIntelligence {
  dataConfidence: {
    score: number
    gaps: string[]
    sources: string[]
  }
  companyName: string
  tagline: string
  oneSentenceWriteUp: string
  companyDetails: {
    industry: string
    subVertical: string
    businessModel: string
    whatTheyDo: string[]
    usp: string
  }
  gtmScore: {
    score: number
    justification: string
  }
  icp: {
    painPoints: string[]
    companySize: string
    companyIndustry: string
    geography: string
    annualRevenue: string
    antiICP: string
  }
  buyerPersona: {
    decisionMaker: {
      title: string
      concerns: string[]
    }
    influencer: {
      title: string
      concerns: string[]
    }
  }
  strategicInsights: {
    blindSpots: string[]
    opportunities: string[]
    competitivePosition: string
  }
  copyHooks: {
    competitors: string[]
    triggerEvents: string[]
    quantifiedValue: string
    techStack: string[]
  }
  messagingAngles: {
    primaryPain: string
    competitiveThreat: string
    costOfInaction: string
    transformationStory: string
  }
  news: Array<{
    type: 'FUNDING' | 'PRODUCT' | 'ACQUISITION' | 'LEADERSHIP' | 'NONE'
    title: string
    source: string
    date: string
    relevanceForOutreach: 'HIGH' | 'MEDIUM' | 'LOW'
  }>
  templateMatch: {
    category: string
    confidence: number
  }
}

// Copy Variations Types
export interface CopyVariations {
  subjects: {
    [key: string]: string[]
  }
  openings: {
    [key: string]: string[]
  }
  pain_points: {
    [key: string]: string[]
  }
  arguments: {
    [framework: string]: {
      [tone: string]: string[]
    }
  }
  social_proof: {
    [key: string]: string[]
  }
  ctas: {
    [size: string]: string[]
  }
  ps_lines: {
    [key: string]: string[]
  }
  urgency_elements: {
    [key: string]: string[]
  }
}

// Preview Lead Type
export interface PreviewLead {
  firstName: string
  lastName: string
  company: string
  title: string
  industry: string
  companySize: string
  recentActivity: string
}
