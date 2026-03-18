import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import {
  BlogHeader,
  TableOfContents,
  ShareButtons,
  PostNavigation,
} from '@/components/blog'
import { mdxComponents } from '@/components/blog/MDXComponents'
import {
  getBlogPost,
  getAllBlogSlugs,
  getAdjacentPosts,
  extractHeadings,
} from '@/lib/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Nihar Shah'],
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Compile MDX content with plugins (RSC approach)
  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [
            rehypePrettyCode,
            {
              theme: 'github-dark',
              keepBackground: false,
            },
          ],
        ],
      },
    },
  })

  // Extract headings for table of contents
  const headings = extractHeadings(post.content)

  // Get adjacent posts for navigation
  const { previous, next } = getAdjacentPosts(slug)

  // Create post meta (without content)
  const postMeta = {
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags,
    excerpt: post.excerpt,
    readingTime: post.readingTime,
    coverImage: post.coverImage,
    featured: post.featured,
  }

  // Get base URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.niharshah.in'
  const postUrl = `${baseUrl}/blogs/${slug}`

  return (
    <>
      <main className="min-h-screen pt-24 pb-16">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Table of Contents - Desktop Sidebar */}
            <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
              <TableOfContents headings={headings} />
            </aside>

            {/* Main Content */}
            <article className="flex-1 max-w-3xl">
              {/* Post Header */}
              <BlogHeader post={postMeta} />

              {/* Table of Contents - Mobile */}
              <div className="lg:hidden">
                <TableOfContents headings={headings} />
              </div>

              {/* MDX Content */}
              <div className="prose-custom">
                {content}
              </div>

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-foreground-muted font-mono text-sm">
                    Share this article
                  </span>
                  <ShareButtons url={postUrl} title={post.title} />
                </div>
              </div>

              {/* Post Navigation */}
              <PostNavigation previous={previous} next={next} className="mt-12" />
            </article>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
