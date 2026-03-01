# Technology Stack

**Analysis Date:** 2026-03-02

## Languages

**Primary:**
- TypeScript 5.4+ - Core language for all application code
- JavaScript - Legacy compatibility and build tooling

**Styling:**
- CSS (Tailwind CSS) - Utility-first CSS framework

## Runtime

**Environment:**
- Node.js (Next.js 14.2+ runtime)
- Browser (React 18.2 client-side)

**Package Manager:**
- npm - Version management via `package-lock.json`

## Frameworks

**Core:**
- Next.js 14.2 - React full-stack framework with App Router
- React 18.2 - UI library

**Animation:**
- Framer Motion 11.0+ - Declarative animations

**Styling:**
- Tailwind CSS 3.4+ - Utility-first CSS
- Tailwind CSS Animate - Animation plugin
- PostCSS - CSS processing
- Autoprefixer - Vendor prefixing

**UI Components:**
- Radix UI (Slot) - Headless UI primitives
- Lucide React 0.400+ - Icon library

**Markdown:**
- React Markdown 10.1+ - Markdown rendering

**AI/ML:**
- Google Generative AI SDK 0.24+ - Gemini API integration

**Fonts:**
- Geist - Sans and mono fonts (self-hosted via `geist` package)
- IBM Plex Mono - Technical display font (via `@fontsource/ibm-plex-mono`)
- Inter - UI font (via `@fontsource/inter`)
- Google Fonts (loaded via next/font/google):
  - Instrument Serif - Serif headline font
  - Noto Sans Gujarati - Gujarati script support
  - Noto Sans Devanagari - Devanagari script support

## Key Dependencies

**Critical:**
- `next` 14.2+ - Framework core
- `react` 18.2+ - UI library
- `framer-motion` 11.0+ - Animations
- `@google/generative-ai` 0.24+ - AI chatbot backend

**Utilities:**
- `tailwind-merge` 2.2+ - Tailwind class merging
- `clsx` 2.1+ - Conditional class names
- `class-variance-authority` 0.7+ - Component variants

**Type Definitions:**
- `@types/node` 20.0+
- `@types/react` 18.2+
- `@types/react-dom` 18.2+

## Configuration

**Environment:**
- `.env.local` - Local environment variables
- `.env.example` - Template for required env vars
- Required: `GEMINI_API_KEY` - Google Gemini API key for chatbot

**Build:**
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration

**Key Next.js Config:**
- React Strict Mode enabled
- AVIF and WebP image formats
- Custom device/image sizes for responsive images
- SWC minification enabled
- Package optimization for `lucide-react`
- Custom headers for `/resume.pdf` (no-cache)

## Platform Requirements

**Development:**
- Node.js 18+ recommended
- npm for package management

**Production:**
- Next.js compatible hosting (Vercel, Node.js server, or static export)
- Node.js runtime for API routes
- Environment variables for API keys

---

*Stack analysis: 2026-03-02*
