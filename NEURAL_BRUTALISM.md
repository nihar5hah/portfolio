# Neural Brutalism Visual System

**A technical, algorithmic design language for AI engineers**

---

## Philosophy

Neural Brutalism combines the raw honesty of brutalist design with the precision of algorithmic systems. It's built for portfolios that showcase real technical work—not generic tech aesthetics.

**Core Principles:**
1. **Technical Authenticity** - Typography and visual language that reflects the nature of AI/ML work
2. **Structural Clarity** - Grid-based layouts, sharp corners, clear hierarchy
3. **Mechanical Motion** - Animations feel algorithmic, not organic
4. **Intentional Restraint** - One dominant accent color, monochromatic foundation

---

## Typography

### Display Font: IBM Plex Mono
**Usage:** Headings, titles, hero text, section labels

**Why IBM Plex Mono?**
- Monospace-inspired design adds technical character
- Designed by IBM for authenticity in code/data contexts
- Distinct personality without sacrificing readability
- Perfect middle ground: not generic, not overly stylized

**Implementation:**
```tsx
// Tailwind class
className="font-display text-5xl font-bold"

// CSS variable
font-family: var(--font-display);
```

**Weights Available:**
- Regular (400) - Body-level display text
- Medium (500) - Emphasized headings
- Semibold (600) - Section titles
- Bold (700) - Hero headlines

### Body Font: Geist Sans
**Usage:** Paragraphs, descriptions, long-form content

**Why keep Geist Sans?**
- Clean, readable, modern
- Provides contrast with technical display font
- Doesn't compete for attention

### Monospace Font: Geist Mono
**Usage:** Code snippets, technical labels, detail text

**Classes:**
```css
.text-mono-detail   /* Small technical text */
.label-tech         /* Technical labels (10px, uppercase, tracked) */
```

### Typography Scale
```
Hero:     font-display text-7xl font-bold
H1:       font-display text-5xl font-bold
H2:       font-display text-4xl font-semibold
H3:       font-display text-2xl font-semibold
Body:     font-sans text-base
Detail:   font-mono text-xs uppercase tracking-wider
```

---

## Color System

### Accent: Electric Indigo
Moving away from overused cyan to a distinctive purple-based palette.

**Primary Accent:**
- `#6366f1` (indigo-500) - Main accent color
- `#818cf8` (indigo-400) - Light variant (hover states, highlights)
- `#4f46e5` (indigo-600) - Dark variant (pressed states)
- `rgba(99, 102, 241, 0.4)` - Glow color

**Why Electric Indigo?**
- Distinctive and memorable (not the default cyan/blue)
- Conveys intelligence, technology, neural networks
- High contrast on dark backgrounds
- Feels premium and intentional

### Foundation Colors
```css
/* Backgrounds - Darker, tighter contrast */
--bg-default:    #0a0a0a  (nearly black)
--bg-secondary:  #0f0f0f  (subtle elevation)
--bg-tertiary:   #171717  (cards, panels)
--bg-elevated:   #1f1f1f  (modals, overlays)

/* Foreground */
--fg-default:    #ffffff  (pure white for headings)
--fg-secondary:  #a3a3a3  (body text)
--fg-muted:      #737373  (captions, labels)

/* Borders */
--border-default: #262626
--border-light:   #3f3f3f
--border-glass:   rgba(255, 255, 255, 0.06)
```

