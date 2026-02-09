import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'hireai',
    title: 'HireAI',
    description:
      'AI-powered job assessment and screening platform that evaluates candidates based on job requirements.',
    longDescription:
      'Designed and built an AI-driven platform to evaluate candidates strictly based on job requirements. Developed during a 24-hour hackathon, the system automatically analyzes job descriptions to generate role-specific assessments including objective, subjective, and coding questions. Focused on reducing fake or unqualified applications through skill-centric, transparent evaluation workflows.',
    technologies: ['AI/ML', 'LLMs', 'Job Analysis', 'Assessment Generation', 'Rapid Prototyping'],
    featured: true,
    image: '/projects/hireai.png',
    highlights: [
      'AI-driven platform to evaluate candidates based on job requirements',
      'Developed during a 24-hour hackathon with rapid execution',
      'Automatic job description analysis to generate role-specific assessments',
      'Generates objective, subjective, and coding questions',
      'Reduces fake or unqualified applications through skill-centric evaluation',
      'Transparent evaluation workflows for fair candidate assessment',
    ],
    links: {
      github: 'https://github.com/nihar5hah/HireAI',
    },
  },
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
    image: '/projects/healthcare-ai.png',
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
    image: '/projects/faceattend.jpg',
    highlights: [
      'Real-time multi-face detection and recognition',
      'Classroom-scale environment support',
      'Supabase integration for auth, storage, and PostgreSQL',
      'Optimized recognition accuracy through testing and tuning',
    ],
    links: {
      github: 'https://github.com/nihar5hah/FaceAttend',
    },
  },
]
