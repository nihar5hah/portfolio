import { experiences } from './experience'
import { projects } from './projects'
import { skillCategories } from './skills'

export const resume = {
  education: [
    {
      school: 'Vellore Institute of Technology',
      degree: 'B.Tech Computer Science',
      period: '2023 — 2027',
      location: 'Vellore, India',
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
