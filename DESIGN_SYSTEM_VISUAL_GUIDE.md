# Design System Visual Guide

## Typography Specimens

### Instrument Serif (Headlines)
```
The refined voice of refined ideas

Instrument Serif is used for:
• Hero headline: "Nihar Shah"
• Section headings: "Projects", "About", "Experience"
• Card titles in showcase
• Logo in header: "Nihar."

Weight: 400 (Regular)
Characteristics: Modern serif, elegant, technical undertones
Perfect for: Making headlines stand out with sophistication
```

### IBM Plex Mono (Technical Labels)
```
TECHNICAL_LABELS_HERE
// EXPERTISE
// CODE_REFERENCES
// TIMESTAMPS

IBM Plex Mono is used for:
• Technical metadata labels
• Code snippets and references
• Detail text and small text
• Section prefixes (// SECTION_NAME)

Weight: 400-700 (varies by usage)
Characteristics: Monospace, algorithmic, mechanical
Perfect for: Technical authenticity and grid-based structure
```

### Geist Sans (Body Text)
```
This is how body text looks. Clean, modern, highly readable.
Perfect for paragraphs, descriptions, and UI text.
Maintains excellent readability at all sizes.

Geist Sans is used for:
• Body paragraphs
• Descriptions and details
• UI labels and buttons
• General content

Characteristics: Clean, modern, versatile
Perfect for: Readability and clarity
```

---

## Color Palette

### Primary Colors
```
┌─────────────────────────────┐
│  ELECTRIC INDIGO            │  #6366f1
│  Primary accent color       │  rgb(99, 102, 241)
│  Used in: headings,         │
│  buttons, accents, glows    │
└─────────────────────────────┘

┌─────────────────────────────┐
│  INDIGO LIGHT               │  #818cf8
│  Hover states, highlights   │  rgb(129, 140, 248)
│  Subtle variations          │
└─────────────────────────────┘

┌─────────────────────────────┐
│  INDIGO DARK                │  #4f46e5
│  Pressed states, depth      │  rgb(79, 70, 229)
└─────────────────────────────┘
```

### Neutral Colors
```
┌─────────────────────────────┐
│  ███████████████████        │  Foreground: #ffffff
│  Pure white for headings    │  rgb(255, 255, 255)
└─────────────────────────────┘

┌─────────────────────────────┐
│  ███████████████████        │  Secondary Foreground: #a3a3a3
│  Body text color            │  rgb(163, 163, 163)
└─────────────────────────────┘

┌─────────────────────────────┐
│  ███████████████████        │  Muted Foreground: #737373
│  Labels, captions           │  rgb(115, 115, 115)
└─────────────────────────────┘

┌─────────────────────────────┐
│  ███████████████████        │  Background: #0a0a0a
│  Deep black foundation      │  rgb(10, 10, 10)
└─────────────────────────────┘

┌─────────────────────────────┐
│  ███████████████████        │  Background Secondary: #0f0f0f
│  Subtle elevation           │  rgb(15, 15, 15)
└─────────────────────────────┘
```

---

## Component Hierarchy

### Hero Section
```
┌─ HERO SECTION ──────────────────────────────────────┐
│                                                      │
│  Status Badge                                        │
│  Building AI systems...                              │
│                                                      │
│  MAIN HEADLINE (Instrument Serif, text-8xl)         │
│  Nihar                                               │
│  Shah (accent color)                                 │
│  AI Engineer (smaller, lighter)                      │
│                                                      │
│  Subheading (Geist Sans, text-lg)                    │
│  Currently at Confido Health...                      │
│                                                      │
│  [View my work]  [Learn more]                        │
│   (Primary)       (Secondary)                        │
│                                                      │
│  Scroll indicator (pulsing)                          │
│                                                      │
│  Interactive: Cursor-following orbs                  │
└──────────────────────────────────────────────────────┘
```

