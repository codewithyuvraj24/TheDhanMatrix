"use client"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sun, Moon, LogOut, Layout, User as UserIcon, PlusCircle, LineChart } from "lucide-react"

export default function Header() {
  const { user, role } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    try {
      await signOut(auth)
      router.push('/')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 dark:bg-black/40 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <Image src="/dmc-logo.png" alt="DMC Logo" fill className="object-cover" sizes="40px" />
          </div>
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
            Dhanmatrixcapital
          </span>
        </Link>
        <nav className="flex items-center space-x-1 md:space-x-4">
          <div className="hidden md:flex items-center space-x-1">
            {['Home', 'About', 'Plans', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-200 dark:bg-white/10 mx-2"></div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-all flex items-center justify-center"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="flex items-center space-x-3">
              {role === 'admin' && (
                <Link href="/admin" className="px-3 py-1.5 bg-red-100/50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition border border-red-200/50 dark:border-red-500/20">
                  Admin
                </Link>
              )}
              <Link href="/dashboard" className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold hover:opacity-90 transition shadow-lg shadow-gray-400/20 dark:shadow-white/5">
                <Layout size={16} />
                <span>Dashboard</span>
              </Link>
              <Link href="/profile" className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition relative">
                <UserIcon size={20} />
              </Link>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link href="/login" className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Sign In
              </Link>
              <Link href="/register" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
