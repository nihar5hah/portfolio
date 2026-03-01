# External Integrations

**Analysis Date:** 2026-03-02

## APIs & External Services

**AI/ML:**
- Google Gemini API - AI-powered chatbot
  - SDK: `@google/generative-ai`
  - Model: `gemini-2.5-flash`
  - Endpoint: Via API route `/api/chat`
  - Auth: `GEMINI_API_KEY` environment variable
  - Features: Streaming responses, profile context injection

## Data Storage

**Databases:**
- None - Static portfolio site

**File Storage:**
- Local filesystem only - Static assets served from `/public`
- Resume: `/resume.pdf` (with no-cache headers)

**Caching:**
- Next.js built-in image optimization cache
- Browser caching via Cache-Control headers

## Authentication & Identity

**Auth Provider:**
- None - Public portfolio site

## Monitoring & Observability

**Error Tracking:**
- None currently configured

**Logs:**
- Server-side: `console.error()` in API routes (`/api/chat/route.ts`)
- No external logging service

## CI/CD & Deployment

**Hosting:**
- Vercel (recommended for Next.js)
- Alternative: Any Node.js hosting

**CI Pipeline:**
- Not detected in repository

## Environment Configuration

**Required env vars:**
- `GEMINI_API_KEY` - Google Gemini API key for chatbot functionality

**Optional env vars:**
- None detected

**Secrets location:**
- `.env.local` - Local development
- Platform environment variables for production

## Webhooks & Callbacks

**Incoming:**
- None - No webhooks configured

**Outgoing:**
- `/api/chat` - POST endpoint that calls Google Gemini API

## Rate Limiting

**Implementation:**
- In-memory rate limiter in `/api/chat`
- Limit: 10 requests per IP per hour
- Purpose: Protect Gemini API quota

## External Resources

**Fonts (loaded externally):**
- Google Fonts: Instrument Serif, Noto Sans Gujarati, Noto Sans Devanagari
- Self-hosted via Next.js font optimization

**Icons:**
- Lucide React - Bundled with application

---

*Integration audit: 2026-03-02*