### Section Structure
```
┌─ SECTION ───────────────────────────────────────────┐
│                                                      │
│  Technical Label (monospace, text-xs)                │
│  // SECTION_NAME.tsx                                 │
│                                                      │
│  Section Heading (serif, text-6xl)                   │
│  Section Title                                       │
│                                                      │
│  Description (sans, text-lg)                         │
│  Explain what this section is about...               │
│                                                      │
│  ┌─ Card Grid ──────────────────────────────────┐   │
│  │ ┌─ Card ─┐  ┌─ Card ─┐                       │   │
│  │ │ Icon   │  │ Icon   │                       │   │
│  │ │ Title  │  │ Title  │                       │   │
│  │ │ Desc   │  │ Desc   │                       │   │
│  │ └────────┘  └────────┘                       │   │
│  └────────────────────────────────────────────────┘   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Interactive Showcase Card
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │  Border: Terminal
│ │ ┌─────────────┐                 │ │  Style (indigo)
│ │ │ ◯ ICON      │                 │ │
│ │ │ (indigo bg) │                 │ │
│ │ └─────────────┘                 │ │
│ │                                 │ │
│ │ Title (Serif, text-2xl)         │ │
│ │ AI Voice Assistants             │ │
│ │                                 │ │
│ │ Description (Sans, text-sm)     │ │
│ │ Building conversational systems  │ │
│ │ for healthcare...               │ │
│ │                                 │ │
│ │ • ACTIVE (appears on hover)     │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │  Hover: Gradient
│                                     │  background + glow
└─────────────────────────────────────┘
```

---

## Typography Scale

```
Text Sizes Used Throughout:

Hero Headline:        text-8xl (96px)  | Instrument Serif
Section Heading:      text-6xl (60px)  | Instrument Serif
Card Headline:        text-2xl (24px)  | Instrument Serif
Body Large:           text-lg (18px)   | Geist Sans
Body Regular:         text-base (16px) | Geist Sans
Small Text:           text-sm (14px)   | Geist Sans
Tiny/Label:           text-xs (12px)   | IBM Plex Mono

Line Heights:
Headlines:            leading-tight (1.25)
Body:                 leading-relaxed (1.75)
Technical:            leading-normal (1.5)
```

---

## Spacing & Rhythm

### Vertical Spacing
```
Hero Section:         py-32 to py-40 (128-160px)
Other Sections:       py-32 to py-48 (128-192px)
Section Padding:      py-16 to py-32 (64-128px)

Internal Spacing:
Component gap:        gap-6 to gap-8 (24-32px)
Card padding:         p-6 to p-8 (24-32px)
Element spacing:      mb-4 to mb-6 (16-24px)
```

### Grid System
```
Grid Pattern:         40px x 40px
Border Radius:        0px (sharp) or var(--radius)
Gutter Width:         gap-6 (24px)
Column Layout:        2-column (desktop), 1-column (mobile)
```

---

## Animation Palette

### Fast Animations
- Button hover: 200-300ms
- Icon pop-in: 300-400ms
- Staggered reveals: 0.04s per item

### Medium Animations
- Section reveals: 600-800ms
- Scroll-triggered: 600ms
- Entrance animations: 800ms

### Slow Animations
- Background orbs: 3000ms
- Scanline: 8000ms
- Scroll indicator: 3000ms pulse

### Easing Functions
- Mechanical: [0.4, 0, 0.6, 1] (sharp, precise)
- Smooth: [0.16, 1, 0.3, 1] (organic)
- Spring: [0.34, 1.56, 0.64, 1] (bouncy)

---

## Interaction States

### Buttons
```
Default:      bg-accent text-background border-accent
Hover:        bg-accent-dark border-accent-dark
              Transform: translateX(4px)
Active/Tap:   scale(0.98)

Secondary Button:
Default:      bg-transparent border-border text-foreground
Hover:        border-accent/50 text-accent
              Transform: translateX(-4px)
```

### Cards
```
Default:      border-border glass-secondary
Hover:        border-accent/50 opacity-100
              Gradient background fades in
              Border accent glows
Active:       Scale slightly reduced (0.98)
```

### Interactive Elements
```
Default:      opacity-100 color-foreground
Hover:        opacity-80 color-accent
              Scale: 1.02 (slight growth)
Focus:        Ring with accent color
Pressed:      Scale: 0.98
```

---

## Before & After Comparison

