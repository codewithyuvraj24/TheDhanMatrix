"use client"
import ProtectedRoute from '../../components/ProtectedRoute'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { motion } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/Animations'
import { InvestmentTrendChart, PortfolioBreakdownChart } from '../../components/Charts'
import { validateInvestmentAmount, validateWithdrawalDate, formatCurrency, getAmountErrorMessage } from '../../lib/validators'

export default function DashboardPage(){
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}

function Dashboard(){
  const { user } = useAuth()
  const [investments, setInvestments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ depositAmount: '', withdrawalDate: '', status: 'active' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=>{
    if (!user) return
    ;(async ()=>{
      const q = query(collection(db, 'investments'), where('userId', '==', user.uid))
      const snap = await getDocs(q)
      const items = snap.docs.map(d=>({ id: d.id, ...d.data() }))
      setInvestments(items)
      setLoading(false)
    })()
  },[user])

  async function handleCreateInvestment(){
    setError('')
    
    // Validation checks
    if (!user) {
      setError('You must be logged in to create an investment')
      return
    }
    
    if (!formData.depositAmount) {
      setError('Please enter an investment amount')
      return
    }
    
    if (!validateInvestmentAmount(formData.depositAmount)) {
      setError(getAmountErrorMessage(formData.depositAmount))
      return
    }
    
    if (!formData.withdrawalDate) {
      setError('Please select a withdrawal date')
      return
    }
    
    if (!validateWithdrawalDate(formData.withdrawalDate)) {
      setError('Withdrawal date must be in the future')
      return
    }
    
    setSubmitting(true)
    try{
      const { addDoc } = await import('firebase/firestore')
      await addDoc(collection(db, 'investments'), {
        userId: user.uid,
        depositAmount: parseFloat(formData.depositAmount),
        withdrawalDate: formData.withdrawalDate,
        status: formData.status,
        createdAt: new Date().toISOString()
      })
      // Refresh investments
      const q = query(collection(db, 'investments'), where('userId', '==', user.uid))
      const snap = await getDocs(q)
      setInvestments(snap.docs.map(d=>({ id: d.id, ...d.data() })))
      setShowModal(false)
      setFormData({ depositAmount: '', withdrawalDate: '', status: 'active' })
      setError('')
    }catch(err){
      console.error('Error creating investment:', err)
      setError('Failed to create investment. Please try again.')
    }finally{
      setSubmitting(false)
    }
  }

  // Calculate portfolio stats
  const totalInvested = investments.reduce((sum, inv) => sum + (parseFloat(inv.depositAmount) || 0), 0)
  const activeInvestments = investments.filter(inv => inv.status === 'active').length
  const withdrawnInvestments = investments.filter(inv => inv.status === 'withdrawn').length
  const averageReturn = 15 // Display value for demo

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading your investments...</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.email}</h1>
          <p className="text-gray-600 mt-1">Manage your investment portfolio</p>
        </div>
      </FadeIn>

      {/* Statistics Cards */}
      <StaggerContainer>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StaggerItem>
            <motion.div
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              whileHover={{ y: -5 }}
            >
              <p className="text-gray-600 text-sm font-medium">Total Invested</p>
              <motion.p
                className="text-3xl font-bold text-blue-600 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                ${totalInvested.toLocaleString()}
              </motion.p>
              <p className="text-gray-500 text-xs mt-2">{investments.length} investments</p>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              whileHover={{ y: -5 }}
            >
              <p className="text-gray-600 text-sm font-medium">Active Investments</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{activeInvestments}</p>
              <p className="text-gray-500 text-xs mt-2">Currently earning</p>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              whileHover={{ y: -5 }}
            >
              <p className="text-gray-600 text-sm font-medium">Withdrawn</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{withdrawnInvestments}</p>
              <p className="text-gray-500 text-xs mt-2">Completed investments</p>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              whileHover={{ y: -5 }}
            >
              <p className="text-gray-600 text-sm font-medium">Avg. Annual Return</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{averageReturn}%</p>
              <p className="text-gray-500 text-xs mt-2">Portfolio performance</p>
            </motion.div>
          </StaggerItem>
        </div>
      </StaggerContainer>

      {/* Charts Section */}
      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <InvestmentTrendChart />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <PortfolioBreakdownChart />
          </motion.div>
        </div>
      </FadeIn>

      {/* Investments Section */}
      <FadeIn delay={0.3}>
        <motion.div className="bg-white rounded-lg shadow p-6" whileHover={{ boxShadow: "0 20px 25px rgba(0,0,0,0.1)" }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Investments</h2>
            <motion.button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + New Investment
            </motion.button>
          </div>

          {investments.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📊
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900">No investments yet</h3>
              <p className="text-gray-600 mt-2">Start investing to build your wealth</p>
              <motion.button
                onClick={() => setShowModal(true)}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                whileHover={{ scale: 1.05 }}
              >
                Explore Plans
              </motion.button>
            </motion.div>
          ) : (
            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {investments.map(inv => (
                  <StaggerItem key={inv.id}>
                    <motion.div
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                      whileHover={{ y: -2, scale: 1.01 }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">Investment #{inv.id.slice(0, 8)}</p>
                          <p className="text-sm text-gray-600 mt-1">Deposit: ${parseFloat(inv.depositAmount).toLocaleString()}</p>
                        </div>
                        <motion.span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            inv.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {inv.status?.charAt(0).toUpperCase() + inv.status?.slice(1)}
                        </motion.span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Withdrawal Date:</span>
                          <span className="font-medium">{inv.withdrawalDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimated Return:</span>
                          <span className="font-medium text-green-600">+${(parseFloat(inv.depositAmount) * 0.15).toLocaleString()}</span>
                        </div>
                      </div>

                      <motion.button
                        className="w-full mt-4 px-3 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition text-sm font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Details
                      </motion.button>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          )}
        </motion.div>
      </FadeIn>

      {/* Disclaimer */}
      <FadeIn delay={0.4}>
        <motion.div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg" whileHover={{ scale: 1.01 }}>
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Disclaimer:</strong> Investment returns shown are estimates. Past performance does not guarantee future results. Always consult with a financial advisor before investing.
          </p>
        </motion.div>
      </FadeIn>

      {/* Investment Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Create New Investment</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">×</button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="deposit-amount" className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount ($)</label>
                <input
                  id="deposit-amount"
                  type="number"
                  value={formData.depositAmount}
                  onChange={e => setFormData({...formData, depositAmount: e.target.value})}
                  placeholder="Enter amount"
                  title="Investment amount must be between $1 and $10,000,000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label htmlFor="withdrawal-date" className="block text-sm font-medium text-gray-700 mb-1">Withdrawal Date</label>
                <input
                  id="withdrawal-date"
                  type="date"
                  value={formData.withdrawalDate}
                  onChange={e => setFormData({...formData, withdrawalDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status-select"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  title="Select investment status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Estimated Return:</strong> ${(parseFloat(formData.depositAmount) * 0.15).toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <motion.button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleCreateInvestment}
                disabled={submitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitting ? 'Creating...' : 'Create Investment'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
