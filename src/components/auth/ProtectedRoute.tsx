"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, role, loading, userLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const isAuthLoading = adminOnly ? loading : userLoading
    if (!isAuthLoading && mounted) {
      if (!user) {
        router.push('/login')
      } else if (adminOnly && role !== 'admin') {
        router.push('/')
      }
    }
  }, [user, loading, userLoading, role, adminOnly, router, mounted])

  const hasAuthHint = mounted && localStorage.getItem('dmc_auth_hint')
  const showSkeleton = userLoading && !hasAuthHint

  if (showSkeleton) return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-12 2xl:px-16 pt-32 pb-12">
      <div className="h-10 w-64 bg-slate-200 dark:bg-white/5 animate-pulse rounded-2xl mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-slate-200/50 dark:bg-white/10 h-32 rounded-[2rem] border border-white dark:border-white/10"></div>
        ))}
      </div>
      <div className="mt-12 h-[400px] w-full bg-slate-100 dark:bg-white/5 animate-pulse rounded-[3rem]"></div>
    </div>
  )

  // NOTE: We no longer block on role verification here for the 2-second load goal.
  // The Child component (AdminPanel) will handle the 'role === null' (loading) state.
  // If role becomes 'user' eventually, the Page will handle the redirect/denial.

  return <>{children}</>
}
