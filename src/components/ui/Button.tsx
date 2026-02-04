'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-background hover:bg-accent-light border border-transparent shadow-lg shadow-accent/20',
        secondary:
          'bg-transparent text-foreground border border-border hover:border-accent/50 hover:text-accent glass-tertiary',
        ghost:
          'bg-transparent text-foreground-secondary hover:text-foreground hover:bg-background-tertiary/50',
        glass:
          'glass-secondary glass-interactive text-foreground border-0',
        outline:
          'border border-border bg-transparent hover:bg-background-tertiary text-foreground',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  download?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      href,
      download,
      asChild = false,
      children,
      onClick,
      disabled,
      type,
      ...props
    },
    ref
  ) => {
    const classes = cn(buttonVariants({ variant, size, className }))

    // Motion variants
    const motionProps = {
      whileHover: disabled ? undefined : { scale: 1.02 },
      whileTap: disabled ? undefined : { scale: 0.98 },
      transition: { duration: 0.2 },
    }

    if (href) {
      return (
        <motion.a
          href={href}
          download={download}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={classes}
          {...motionProps}
        >
          {children}
        </motion.a>
      )
    }

    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...motionProps}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
