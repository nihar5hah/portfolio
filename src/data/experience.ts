import { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: 'confido',
    company: 'Confido Health',
    role: 'Product Intern (AI Voice Assistants)',
    period: 'May 2025 - Present',
    location: 'Remote',
    description:
      'Working on the development and optimization of AI voice assistants for healthcare clinics.',
    achievements: [
      'Developing and optimizing AI voice assistants for healthcare clinics',
      'Improved natural language understanding and conversational flows for patient interactions',
      'Assisted in refining ML models and prompt logic to improve call accuracy',
      'Collaborated with product and engineering teams to test and iterate AI call workflows',
      'Gained hands-on experience with AI systems, prompt engineering, and healthcare use cases',
    ],
    technologies: [
      'AI Voice Assistants',
      'Prompt Engineering',
      'Conversational AI',
      'Python',
    ],
    current: true,
  },
  {
    id: 'crest',
    company: 'Crest Data Systems',
    role: 'Intern',
    period: 'Jun 2023 - Jul 2023',
    location: 'Ahmedabad, India',
    description:
      'Assisted in software development and data-related tasks under senior engineers.',
    achievements: [
      'Gained exposure to real-world development workflows and corporate engineering practices',
      'Worked with basic scripting, debugging, and documentation tasks',
      'Collaborated with cross-functional engineering teams',
    ],
    technologies: ['Software Development', 'Scripting', 'Documentation'],
    current: false,
  },
]
