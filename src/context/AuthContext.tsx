"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc, getDocFromCache, getDocFromServer } from 'firebase/firestore'

type AuthContextType = {
  user: User | null
  role: 'admin' | 'user' | null
  loading: boolean     // Overall loading (waits for role)
  userLoading: boolean // Only waits for auth state
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true, userLoading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<'admin' | 'user' | null>(null)
  const [loading, setLoading] = useState(true)
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    // Check for auth hint on mount to speed up protected routes
    if (typeof window !== 'undefined' && localStorage.getItem('dmc_auth_hint')) {
      setUserLoading(false)
    }
  }, [])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      console.log('Auth State Changed:', u?.uid || 'None')

      if (u) {
        localStorage.setItem('dmc_auth_hint', 'true')
      } else {
        localStorage.removeItem('dmc_auth_hint')
      }

      setUser(u)
      setUserLoading(false)

      if (!u) {
        setRole(null)
        setLoading(false)
        return
      }

      // Start role verification
      try {
        if (u.email === 'yuvraj.basutkar24@gmail.com') {
          setRole('admin')
        } else {
          const roleDocRef = doc(db, 'admins', u.uid)

          // 1. Try cache first (instant)
          try {
            const cachedDoc = await getDocFromCache(roleDocRef)
            if (cachedDoc.exists()) {
              setRole('admin')
              setLoading(false)
              // We don't return here so we can refresh the cache from server in background
            }
          } catch (cacheErr) {
            // Document not in cache, proceed to server
          }

          // 2. Race the server call with a timeout
          const rolePromise = getDocFromServer(roleDocRef)
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Role Check Timeout')), 10000)
          )

          const adminDoc = await Promise.race([rolePromise, timeoutPromise]) as any
          if (adminDoc.exists()) setRole('admin')
          else setRole('user')
        }
      } catch (error: any) {
        console.warn('Admin status verification failed or timed out:', error.message)
        // Default to user role on error/timeout to unblock the UI
        if (!role) setRole('user')
      } finally {
        setLoading(false)
      }
    })
    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ user, role, loading, userLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
