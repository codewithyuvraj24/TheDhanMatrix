"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'

const SECRET_KEY = process.env.NEXT_PUBLIC_ADMIN_SETUP_KEY || 'thedhanmatrix-admin-2025'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [adminKey, setAdminKey] = useState('')
  const [showAdminKey, setShowAdminKey] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      // 1. Create User
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      const user = cred.user

      // 2. Handle Admin Promotion if key provided
      const isTargetingAdmin = adminKey === SECRET_KEY
      if (adminKey && adminKey !== SECRET_KEY) {
        throw new Error('Invalid Admin Secret Key')
      }

      // 3. Create User Document
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: email,
        role: isTargetingAdmin ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      })

      // 4. If Admin, also add to admins collection for rules enforcement
      if (isTargetingAdmin) {
        await setDoc(doc(db, 'admins', user.uid), {
          uid: user.uid,
          email: email,
          promotedAt: new Date().toISOString(),
          promotedBy: 'direct-registration'
        })
      }

      router.push(isTargetingAdmin ? '/admin' : '/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError('')
    setLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: 'user',
          createdAt: new Date().toISOString()
        })
      }

      const adminDoc = await getDoc(doc(db, 'admins', user.uid))
      router.push(adminDoc.exists() ? '/admin' : '/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 mt-20 relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="bg-gradient-to-r from-emerald-900/50 to-blue-900/50 p-8 text-center border-b border-white/10">
          <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
          <p className="text-emerald-200/60 text-sm mt-2 font-medium">Join TheDhanMatrix Community</p>
        </div>

        <div className="p-8">
          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold">Registration Error</p>
                <p className="opacity-80">{error}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                placeholder="name@example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  placeholder="••••••"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Confirm</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  placeholder="••••••"
                />
              </div>
            </div>

            {/* Admin Key Section */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAdminKey(!showAdminKey)}
                className="text-xs text-gray-500 hover:text-emerald-400 transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
              >
                {showAdminKey ? '- Hide Admin Options' : '+ Have an Admin Secret Key?'}
              </button>

              {showAdminKey && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 space-y-2"
                >
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Secret Key</label>
                  <input
                    type="password"
                    value={adminKey}
                    onChange={e => setAdminKey(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-dashed"
                    placeholder="Enter key to skip setup"
                  />
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Start Building'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-3 text-gray-500 text-xs font-bold uppercase tracking-widest">OR</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 border border-white/10 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account? <a href="/login" className="text-emerald-400 font-bold hover:underline">Sign In</a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
