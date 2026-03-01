# Coding Conventions

**Analysis Date:** 2026-03-02

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Button.tsx`, `Card.tsx`, `HeroNew.tsx`)
- Utilities/Lib: camelCase (e.g., `utils.ts`, `animations.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useTheme.tsx`)
- Types: PascalCase in `src/types/index.ts`
- Data: camelCase (e.g., `projects.ts`, `skills.ts`)

**Functions:**
- camelCase for all functions (e.g., `cn()`, `rateLimit()`, `toSseStream()`)

**Variables:**
- camelCase (e.g., `limiter`, `GEMINI_API_KEY`, `buttonVariants`)
- Constants: UPPER_SNAKE_CASE for runtime constants (e.g., `LIMIT`, `WINDOW_MS`)

**Types & Interfaces:**
- PascalCase (e.g., `Skill`, `Project`, `Experience`, `Theme`)

## Code Style

**Formatting:**
- Tool: ESLint (Next.js core-web-vitals config in `.eslintrc.json`)
- TypeScript strict mode enabled in `tsconfig.json`
- Module resolution: `bundler`
- JSX: preserved (not compiled)

**Linting:**
- Configuration: `.eslintrc.json` extends `next/core-web-vitals`
- Run with: `npm run lint`

**Tailwind CSS:**
- Used with `tailwind-merge` and `clsx` via utility function `cn()`
- Component variants via `class-variance-authority` (cva)

## Import Organization

**Order:**
1. External libraries (e.g., `react`, `framer-motion`, `clsx`)
2. Path aliases (e.g., `@/lib/utils`, `@/components/...`)
3. Relative imports (if any)

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in `tsconfig.json`)

Example from `src/components/ui/Button.tsx`:
```typescript
'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
```

## Component Patterns

**Client Components:**
- Use `'use client'` directive at top of file

**Ref Forwarding:**
- Use `forwardRef` for components needing ref access
- Set `displayName` after component definition

Example from `src/components/ui/Button.tsx`:
```typescript
const Button = forwardRef<HTMLButtonElement, ButtonProps>(/* ... */)
Button.displayName = 'Button'
```

**Variant Props:**
- Use `class-variance-authority` (cva) for variant management
- Export both component and variants

```typescript
const buttonVariants = cva(/* ... */, { variants: { ... }, defaultVariants: { ... } })
export interface ButtonProps extends VariantProps<typeof buttonVariants> { ... }
```

**Props Interface:**
- Use TypeScript interfaces for props
- Use `React.ReactNode` for children
- Optional props with `?` suffix

## Error Handling

**Patterns:**
- Try-catch blocks with specific error handling
- Use `instanceof Error` for type narrowing
- Return appropriate HTTP status codes in API routes
- Log errors with `console.error()` using namespace prefix

Example from `src/app/api/chat/route.ts`:
```typescript
try {
  // ... operation
} catch (err) {
  const errorMsg = err instanceof Error ? err.message : String(err)
  console.error('[chat API] error:', errorMsg)
  return new Response(`Agent error: ${errorMsg}`, { status: 502 })
}
```

**Validation:**
- Check for required environment variables at runtime
- Return 500 status if critical config missing
- Input validation with optional chaining (`messages?.[...].?`)

## Logging

**Framework:** `console` (development)

**Patterns:**
- Use namespace prefix in brackets: `[category] message`
- Error logging with `console.error()`
- No structured logging library detected

## Comments

**When to Comment:**
- Non-obvious logic (rate limiting, encoding)
- Inline explanations for workarounds
- No JSDoc/TSDoc observed in codebase

## Function Design

**Size:** Medium - focused single-responsibility functions

**Parameters:**
- Explicit types for all parameters
- Destructuring for component props with defaults

**Return Values:**
- Explicit return types for utility functions
- `ReadableStream` for SSE responses

## Module Design

**Exports:**
- Named exports for components and functions
- Barrel pattern via `index.ts` files (e.g., `src/types/index.ts`)

**Re-exports:**
- Data files export arrays directly
- Types exported from central `index.ts`

---

*Convention analysis: 2026-03-02*
