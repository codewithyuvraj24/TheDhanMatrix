"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }){
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

  if (loading || !user) return <div className="p-8 text-center">Loading your dashboard...</div>
  
  if (adminOnly && role !== 'admin') return <div className="p-8 text-center">Checking permissions...</div>
  
  return <>{children}</>
}
