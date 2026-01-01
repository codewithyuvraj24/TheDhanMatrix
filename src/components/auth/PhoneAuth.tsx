"use client"

import { useState, useEffect } from 'react'
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    ConfirmationResult,
    PhoneAuthProvider,
    signInWithCredential
} from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowRight, ShieldCheck, KeyRound, Smartphone } from 'lucide-react'

export default function PhoneAuth() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
    const [timer, setTimer] = useState(0)
    const router = useRouter()

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [timer])

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response: any) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            })
        }
    }

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Basic validation for Indian phone numbers (10 digits)
            const cleanPhone = phoneNumber.replace(/\D/g, '')
            if (cleanPhone.length !== 10) {
                throw new Error('Please enter a valid 10-digit mobile number')
            }

            setupRecaptcha()
            const appVerifier = window.recaptchaVerifier
            const formattedPhone = `+91${cleanPhone}`

            const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier)
            setConfirmationResult(result)
            setTimer(60)
        } catch (err: any) {
            console.error("Phone Auth Error:", err)
            let customError = 'Failed to send OTP. Please try again.'

            // Deployment-specific diagnostics
            if (err.message?.includes('auth/invalid-app-credential')) {
                customError = 'reCAPTCHA verification failed. Ensure your domain is authorized in Firebase Console -> Auth -> Settings -> Authorized Domains.'
            } else if (err.code === 'auth/billing-not-enabled' || err.message?.includes('billing')) {
                customError = 'Phone Auth requires the Firebase Blaze (Pay-as-you-go) plan. Check your Firebase Project settings.'
            } else if (err.code === 'auth/captcha-check-failed') {
                customError = 'reCAPTCHA check failed. This often happens if the domain is not authorized.'
            } else if (err.code === 'auth/too-many-requests') {
                customError = 'Security Alert: Too many requests. Please wait before trying again.'
            } else if (err.message === 'Please enter a valid 10-digit mobile number') {
                customError = err.message
            } else if (err.code) {
                customError = `Protocol Error: ${err.code.split('/')[1].replace(/-/g, ' ')}`
            }

            setError(customError)
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear()
                window.recaptchaVerifier = undefined
            }
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (!confirmationResult) throw new Error('Session expired. Please request a new OTP.')

            const result = await confirmationResult.confirm(otp)
            const user = result.user

            // Check if user exists in Firestore, if not create
            const userDoc = await getDoc(doc(db, 'users', user.uid))
            if (!userDoc.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    role: 'user',
                    createdAt: new Date().toISOString()
                })
            }

            router.push('/onboarding')
        } catch (err: any) {
            console.error(err)
            setError('Invalid OTP. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div id="recaptcha-container"></div>

            {error && (
                <motion.div
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    {error}
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                {!confirmationResult ? (
                    <motion.form
                        key="phone-input"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onSubmit={handleSendOTP}
                        className="space-y-6"
                    >
                        <div className="space-y-3">
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Mobile Number</label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                    <Smartphone size={20} />
                                </span>
                                <div className="absolute inset-y-0 left-12 flex items-center pr-2 border-r border-slate-200 dark:border-white/10 h-8 top-1/2 -translate-y-1/2">
                                    <span className="text-slate-500 dark:text-slate-400 font-bold text-sm">+91</span>
                                </div>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    required
                                    className="w-full pl-24 pr-6 py-4 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-all font-bold tracking-[0.1em]"
                                    placeholder="9876543210"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || phoneNumber.length !== 10}
                            className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-500/20 disabled:opacity-50 flex justify-center items-center gap-3 active:scale-95"
                        >
                            {loading ? (
                                <div className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>SEND OTP</span>
                                    <ArrowRight size={20} strokeWidth={3} />
                                </>
                            )}
                        </button>
                    </motion.form>
                ) : (
                    <motion.form
                        key="otp-input"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleVerifyOTP}
                        className="space-y-6"
                    >
                        <div className="space-y-3">
                            <div className="flex justify-between items-center ml-2">
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Verify Identity</label>
                                <button
                                    type="button"
                                    onClick={() => setConfirmationResult(null)}
                                    className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest hover:underline"
                                >
                                    Change Number
                                </button>
                            </div>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                    <KeyRound size={20} />
                                </span>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    required
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-all font-black tracking-[0.5em] text-center text-2xl"
                                    placeholder="000000"
                                />
                            </div>
                            <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                                OTP sent to +91 {phoneNumber}
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-500/20 disabled:opacity-50 flex justify-center items-center gap-3 active:scale-95"
                        >
                            {loading ? (
                                <div className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>INITIALIZE PROTOCOL</span>
                                    <ShieldCheck size={20} strokeWidth={3} />
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            disabled={timer > 0 || loading}
                            onClick={handleSendOTP}
                            className="w-full text-center text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors disabled:opacity-50"
                        >
                            {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    )
}

declare global {
    interface Window {
        recaptchaVerifier: any
    }
}