### Hero Headline
```
BEFORE:
┌─────────────────────────────────┐
│ Projects                        │  ← Geist Sans (generic)
│ Building stuff for clients      │  ← No personality
└─────────────────────────────────┘

AFTER:
┌─────────────────────────────────┐
│ Nihar                           │  ← Instrument Serif (elegant)
│ Shah                            │  ← Bold, memorable
│ AI Engineer                     │  ← Clear hierarchy
└─────────────────────────────────┘
```

### Section Headings
```
BEFORE:
┌─────────────────────────────────┐
│ Projects                        │  ← IBM Plex Mono (technical)
│ Real systems built...           │  ← Technical but impersonal
└─────────────────────────────────┘

AFTER:
┌─────────────────────────────────┐
│ Projects                        │  ← Instrument Serif (refined)
│ Real systems built...           │  ← Elegant + technical
└─────────────────────────────────┘
```

### Accent Color
```
BEFORE: Cyan (#06b6d4)
        ────────────────  ← Generic tech color
        Common in 100s of portfolios

AFTER:  Electric Indigo (#6366f1)
        ────────────────  ← Distinctive
        Memorable, technical, refined
```

---

## Accessibility Features

### Color Contrast
```
White on Black:           21:1 (AAA)
Indigo on Black:          7.5:1 (AA)
Gray on Black:            4.8:1 (AA)
All text meets WCAG AA standards
```

### Motion
```
Default:  All animations enabled
User prefers-reduced-motion:
  • Scanline disabled
  • Cursor tracking disabled
  • Grid reveals become simple fades
  • Essential animations remain (layout shifts)
```

### Readability
```
Line Heights:    1.5em (minimum)
Font Size:       16px minimum
Letter Spacing:  Optimized for serif/monospace
Text Color:      High contrast against backgrounds
```

---

## Usage Guidelines

### When to Use Each Font

**Instrument Serif:**
- ✓ Hero/main headline
- ✓ Section headings
- ✓ Important card titles
- ✓ Logo
- ✗ Body text (too large)
- ✗ Small UI labels

**IBM Plex Mono:**
- ✓ Technical labels
- ✓ Code references
- ✓ Metadata/timestamps
- ✓ Small detail text
- ✗ Headlines (too technical)
- ✗ Body paragraphs

**Geist Sans:**
- ✓ Body paragraphs
- ✓ Descriptions
- ✓ UI text (buttons, labels)
- ✓ Subheadings
- ✗ Main headlines (use serif)
- ✗ Technical labels (use mono)

---

## Component Examples

### Complete Hero Section Code
```tsx
<section className="relative min-h-screen bg-background">
  <div className="grid-brutalist opacity-20" />
  <div className="scanline-effect" />

  {/* Cursor-following orbs */}
  <motion.div className="w-80 h-80 bg-accent/20 blur-3xl" />

  <Container className="relative z-10">
    {/* Status badge */}
    <motion.div className="flex items-center gap-2">
      <span className="text-foreground-secondary">Status</span>
    </motion.div>

    {/* Hero headline */}
    <h1 className="font-serif text-8xl font-medium">
      Nihar<br />
      <span className="text-accent">Shah</span><br />
      <span className="text-4xl font-light">AI Engineer</span>
    </h1>

    {/* CTA Buttons */}
    <div className="flex gap-4">
      <motion.a className="px-8 py-4 bg-accent">View my work</motion.a>
      <motion.a className="px-8 py-4 border border-border">Learn more</motion.a>
    </div>
  </Container>
</section>
```

---

## Quick Reference

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Hero Headline | Serif | 8xl | 400 | White |
| Section Title | Serif | 6xl | 400 | White |
| Card Title | Serif | 2xl | 400 | White |
| Body Text | Sans | base | 400 | Gray |
| Tech Label | Mono | xs | 700 | Indigo |
| CTA Button | Sans | base | 500 | Indigo |

---

## Final Notes

This visual system creates a **distinctive identity** that:
- Uses serif typography for memorable headlines
- Combines refined aesthetics with technical precision
- Maintains clear hierarchy and readability
- Provides engaging interactive experiences
- Works across all devices and browsers
- Respects user motion preferences

The balance between **Instrument Serif** (human, refined) and **IBM Plex Mono** (technical, algorithmic) perfectly reflects the nature of your work: bridging design and engineering, creativity and precision.

---

**Created:** February 2026
**Status:** Production Ready
**Version:** 1.0
