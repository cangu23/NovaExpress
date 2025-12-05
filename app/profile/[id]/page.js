'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

export default function Profile() {
  const params = useParams()
  const id = params.id as string

  const [user, setUser] = useState<any>(null)
  const [gallery, setGallery] = useState<any[]>([])
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      await Promise.all([fetchProfile(), fetchGallery()])
      setLoading(false)
    }
    loadData()
  }, [id])

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()
    setUser(data)
  }

  const fetchGallery = async () => {
    const { data } = await supabase
      .from('gallery')
      .select('id, url, created_at')
      .eq('user_id', id)
      .order('created_at', { ascending: false })
    setGallery(data || [])
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return <p className="text-center text-muted-foreground">Perfil no encontrado</p>

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header del perfil */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
        <div className="relative">
          <Image
            src={user.avatar_url || '/default-avatar.png'}
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-full ring-4 ring-primary/20 object-cover"
          />
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full ring-4 ring-background"></div>
        </div>

        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-2">@{user.username || id}</h1>
          <p className="text-xl text-muted-foreground max-w-full">
            {user.bio || 'Sin biografía aún...'}
          </p>
        </div>
      </div>

      {/* Galería */}
      <h2 className="text-2xl font-bold mb-6">Galería</h2>

      {gallery.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          Este usuario aún no ha subido nada
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted animate-in zoom-in duration-500"
            >
              <Image
                src={img.url}
                alt="Arte"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