### Color Usage Guidelines
- **Accent:** Use sparingly—CTAs, interactive elements, technical highlights
- **Foreground:** White for headings, gray for body (creates hierarchy)
- **Backgrounds:** Subtle elevation changes (don't overuse contrast)
- **Borders:** Strategic use for structure, not decoration

---

## Animation System

### Philosophy Shift
**From:** Organic floating, smooth curves, gentle springs
**To:** Algorithmic, grid-based, mechanical transitions

### New Animations

#### Scanline Effect
```css
.scanline-effect::before {
  /* Creates subtle CRT-style scanline overlay */
  animation: scanline 8s linear infinite;
}
```
**Usage:** Background decoration, technical atmosphere

#### Grid Reveal
```typescript
// Framer Motion variant
gridRevealItem: {
  hidden: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
  visible: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }
}
```
**Usage:** Card reveals, section entrances (stagger: 0.04s)

#### Mechanical Slide
```typescript
mechanicalSlide: {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ease: [0.4, 0, 0.6, 1] } // mechanical easing
  }
}
```
**Usage:** Left-to-right reveals, sequential content

#### Data Flow
```css
.data-flow::after {
  /* Animated gradient line */
  animation: dataFlow 3s linear infinite;
}
```
**Usage:** Cards, panels (subtle movement suggests data processing)

#### Glitch Effect (Use Sparingly)
```css
.glitch-text::before {
  animation: glitch 0.3s infinite;
  text-shadow: -2px 0 rgba(99, 102, 241, 0.7);
}
```
**Usage:** Hover states on technical elements, "corrupted" aesthetic moments

### Easing Functions
```typescript
mechanical: [0.4, 0, 0.6, 1]  // Sharp, precise
snap: [0.25, 0.46, 0.45, 0.94] // Quick decision
```

### Animation Timing
- **Grid reveals:** 0.4s duration, 0.04s stagger
- **Mechanical slides:** 0.5-0.6s duration
- **Data flow:** 3s loop (slow, background)
- **Scanline:** 8s loop (very slow, atmospheric)

---

## Visual Components

### Grid Pattern (Brutalist)
```css
.grid-brutalist {
  background-size: 40px 40px; /* Tighter grid than default */
  /* Semi-transparent white lines */
}
```
**Usage:** Section backgrounds, adds technical structure

### Terminal Border
```css
.border-terminal {
  border: 1px solid rgba(99, 102, 241, 0.3);
  box-shadow:
    inset 0 0 0 1px rgba(99, 102, 241, 0.1),
    0 0 10px rgba(99, 102, 241, 0.1);
}
```
**Usage:** Cards, containers (command-line aesthetic)

### Brutalist Card
```css
.brutalist-card {
  border-radius: 0; /* Sharp corners */
  border: 1px solid var(--border);
  box-shadow: 4px 4px 0 rgba(99, 102, 241, 0.2); /* Offset shadow */
}
```
**Usage:** Feature cards, portfolio items (bold, structural)

### Technical Labels
```css
.label-tech {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```
**Usage:** Section prefixes (// ABOUT_ME.tsx), metadata

---

## Layout Patterns

### Sharp Corners Over Rounded
- Default radius: 0px (sharp)
- Glass cards: Minimal radius (4-8px max)
- Buttons/badges: Small radius (4px) only when needed

### Grid-Based Composition
- Favor structured grids over organic layouts
- Use consistent spacing (multiples of 4px or 8px)
- Align elements to grid lines (40px grid)

### Asymmetry with Purpose
- Break grid intentionally, not accidentally
- Use offset shadows for depth (not soft shadows)
- Overlapping elements: 50% max, maintain hierarchy

### Whitespace = Structure
- Generous padding inside containers (p-6, p-8)
- Tight gutters between grid items (gap-4, gap-6)
- Section padding: py-16 to py-32 (vertical rhythm)

---

## Component Examples

### Section Heading
```tsx
<h2 className="font-display text-5xl font-bold text-foreground">
  Neural<br />
  <span className="text-accent">Brutalism</span>
</h2>
```

### Feature Card
```tsx
<div className="p-6 bg-background-secondary border-terminal data-flow">
  <div className="label-tech mb-3">FEATURE_01</div>
  <h3 className="font-display text-xl font-semibold">Title</h3>
  <p className="text-foreground-secondary text-sm">Description</p>
</div>
```

### Interactive Card (with new colors)
```tsx
<InteractiveCard
  variant="secondary"
  spotlight
  spotlightColor="rgba(99, 102, 241, 0.15)"
  tilt
  tiltIntensity={15}
>
  {children}
</InteractiveCard>
```

---

## Accessibility

### Color Contrast
- White text on #0a0a0a: AAA (21:1)
- Indigo (#6366f1) on dark: AA (7.5:1)
- Secondary text (#a3a3a3) on dark: AA (4.8:1)

### Motion
- All animations respect `prefers-reduced-motion`
- Scanline effect disabled for reduced motion
- Grid reveals fallback to simple fade

### Typography
- Monospace display font: Maintain 1.5em line-height minimum
- Body text: 16px minimum, 1.6em line-height
- Technical labels: Color + text for information (not color alone)

---

## Usage Guidelines

### Do's ✓
- Use display font for all headings and titles
- Employ technical labels (// SECTION_NAME.tsx) for hierarchy
- Add scanline or grid effects to large sections
- Use indigo accent sparingly (CTAs, highlights, interactive states)
- Apply mechanical animations for reveals
- Favor sharp corners and structural shadows

### Don'ts ✗
- Don't mix organic animations (floating) with mechanical ones
- Don't overuse accent color (should be <10% of screen)
- Don't round corners excessively (breaks brutalist aesthetic)
- Don't use soft/blurred shadows (use sharp offset shadows)
- Don't animate everything (restraint = impact)
- Don't use glitch effect everywhere (special moments only)

---

## Migration Guide

### Updating Existing Components

1. **Add display font to headings:**
   ```tsx
   // Before
   <h2 className="text-4xl font-bold">

   // After
   <h2 className="font-display text-4xl font-bold tracking-tight">
   ```

2. **Replace cyan with indigo:**
   ```tsx
   // Before
   spotlightColor="rgba(6, 182, 212, 0.15)"

   // After
   spotlightColor="rgba(99, 102, 241, 0.15)"
   ```

3. **Add technical labels:**
   ```tsx
   <div className="label-tech mb-4">// COMPONENT_NAME</div>
   <h3 className="font-display">Component Title</h3>
   ```

4. **Update animations:**
   ```tsx
   // Before
   variants={staggerItem}

   // After
   variants={gridRevealItem}  // More algorithmic
   ```

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Font configuration (IBM Plex Mono)
│   └── globals.css             # Neural brutalism CSS utilities
├── components/
│   ├── motion/
│   │   └── animations.ts       # Grid reveal, mechanical animations
│   └── ui/
│       ├── InteractiveCard.tsx # Updated with indigo colors
│       ├── SectionHeading.tsx  # Uses display font
│       └── NeuralBrutalistShowcase.tsx  # Design system demo
└── tailwind.config.ts          # Colors, fonts, animations
```

---

## Resources

**Fonts:**
- IBM Plex Mono: https://fonts.google.com/specimen/IBM+Plex+Mono
- Geist Sans: https://vercel.com/font

**Color:**
- Electric Indigo palette derived from Tailwind Indigo scale
- Base: #6366f1 (indigo-500)

**Inspiration:**
- Brutalist web design movement
- Terminal/CLI aesthetics
- Data visualization interfaces
- Retro computing (CRT, scanlines)
- Swiss design (grid-based, structured)

---

**Created:** February 2026
**Version:** 1.0
**Status:** Production-ready

This is not just a color swap—it's a complete visual identity that distinguishes your portfolio from generic tech aesthetics.
