"use client"

import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

export default function BackgroundOrbs() {
    const { theme } = useTheme()

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Orb 1 */}
            <motion.div
                className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40 ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-200/50'
                    }`}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            {/* Orb 2 */}
            <motion.div
                className={`absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full blur-[120px] opacity-30 ${theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-200/40'
                    }`}
                animate={{
                    x: [0, -40, 0],
                    y: [0, -60, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            {/* Orb 3 - subtle accent */}
            <motion.div
                className={`absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-20 ${theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-100/30'
                    }`}
                animate={{
                    x: [0, -20, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    )
}
