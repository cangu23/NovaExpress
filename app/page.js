'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleAuth = async () => {
    setLoading(true)
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert(error.message)
      else window.location.href = '/'
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) alert(error.message)
      else alert('Revisa tu email para confirmar')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="bg-card p-8 rounded-2xl shadow-xl w-full max-w-md border">
        <h2 className="text-3xl font-bold text-center mb-8">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg bg-background"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg bg-background"
          required
        />
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
        </button>
        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          className="w-full py-3 mt-4 border rounded-lg font-medium hover:bg-muted transition"
        >
          Continuar con Google
        </button>
        <p className="text-center mt-6 text-sm text-muted-foreground">
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  )
}
