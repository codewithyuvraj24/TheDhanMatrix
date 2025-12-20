"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, role, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && mounted) {
      if (!user) {
        router.push('/login')
      } else if (adminOnly && role !== 'admin') {
        router.push('/')
      }
    }
  }, [user, loading, role, adminOnly, router, mounted])

  if (loading || !user) return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-8 space-y-8">
      <div className="animate-pulse bg-gray-200 h-12 w-1/3 rounded mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 h-32 rounded-lg"></div>
        ))}
      </div>
    </div>
  )

  if (adminOnly && role !== 'admin') return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Verifying administrative access...</p>
      </div>
    </div>
  )

  return <>{children}</>
}
