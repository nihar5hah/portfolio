'use client'

import { motion } from 'framer-motion'
import { Download, FileText, ExternalLink } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export function Resume() {
  return (
    <section id="resume" className="section-padding bg-background-secondary">
      <Container size="narrow">
        <SectionHeading
          title="Resume"
          subtitle="View and download my full resume"
          align="center"
        />

        <motion.div
          className="glass rounded-2xl p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-[8.5/11] w-full bg-white rounded-lg overflow-hidden mb-6">
            <iframe
              src="/resume.pdf"
              className="w-full h-full"
              title="Resume"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/resume.pdf" size="lg" download>
              <Download className="w-5 h-5" />
              Download PDF
            </Button>
            <Button
              href="/resume.pdf"
              variant="secondary"
              size="lg"
            >
              <ExternalLink className="w-5 h-5" />
              Open in New Tab
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 text-foreground-muted text-sm">
            <FileText className="w-4 h-4" />
            <span>Last updated: May 2025</span>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
