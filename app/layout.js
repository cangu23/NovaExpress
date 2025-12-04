'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import './globals.css'

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  const [lang, setLang] = useState('es')

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es')

  return (
    <html lang={lang} className={darkMode ? 'dark' : ''}>
      <body>
        <nav className="bg-primary p-4 flex justify-between items-center">
          <h1 className="text-primary-foreground text-xl font-bold">NovaExpress</h1>
          <div className="flex space-x-4">
            <button onClick={toggleDarkMode} className="px-4 py-2 bg-secondary rounded">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={toggleLang} className="px-4 py-2 bg-secondary rounded">
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <a href="/auth" className="px-4 py-2 bg-destructive rounded text-destructive-foreground">Login</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
