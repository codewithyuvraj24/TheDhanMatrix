"use client"
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, deleteDoc, doc, getDocsFromCache, getDocsFromServer } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { useToast } from '@/components/ui/PremiumToast'
import { StatsSkeleton, TableSkeleton } from '@/components/ui/Skeleton'
import MagneticButton from '@/components/ui/MagneticButton'
import {
  TrendingUp,
  Users,
  IndianRupee,
  Activity,
  Edit3,
  Trash2,
  LogOut,
  Home,
  Shield
} from 'lucide-react'

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminPanel />
    </ProtectedRoute>
  )
}

type Investment = {
  id: string
  userId: string
  depositAmount: string | number
  withdrawalDate: string
  status: 'active' | 'pending' | 'withdrawn'
  createdAt: string
}

function AdminPanel() {
  const { role } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

  async function handleLogout() {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      showToast('Logout failed', 'error')
    }
  }

  useEffect(() => {
    if (role !== 'admin') return
      ; (async () => {
        try {
          const coll = collection(db, 'investments')

          // Cache check
          try {
            const cachedSnap = await getDocsFromCache(coll)
            if (!cachedSnap.empty) {
              setInvestments(cachedSnap.docs.map(d => ({ id: d.id, ...d.data() } as Investment)))
              setLoading(false)
            }
          } catch (e) { }

          // Server race
          const serverPromise = getDocsFromServer(coll)
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Admin Fetch Timeout')), 15000)
          )

          const snap = await Promise.race([serverPromise, timeoutPromise]) as any
          setInvestments(snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Investment)))
        } catch (err: any) {
          console.warn('Admin Data Fetch Issue:', err.message)
        } finally {
          setLoading(false)
        }
      })()
  }, [role])

  async function handleUpdate(id: string, field: string, value: any) {
    try {
      await updateDoc(doc(db, 'investments', id), { [field]: value })
      setInvestments(prev => prev.map(inv =>
        inv.id === id ? { ...inv, [field]: value } : inv
      ))
      setEditingId(null)
      showToast('Investment updated successfully', 'success')
    } catch (err) {
      showToast('Failed to update investment', 'error')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this investment? This action cannot be undone.')) return

    try {
      await deleteDoc(doc(db, 'investments', id))
      setInvestments(prev => prev.filter(inv => inv.id !== id))
      showToast('Investment deleted successfully', 'success')
    } catch (err) {
      showToast('Failed to delete investment', 'error')
    }
  }

  // Calculate stats
  const totalInvested = investments.reduce((sum, inv) => sum + (Number(inv.depositAmount) || 0), 0)
  const activeCount = investments.filter(inv => inv.status === 'active').length
  const withdrawnCount = investments.filter(inv => inv.status === 'withdrawn').length
  const uniqueUsers = new Set(investments.map(inv => inv.userId)).size

  // No more blocking loading check. The shell renders immediately!
  // Skeletons handle the data pop-in.

  // Diagnostic view for non-admins (though ProtectedRoute should handle this, this is a safety net)
  if (role !== 'admin') {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-32 pb-12 text-center">
        <div className="p-10 bg-red-500/10 border border-red-500/20 rounded-[3rem] space-y-6">
          <Shield className="mx-auto text-red-500" size={64} />
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Access Restricted</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Your current account does not have **Administrative Clearance**.
            To activate this command center, follow these strategic steps:
          </p>
          <div className="text-left bg-white/50 dark:bg-black/20 p-6 rounded-2xl space-y-4 text-sm font-bold">
            <p className="text-emerald-600 dark:text-emerald-400">1. Open Firebase Console</p>
            <p className="text-slate-600 dark:text-slate-300">2. Navigate to Firestore Database -&gt; `users` collection</p>
            <p className="text-slate-600 dark:text-slate-300">3. Find your UID: <code className="bg-slate-200 dark:bg-white/10 px-2 py-1 rounded">{auth.currentUser?.uid}</code></p>
            <p className="text-slate-600 dark:text-slate-300">4. Update the `role` field from <code className="text-blue-500">"user"</code> to <code className="text-red-500">"admin"</code></p>
          </div>
          <MagneticButton
            onClick={() => router.push('/')}
            className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs"
          >
            Return to Base
          </MagneticButton>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20 relative z-10">
      {/* Header */}
      <FadeIn>
        <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
              <Shield size={14} />
              <span>System Control</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Command Center</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base">
              Platform oversight and investment management
            </p>
          </div>
          <div className="flex gap-3">
            <MagneticButton
              onClick={() => router.push('/')}
              className="px-6 py-3 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-700 dark:text-white rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Main Site</span>
            </MagneticButton>
            <MagneticButton
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 flex items-center gap-2"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </MagneticButton>
          </div>
        </div>
      </FadeIn>

      {/* Statistics Cards */}
      <StaggerContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {loading ? (
            <div className="col-span-full"><StatsSkeleton /></div>
          ) : [
            { label: "Total AUM", value: `₹${totalInvested.toLocaleString('en-IN')}`, icon: <IndianRupee size={20} />, sub: `${investments.length} positions`, color: "blue" },
            { label: "Active Investments", value: activeCount, icon: <Activity size={20} />, sub: "Currently earning", color: "emerald" },
            { label: "Completed", value: withdrawnCount, icon: <TrendingUp size={20} />, sub: "Withdrawn", color: "purple" },
            { label: "Total Users", value: uniqueUsers, icon: <Users size={20} />, sub: "Active investors", color: "orange" }
          ].map((stat, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] hover:border-red-500/30 transition-all group">
                <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400 w-fit`}>
                  {stat.icon}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 sm:mb-2">{stat.label}</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1 sm:mb-2">{stat.value}</h3>
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold">{stat.sub}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>

      {/* Investments Management */}
      <FadeIn delay={0.3}>
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] overflow-hidden">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <Edit3 className="text-red-600 w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
              Investment Management
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Click on any field to edit investment details</p>
          </div>

          {loading ? (
            <TableSkeleton />
          ) : investments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Activity size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Investments Yet</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">The platform is ready for its first investor.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/10">
                    <th className="pb-6 font-black text-xs uppercase tracking-widest text-slate-400">User ID</th>
                    <th className="pb-6 font-black text-xs uppercase tracking-widest text-slate-400">Deposit</th>
                    <th className="pb-6 font-black text-xs uppercase tracking-widest text-slate-400">Withdrawal Date</th>
                    <th className="pb-6 font-black text-xs uppercase tracking-widest text-slate-400">Status</th>
                    <th className="pb-6 font-black text-xs uppercase tracking-widest text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                  {investments.map(inv => (
                    <tr key={inv.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-6 font-mono text-xs text-slate-600 dark:text-slate-400">{inv.userId.slice(0, 12)}...</td>
                      <td className="py-6">
                        <input
                          type="text"
                          defaultValue={inv.depositAmount}
                          onBlur={e => handleUpdate(inv.id, 'depositAmount', e.target.value)}
                          onClick={() => setEditingId(inv.id)}
                          className="w-28 px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-bold text-slate-900 dark:text-white hover:border-blue-400 focus:outline-none focus:border-blue-600 transition-colors"
                        />
                      </td>
                      <td className="py-6">
                        <input
                          type="text"
                          defaultValue={inv.withdrawalDate}
                          onBlur={e => handleUpdate(inv.id, 'withdrawalDate', e.target.value)}
                          onClick={() => setEditingId(inv.id)}
                          className="w-36 px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-bold text-slate-900 dark:text-white hover:border-blue-400 focus:outline-none focus:border-blue-600 transition-colors"
                        />
                      </td>
                      <td className="py-6">
                        <select
                          defaultValue={inv.status}
                          onChange={e => handleUpdate(inv.id, 'status', e.target.value)}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-0 cursor-pointer ${inv.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : inv.status === 'withdrawn'
                              ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            }`}
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="withdrawn">Withdrawn</option>
                        </select>
                      </td>
                      <td className="py-6">
                        <button
                          onClick={() => handleDelete(inv.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Info Box */}
      <FadeIn delay={0.5}>
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shrink-0">
            <Shield size={24} />
          </div>
          <p className="text-sm font-bold text-blue-700 dark:text-blue-400 leading-relaxed">
            <strong>Admin Tip:</strong> Click on any deposit or date field to edit. Changes are saved automatically when you click away from the field.
          </p>
        </div>
      </FadeIn>
    </div>
  )
}
