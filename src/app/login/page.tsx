"use client"

import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/Animations'
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      const isSuperAdmin = user.email === 'yuvraj.basutkar24@gmail.com'
      const adminDoc = !isSuperAdmin ? await getDoc(doc(db, 'admins', user.uid)) : null

      if (isSuperAdmin || (adminDoc && adminDoc.exists())) {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in.')
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
      const isSuperAdmin = user.email === 'yuvraj.basutkar24@gmail.com'
      const adminDoc = !isSuperAdmin ? await getDoc(doc(db, 'admins', user.uid)) : null
      if (isSuperAdmin || (adminDoc && adminDoc.exists())) {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden py-12 sm:py-20">
      <FadeIn className="max-w-md w-full relative z-10">
        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-10 text-center border-b border-slate-100/50 dark:border-white/5 bg-slate-50/30 dark:bg-white/5">
            <Link href="/" className="inline-block group">
              <div className="inline-flex relative items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-black border border-amber-500/20 mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-500 overflow-hidden shadow-2xl shadow-amber-500/10">
                <Image src="/dmc-logo.png" alt="DMC Logo" fill className="object-cover" sizes="(max-width: 640px) 80px, 96px" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Dhanmatrixcapital</h2>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs mt-2 sm:mt-3 font-bold uppercase tracking-widest leading-none">Authentication Portal</p>
          </div>

          <div className="p-6 sm:p-10">
            {error && (
              <motion.div
                className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-widest text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Secure Email</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-14 pr-6 py-4 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all font-bold"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Access Key</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={20} />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full pl-14 pr-6 py-4 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all font-bold"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 disabled:opacity-50 flex justify-center items-center gap-3 active:scale-95"
              >
                {loading ? (
                  <div className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>AUTHORIZE ACCESS</span>
                    <ArrowRight size={20} strokeWidth={3} />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center my-10">
              <div className="flex-1 border-t border-slate-100 dark:border-white/5"></div>
              <span className="px-4 text-slate-400 text-[10px] font-black tracking-[0.2em] uppercase">Security Protocol</span>
              <div className="flex-1 border-t border-slate-100 dark:border-white/5"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-4 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-900 dark:text-white rounded-2xl font-black hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 shadow-sm"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>CONTINUE WITH GOOGLE</span>
            </button>

            <div className="mt-12 text-center space-y-6">
              <p className="text-sm font-bold text-slate-500">
                New to the matrix? <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">Request Account</Link>
              </p>
              <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Bank-Grade 256-bit Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
