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
    setIsClient(true)

    let isCancelled = false
    let channelCleanup: (() => void) | undefined
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined
    let reconnectAttempt = 0
    let isConnecting = false

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

    if (!existingKey) {
      try {
        window.sessionStorage.setItem(storageKey, presenceKey)
      } catch {
        // noop
      }
    }

    const clearReconnectTimer = () => {
      if (!reconnectTimer) return
      clearTimeout(reconnectTimer)
      reconnectTimer = undefined
    }

    const disconnectChannel = () => {
      channelCleanup?.()
      channelCleanup = undefined
    }

    const scheduleReconnect = () => {
      if (isCancelled) return

      setIsConnected(false)
      disconnectChannel()
      clearReconnectTimer()

      const delay = Math.min(1000 * 2 ** reconnectAttempt, 10000)
      reconnectAttempt += 1

      reconnectTimer = setTimeout(() => {
        void connect()
      }, delay)
    }

    const connect = async () => {
      if (isCancelled || isConnecting) return
      isConnecting = true

      disconnectChannel()
      clearReconnectTimer()

      try {
        const supabase = await getBrowserSupabaseClient()
        if (!supabase || isCancelled) {
          scheduleReconnect()
          return
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
            if (isCancelled) return

            if (status === 'SUBSCRIBED') {
              reconnectAttempt = 0
              setIsConnected(true)
              setViewerCount((count) => Math.max(count, 1))

              const trackResult = await channel.track({ online_at: new Date().toISOString() })
              if (trackResult !== 'ok') {
                scheduleReconnect()
                return
              }

              updateCountFromPresence()
              return
            }

            if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
              scheduleReconnect()
            }
          })

        const handleBeforeUnload = () => {
          void channel.untrack()
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        channelCleanup = () => {
          window.removeEventListener('beforeunload', handleBeforeUnload)
          setIsConnected(false)
          void channel.untrack().finally(() => {
            void supabase.removeChannel(channel)
          })
        }
      } catch {
        scheduleReconnect()
      } finally {
        isConnecting = false
      }
    }

    const handleOnline = () => {
      void connect()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void connect()
      }
    }

    window.addEventListener('online', handleOnline)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    void connect()

    return () => {
      isCancelled = true
      clearReconnectTimer()
      window.removeEventListener('online', handleOnline)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      disconnectChannel()
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
