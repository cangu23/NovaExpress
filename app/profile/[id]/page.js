'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

export default function Profile() {
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)
  const [gallery, setGallery] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', id).single()
      const { data: imgs } = await supabase.from('gallery').select('id,url').eq('user_id', id)
      setUser(profile)
      setGallery(imgs || [])
    }
    if (id) load()
  }, [id])

  if (!user) return <div className="text-center py-20">Cargando perfil o no existe…</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
        <Image
          src={user.avatar_url || '/default-avatar.png'}
          alt="avatar"
          width={160}
          height={160}
          className="rounded-full"
        />
        <div>
          <h1 className="text-5xl font-bold">@{user.username || id}</h1>
          <p className="text-xl text-muted-foreground mt-3">{user.bio || 'Sin bio aún'}</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">Galería</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map(img => (
          <div key={img.id} className="aspect-square rounded-xl overflow-hidden bg-muted">
            <Image src={img.url} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
