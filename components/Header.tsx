"use client"
import Link from "next/link"
import { useAuth } from "../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../lib/firebase"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Header(){
  const { user, role } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout(){
    setLoading(true)
    try{
      await signOut(auth)
      router.push('/')
    }catch(err){
      console.error('Logout error:', err)
    }finally{
      setLoading(false)
    }
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">TheDhanMatrix</h1>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link href="/plans" className="text-gray-600 hover:text-gray-900">Plans</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              {role === 'admin' && (
                <Link href="/admin" className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200">
                  Admin Panel
                </Link>
              )}
              <Link href="/dashboard" className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200">
                Dashboard
              </Link>
              <Link href="/profile" className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium hover:bg-green-200">
                Profile
              </Link>
              <span className="text-sm text-gray-600 hidden md:inline">{user.email}</span>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:bg-red-400 text-sm font-medium"
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
