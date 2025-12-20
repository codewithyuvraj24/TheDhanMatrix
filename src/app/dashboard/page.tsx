"use client"
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { InvestmentTrendChart, PortfolioBreakdownChart } from '@/components/features/Charts'
import { validateInvestmentAmount, validateWithdrawalDate, formatCurrency, getAmountErrorMessage } from '@/lib/validators'
import { addDoc } from 'firebase/firestore'
import {
  TrendingUp,
  Wallet,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  LayoutDashboard,
  User,
  ArrowRight,
  X,
  CreditCard,
  Target
} from 'lucide-react'
import { StatsSkeleton, ChartSkeleton, TableSkeleton } from '@/components/ui/Skeleton'

type Investment = {
  id: string
  userId: string
  depositAmount: number
  withdrawalDate: string
  status: 'active' | 'pending' | 'withdrawn'
  createdAt: string
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}

function Dashboard() {
  const { user } = useAuth()
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ depositAmount: '', withdrawalDate: '', status: 'active' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
      ; (async () => {
        const q = query(collection(db, 'investments'), where('userId', '==', user.uid))
        const snap = await getDocs(q)
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as Investment))
        setInvestments(items)
        setLoading(false)
      })()
  }, [user])

  async function handleCreateInvestment() {
    setError('')
    if (!user) { setError('You must be logged in'); return }
    if (!formData.depositAmount) { setError('Amount required'); return }
    if (!validateInvestmentAmount(formData.depositAmount)) { setError(getAmountErrorMessage(formData.depositAmount)); return }
    if (!formData.withdrawalDate) { setError('Date required'); return }
    if (!validateWithdrawalDate(formData.withdrawalDate)) { setError('Date must be in future'); return }

    setSubmitting(true)
    try {
      await addDoc(collection(db, 'investments'), {
        userId: user.uid,
        depositAmount: parseFloat(formData.depositAmount),
        withdrawalDate: formData.withdrawalDate,
        status: formData.status,
        createdAt: new Date().toISOString()
      })
      const q = query(collection(db, 'investments'), where('userId', '==', user.uid))
      const snap = await getDocs(q)
      setInvestments(snap.docs.map(d => ({ id: d.id, ...d.data() } as Investment)))
      setShowModal(false)
      setFormData({ depositAmount: '', withdrawalDate: '', status: 'active' })
    } catch (err) {
      setError('Failed to create investment')
    } finally {
      setSubmitting(false)
    }
  }

  const totalInvested = investments.reduce((sum, inv) => sum + (Number(inv.depositAmount) || 0), 0)
  const activeInvestments = investments.filter(inv => inv.status === 'active').length
  const withdrawnInvestments = investments.filter(inv => inv.status === 'withdrawn').length
  const averageReturn = 15

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-12">
      <div className="mb-12">
        <div className="h-10 w-64 bg-slate-200 dark:bg-white/5 animate-pulse rounded-2xl mb-4"></div>
        <div className="h-4 w-48 bg-slate-100 dark:bg-white/5 animate-pulse rounded-lg"></div>
      </div>
      <StatsSkeleton />
      <div className="mt-12"><ChartSkeleton /></div>
      <div className="mt-12"><TableSkeleton /></div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20 relative z-10">
      {/* Header */}
      <FadeIn>
        <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
              <LayoutDashboard size={14} />
              <span>Investment Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Hello, {user?.displayName || user?.email?.split('@')[0]}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base">Your wealth journey is progressing strategically.</p>
          </div>
          <motion.button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 sm:py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition shadow-2xl shadow-blue-500/20 active:scale-95 text-sm sm:text-base"
            whileHover={{ y: -2 }}
          >
            <Plus size={20} strokeWidth={3} />
            <span>Schedule Investment</span>
          </motion.button>
        </div>
      </FadeIn>

      {/* Stats Grid */}
      <StaggerContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Asset Value", value: formatCurrency(totalInvested), icon: <Wallet size={20} />, sub: `${investments.length} Positions`, color: "blue" },
            { label: "Active Revenue Pools", value: activeInvestments, icon: <Target size={20} />, sub: "Currently Accruing", color: "emerald" },
            { label: "Total Realized", value: withdrawnInvestments, icon: <CheckCircle size={20} />, sub: "Secured Profits", color: "indigo" },
            { label: "Portfolio Yield", value: `${averageReturn}%`, icon: <TrendingUp size={20} />, sub: "Est. Annual Growth", color: "orange" }
          ].map((stat, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] hover:border-blue-500/30 transition-all group">
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

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <FadeIn delay={0.2} className="lg:col-span-2">
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-2 rounded-[2.5rem] overflow-hidden">
            <InvestmentTrendChart />
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-2 rounded-[2.5rem] overflow-hidden h-full">
            <PortfolioBreakdownChart />
          </div>
        </FadeIn>
      </div>

      {/* Positions Table */}
      <FadeIn delay={0.4}>
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] overflow-hidden">
          <div className="flex justify-between items-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <TrendingUp className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
              Active Positions
            </h2>
          </div>

          {investments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <LayoutDashboard size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Portfolio Empty</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Your investment journey starts with a single click.</p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition"
              >
                Launch First Position
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/10">
                    <th className="pb-6 font-black text-xs uppercase tracking-widest text-slate-400">Position ID</th>
                    <th className="pb-6 font-black text-xs uppercase tracking-widest text-slate-400">Capital</th>
                    <th className="pb-6 font-black text-xs uppercase tracking-widest text-slate-400">Est. Return</th>
                    <th className="pb-6 font-black text-xs uppercase tracking-widest text-slate-400">Status</th>
                    <th className="pb-6 font-black text-xs uppercase tracking-widest text-slate-400">Maturity</th>
                    <th className="pb-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                  {investments.map(inv => (
                    <tr key={inv.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-6 font-bold text-slate-900 dark:text-white">#{inv.id.slice(0, 8)}</td>
                      <td className="py-6 font-black text-slate-900 dark:text-white">{formatCurrency(inv.depositAmount)}</td>
                      <td className="py-6 font-black text-emerald-600 dark:text-emerald-400">+{formatCurrency(inv.depositAmount * 0.15)}</td>
                      <td className="py-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${inv.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}>
                          {inv.status === 'active' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-6 font-bold text-slate-500 dark:text-slate-400 text-sm">{inv.withdrawalDate}</td>
                      <td className="py-6 text-right">
                        <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <ArrowRight size={20} />
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

      {/* Risk Alert */}
      <FadeIn delay={0.6}>
        <div className="mt-12 p-6 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center shrink-0">
            <AlertTriangle size={24} />
          </div>
          <p className="text-sm font-bold text-amber-700 dark:text-amber-400 leading-relaxed uppercase tracking-wide">
            Strategy Alert: All market capitalizations are subject to volatility. Track your portfolios daily for optimal risk mitigation.
          </p>
        </div>
      </FadeIn>

      {/* Modal Overlays */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-[3rem] border border-white/20 shadow-2xl w-full max-w-xl p-10 relative z-10"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">New Position</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Configure your AI-driven investment logic.</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest text-center">
                  {error}
                </div>
              )}

              <div className="space-y-8">
                <div className="relative group">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Initial Capital (USD)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      value={formData.depositAmount}
                      onChange={e => setFormData({ ...formData, depositAmount: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-10 pr-6 text-xl font-black text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-400"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Maturity Horizon</label>
                  <input
                    type="date"
                    value={formData.withdrawalDate}
                    onChange={e => setFormData({ ...formData, withdrawalDate: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all"
                  />
                </div>

                <div className="p-6 bg-blue-600/10 border border-blue-600/20 rounded-[2rem] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Est. Return (15%)</p>
                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                      {formData.depositAmount ? formatCurrency(parseFloat(formData.depositAmount) * 0.15) : '$0.00'}
                    </p>
                  </div>
                  <TrendingUp className="text-blue-600/30" size={40} />
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-black hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95"
                >
                  ABORT
                </button>
                <button
                  onClick={handleCreateInvestment}
                  disabled={submitting}
                  className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition disabled:opacity-50 active:scale-95 shadow-2xl shadow-blue-500/20"
                >
                  {submitting ? 'EXECUTING...' : 'CONFIRM POSITION'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
