-- SEND Platform Database Schema
-- This file can be run in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'trial', 'paid', 'cancelled')),
  subscription_tier TEXT
);

-- Campaigns table
CREATE TABLE public.campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'research', 'copy', 'config', 'active', 'paused', 'completed')),
  company_url TEXT NOT NULL,
  company_data JSONB,
  icp_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Copy Variations table
CREATE TABLE public.copy_variations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  variations_json JSONB NOT NULL,
  preview_lead JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  linkedin_url TEXT,
  enrichment_data JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'replied', 'meeting', 'unsubscribed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign Configuration table
CREATE TABLE public.campaign_config (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL UNIQUE,
  daily_limit INTEGER DEFAULT 50,
  domain_setup TEXT DEFAULT 'system' CHECK (domain_setup IN ('system', 'custom')),
  domains JSONB DEFAULT '[]'::jsonb,
  sending_schedule JSONB DEFAULT '{}'::jsonb,
  routing_config JSONB DEFAULT '{}'::jsonb,
  preflight_status JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_campaigns_user_id ON public.campaigns(user_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_leads_campaign_id ON public.leads(campaign_id);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_copy_variations_campaign_id ON public.copy_variations(campaign_id);
CREATE INDEX idx_campaign_config_campaign_id ON public.campaign_config(campaign_id);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copy_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_config ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Campaigns policies
CREATE POLICY "Users can view own campaigns" ON public.campaigns
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own campaigns" ON public.campaigns
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own campaigns" ON public.campaigns
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own campaigns" ON public.campaigns
  FOR DELETE USING (auth.uid() = user_id);

-- Copy Variations policies
CREATE POLICY "Users can view own copy variations" ON public.copy_variations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = copy_variations.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own copy variations" ON public.copy_variations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = copy_variations.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own copy variations" ON public.copy_variations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = copy_variations.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- Leads policies
CREATE POLICY "Users can view own leads" ON public.leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = leads.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own leads" ON public.leads
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = leads.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own leads" ON public.leads
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = leads.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- Campaign Config policies
CREATE POLICY "Users can view own campaign config" ON public.campaign_config
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = campaign_config.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own campaign config" ON public.campaign_config
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = campaign_config.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own campaign config" ON public.campaign_config
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = campaign_config.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_copy_variations_updated_at BEFORE UPDATE ON public.copy_variations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaign_config_updated_at BEFORE UPDATE ON public.campaign_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
