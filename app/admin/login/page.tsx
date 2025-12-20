'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleAdminLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // 1. Sign in
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // 2. Check if user is actually an admin
            const adminDoc = await getDoc(doc(db, 'admins', user.uid))

            if (!adminDoc.exists()) {
                // Not an admin - sign out immediately
                await auth.signOut()
                throw new Error('Access Denied: You do not have admin privileges.')
            }

            // 3. Redirect to admin dashboard
            router.push('/admin')

        } catch (err: any) {
            console.error('Admin login error:', err)
            setError(err.message || 'Failed to login as admin')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <motion.div
                className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="bg-blue-900 p-6 text-center">
                    <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
                    <p className="text-blue-200 text-sm mt-1">Authorized Personnel Only</p>
                </div>

                <div className="p-8">
                    {error && (
                        <motion.div
                            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleAdminLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="admin@thedhanmatrix.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition shadow-lg disabled:opacity-70 flex justify-center items-center"
                        >
                            {loading ? (
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Access Dashboard'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to Main Site</a>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
