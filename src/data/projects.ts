import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'kalexam',
    title: 'KalExam – AI-Powered Learning & Evaluation Platform',
    description:
      'An AI-driven learning system that generates personalized study strategies from syllabus, study materials, and past papers.',
    longDescription:
      'KalExam is an AI-driven learning and evaluation platform that generates personalized study strategies from syllabus documents, study materials, and past papers. The system uses RAG-powered contextual learning to deliver source-grounded responses with full citation tracking, ensuring students can verify every answer against original material. It features multi-model AI routing that dynamically selects between models to optimize for speed and response quality depending on query complexity. The platform supports source ingestion from multiple formats including PDFs, websites, and YouTube transcripts, building a comprehensive knowledge base per course. A context-aware chat interface provides conversational study assistance with persistent memory across sessions. The architecture is built on a scalable async foundation with intelligent caching and real-time progress tracking for both individual and batch study workflows.',
    technologies: ['RAG', 'Multi-Model AI', 'PDF Ingestion', 'YouTube Transcripts', 'Async Architecture', 'Caching'],
    featured: true,
    image: '/projects/kalexam.png',
    imagePlaceholder: 'KalExam Dashboard Screenshot',
    highlights: [
      'RAG-powered contextual learning with source-grounded responses',
      'Multi-model AI routing to optimize speed and response quality',
      'Source ingestion from PDFs, websites, and YouTube transcripts',
      'Context-aware chat interface with citation tracking',
      'Scalable async architecture with caching and progress tracking',
    ],
    links: {
      github: 'https://github.com/nihar5hah/KalExam',
    },
  },
  {
    id: 'openclaw',
    title: 'OpenClaw Multi-Agent Orchestration System',
    description:
      'A structured 24/7 autonomous AI system built using OpenClaw with a Boss–Worker architecture.',
    longDescription:
      'A structured 24/7 autonomous AI system built using OpenClaw with a Boss–Worker architecture. The system implements a multi-agent delegation model with specialized roles — a Coordinator agent manages task routing, a Coder agent handles code generation and review, a Researcher agent gathers information and context, and an Extractor agent processes and structures data from various sources. Autonomous workflows run on scheduled cron jobs, enabling continuous operation without manual intervention. The infrastructure includes self-healing gateway monitoring that detects failures and automatically recovers services, ensuring high availability. Security is enforced through prompt-injection resistance mechanisms and strict role-locking safeguards that prevent agents from operating outside their designated scope. The system is controlled via a Telegram-based command interface for real-time oversight and manual overrides when needed.',
    technologies: ['OpenClaw', 'Multi-Agent Systems', 'Cron Orchestration', 'Telegram API', 'Gateway Monitoring'],
    featured: true,
    image: '/projects/openclaw-dashboard.png',
    imagePlaceholder: 'OpenClaw System Diagram',
    highlights: [
      'Multi-agent delegation (Coordinator, Coder, Researcher, Extractor)',
      'Scheduled autonomous workflows via cron orchestration',
      'Self-healing gateway monitoring & failure recovery',
      'Prompt-injection resistance and role-locking safeguards',
      'Telegram-based command control interface',
    ],
    links: {},
  },
  {
    id: 'mission-control',
    title: 'Mission Control – Real-Time AI Operations Dashboard',
    description:
      'A production-grade monitoring and observability dashboard for autonomous AI agents.',
    longDescription:
      'Mission Control is a production-grade monitoring and observability dashboard purpose-built for autonomous AI agents. It provides a real-time agent activity feed that streams live updates on task execution, status changes, and inter-agent communication. The uptime and health monitoring module tracks service availability with automated alerting for degraded performance or outages. Event-driven updates are powered by Supabase Realtime, enabling instant UI synchronization without polling. A global search capability spans across logs, workflows, and agent metadata, making it easy to trace issues or audit agent behavior. The dashboard is built on a modular Next.js architecture with isolated components for each monitoring domain, allowing independent scaling and feature development.',
    technologies: ['Next.js', 'Supabase Realtime', 'Event-Driven Architecture', 'Monitoring', 'TypeScript'],
    featured: true,
    image: '/projects/mission-control.png',
    imagePlaceholder: 'Mission Control Dashboard Screenshot',
    highlights: [
      'Real-time agent activity feed',
      'Uptime & health monitoring',
      'Event-driven updates via Supabase Realtime',
      'Global search across logs & workflows',
      'Modular Next.js architecture',
    ],
    links: {
      github: 'https://github.com/nihar5hah/mission-control',
    },
  },
  {
    id: 'hireai',
    title: 'HireAI',
    description:
      'AI-driven platform to evaluate candidates strictly based on job requirements.',
    longDescription:
      'HireAI is an AI-driven platform designed to evaluate candidates strictly based on job requirements, built during a 24-hour hackathon. The system takes a job description as input and automatically extracts key skills, qualifications, and role expectations. It then generates structured, role-specific assessments that include objective questions for knowledge testing, subjective questions for behavioral evaluation, and coding challenges for technical validation. Each assessment is calibrated to the specific skill requirements of the role, ensuring fair and consistent evaluation. The platform implements skill-based evaluation workflows that score and rank candidates transparently, reducing subjectivity in the hiring process.',
    technologies: ['AI/ML', 'LLMs', 'Job Analysis', 'Assessment Generation', 'Rapid Prototyping'],
    featured: true,
    image: '/projects/hireai.png',
    imagePlaceholder: 'HireAI Interface',
    highlights: [
      'Automated job description analysis',
      'Structured assessment generation (objective, subjective, coding)',
      'Skill-based evaluation workflows',
      'Built in 24-hour hackathon',
    ],
    links: {
      github: 'https://github.com/nihar5hah/HireAI',
    },
  },
  {
    id: 'healthcare-ai',
    title: 'Healthcare AI Voice Assistant @ Confido Health',
    description:
      'Built at Confido Health — conversational AI systems for automated clinic call handling across multiple healthcare locations.',
    longDescription:
      'Built during my internship at Confido Health, this project involves designing and optimizing conversational AI systems for automated clinic call handling across multiple healthcare locations. The core innovation is a dynamic prompt generation system that creates location-specific AI voice configurations at scale using structured JSON templates. Each configuration supports parameter injection for clinic-specific details including operating hours, available procedures, insurance information, and call routing rules. The system handles patient calls end-to-end — from initial greeting through appointment scheduling, information delivery, and call resolution. Workflow optimization ensures high task completion rates while maintaining natural, empathetic conversational flow. The architecture supports multi-location deployment from a single configuration framework.',
    technologies: [
      'Voice AI',
      'Prompt Engineering',
      'JSON Templates',
      'Python',
      'Webhooks',
    ],
    featured: true,
    image: '/projects/healthcare-ai.png',
    imagePlaceholder: 'Voice Assistant Flow Diagram',
    highlights: [
      'Built at Confido Health (active internship)',
      'Dynamic prompt generation system',
      'Location-specific AI voice configurations',
      'Parameter injection (hours, procedures, routing)',
      'Workflow optimization for task completion',
    ],
    links: {},
  },
  {
    id: 'faceattend',
    title: 'FaceAttend',
    description:
      'Automated attendance system using computer vision and facial recognition.',
    longDescription:
      'FaceAttend is an automated attendance system built using computer vision and facial recognition techniques. The system performs real-time multi-face detection and recognition, capable of identifying multiple individuals simultaneously in a single camera frame. It uses OpenCV and deep learning models for accurate face encoding and matching against a registered database. All attendance records, user data, and face encodings are stored securely using Supabase with PostgreSQL, authentication, and storage services. The system is designed for classroom-scale deployment, handling the throughput demands of a typical class session with optimized recognition accuracy from iterative testing and parameter tuning.',
    technologies: ['Python', 'OpenCV', 'Deep Learning', 'Supabase', 'PostgreSQL'],
    featured: true,
    image: '/projects/faceattend.jpg',
    imagePlaceholder: 'FaceAttend Demo',
    highlights: [
      'Real-time multi-face detection',
      'Supabase-backed data storage',
      'Classroom-scale deployment design',
    ],
    links: {
      github: 'https://github.com/nihar5hah/FaceAttend',
    },
  },
]
