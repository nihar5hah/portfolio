# Architecture

**Analysis Date:** 2026-03-02

## Pattern Overview

**Overall:** Next.js 14 App Router with Component-Based Architecture

**Key Characteristics:**
- Server-side rendering with client-side interactivity via 'use client' directives
- Component composition with clear separation of concerns
- Context-based state management for theme and profile data
- API routes for server-side operations (chat functionality)
- Static data files for content (projects, skills, experience)

## Layers

**App Layer:**
- Purpose: Next.js App Router entry points and pages
- Location: `src/app/`
- Contains: `page.tsx` (main page), `layout.tsx` (root layout), API routes
- Depends on: All component layers
- Used by: Next.js framework

**Section Components:**
- Purpose: Major page sections composing the portfolio
- Location: `src/components/sections/`
- Contains: Hero, About, Skills, Projects, Experience, Contact, etc.
- Depends on: UI components, Layout components, Data layer
- Used by: `src/app/page.tsx`

**UI Components:**
- Purpose: Reusable, atomic UI elements
- Location: `src/components/ui/`
- Contains: Button, Card, Badge, ChatWidget, ScrollProgress, etc.
- Depends on: `src/lib/utils.ts` (cn function), motion components
- Used by: Section components

**Layout Components:**
- Purpose: Structural components (Header, Footer, Container)
- Location: `src/components/layout/`
- Contains: Header, Footer, Container, GlobalInteractions
- Depends on: UI components, hooks
- Used by: Page layout

**Motion Components:**
- Purpose: Animation utilities and reusable motion variants
- Location: `src/components/motion/`
- Contains: `animations.ts` (variants), ScrollReveal, FadeIn
- Depends on: Framer Motion
- Used by: UI and Section components

**Data Layer:**
- Purpose: Static content and context providers
- Location: `src/data/`
- Contains: projects.ts, skills.ts, experience.ts, profile-context.ts, chatbot-context.ts
- Depends on: Types layer
- Used by: All components displaying content

**Hooks Layer:**
- Purpose: Reusable React hooks for state and behavior
- Location: `src/hooks/`
- Contains: `useTheme.tsx` (theme context provider)
- Depends on: React
- Used by: Layout components

**Types Layer:**
- Purpose: TypeScript type definitions
- Location: `src/types/index.ts`
- Contains: Project, Experience, Skill, SocialLink interfaces
- Depends on: None
- Used by: Data layer, Components

**Lib Layer:**
- Purpose: Utility functions
- Location: `src/lib/utils.ts`
- Contains: `cn()` function for className merging
- Depends on: clsx, tailwind-merge
- Used by: All components

## Data Flow

**Page Render Flow:**

1. `src/app/page.tsx` imports and renders all section components in order
2. Each section component imports its data from `src/data/`
3. Section components compose UI components from `src/components/ui/`
4. UI components use `cn()` from `src/lib/utils.ts` for styling
5. Motion variants from `src/components/motion/animations.ts` provide animations

**Theme Flow:**

1. `src/app/layout.tsx` wraps app in `ThemeProvider` from `src/hooks/useTheme.tsx`
2. `ThemeProvider` reads localStorage and applies theme to `<html>` element
3. Components access theme via `useTheme()` hook
4. Tailwind CSS uses `data-theme` attribute for styling

**Chat Flow:**

1. User interacts with `ChatWidget` component (`src/components/ui/ChatWidget.tsx`)
2. Widget sends messages to API route `src/app/api/chat/route.ts`
3. API uses Gemini AI with profile context
4. Response streamed back as SSE

## Key Abstractions

**Section Component Pattern:**
- Purpose: Represent major page sections
- Examples: `HeroNew.tsx`, `Projects.tsx`, `ExperienceTimeline.tsx`
- Pattern: 'use client' directive, React component with props optional

**UI Component Pattern:**
- Purpose: Reusable atomic components
- Examples: `Button.tsx`, `Card.tsx`, `Badge.tsx`
- Pattern: Accept className prop, use cn() for merging

**Data File Pattern:**
- Purpose: Static content definitions
- Examples: `projects.ts`, `skills.ts`, `experience.ts`
- Pattern: Export typed arrays/objects

**Context Pattern:**
- Purpose: Shared state management
- Examples: ThemeProvider, ProfileContext
- Pattern: React Context with Provider component

## Entry Points

**Page Entry:**
- Location: `src/app/page.tsx`
- Triggers: User visits root URL '/'
- Responsibilities: Render all section components in sequence

**Layout Entry:**
- Location: `src/app/layout.tsx`
- Triggers: Every page request
- Responsibilities: Set up fonts, metadata, ThemeProvider, global components (Header, Footer, ChatWidget)

**API Entry:**
- Location: `src/app/api/chat/route.ts`
- Triggers: POST request to `/api/chat`
- Responsibilities: Handle chat messages with Gemini AI, rate limiting

## Error Handling

**Strategy:** Basic error boundaries with fallback UI

**Patterns:**
- API routes return error responses with status codes
- Theme provider handles missing localStorage gracefully
- Chat widget shows error messages on API failure

## Cross-Cutting Concerns

**Styling:** Tailwind CSS with custom design tokens in `tailwind.config.ts`

**Fonts:** Google Fonts via next/font (Geist, IBM Plex Mono, Instrument Serif)

**Animations:** Framer Motion with custom variants in `src/components/motion/animations.ts`

**Theme:** Dark/light mode with CSS variables and data-theme attribute

---

*Architecture analysis: 2026-03-02*
