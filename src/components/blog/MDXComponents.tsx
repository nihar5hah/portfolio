import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { MDXComponents } from 'mdx/types'

// Custom components for MDX rendering with Neural Brutalism styling
// These are used as components prop in compileMDX from next-mdx-remote/rsc
export const mdxComponents: MDXComponents = {
  // Headings with display font and anchor links
  h1: ({ children, id, ...props }) => (
    <h1
      id={id as string}
      className="font-display text-4xl md:text-5xl font-bold text-foreground mt-12 mb-6 tracking-tight scroll-mt-24"
      {...props}
    >
      {children}
    </h1>
  ),
  
  h2: ({ children, id, ...props }) => (
    <h2
      id={id as string}
      className="group font-display text-3xl md:text-4xl font-semibold text-foreground mt-10 mb-4 tracking-tight scroll-mt-24"
      {...props}
    >
      <a href={`#${id}`} className="no-underline hover:no-underline">
        {children}
        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-accent">#</span>
      </a>
    </h2>
  ),
  
  h3: ({ children, id, ...props }) => (
    <h3
      id={id as string}
      className="group font-display text-2xl md:text-3xl font-semibold text-foreground mt-8 mb-3 tracking-tight scroll-mt-24"
      {...props}
    >
      <a href={`#${id}`} className="no-underline hover:no-underline">
        {children}
        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-accent">#</span>
      </a>
    </h3>
  ),
  
  h4: ({ children, id, ...props }) => (
    <h4
      id={id as string}
      className="font-display text-xl md:text-2xl font-semibold text-foreground mt-6 mb-2 scroll-mt-24"
      {...props}
    >
      {children}
    </h4>
  ),
  
  // Paragraphs
  p: ({ children, ...props }) => (
    <p className="text-foreground-secondary text-lg leading-relaxed mb-6" {...props}>
      {children}
    </p>
  ),
  
  // Links with indigo accent
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http')
    return (
      <Link
        href={href || '#'}
        className="text-accent hover:text-accent-light underline decoration-accent/30 hover:decoration-accent transition-colors"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
        {isExternal && <span className="ml-1 text-xs">↗</span>}
      </Link>
    )
  },
  
  // Lists
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside space-y-2 mb-6 text-foreground-secondary text-lg" {...props}>
      {children}
    </ul>
  ),
  
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground-secondary text-lg" {...props}>
      {children}
    </ol>
  ),
  
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  
  // Blockquotes with Neural Brutalism styling
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-accent bg-background-secondary/50 px-6 py-4 my-6 italic text-foreground-secondary"
      {...props}
    >
      {children}
    </blockquote>
  ),
  
  // Code blocks (inline)
  code: ({ children, className, ...props }) => {
    // If it has a language class, it's a code block (handled by pre)
    if (className?.includes('language-')) {
      return <code className={className} {...props}>{children}</code>
    }
    // Inline code
    return (
      <code
        className="bg-background-tertiary text-accent px-1.5 py-0.5 rounded font-mono text-[0.9em]"
        {...props}
      >
        {children}
      </code>
    )
  },
  
  // Code blocks (block) - styled by rehype-pretty-code, we just add container styles
  pre: ({ children, ...props }) => (
    <pre
      className="bg-background-tertiary border border-border rounded-none p-4 overflow-x-auto my-6 font-mono text-sm"
      style={{
        boxShadow: '4px 4px 0 rgba(99, 102, 241, 0.2)',
      }}
      {...props}
    >
      {children}
    </pre>
  ),
  
  // Horizontal rule
  hr: (props) => (
    <hr className="border-border my-12" {...props} />
  ),
  
  // Strong and emphasis
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  
  // Images
  img: ({ src, alt, ...props }) => (
    <figure className="my-8">
      <div className="relative overflow-hidden border border-border" style={{ boxShadow: '4px 4px 0 rgba(99, 102, 241, 0.2)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ''}
          className="w-full h-auto"
          loading="lazy"
          {...props}
        />
      </div>
      {alt && (
        <figcaption className="text-center text-sm text-foreground-muted mt-3 font-mono">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  
  // Tables
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-border" {...props}>
        {children}
      </table>
    </div>
  ),
  
  thead: ({ children, ...props }) => (
    <thead className="bg-background-secondary" {...props}>
      {children}
    </thead>
  ),
  
  th: ({ children, ...props }) => (
    <th className="border border-border px-4 py-2 text-left font-display font-semibold text-foreground" {...props}>
      {children}
    </th>
  ),
  
  td: ({ children, ...props }) => (
    <td className="border border-border px-4 py-2 text-foreground-secondary" {...props}>
      {children}
    </td>
  ),
}
