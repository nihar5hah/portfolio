# Portfolio

A modern, premium portfolio website featuring iOS 26-style glass effects, sophisticated Framer Motion animations, and production-grade Next.js architecture.

## Features

### Design & Effects
- **iOS 26 Glass System**: Multi-layer glass morphism with primary, secondary, and tertiary tiers
- **Animated Backgrounds**: Gradient dots in Hero section with real-time color cycling
- **Flickering Grid**: Interactive grid animation in Contact section
- **Smooth Transitions**: Gradient fades between sections for seamless UX

### Animations
- **Scroll Parallax**: Hero content responds to scroll position with spring physics
- **3D Tilt Cards**: About section cards with mouse-tracking 3D transforms
- **Wave Stagger**: Skills section with cascading entrance animations
- **Timeline Animation**: Experience section with scroll-linked timeline draw
- **Magnetic Effects**: Social icons with position-tracking magnetic hover

### Components
- Built with **shadcn/ui** patterns and CVA variants
- Responsive across all device sizes
- Accessibility-first design
- Dark mode optimized

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom utilities
- **Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) with [CVA](https://cva.style/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **TypeScript**: Full type safety
- **Canvas**: Custom FlickeringGrid with HTML5 Canvas

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/nihar5hah/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit `http://localhost:3000` to see your portfolio.

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css          # iOS glass system & global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/
│   │   ├── layout/              # Header, Footer, Container
│   │   ├── sections/            # Hero, About, Skills, Projects, etc.
│   │   ├── ui/                  # Reusable components (Button, Badge, Card)
│   │   ├── motion/              # Animation utilities & components
│   │   └── (other)
│   ├── data/                    # Content data (projects, skills, experience)
│   ├── lib/                     # Utilities
│   └── types/                   # TypeScript definitions
├── tailwind.config.ts           # Tailwind configuration
└── components.json              # shadcn/ui config
```

## Key Components

### Glass System
Three-tier glass morphism system in `globals.css`:
- **glass-primary**: Hero cards, main panels (24px blur)
- **glass-secondary**: Nested cards (16px blur)
- **glass-tertiary**: Badges, small elements (8px blur)

### Background Effects
- **GradientDots**: Animated hexagonal dot pattern with color cycling (Hero)
- **FlickeringGrid**: Canvas-based flickering grid with intersection detection (Contact)

### Animation Utilities
Custom animation presets in `components/motion/animations.ts`:
- `easings`: smooth, spring, expo easing functions
- `staggerContainer/Item`: Cascading animations
- `glassReveal`: Glass effect reveal animation
- `hoverLift/tapScale`: Interactive feedback

## Customization

### Change Colors
Edit CSS variables in `globals.css`:
```css
:root {
  --background: hsl(0 0% 5%);
  --accent: hsl(184 100% 50%);
  /* ... other variables */
}
```

### Update Content
Edit data files in `src/data/`:
- `projects.ts`: Portfolio projects
- `skills.ts`: Skills and technologies
- `experience.ts`: Work experience
- `social.ts`: Personal information and links

### Modify Animations
Adjust animation parameters in component props:
```tsx
<GradientDots
  duration={25}              // Speed of movement
  colorCycleDuration={8}     // Color transition speed
  spacing={12}               // Dot spacing
  dotSize={10}               // Dot size
/>
```

## Performance

- **Static Generation**: All pages pre-rendered at build time
- **Bundle Optimization**: ~215KB total (gzipped)
- **Motion Performance**: Spring physics with GPU acceleration
- **Canvas Optimization**: FlickeringGrid uses intersection observer for viewport rendering

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Deployment

### Vercel (Recommended)
```bash
# Push to GitHub, then connect to Vercel
# Auto-deploys on every push
```

### Manual Deployment
```bash
npm run build
# Deploy the `.next` folder to your hosting
```

## License

Open source and free to use. Customize for your portfolio.

## Credits

- Glass morphism design inspired by iOS 26 UI
- Animation techniques from Framer Motion documentation
- Component patterns from shadcn/ui
- Icons from Lucide React
