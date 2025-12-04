'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [session, setSession] = useState(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    fetchPosts()

    return () => subscription.unsubscribe()
  }, [])

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
  }

  const handleLike = async (postId) => {
    // Lógica simple de like (agregamos a DB)
    await supabase.from('likes').upsert({ post_id: postId, user_id: session?.user?.id })
    fetchPosts() // Refresca
  }

  if (!session) return <p>Cargando... <a href="/auth">Ve a login</a></p>

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Feed de Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-card p-4 rounded-lg border">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.content}</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => handleLike(post.id)} className="text-blue-500">❤️ {post.likes || 0}</button>
              <span>Comentarios: {post.comments || 0}</span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => router.push(`/profile/${session.user.id}`)} className="mt-4 px-4 py-2 bg-primary rounded">
        Ver tu perfil
      </button>
    </div>
  )
}
