"use client"
import { useEffect, useState } from 'react'
import { getMessagingInstance } from '@/lib/firebase'
import { getToken, onMessage } from 'firebase/messaging'
import { Bell, X } from 'lucide-react'
import { useToast } from '@/components/ui/PremiumToast'

export default function NotificationPrompt() {
    const [showPrompt, setShowPrompt] = useState(false)
    const { showToast } = useToast()

    useEffect(() => {
        // Check if permission is already granted or blocked
        if (Notification.permission === 'default') {
            setTimeout(() => setShowPrompt(true), 5000) // Show after 5s
        }
    }, [])

    const handleEnable = async () => {
        try {
            const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
            if (!vapidKey) {
                console.error('Notification Error: NEXT_PUBLIC_FIREBASE_VAPID_KEY is missing in .env.local')
                showToast('Configuration Error: Missing VAPID Key', 'error')
                setShowPrompt(false)
                return
            }

            const messaging = await getMessagingInstance()
            if (!messaging) {
                showToast('Notifications not supported on this device/browser', 'error')
                setShowPrompt(false)
                return
            }

            const permission = await Notification.requestPermission()

            if (permission === 'granted') {
                // Get FCM Token
                const token = await getToken(messaging, {
                    vapidKey: vapidKey
                })
                console.log('FCM Token Successfully Retrieved:', token)
                showToast('Notifications successfully enabled!', 'success')
            } else if (permission === 'denied') {
                showToast('Notifications blocked by browser settings', 'info')
            } else {
                showToast('Notification permission dismissed', 'info')
            }
        } catch (error: any) {
            console.error('Core Notification Protocol Error:', error)

            let message = 'Failed to enable notifications'
            if (error.code === 'messaging/permission-blocked') {
                message = 'Notifications are blocked in your browser'
            } else if (error.message?.includes('vapidKey')) {
                message = 'Invalid VAPID configuration'
            } else if (error.message?.includes('service worker')) {
                message = 'Service Worker registration failed'
            } else {
                message = `Protocol Error: ${error.message || 'Unknown Error'}`
            }

            showToast(message, 'error')
        } finally {
            setShowPrompt(false)
        }
    }

    if (!showPrompt) return null

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-slate-900 dark:bg-slate-800 text-white p-6 rounded-2xl shadow-2xl max-w-sm border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Bell size={20} className="text-white" />
                        </div>
                        <h3 className="font-bold text-lg">Stay Updated</h3>
                    </div>
                    <button onClick={() => setShowPrompt(false)} className="text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                    Enable push notifications to get real-time alerts on your portfolio growth and important market news.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={handleEnable}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-bold text-sm transition-colors"
                    >
                        Enable Notifications
                    </button>
                    <button
                        onClick={() => setShowPrompt(false)}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white py-2 rounded-xl font-bold text-sm transition-colors"
                    >
                        Later
                    </button>
                </div>
            </div>
        </div>
    )
}
