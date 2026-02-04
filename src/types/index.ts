export interface Skill {
  name: string
  icon: string
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  skills: Skill[]
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  featured: boolean
  highlights: string[]
  links: {
    github?: string
    demo?: string
  }
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
  current: boolean
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface NavItem {
  label: string
  href: string
}
