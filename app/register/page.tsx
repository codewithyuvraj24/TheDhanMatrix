"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { setDoc, doc } from 'firebase/firestore'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e:any){
    e.preventDefault()
    setError('')
    setLoading(true)

    try{
      // Validate inputs
      if (!email || !password || !confirmPassword) {
        throw new Error('All fields are required')
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      // Create user account
      const cred = await createUserWithEmailAndPassword(auth, email, password)

      // Create user document in Firestore (always as 'user' role)
      await setDoc(doc(db, 'users', cred.user.uid), { 
        uid: cred.user.uid, 
        email: email, 
        role: 'user',
        createdAt: new Date().toISOString()
      })

      router.push('/dashboard')
    }catch(err:any){
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">Create Account</h2>
      <p className="text-gray-600 mb-6">Join TheDhanMatrix today</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input 
            type="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600" 
            placeholder="Enter your email" 
            value={email} 
            onChange={e=>setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            type="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600" 
            placeholder="At least 6 characters" 
            value={password} 
            onChange={e=>setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input 
            type="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600" 
            placeholder="Confirm password" 
            value={confirmPassword} 
            onChange={e=>setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 font-medium p-2 bg-red-50 rounded">{error}</p>}

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded font-medium text-white transition bg-green-600 hover:bg-green-700 disabled:bg-green-400"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center mt-6 text-gray-600">
        Already have an account? <a href="/login" className="text-blue-600 font-medium hover:underline">Sign in</a>
      </p>
    </div>
  )
}
