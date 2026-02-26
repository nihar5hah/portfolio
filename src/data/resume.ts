import { experiences } from './experience'
import { projects } from './projects'
import { skillCategories } from './skills'
import { siteConfig } from './social'

export const resume = {
  education: [
    {
      school: siteConfig.university,
      degree: siteConfig.degree,
      period: `2023 — ${siteConfig.graduationYear}`,
      location: siteConfig.location,
    },
  ],
  experience: experiences,
  projects,
  skills: skillCategories,
  certifications: [
    'OpenAI Prompt Engineering',
    'NVIDIA Deep Learning Fundamentals',
  ],
}
