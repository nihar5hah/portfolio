'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const GATEWAY_URL = process.env.NEXT_PUBLIC_BEGU_GATEWAY_URL || ''
const GATEWAY_TOKEN = process.env.NEXT_PUBLIC_BEGU_TOKEN || ''

export function ChatWidget() {
  const [open, setOpen] = useState(false)

  const chatUrl = GATEWAY_TOKEN
    ? `${GATEWAY_URL}/chat#token=${GATEWAY_TOKEN}`
    : `${GATEWAY_URL}/chat`

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="glass-primary glass-edge glass-interactive w-[320px] sm:w-[380px] h-[520px] flex flex-col overflow-hidden mb-4"
          >
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div>
                <h4 className="text-sm font-medium text-foreground">Chat with Begu</h4>
                <p className="text-xs text-foreground-secondary">Nihar&apos;s assistant</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg glass-tertiary hover:opacity-80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <iframe
              src={chatUrl}
              className="flex-1 w-full border-0"
              title="Chat with Begu"
              allow="microphone"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((v) => !v)}
        className="glass-secondary glass-edge w-12 h-12 rounded-full flex items-center justify-center"
      >
        <MessageCircle className="w-5 h-5 text-accent" />
      </motion.button>
    </div>
  )
}
