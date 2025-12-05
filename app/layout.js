'use client'

import { useState } from 'react'
import './globals.css'
import { Moon, Sun, Globe } from 'lucide-react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [darkMode, setDarkMode] = useState(false)
  const [lang, setLang] = useState('es')

  return (
    <html lang={lang} className={darkMode ? 'dark' : ''}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <nav className="border-b bg-card">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              NovaExpress
            </h1>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{lang.toUpperCase()}</span>
              </button>

              <a
                href="/auth"
                className="px-5 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
              >
                Login
              </a>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
