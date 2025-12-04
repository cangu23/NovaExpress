'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

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
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) alert(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full p-2 bg-primary text-primary-foreground rounded"
        >
          {loading ? 'Cargando...' : (isLogin ? 'Iniciar' : 'Registrarse')}
        </button>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full p-2 mt-2 text-muted-foreground"
        >
          {isLogin ? '¿Nuevo? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          className="w-full p-2 mt-2 bg-secondary rounded"
        >
          Con Google
        </button>
      </div>
    </div>
  )
}
