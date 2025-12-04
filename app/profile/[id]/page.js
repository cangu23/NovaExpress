'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'

export default function Profile() {
  const params = useParams()
  const [user, setUser] = useState(null)
  const [gallery, setGallery] = useState([])

  useEffect(() => {
    fetchProfile()
    fetchGallery()
  }, [params.id])

  const fetchProfile = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('id', params.id).single()
    setUser(data)
  }

  const fetchGallery = async () => {
    const { data } = await supabase.from('gallery').select('*').eq('user_id', params.id)
    setGallery(data || [])
  }

  if (!user) return <p>Cargando perfil...</p>

  return (
    <div className="p-8">
      <div className="flex items-center space-x-4 mb-8">
        <img src={user.avatar_url || '/default-avatar.png'} alt="Avatar" className="w-20 h-20 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">@{params.id}</h1>
          <p>{user.bio || 'Bio vacía'}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">Galería</h2>
      <div className="grid grid-cols-3 gap-4">
        {gallery.map((img) => (
          <img key={img.id} src={img.url} alt="Arte" className="rounded" />
        ))}
      </div>
    </div>
  )
}
