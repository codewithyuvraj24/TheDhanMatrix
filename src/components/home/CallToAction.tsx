"use client"
import Link from "next/link"

export default function CallToAction() {
    return (
        <section className="py-24 sm:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <div className="max-w-5xl mx-auto px-4 relative z-10 text-center text-white">
                <h2 className="text-4xl md:text-7xl font-black mb-10 leading-[1.1] tracking-tight">Ready to Start Your <br />Wealth Journey?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-6 px-4">
                    <Link href="/register" className="px-12 py-5 bg-white text-blue-600 rounded-[1.5rem] font-black text-xl hover:bg-slate-100 transition-all shadow-2xl active:scale-95 animate-pulse-subtle flex items-center justify-center">
                        Create Free Account
                    </Link>
                    <Link href="/plans" className="px-12 py-5 bg-blue-700/50 backdrop-blur-md text-white border border-white/20 rounded-[1.5rem] font-black text-xl hover:bg-blue-800 transition-all active:scale-95 text-center flex items-center justify-center">
                        Compare Plans
                    </Link>
                </div>
                <div className="mt-12 flex flex-col items-center gap-4">
                    <p className="text-blue-100 text-sm font-black uppercase tracking-[0.2em]">Institutional-Grade Security Verified</p>
                    <p className="text-blue-200 font-medium italic opacity-80">"Join 14+ smart investors today."</p>
                </div>
            </div>
        </section>
    )
}
