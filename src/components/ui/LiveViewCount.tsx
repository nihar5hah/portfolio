'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye } from 'lucide-react'
import { getBrowserSupabaseClient } from '@/lib/supabase-browser'

export function LiveViewCount() {
  const [viewerCount, setViewerCount] = useState<number>(0)
  const [isConnected, setIsConnected] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark as client-side and start connection immediately
    setIsClient(true)

    let isCancelled = false
    let cleanup: (() => void) | undefined

    const init = async () => {
      try {
        const supabase = await getBrowserSupabaseClient()
        if (!supabase || isCancelled) {
          setIsConnected(false)
          setViewerCount(0)
          return
        }

        const storageKey = 'portfolio-live-viewer-key'
        let existingKey: string | null = null

        try {
          existingKey = window.sessionStorage.getItem(storageKey)
        } catch {
          existingKey = null
        }

        const presenceKey =
          existingKey ||
          (typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`)

        try {
          if (!existingKey) {
            window.sessionStorage.setItem(storageKey, presenceKey)
          }
        } catch {
          // noop
        }
      

        const channel = supabase.channel('portfolio-live-viewers', {
          config: {
            presence: {
              key: presenceKey,
            },
          },
        })

        const updateCountFromPresence = () => {
          const state = channel.presenceState()
          const totalConnections = Object.values(state).reduce((count, presences) => {
            return count + presences.length
          }, 0)

          setViewerCount(totalConnections)
        }

        channel
          .on('presence', { event: 'sync' }, () => {
            updateCountFromPresence()
          })
          .on('presence', { event: 'join' }, () => {
            updateCountFromPresence()
          })
          .on('presence', { event: 'leave' }, () => {
            updateCountFromPresence()
          })
          .subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
              setIsConnected(true)
              setViewerCount((count) => Math.max(count, 1))
              await channel.track({ online_at: new Date().toISOString() })
              updateCountFromPresence()
            }

            if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
              setIsConnected(false)
            }
          })

        const handleBeforeUnload = async () => {
          try {
            await channel.untrack()
          } catch {
            // noop
          }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        cleanup = () => {
          window.removeEventListener('beforeunload', handleBeforeUnload)
          setIsConnected(false)
          void channel.untrack().finally(() => {
            void supabase.removeChannel(channel)
          })
        }
      } catch {
        setIsConnected(false)
        setViewerCount(0)
      }
    }

    void init()

    return () => {
      isCancelled = true
      cleanup?.()
    }
  }, [])

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) return null

  return (
    <div
      className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-background-secondary/50 text-foreground-secondary transition-colors cursor-default"
      title={isConnected ? "Live viewers (Real-time)" : "Connecting..."}
    >
      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 hover:text-accent transition-colors" />
      
      <div className="flex items-center gap-1 sm:gap-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={viewerCount}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="text-xs sm:text-sm font-medium tabular-nums"
          >
            {viewerCount}
          </motion.span>
        </AnimatePresence>

        {isConnected && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
        )}
      </div>
    </div>
  )
}
