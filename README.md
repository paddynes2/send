# SEND - AI-Powered GTM SaaS Platform

**From URL to outbound in minutes.**

SEND is an AI-powered Go-to-Market (GTM) platform that automates the entire customer acquisition process—from infrastructure to outreach to revenue—in one click. Built for modern makers, founders, and lean teams who value efficiency over complexity.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🎯 Project Status

**✅ COMPLETED: Screen 1 - Hero/Landing Page**

See [PROGRESS.md](./PROGRESS.md) for detailed development status and next steps.

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **AI:** OpenAI, Anthropic, Perplexity
- **Deployment:** Vercel

## 📋 Environment Variables

See `.env.example` for all required environment variables.

### Core Services:
- Supabase (database + auth)
- Stripe (payments)
- OpenAI/Anthropic/Perplexity (AI intelligence)

### Mock Services (stubbed until API access):
- Salesforge, Infraforge, Warmforge, Primeforge, Mailpool

## 🎨 Brand Kit

### Colors
- **Paper** `#FDFCFA` - Primary background
- **Deep Ink** `#1E2A36` - Primary text
- **Charcoal** `#39404B` - Secondary text
- **Alice Blue** `#ECF4F7` - Light accent
- **Burgundy** `#910029` - Primary CTA

### Typography
- **Futura** - Primary headings
- **Inter** - UI + body text
- **Native Record** - Accent elements

## 📦 Project Structure

```
send/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and configs
│   └── types/            # TypeScript types
├── supabase/
│   └── migrations/       # Database migrations
└── public/               # Static assets
```

## 🗄️ Database Schema

Run the Supabase migration:

```sql
-- In Supabase SQL Editor, run:
supabase/migrations/001_initial_schema.sql
```

Tables:
- `users` - User profiles and subscription status
- `campaigns` - Campaign data and status
- `copy_variations` - AI-generated copy snippets
- `leads` - Lead lists and enrichment data
- `campaign_config` - Campaign settings and pre-flight

## 🧪 Development

```bash
# Type checking
npm run build

# Linting
npm run lint
```

## 📚 Key Features

1. **Instant Infrastructure** - Zero DNS setup, inbox-safe domains
2. **GTM Playbooks** - Complete outbound motions in one click
3. **AI Copy Engine** - Real-time copy generation and assembly
4. **Pre-Flight Checks** - Launch with zero anxiety
5. **Smart Automation** - Routing to Slack, HubSpot, Calendly, etc.
6. **Full Control** - Final approval on all AI outputs

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Environment variables for sensitive keys
- Supabase Auth for user management
- Stripe for secure payment processing

## 📖 Documentation

- [PROGRESS.md](./PROGRESS.md) - Development progress tracker
- [.env.example](./.env.example) - Environment setup guide
- [supabase/migrations/](./supabase/migrations/) - Database schema

## 🤝 Contributing

This is a private project. Contact the maintainer for access.

## 📄 License

Proprietary - All rights reserved

---

**Built with ❤️ for builders who ship**
