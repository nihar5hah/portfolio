import { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    icon: 'Brain',
    skills: [
      { name: 'AI Voice Assistants', icon: 'Mic' },
      { name: 'Prompt Engineering', icon: 'MessageSquare' },
      { name: 'Conversational AI', icon: 'MessagesSquare' },
      { name: 'Model Evaluation', icon: 'LineChart' },
      { name: 'Vibe Coding', icon: 'Sparkles' },
    ],
  },
  {
    id: 'programming',
    title: 'Programming & Scripting',
    icon: 'Code',
    skills: [
      { name: 'Python', icon: 'FileCode' },
      { name: 'C / C++', icon: 'Cpu' },
      { name: 'JavaScript', icon: 'Braces' },
      { name: 'Bash / Shell', icon: 'Terminal' },
    ],
  },
  {
    id: 'ai-ml-cv',
    title: 'AI / ML / Computer Vision',
    icon: 'Eye',
    skills: [
      { name: 'Face Recognition', icon: 'ScanFace' },
      { name: 'OpenCV', icon: 'Scan' },
      { name: 'Emotion Detection', icon: 'SmilePlus' },
      { name: 'NLP Fundamentals', icon: 'Languages' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Backend',
    icon: 'Database',
    skills: [
      { name: 'Supabase', icon: 'Database' },
      { name: 'PostgreSQL', icon: 'Table' },
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
      { name: 'Jetson Nano', icon: 'Microchip' },
      { name: 'SSH', icon: 'Key' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: 'Wrench',
    skills: [
      { name: 'Git & GitHub', icon: 'GitBranch' },
      { name: 'Retell AI', icon: 'Phone' },
      { name: 'Vocera', icon: 'Headphones' },
      { name: 'Figma', icon: 'Figma' },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    icon: 'Shield',
    skills: [
      { name: 'Ethical Hacking', icon: 'Bug' },
      { name: 'Penetration Testing', icon: 'ShieldAlert' },
      { name: 'Vulnerability Assessment', icon: 'Search' },
      { name: 'Networking', icon: 'Network' },
    ],
  },
]
