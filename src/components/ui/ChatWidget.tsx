'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="glass-primary glass-edge glass-interactive w-[320px] sm:w-[360px] h-[480px] flex flex-col overflow-hidden mb-4"
          >
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div>
                <h4 className="text-sm font-medium text-foreground">Ask about Nihar</h4>
                <p className="text-xs text-foreground-secondary">Portfolio‑only assistant</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg glass-tertiary hover:opacity-80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-xs text-foreground-secondary">
                  Ask about projects, experience, skills, or education.
                </div>
              )}
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'max-w-[85%] text-sm leading-relaxed px-3 py-2 rounded-xl',
                    m.role === 'user'
                      ? 'ml-auto bg-accent text-background'
                      : 'glass-secondary text-foreground'
                  )}
                >
                  {m.content}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Thinking…
                </div>
              )}
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault()
                if (!input.trim()) return
                const userMessage = input
                setInput('')
                setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
                setIsLoading(true)
                try {
                  const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: [{ role: 'user', content: userMessage }] }),
                  })
                  if (!response.body) throw new Error('No response')
                  const reader = response.body.getReader()
                  const decoder = new TextDecoder()
                  let buffer = ''
                  let assistant = ''

                  while (true) {
                    const { value, done } = await reader.read()
                    if (done) break
                    buffer += decoder.decode(value, { stream: true })

                    const lines = buffer.split('\n')
                    buffer = lines.pop() || ''

                    for (const line of lines) {
                      const trimmed = line.trim()
                      if (!trimmed.startsWith('data:')) continue
                      const data = trimmed.replace(/^data:\s*/, '')
                      if (data === '[DONE]') continue
                      try {
                        const json = JSON.parse(data)
                        const delta =
                          json?.choices?.[0]?.delta?.content ??
                          json?.choices?.[0]?.message?.content ??
                          ''
                        if (delta) {
                          assistant += delta
                          setMessages((prev) => {
                            const next = [...prev]
                            if (next.length > 0 && next[next.length - 1].role === 'assistant') {
                              next[next.length - 1] = { role: 'assistant', content: assistant }
                              return next
                            }
                            return [...next, { role: 'assistant', content: assistant }]
                          })
                        }
                      } catch {
                        // ignore JSON parse errors for partial chunks
                      }
                    }
                  }
                } catch {
                  setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry — I could not respond.' }])
                } finally {
                  setIsLoading(false)
                }
              }}
              className="p-4 border-t border-border/50"
            >
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question…"
                  className="flex-1 glass-tertiary px-3 py-2 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-lg bg-accent text-background disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
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
