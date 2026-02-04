import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'healthcare-ai',
    title: 'Healthcare AI Voice Assistant & Prompt Generator',
    description:
      'Conversational AI system for automated clinic call handling across multiple healthcare locations.',
    longDescription:
      'Designed and optimized AI voice systems at Confido Health that handle patient calls, schedule appointments, and provide information about clinic services. Built a dynamic prompt generation system to create location-specific AI configurations at scale with JSON-based templates.',
    technologies: [
      'AI/ML',
      'Prompt Engineering',
      'Voice AI',
      'JSON',
      'Python',
      'Webhooks',
    ],
    featured: true,
    highlights: [
      'Designed conversational AI for automated clinic call handling',
      'Built dynamic prompt generation for location-specific configurations',
      'Created structured JSON templates with configurable prompt blocks',
      'Automated injection of clinic parameters including hours and procedures',
      'Evaluated call scenarios and pruned non-critical metrics for accuracy',
      'Collaborated with product and engineering teams on workflows',
    ],
    links: {},
  },
  {
    id: 'faceattend',
    title: 'FaceAttend',
    description:
      'AI-powered facial recognition attendance system with real-time multi-face detection.',
    longDescription:
      'Designed and developed an automated attendance system using computer vision and facial recognition techniques. Implemented real-time multi-face detection and recognition for classroom-scale environments with Supabase integration for secure data management.',
    technologies: ['Python', 'OpenCV', 'Deep Learning', 'Supabase', 'PostgreSQL'],
    featured: true,
    highlights: [
      'Real-time multi-face detection and recognition',
      'Classroom-scale environment support',
      'Supabase integration for auth, storage, and PostgreSQL',
      'Optimized recognition accuracy through testing and tuning',
    ],
    links: {
      github: 'https://github.com/nihar5hah',
    },
  },
]
