"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

type AuthContextType = {
  user: User | null
  role: 'admin' | 'user' | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<'admin' | 'user' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (!u) {
        setRole(null)
        setLoading(false)
        return
      }
      // check admins collection for doc with uid
      try {
        // Super Admin hardcoded check
        if (u.email === 'yuvraj.basutkar24@gmail.com') {
          setRole('admin')
        } else {
          const adminDoc = await getDoc(doc(db, 'admins', u.uid))
          if (adminDoc.exists()) setRole('admin')
          else setRole('user')
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        setRole('user')
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
