"use client"
import ProtectedRoute from '../../components/ProtectedRoute'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FadeIn } from '../../components/Animations'

export default function ProfilePage(){
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}

function ProfileContent(){
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  async function handleUpdateProfile(){
    if (!user) return
    setLoading(true)
    try{
      await updateProfile(user, { displayName })
      setMessage('✓ Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    }catch(err){
      setMessage('Error updating profile')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>
      </FadeIn>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <motion.button
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-3 font-medium border-b-2 transition ${
            activeTab === 'profile'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          Profile Settings
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('security')}
          className={`px-6 py-3 font-medium border-b-2 transition ${
            activeTab === 'security'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          Security
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('activity')}
          className={`px-6 py-3 font-medium border-b-2 transition ${
            activeTab === 'activity'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          Activity Log
        </motion.button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {/* Left Column - Account Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Information</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
              <input
                type="text"
                value="Regular User"
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
              <input
                type="text"
                value={new Date().toLocaleDateString()}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>

            {message && (
              <p className={`text-sm mb-4 p-3 rounded ${
                message.includes('✓')
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}>
                {message}
              </p>
            )}

            <motion.button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </motion.button>
          </div>

          {/* Right Column - Additional Info */}
          <motion.div whileHover={{ y: -5 }}>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-blue-900 mb-3">Account Summary</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-blue-700">Status:</span>
                  <span className="font-medium text-green-600">✓ Active</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-blue-700">Verification:</span>
                  <span className="font-medium">Verified</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-blue-700">Two-Factor Auth:</span>
                  <span className="font-medium">Disabled</span>
                </li>
              </ul>
            </div>

            <Link href="/dashboard" className="block w-full px-4 py-2 text-center bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium">
              ← Back to Dashboard
            </Link>
          </motion.div>
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
          
          <div className="space-y-6">
            {[
              { title: 'Change Password', desc: 'Update your password regularly to keep your account secure', label: 'Change Password' },
              { title: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', label: 'Enable 2FA' },
              { title: 'Active Sessions', desc: 'Manage your active login sessions', label: 'Logout All Sessions' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-4 border border-gray-200 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                <motion.button
                  className={`px-4 py-2 ${item.title === 'Active Sessions' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded transition text-sm font-medium`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {[
              { action: 'Login', time: '2 hours ago', ip: '192.168.1.1', device: 'Chrome on Windows' },
              { action: 'Dashboard View', time: '2 hours ago', ip: '192.168.1.1', device: 'Chrome on Windows' },
              { action: 'Profile Update', time: '1 day ago', ip: '192.168.1.1', device: 'Safari on iPhone' },
              { action: 'Login', time: '3 days ago', ip: '192.168.1.50', device: 'Firefox on macOS' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-600">{item.device}</p>
                    <p className="text-xs text-gray-500">IP: {item.ip}</p>
                  </div>
                  <span className="text-sm text-gray-600">{item.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
