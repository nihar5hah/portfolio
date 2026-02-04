import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'wide' | 'narrow'
}

const sizes = {
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  narrow: 'max-w-4xl',
}

export function Container({
  children,
  className,
  size = 'default',
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  )
}
