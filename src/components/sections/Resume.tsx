'use client'

import { motion } from 'framer-motion'
import { Download, FileText, ExternalLink } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { resumeFile } from '@/data/resume-file'

export function Resume() {
  return (
    <section id="resume" className="relative bg-gradient-to-b from-background-secondary/50 to-background overflow-hidden">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-6">
            <SectionHeading
              title="Resume"
              subtitle="View and download my full resume"
              align="center"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={resumeFile.url} size="lg" download>
                <Download className="w-5 h-5" />
                Download PDF
              </Button>
              <Button
                href={resumeFile.url}
                variant="secondary"
                size="lg"
              >
                <ExternalLink className="w-5 h-5" />
                Open in New Tab
              </Button>
            </div>
            <div className="inline-flex items-center gap-2 text-foreground-muted text-sm mt-2">
              <FileText className="w-4 h-4" />
              <span>Last updated: {resumeFile.lastUpdatedLabel}</span>
            </div>
          </div>
        }
      >
        <iframe
          src={`${resumeFile.url}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-full"
          title="Resume"
          style={{ background: 'white' }}
        />
      </ContainerScroll>
    </section>
  )
}
