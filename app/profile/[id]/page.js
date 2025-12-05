'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

export default function Profile() {
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)
  const [gallery, setGallery] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', id).single()
      const { data: imgs } = await supabase.from('gallery').select('id,url').eq('user_id', id)
      setUser(profile)
      setGallery(imgs || [])
      setLoading(false)
    }
    if (id) load()
  }, [id])

  if (loading) return <div className="text-center py-20">Cargando…</div>
  if (!user) return <div className="text-center py-20">Perfil no encontrado</div>

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row gap-8 items-center mb-12">
        <Image
          src={user.avatar_url || '/default-avatar.png'}
          alt="avatar"
          width={140}
          height={140}
          className="rounded-full ring-4 ring-primary/20"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold">@{user.username || id}</h1>
          <p className="text-xl text-muted-foreground mt-2">{user.bio || 'Sin bio'}</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">Galería</h2>
      {gallery.length === 0 ? (
        <p className="text-center py-12 text-muted-foreground">Aún no hay imágenes</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map(img => (
            <div key={img.id} className="aspect-square rounded-xl overflow-hidden bg-muted">
              <Image src={img.url} alt="" fill className="object-cover hover:scale-110 transition" />
            </div>
          ))}
        </div>
      </div>
  )
}
