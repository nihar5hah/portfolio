# Codebase Concerns

**Analysis Date:** 2026-03-02

## Tech Debt

### Duplicate Section Components
- **Issue:** Multiple versions of same sections exist in codebase (Hero.tsx and HeroNew.tsx, About.tsx and AboutNew.tsx, Skills.tsx and SkillsNew.tsx, Contact.tsx and ContactNew.tsx, Experience.tsx and ExperienceNew.tsx)
- **Files:** `src/components/sections/Hero.tsx`, `src/components/sections/HeroNew.tsx`, and similar pairs
- **Impact:** Code duplication, maintenance burden, confusion about which to use
- **Fix approach:** Remove legacy versions (Hero.tsx, About.tsx, Skills.tsx, Contact.tsx, Experience.tsx) and keep only the New variants that are currently imported in `src/app/page.tsx`

### Chat API Type Safety
- **Issue:** Using `as any` type assertion for API response handling
- **Files:** `src/app/api/chat/route.ts` (line 64)
- **Impact:** Runtime errors if API response structure changes, no TypeScript safety
- **Fix approach:** Define proper TypeScript interfaces for Google Generative AI response types

### Hardcoded Notification Key
- **Issue:** Hardcoded localStorage key without namespace or constant
- **Files:** `src/components/ui/ChatWidget.tsx` (lines 17, 26)
- **Impact:** Potential conflicts with other localStorage usage
- **Fix approach:** Extract to a constant like `NOTIFICATION_DISMISSED_KEY = 'portfolio_begu_notification_dismissed'`

### Unused CSS Classes
- **Issue:** Legacy glass classes still defined but may not be used
- **Files:** `src/app/globals.css` (lines 177-184)
- **Impact:** CSS bundle size increase
- **Fix approach:** Remove legacy classes (.glass, .glass-hover) after verifying no imports exist

## Known Bugs

### Theme Hydration Mismatch
- **Issue:** ThemeProvider returns children without ThemeContext wrapper during SSR/hydration
- **Files:** `src/hooks/useTheme.tsx` (lines 52-54)
- **Symptoms:** Flash of wrong theme on page load, potential hydration errors
- **Trigger:** Initial page load, particularly with server-side rendering
- **Workaround:** Return a themed wrapper even before mounted, or use a loading state with proper styling

### Chat Stream Not Properly Closed
- **Issue:** SSE reader in ChatWidget may not properly clean up on unmount or error
- **Files:** `src/components/ui/ChatWidget.tsx` (lines 140-179)
- **Symptoms:** Potential memory leak if component unmounts during streaming
- **Workaround:** Add AbortController and cleanup in useEffect return

## Security Considerations

### Rate Limiter Limitations
- **Issue:** In-memory rate limiter using Map resets on server restart, IP-based limiting easily bypassed
- **Files:** `src/app/api/chat/route.ts` (lines 8-22)
- **Current mitigation:** Basic in-memory rate limiting (10 requests/hour per IP)
- **Recommendations:** 
  - Use Redis or similar for distributed rate limiting in production
  - Consider token-based authentication for API access
  - Add proper input validation on messages array

### Missing Input Validation
- **Issue:** No validation on messages input in chat API
- **Files:** `src/app/api/chat/route.ts` (lines 44-45)
- **Risk:** Potential injection if malformed requests sent
- **Recommendations:** Add schema validation (e.g., with Zod) for request body

### API Key Handling
- **Issue:** Empty API key fallback could cause confusing errors
- **Files:** `src/app/api/chat/route.ts` (line 5-6)
- **Current mitigation:** Returns 500 error if key not configured
- **Recommendations:** Add clear environment variable validation at startup

## Performance Bottlenecks

### Heavy Glass Effects
- **Issue:** Multiple glassmorphism effects with backdrop-filter can cause GPU strain
- **Files:** `src/app/globals.css` (lines 82-164)
- **Cause:** backdrop-filter is computationally expensive, especially on mobile
- **Improvement path:** Consider reducing blur values on mobile via CSS media queries, or use static fallbacks

