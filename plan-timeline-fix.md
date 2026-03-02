# Plan: Fix ExperienceTimeline Alignment

## Problem
The timeline dot is off-centered from the timeline line in `ExperienceTimeline.tsx`. Framer Motion's scale animations override the Tailwind `transform -translate-x-1/2` classes, causing horizontal misalignment. Additionally, on mobile, the timeline line overlaps with the experience cards.

## Implementation Steps

### 1. Fix the Timeline Line (Line 74)
Update the animated vertical line to use Framer Motion's `x` property for translation instead of Tailwind, ensuring it stays centered during scale animations.

**Current:**
```tsx
<motion.div
  className="absolute left-0 md:left-1/2 w-0.5 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent transform md:-translate-x-1/2"
  initial={{ scaleY: 0 }}
  whileInView={{ scaleY: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1.2, ease: easings.mechanical }}
  style={{ originY: 0 }}
/>
```

**Proposed:**
```tsx
<motion.div
  className="absolute left-6 md:left-1/2 w-0.5 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent"
  initial={{ scaleY: 0, x: "-50%" }}
  whileInView={{ scaleY: 1, x: "-50%" }}
  viewport={{ once: true }}
  transition={{ duration: 1.2, ease: easings.mechanical }}
  style={{ originY: 0 }}
/>
```

### 2. Fix the Timeline Dot (Line 101)
Update the animated dot wrapper to also use Framer Motion's `x` property for translation to perfectly match the line's center.

**Current:**
```tsx
<motion.div
  className="absolute left-0 md:left-1/2 top-8 md:top-8 md:-translate-x-1/2 z-20 cursor-pointer"
  initial={{ scale: 0 }}
  whileInView={{ scale: 1 }}
  // ...
```

**Proposed:**
```tsx
<motion.div
  className="absolute left-6 md:left-1/2 top-8 z-20 cursor-pointer flex justify-center"
  initial={{ scale: 0, x: "-50%" }}
  whileInView={{ scale: 1, x: "-50%" }}
  // ...
```

### 3. Adjust Mobile Spacing (Line 130)
Add padding to the card wrapper on mobile to prevent the timeline dot (now shifted to `left-6`) from overlapping the card content.

**Current:**
```tsx
<div className={cn(
  'w-full md:w-1/2',
  isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'
)}>
```

**Proposed:**
```tsx
<div className={cn(
  'w-full md:w-1/2 py-4 md:py-0 pl-14 md:pl-0', // Added pl-14 and py-4 for mobile
  isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'
)}>
```

## Review & Testing
1. Verify desktop alignment: The dot should perfectly straddle the vertical line.
2. Verify mobile layout: The timeline should appear on the left (at 24px/left-6), with the cards pushed to the right to avoid overlap.
