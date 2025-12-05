'use client'

import { useState } from 'react'
import './globals.css'
import { Moon, Sun } from 'lucide-react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <html lang="es" className={darkMode ? 'dark' : ''}>
      <body className="min-h-screen bg-background text-foreground">
        <nav className="border-b bg-card px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">NovaExpress</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="/auth"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition"
            >
              Login
            </a>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
}
