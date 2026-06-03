'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, X, Sparkles, Mic, MicOff, MessageSquare, Volume2, VolumeX, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const SUGGESTIONS = [
  'Validate my startup idea',
  'How do I find investors?',
  'Write me a pitch outline',
  'What should my pricing be?',
]

// Voice settings
const VOICE_SETTINGS = {
  lang: 'en-US',
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
}

export function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(true)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [ttsSupported, setTtsSupported] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const lastSpokenIdRef = useRef<string | null>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  // Check for browser support on mount
  useEffect(() => {
    const SR = (window as Window & { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition 
      || (window as Window & { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition
    setVoiceSupported(!!SR)
    setTtsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  // Speak the latest assistant message if TTS is enabled
  useEffect(() => {
    if (!ttsEnabled || !ttsSupported || messages.length === 0) return
    
    const lastMessage = messages[messages.length - 1]
    if (lastMessage.role !== 'assistant') return
    if (lastMessage.id === lastSpokenIdRef.current) return
    
    const text = lastMessage.parts
      .filter((p) => p.type === 'text')
      .map((p) => (p as { text: string }).text)
      .join('')
    
    if (text && status === 'ready') {
      speakText(text)
      lastSpokenIdRef.current = lastMessage.id
    }
  }, [messages, status, ttsEnabled, ttsSupported])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening()
      stopSpeaking()
    }
  }, [])

  const speakText = useCallback((text: string) => {
    if (!ttsSupported || !ttsEnabled) return
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = VOICE_SETTINGS.lang
    utterance.rate = VOICE_SETTINGS.rate
    utterance.pitch = VOICE_SETTINGS.pitch
    utterance.volume = VOICE_SETTINGS.volume
    
    // Get available voices and prefer a natural sounding one
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(v => 
      v.name.includes('Google') || 
      v.name.includes('Natural') || 
      v.name.includes('Samantha') ||
      v.name.includes('Microsoft')
    ) || voices.find(v => v.lang.startsWith('en'))
    
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }
    
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    
    synthesisRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [ttsEnabled, ttsSupported])

  const stopSpeaking = useCallback(() => {
    if (ttsSupported) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
    }
  }, [ttsSupported])

  const startListening = useCallback(() => {
    if (!voiceSupported) return
    
    const SR = (window as Window & { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition 
      || (window as Window & { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition
    
    if (!SR) return
    
    // Stop any ongoing TTS
    stopSpeaking()
    
    const recognition = new SR()
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.continuous = false
    recognition.maxAlternatives = 1
    
    recognition.onstart = () => {
      setListening(true)
    }
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('')
      
      setInput(transcript)
      
      // If this is a final result, send the message
      if (event.results[event.results.length - 1].isFinal) {
        setListening(false)
        if (transcript.trim()) {
          sendMessage({ text: transcript.trim() })
          setInput('')
        }
      }
    }
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error)
      setListening(false)
    }
    
    recognition.onend = () => {
      setListening(false)
    }
    
    recognitionRef.current = recognition
    recognition.start()
  }, [voiceSupported, stopSpeaking, sendMessage])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setListening(false)
  }, [])

  const toggleListening = useCallback(() => {
    if (listening) {
      stopListening()
    } else {
      startListening()
    }
  }, [listening, startListening, stopListening])

  const toggleTts = useCallback(() => {
    if (speaking) {
      stopSpeaking()
    }
    setTtsEnabled(prev => !prev)
  }, [speaking, stopSpeaking])

  const send = (text: string) => {
    if (!text.trim()) return
    sendMessage({ text })
    setInput('')
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="fixed bottom-24 right-4 z-50 flex h-[34rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl glass-strong glow-purple sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 bg-gradient-to-r from-primary/20 to-accent/10 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                  <Bot className="h-5 w-5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">AIVA Assistant</p>
                  <p className="text-xs text-emerald">
                    {speaking ? 'Speaking...' : listening ? 'Listening...' : 'Online · Gemini powered'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {ttsSupported && (
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className={cn("h-8 w-8", speaking && "text-primary")} 
                    onClick={toggleTts}
                    title={ttsEnabled ? 'Disable voice responses' : 'Enable voice responses'}
                  >
                    {ttsEnabled ? (
                      speaking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                    <span className="sr-only">{ttsEnabled ? 'Disable' : 'Enable'} voice responses</span>
                  </Button>
                )}
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close chat</span>
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-secondary px-3.5 py-2.5 text-sm text-secondary-foreground">
                      Hi, I&apos;m AIVA, your AI Virtual Advisor. Ask me anything about building, funding, or scaling your
                      startup. {voiceSupported && 'You can also use voice input by clicking the microphone button.'}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => {
                const text = m.parts
                  .filter((p) => p.type === 'text')
                  .map((p) => (p as { text: string }).text)
                  .join('')
                const isUser = m.role === 'user'
                return (
                  <div
                    key={m.id}
                    className={cn('flex items-start gap-2.5', isUser && 'flex-row-reverse')}
                  >
                    <div
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                        isUser ? 'bg-accent/20' : 'bg-primary/20',
                      )}
                    >
                      {isUser ? (
                        <MessageSquare className="h-3.5 w-3.5 text-accent" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div
                      className={cn(
                        'max-w-[78%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm',
                        isUser
                          ? 'rounded-tr-sm bg-accent text-accent-foreground'
                          : 'rounded-tl-sm bg-secondary text-secondary-foreground',
                      )}
                    >
                      {text}
                    </div>
                    {/* TTS button for assistant messages */}
                    {!isUser && ttsSupported && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 shrink-0 opacity-60 hover:opacity-100"
                        onClick={() => speakText(text)}
                        title="Read aloud"
                      >
                        <Volume2 className="h-3 w-3" />
                        <span className="sr-only">Read aloud</span>
                      </Button>
                    )}
                  </div>
                )
              })}

              {status === 'submitted' && (
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Voice indicator */}
            {listening && (
              <div className="flex items-center justify-center gap-2 border-t border-border/60 bg-primary/10 py-2">
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="h-4 w-1 rounded-full bg-primary"
                      animate={{
                        scaleY: [1, 2, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-primary">Listening... Speak now</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                  onClick={stopListening}
                >
                  Cancel
                </Button>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-border/60 p-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={listening ? 'Listening...' : 'Ask AIVA anything...'}
                className="h-10 border-border/60 bg-secondary/60"
                disabled={listening}
              />
              {voiceSupported && (
                <Button
                  type="button"
                  size="icon"
                  variant={listening ? 'default' : 'ghost'}
                  onClick={toggleListening}
                  className={cn(
                    'h-10 w-10 shrink-0 transition-all',
                    listening && 'bg-primary text-primary-foreground animate-pulse'
                  )}
                  title={listening ? 'Stop listening' : 'Start voice input'}
                >
                  {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  <span className="sr-only">{listening ? 'Stop' : 'Start'} voice input</span>
                </Button>
              )}
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 shrink-0 bg-gradient-to-br from-primary to-accent"
                disabled={listening || !input.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-xl shadow-primary/40 sm:right-6"
        aria-label="Open AI chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6 text-white" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <Bot className="h-6 w-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald" />
          </span>
        )}
      </motion.button>
    </>
  )
}
