'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const SECRET_KEY = 'thedhanmatrix-admin-2025'

export default function AdminSetup() {
    const { user, loading } = useAuth()
    const [key, setKey] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            // Must be logged in to become admin
            router.push('/login?redirect=/admin/setup')
        }
    }, [user, loading, router])

    async function handleSetup(e: React.FormEvent) {
        e.preventDefault()
        if (!user) return

        setStatus('loading')
        setMessage('')

        if (key !== SECRET_KEY) {
            setStatus('error')
            setMessage('Invalid Secret Key')
            return
        }

        try {
            // Add user to admins collection
            await setDoc(doc(db, 'admins', user.uid), {
                uid: user.uid,
                email: user.email,
                promotedAt: new Date().toISOString(),
                promotedBy: 'self-setup-script'
            })

            setStatus('success')
            setMessage('Success! You are now an Admin.')

            // Redirect to admin login after 2 seconds
            setTimeout(() => {
                router.push('/admin/login')
            }, 2000)
        } catch (err: any) {
            console.error('Setup error:', err)
            setStatus('error')
            setMessage(err.message || 'Failed to promote user')
        }
    }

    if (loading || !user) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                className="max-w-md w-full bg-white rounded-lg shadow-xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Setup</h1>
                <p className="text-gray-600 mb-6">Enter the secret key to promote your account ({user.email}) to Admin status.</p>

                {status === 'loading' && <div className="mb-4 text-blue-600">Processing...</div>}
                {status === 'error' && <div className="mb-4 text-red-600 font-medium">{message}</div>}
                {status === 'success' && <div className="mb-4 text-green-600 font-bold">{message}</div>}

                <form onSubmit={handleSetup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                        <input
                            type="password"
                            value={key}
                            onChange={e => setKey(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter secret key"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        Promote to Admin
                    </button>
                </form>

                <p className="mt-4 text-xs text-gray-400 text-center">
                    This page is for internal setup only.
                </p>
            </motion.div>
        </div>
    )
}