### Canvas Animation Performance
- **Issue:** FlickeringGrid runs continuous animation loop
- **Files:** `src/components/ui/flickering-grid.tsx`
- **Cause:** requestAnimationFrame runs continuously even when visible
- **Improvement path:** The component already has IntersectionObserver, but animation could be throttled further

### No Component Code Splitting
- **Issue:** All sections loaded at once in page.tsx
- **Files:** `src/app/page.tsx`
- **Cause:** No lazy loading for heavy sections
- **Improvement path:** Use React.lazy() for heavy components like InteractiveShowcase, FlickeringGrid

### Large CSS Bundle
- **Issue:** 473-line globals.css with extensive custom properties and utilities
- **Files:** `src/app/globals.css`
- **Impact:** Initial CSS load time
- **Improvement path:** Consider extracting to Tailwind plugin or purge unused utilities

## Fragile Areas

### Chat Widget Stream Parsing
- **Files:** `src/components/ui/ChatWidget.tsx` (lines 145-179)
- **Why fragile:** Manual line-by-line SSE parsing with try/catch silently swallowing errors
- **Safe modification:** Wrap in proper error boundaries, add detailed error logging

### Profile Context String
- **Files:** `src/data/profile-context.ts`
- **Why fragile:** 243-line template literal string - easy to break formatting or accidentally modify instructions
- **Safe modification:** Consider moving to separate JSON/markdown file, or use structured data with a template generator

### Theme Toggle Implementation
- **Files:** `src/hooks/useTheme.tsx`
- **Why fragile:** Direct DOM manipulation (setAttribute, classList) outside React's reconciliation
- **Safe modification:** Use CSS custom properties via style prop instead of data attributes

## Scaling Limits

### Chat API
- **Current capacity:** ~10 requests/hour per IP (rate limited)
- **Limit:** In-memory rate limiter won't work with multiple server instances
- **Scaling path:** Implement Redis-based rate limiting, consider connection pooling for Gemini API

### Canvas Effects
- **Current capacity:** 60fps on modern devices, may drop on older mobile
- **Limit:** Dependent on device GPU capabilities
- **Scaling path:** Add device capability detection, reduce effects on low-end devices

## Dependencies at Risk

### @google/generative-ai (^0.24.1)
- **Risk:** Major version 0.x indicates potential API changes
- **Impact:** Response type handling may break on updates
- **Migration plan:** Pin to minor version, add integration tests for API responses

### geist (^1.5.1)
- **Risk:** Vercel's Geist font package - may have maintenance uncertainty
- **Impact:** Font loading could break
- **Migration plan:** Consider migrating to @fontsource packages only

### framer-motion (^11.0.0)
- **Risk:** Heavy dependency (~300KB)
- **Impact:** Bundle size, animation performance
- **Migration plan:** Could replace with CSS animations for simple transitions

## Missing Critical Features

### Test Coverage
- **Problem:** No test files in codebase
- **Blocks:** Safe refactoring, regression detection
- **Priority:** High - should add Vitest or Jest tests

### Error Boundaries
- **Problem:** No React error boundaries wrapping sections
- **Blocks:** One component crash takes down entire page
- **Priority:** Medium - should add error boundaries around external widgets

### Loading States
- **Problem:** No loading skeletons or suspense boundaries
- **Blocks:** Perceived performance, especially on slow connections
- **Priority:** Medium - should add Suspense with fallbacks

## Test Coverage Gaps

### Untested Chat Widget
- **What's not tested:** SSE stream parsing, error handling, localStorage
- **Files:** `src/components/ui/ChatWidget.tsx`
- **Risk:** Edge cases in streaming could break silently
- **Priority:** High

### Untested API Route
- **What's not tested:** Rate limiting, error responses, input validation
- **Files:** `src/app/api/chat/route.ts`
- **Risk:** Security issues may go unnoticed
- **Priority:** High

### Untested Theme Hook
- **What's not tested:** Theme persistence, toggle functionality, SSR behavior
- **Files:** `src/hooks/useTheme.tsx`
- **Risk:** Theme switching could break in production
- **Priority:** Medium

---

*Concerns audit: 2026-03-02*
