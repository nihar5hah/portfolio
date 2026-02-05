# Card & Interaction Enhancements

## Overview
Your portfolio now features premium interactive cards with motion effects, dynamic lighting, and ambient particles. All enhancements maintain the existing glass morphism design system while adding depth, responsiveness, and visual delight.

## New Features

### 1. **InteractiveCard Component** (`src/components/ui/InteractiveCard.tsx`)
A powerful new card component with the following capabilities:

#### Mouse-Tracking 3D Tilt
- Cards follow your mouse position in real-time
- Creates a true 3D perspective effect
- Smooth spring animation (stiffness: 150, damping: 20)
- Configurable tilt intensity (default: 20°)
- Maintains smooth performance with `transformStyle: preserve-3d`

**Usage:**
```tsx
<InteractiveCard tilt tiltIntensity={15}>
  {children}
</InteractiveCard>
```

#### Spotlight Glow Effect
- Radial glow follows your cursor position
- Creates an "illumination" effect on hover
- Customizable color per card
- Smooth opacity transitions for polish

**Usage:**
```tsx
<InteractiveCard
  spotlight
  spotlightColor="rgba(6, 182, 212, 0.15)"
>
  {children}
</InteractiveCard>
```

#### Floating Ambient Particles
- 1-5 animated orbs inside the card
- Spawn on hover with staggered timing
- Smooth fade and scale animations
- Creates depth and visual interest

**Usage:**
```tsx
<InteractiveCard particles particleCount={3}>
  {children}
</InteractiveCard>
```

#### Animated Gradient Border (Optional)
- Rotating gradient border effect
- 4-second animation loop
- Sophisticated border mask technique
- Disabled by default (enable with `gradientBorder` prop)

### 2. **Magnetic Component** (`src/components/ui/InteractiveCard.tsx`)
A reusable wrapper that makes elements follow your cursor:

**Features:**
- Icon or element pulls toward mouse
- Configurable strength (default: 0.3)
- Spring-smoothed motion
- Perfect for icons, buttons, or small elements

**Usage:**
```tsx
<Magnetic strength={0.2}>
  <IconComponent />
</Magnetic>
```

### 3. **ShineCard Component** (`src/components/ui/InteractiveCard.tsx`)
A specialized card for image/visual content:

**Features:**
- Radial highlight that follows cursor
- Subtle border shine effect on hover
- Optimized for showcase content
- Uses position tracking for precise highlighting

**Usage:**
```tsx
<ShineCard variant="primary">
  <Image />
</ShineCard>
```

## Enhanced Sections

### Skills Section (`src/components/sections/Skills.tsx`)
- **Interactive cards** with 3D tilt effect
- **Spotlight glow** on hover (stronger for primary category)
- **Floating particles** on the featured AI Automation category
- **Magnetic category icons** that pull toward cursor
- Wave animation preserved for skill items

### About Section (`src/components/sections/About.tsx`)
- **Highlight cards** now use InteractiveCard
- **3D tilt effect** on all highlight items
- **Spotlight glow** with varying intensity
- **Particles** on the primary card (AI Voice Assistants)
- **Magnetic icons** for additional interactivity

### Projects Section (`src/components/sections/Projects.tsx`)
- **Project image cards** use ShineCard effect
- **Cursor-tracking highlight** on project visuals
- **Border shine** on hover
- Parallax scroll effects preserved and enhanced
- Featured project gets enhanced spotlight

## Animation Details

### Spring Configuration
- **Stiffness:** 150 (responsive without feeling stiff)
- **Damping:** 20 (controlled, refined motion)
- Provides smooth, natural-feeling transitions

### Particle Animation Timeline
- **Duration:** 3 seconds per cycle
- **Infinite loop** while card is hovered
- **Staggered spawn:** Particles appear at different times
- **Easing:** easeInOut for smooth acceleration/deceleration

### Spotlight Animation
- **Type:** Radial gradient
- **Radius:** 400px (adjustable)
- **Opacity transition:** 300ms fade in/out
- **Color:** Customizable per card

## Performance Optimizations

1. **GPU Acceleration**
   - Uses `transform` properties (GPU-accelerated)
   - `preserve-3d` for smooth 3D rendering
   - Motion values use spring animations (efficient)

2. **Viewport Optimization**
   - Cards only animate once they enter viewport (`once: true`)
   - 50px margin buffer for smooth triggering

3. **Responsive Scaling**
   - Reduced backdrop-filter blur on mobile (already in base styles)
   - Touch-friendly with spring animations that feel good at any speed

4. **Memory Efficient**
   - Particles unmount on hover end
   - No continuous CPU-intensive calculations
   - Event listeners properly cleaned up

## Browser Support

- **Chrome/Edge:** Full support (modern Chromium features)
- **Firefox:** Full support
- **Safari:** Full support (iOS 15+)
- **Fallback:** Graceful degradation if `backdrop-filter` unsupported
- **Reduced motion:** Respects `prefers-reduced-motion` media query

## Customization

All cards accept these props:

```typescript
interface InteractiveCardProps {
  // Content
  children: React.ReactNode
  className?: string

  // Style variant
  variant?: 'primary' | 'secondary' | 'tertiary'

  // Effects
  tilt?: boolean                    // default: true
  tiltIntensity?: number            // default: 20
  spotlight?: boolean               // default: true
  spotlightColor?: string           // default: 'rgba(6, 182, 212, 0.15)'
  gradientBorder?: boolean          // default: false
  particles?: boolean               // default: false
  particleCount?: number            // default: 3
  noLift?: boolean                  // default: false
}
```

## Future Enhancement Ideas

1. Scroll-linked particle motion (particles follow scroll direction)
2. Ambient sound effects (subtle audio feedback on interaction)
3. Custom particle colors per card
4. Connection lines between particles on hover
5. Magnetic effect ripple propagation to nearby cards
6. Per-card theme colors (glow color from card theme)

## Technical Notes

- Uses Framer Motion `useMotionValue` and `useSpring` for performance
- Motion values are separate from React state (smooth at 60fps)
- Event handlers use `useCallback` for memory efficiency
- All animations respect `prefers-reduced-motion` user preference
- TypeScript types included for better DX

---

**Created:** February 2025
**Framework:** Next.js 14 + React 18 + Framer Motion 11
**Styling:** Tailwind CSS + Glass Morphism Design System
