"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Edit3, Check, X } from 'lucide-react'

interface GoalTrackerProps {
    currentAmount: number
}

export default function GoalTracker({ currentAmount }: GoalTrackerProps) {
    const [goalAmount, setGoalAmount] = useState(100000) // Default goal: $100k
    const [isEditing, setIsEditing] = useState(false)
    const [tempGoal, setTempGoal] = useState(goalAmount.toString())

    const progress = Math.min((currentAmount / goalAmount) * 100, 100)
    const circumference = 2 * Math.PI * 90 // radius = 90
    const strokeDashoffset = circumference - (progress / 100) * circumference

    const handleSave = () => {
        const newGoal = parseFloat(tempGoal)
        if (newGoal > 0) {
            setGoalAmount(newGoal)
            setIsEditing(false)
        }
    }

    return (
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <Target className="text-purple-600 dark:text-purple-400" size={20} />
                    </div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white">Investment Goal</h2>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => {
                            setIsEditing(true)
                            setTempGoal(goalAmount.toString())
                        }}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <Edit3 size={16} className="text-slate-600 dark:text-slate-300" />
                    </button>
                )}
            </div>

            {/* Circular Progress */}
            <div className="flex flex-col items-center">
                <div className="relative w-48 h-48">
                    <svg className="transform -rotate-90 w-48 h-48">
                        {/* Background circle */}
                        <circle
                            cx="96"
                            cy="96"
                            r="90"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className="text-slate-100 dark:text-white/5"
                        />
                        {/* Progress circle */}
                        <motion.circle
                            cx="96"
                            cy="96"
                            r="90"
                            stroke="url(#gradient)"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8B5CF6" />
                                <stop offset="100%" stopColor="#EC4899" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                            {Math.round(progress)}%
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-bold uppercase tracking-widest mt-1">Complete</p>
                    </div>
                </div>

                {/* Amounts */}
                <div className="mt-8 w-full space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Current</span>
                        <span className="text-lg font-black text-slate-900 dark:text-white">
                            ₹{currentAmount.toLocaleString('en-IN')}
                        </span>
                    </div>

                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Target</span>
                            <div className="flex-1 flex items-center gap-2">
                                <input
                                    type="number"
                                    value={tempGoal}
                                    onChange={e => setTempGoal(e.target.value)}
                                    className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                                    autoFocus
                                />
                                <button
                                    onClick={handleSave}
                                    className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                                >
                                    <Check size={16} />
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="p-1.5 bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-white/20 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Target</span>
                            <span className="text-lg font-black text-purple-600 dark:text-purple-400">
                                ₹{goalAmount.toLocaleString('en-IN')}
                            </span>
                        </div>
                    )}

                    <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Remaining</span>
                            <span className="text-lg font-black text-orange-600 dark:text-orange-400">
                                ₹{Math.max(0, goalAmount - currentAmount).toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
