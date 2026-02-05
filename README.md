# Nihar Shah - Portfolio

A production-grade portfolio website featuring Neural Brutalism design, smooth section transitions, and delightful micro-interactions.

## Features

- **Neural Brutalism Design**: Electric Indigo accent with Instrument Serif typography
- **Smooth Transitions**: Gradient fades between sections for seamless visual flow
- **Micro-interactions**: Underline animations, shimmer effects, glow states, and spring physics
- **Scroll Progress**: Top indicator showing page scroll position
- **FlickeringGrid**: Canvas-based animated grid in Contact section
- **Dark/Light Theme**: Toggle with localStorage persistence
- **Responsive Design**: Optimized for all device sizes

## Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS with CSS variables for theming
- **Animation**: Framer Motion with spring physics
- **Icons**: Lucide React
- **Components**: shadcn/ui patterns
- **Canvas**: HTML5 Canvas for FlickeringGrid

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Theme variables & global styles
├── components/
│   ├── sections/           # About, Skills, Projects, Experience, Contact
│   ├── layout/             # Header, Footer, Container
│   └── ui/                 # Button, Badge, ScrollProgress, FlickeringGrid
├── data/                   # Projects, skills, experience, social links
└── hooks/                  # Theme management
```

## Customization

### Update Theme Colors
Edit CSS variables in `src/app/globals.css`:
```css
:root {
  --bg-primary: #0a0a0a;
  --accent: #6366f1;
  /* ... other variables */
}
```

### Update Content
Edit files in `src/data/`:
- `projects.ts` - Portfolio projects
- `skills.ts` - Technologies and skills
- `experience.ts` - Work experience
- `social.ts` - Personal info and links

## Performance

- Static generation at build time
- Scroll progress with spring physics
- Canvas rendering with intersection observer
- ~2KB CSS (with Tailwind)

## Deployment

Push to GitHub, then connect to Vercel for auto-deployment.

## License

Open source - customize for your portfolio.
