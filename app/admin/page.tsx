"use client"
import ProtectedRoute from '../../components/ProtectedRoute'
import { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from '../../lib/firebase'
import { useAuth } from '../../context/AuthContext'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

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
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

  async function handleLogout() {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  useEffect(() => {
    if (role !== 'admin') return
      ; (async () => {
        const snap = await getDocs(collection(db, 'investments'))
        setInvestments(snap.docs.map(d => ({ id: d.id, ...d.data() } as Investment)))
        setLoading(false)
      })()
  }, [role])

  async function handleUpdate(id: string, field: string, value: any) {
    try {
      await updateDoc(doc(db, 'investments', id), { [field]: value })
      const snap = await getDocs(collection(db, 'investments'))
      setInvestments(snap.docs.map(d => ({ id: d.id, ...d.data() } as Investment)))
      setEditingId(null)
      setMessage({ text: 'Investment updated successfully', type: 'success' })
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      console.error('Update error:', err)
      setMessage({ text: 'Failed to update investment', type: 'error' })
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this investment? This action cannot be undone.')) return

    try {
      await deleteDoc(doc(db, 'investments', id))
      setInvestments(prev => prev.filter(inv => inv.id !== id))
      setMessage({ text: 'Investment deleted successfully', type: 'success' })
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      console.error('Delete error:', err)
      setMessage({ text: 'Failed to delete investment', type: 'error' })
    }
  }

  // Calculate stats
  const totalInvested = investments.reduce((sum, inv) => sum + (Number(inv.depositAmount) || 0), 0)
  const activeCount = investments.filter(inv => inv.status === 'active').length
  const withdrawnCount = investments.filter(inv => inv.status === 'withdrawn').length
  const uniqueUsers = new Set(investments.map(inv => inv.userId)).size

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <p className="mt-4 text-gray-600">Loading admin data...</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
      {/* Header */}
      {message && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {message.text}
        </div>
      )}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-1">Manage all user investments and monitor platform statistics</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Main Site
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-medium">Total Invested</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">${totalInvested.toLocaleString()}</p>
          <p className="text-gray-500 text-xs mt-2">{investments.length} total investments</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-600">
          <p className="text-gray-600 text-sm font-medium">Active Investments</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{activeCount}</p>
          <p className="text-gray-500 text-xs mt-2">Currently earning</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-600">
          <p className="text-gray-600 text-sm font-medium">Withdrawn</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{withdrawnCount}</p>
          <p className="text-gray-500 text-xs mt-2">Completed investments</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-600">
          <p className="text-gray-600 text-sm font-medium">Total Users</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{uniqueUsers}</p>
          <p className="text-gray-500 text-xs mt-2">Active investors</p>
        </div>
      </div>

      {/* Investments Management */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Investment Management</h2>
          <p className="text-gray-600 text-sm mt-1">Click on any field to edit investment details</p>
        </div>

        {investments.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-lg text-gray-600">No investments yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">User ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Deposit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Withdrawal Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv, idx) => (
                  <tr key={inv.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono">{inv.userId.slice(0, 12)}...</td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        defaultValue={inv.depositAmount}
                        onBlur={e => handleUpdate(inv.id, 'depositAmount', e.target.value)}
                        onClick={() => setEditingId(inv.id)}
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm hover:border-blue-400 focus:outline-none focus:border-blue-600"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        defaultValue={inv.withdrawalDate}
                        onBlur={e => handleUpdate(inv.id, 'withdrawalDate', e.target.value)}
                        onClick={() => setEditingId(inv.id)}
                        className="w-32 px-2 py-1 border border-gray-300 rounded text-sm hover:border-blue-400 focus:outline-none focus:border-blue-600"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        defaultValue={inv.status}
                        onChange={e => handleUpdate(inv.id, 'status', e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${inv.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                          }`}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleDelete(inv.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>ℹ️ Tip:</strong> Click on any deposit or date field to edit. Changes are saved automatically when you click away from the field.
        </p>
      </div>
    </div>
  )
}
