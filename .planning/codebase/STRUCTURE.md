# Codebase Structure

**Analysis Date:** 2026-03-02

## Directory Layout

```
portfolio/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── data/                # Static content data
│   ├── hooks/               # React hooks
│   ├── lib/                 # Utilities
│   └── types/               # TypeScript types
├── public/                  # Static assets
├── .next/                   # Build output (generated)
└── node_modules/            # Dependencies (generated)
```

## Directory Purposes

**src/app:**
- Purpose: Next.js App Router pages and API routes
- Contains: `page.tsx` (home), `layout.tsx` (root layout), `globals.css`, `fonts.css`, API routes
- Key files: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/api/chat/route.ts`

**src/components:**
- Purpose: All React components organized by type
- Contains: sections, ui, layout, motion subdirectories

**src/components/sections:**
- Purpose: Major page sections
- Contains: HeroNew, CurrentlyBuilding, AboutNew, SkillsNew, InteractiveShowcase, Projects, HowIBuild, ExperienceTimeline, Resume, ContactNew
- Key files: All `.tsx` files in this directory

**src/components/ui:**
- Purpose: Reusable UI primitives and interactive components
- Contains: Button, Card, Badge, ChatWidget, ProjectModal, ScrollProgress, InteractiveCard, gooey-text-morphing, container-scroll-animation, gradient-dots, flickering-grid, ParticleBurst, SectionHeading, NeuralBrutalistShowcase

**src/components/layout:**
- Purpose: Structural/layout components
- Contains: Header, Footer, Container, GlobalInteractions

**src/components/motion:**
- Purpose: Animation utilities
- Contains: `animations.ts`, ScrollReveal, FadeIn

**src/data:**
- Purpose: Static content and context providers
- Contains: projects.ts, skills.ts, experience.ts, social.ts, resume.ts, profile-context.ts, chatbot-context.ts

**src/hooks:**
- Purpose: Custom React hooks
- Contains: useTheme.tsx (theme context provider)

**src/lib:**
- Purpose: Utility functions
- Contains: utils.ts (cn function for className merging)

**src/types:**
- Purpose: TypeScript type definitions
- Contains: index.ts (Project, Experience, Skill, SocialLink, NavItem interfaces)

**public:**
- Purpose: Static assets served as-is
- Contains: images, fonts, resume.pdf, favicon.svg

## Key File Locations

**Entry Points:**
- `src/app/page.tsx`: Main portfolio page - renders all sections
- `src/app/layout.tsx`: Root layout - sets up providers, fonts, global components

**Configuration:**
- `tailwind.config.ts`: Tailwind CSS configuration with custom design tokens
- `tsconfig.json`: TypeScript configuration
- `next.config.js`: Next.js configuration
- `postcss.config.js`: PostCSS configuration

**Core Logic:**
- `src/components/sections/`: All major page sections
- `src/app/api/chat/route.ts`: Chat API endpoint

**Data:**
- `src/data/projects.ts`: Project portfolio data
- `src/data/experience.ts`: Work experience data
- `src/data/skills.ts`: Skills data

## Naming Conventions

**Files:**
- Components: PascalCase (`HeroNew.tsx`, `ChatWidget.tsx`, `Button.tsx`)
- Utilities: kebab-case (`utils.ts`)
- Data: kebab-case (`projects.ts`, `skills.ts`)
- Types: kebab-case (`index.ts`)
- Config: kebab-case (`tailwind.config.ts`, `next.config.js`)

**Directories:**
- All lowercase with hyphens: `components/`, `sections/`, `ui/`, `layout/`, `motion/`, `data/`, `hooks/`, `lib/`, `types/`, `app/`, `api/`

**Variables/Functions:**
- camelCase: `useTheme`, `handleMouseMove`, `projects`, `skills`

**Types/Interfaces:**
- PascalCase: `Project`, `Experience`, `Skill`, `SkillCategory`, `SocialLink`

## Where to Add New Code

**New Section:**
- Implementation: `src/components/sections/`
- Import in: `src/app/page.tsx`
- Data: `src/data/`

**New UI Component:**
- Implementation: `src/components/ui/`
- Props: Accept `className` for composition
- Use: `cn()` from `src/lib/utils.ts`

**New Page:**
- Implementation: `src/app/[page-name]/page.tsx`
- Layout: Use `src/app/layout.tsx` or create custom

**New API Route:**
- Implementation: `src/app/api/[route-name]/route.ts`
- Exports: GET, POST, PUT, DELETE functions

**New Data:**
- Type definition: `src/types/index.ts`
- Data file: `src/data/[data-name].ts`
- Import where needed

**New Hook:**
- Implementation: `src/hooks/[hook-name].ts`
- Pattern: Export Provider + useContext hook

**New Utility:**
- Implementation: `src/lib/utils.ts` (for utilities) or new file in `src/lib/`
- Export: Named exports

## Special Directories

**.next:**
- Purpose: Next.js build output
- Generated: Yes (on build)
- Committed: No (in .gitignore)

**node_modules:**
- Purpose: npm dependencies
- Generated: Yes (on npm install)
- Committed: No (in .gitignore)

**public:**
- Purpose: Static assets
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-03-02*
