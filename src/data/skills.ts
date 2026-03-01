import { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-automation',
    title: 'AI & Agent Systems',
    icon: 'Brain',
    skills: [
      { name: 'Multi-Agent Orchestration', icon: 'Network' },
      { name: 'RAG & Evaluation Systems', icon: 'LineChart' },
      { name: 'Conversational AI & Voice', icon: 'Mic' },
      { name: 'Prompt Engineering', icon: 'MessageSquare' },
      { name: 'AI Workflow Automation', icon: 'Workflow' },
      { name: 'Autonomous Architectures', icon: 'Bot' },
    ],
  },
  {
    id: 'programming',
    title: 'Languages',
    icon: 'Code',
    skills: [
      { name: 'Python', icon: 'FileCode' },
      { name: 'TypeScript', icon: 'Braces' },
      { name: 'JavaScript', icon: 'Braces' },
      { name: 'C / C++', icon: 'Cpu' },
      { name: 'Bash / Shell', icon: 'Terminal' },
    ],
  },
  {
    id: 'ai-ml-cv',
    title: 'ML & Computer Vision',
    icon: 'Eye',
    skills: [
      { name: 'OpenCV', icon: 'Scan' },
      { name: 'Deep Learning', icon: 'Layers' },
      { name: 'Face Recognition', icon: 'ScanFace' },
      { name: 'NLP', icon: 'Languages' },
    ],
  },
  {
    id: 'databases',
    title: 'Backend & Data',
    icon: 'Database',
    skills: [
      { name: 'Supabase', icon: 'Database' },
      { name: 'PostgreSQL', icon: 'Table' },
      { name: 'Next.js', icon: 'Globe' },
      { name: 'REST APIs', icon: 'Plug' },
      { name: 'Webhooks', icon: 'Webhook' },
    ],
  },
  {
    id: 'systems-devops',
    title: 'Systems & DevOps',
    icon: 'Server',
    skills: [
      { name: 'Linux', icon: 'Terminal' },
      { name: 'Docker', icon: 'Container' },
      { name: 'SSH', icon: 'Key' },
      { name: 'System Debugging', icon: 'Bug' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: 'Wrench',
    skills: [
      { name: 'Git & GitHub', icon: 'GitBranch' },
      { name: 'OpenClaw', icon: 'Bot' },
      { name: 'Retell AI', icon: 'Phone' },
      { name: 'Vocera', icon: 'Headphones' },
    ],
  },
]
