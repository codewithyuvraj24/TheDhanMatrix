"use client"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { FadeIn } from "@/components/ui/Animations"
import { ArrowRight, ShieldCheck, Zap, Lock, TrendingUp } from "lucide-react"

export default function Hero() {
    const { user } = useAuth()

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 pb-20">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-white/90 dark:bg-[#050505]/90 z-10"></div>
                <Image
                    src="/hero-bg.png"
                    alt="Background"
                    fill
                    priority
                    className="object-cover"
                    quality={90}
                />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                <div className="text-center max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-8">
                            <ShieldCheck size={16} />
                            <span>Built for Indian Investors • SEBI Regulated</span>
                        </div>
                        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                            Smarter investing decisions, <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                made simple.
                            </span>
                        </h1>

                        <div className="max-w-2xl mx-auto mb-10 space-y-8">
                            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed px-4">
                                Track performance, analyze opportunities, and manage your financial moves from one clean dashboard.
                            </p>

                            <div className="mx-auto max-w-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/5 dark:to-white/10 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <TrendingUp size={64} className="text-slate-900 dark:text-white" />
                                </div>
                                <div className="relative z-10 text-left">
                                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
                                        "Stop saving, start growing."
                                    </div>
                                    <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                        Start from just ₹25,000
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                            <Link href={user ? "/dashboard" : "/register"} className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/40 flex items-center justify-center gap-3 active:scale-95 animate-pulse-subtle">
                                Go to Dashboard
                                <ArrowRight size={22} strokeWidth={3} />
                            </Link>
                            {!user && (
                                <Link href="#how-it-works" className="w-full sm:w-auto px-12 py-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[1.5rem] font-black text-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95">
                                    Learn More
                                </Link>
                            )}
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <div className="mt-12 sm:mt-20 flex flex-wrap justify-center items-center gap-8 sm:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                            <span className="font-black text-xs sm:text-sm tracking-[0.2em] flex items-center gap-3"><Lock size={16} className="text-emerald-500" /> SECURE & ENCRYPTED</span>
                            <span className="font-black text-xs sm:text-sm tracking-[0.2em] flex items-center gap-3"><ShieldCheck size={16} className="text-blue-500" /> SEBI COMPLIANT</span>
                            <span className="font-black text-xs sm:text-sm tracking-[0.2em] flex items-center gap-3"><Zap size={16} className="text-amber-500" /> INSTANT SETTLEMENT</span>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}
