"use client"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations"
import { Target, Users, Shield, TrendingUp, Award, Check, Briefcase, Zap } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
              Revolutionizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Wealth Creation</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              We leverage cutting-edge AI to democratize institutional-grade investment strategies for everyone.
            </p>
          </div>
        </FadeIn>

        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full"></div>
                <div className="relative z-10 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-3xl shadow-xl">
                  <h3 className="text-2xl font-black mb-4 dark:text-white flex items-center gap-3">
                    <Target className="text-blue-600" /> Our Mission
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    To build a transparent, secure, and intelligent financial ecosystem where technology works for you. We aim to bridge the gap between complex market dynamics and simple, effective growth for our users.
                  </p>
                  <ul className="space-y-3">
                    {['Accessibility for all', 'Transparent fees', 'AI-driven insights', 'Secure growth'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-400 font-medium">
                        <Check className="text-green-500" size={18} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Who We Are</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    TheDhanMatrix is a fintech pioneer founded by a team of veteran traders, data scientists, and security experts. We saw a broken system where only the wealthy had access to the best tools. We built TheDhanMatrix to change that.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                    <Users className="text-purple-600 mb-3" size={32} />
                    <div className="font-black text-2xl dark:text-white">50k+</div>
                    <div className="text-sm text-slate-500">Active Investors</div>
                  </div>
                  <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                    <Briefcase className="text-emerald-600 mb-3" size={32} />
                    <div className="font-black text-2xl dark:text-white">$500M+</div>
                    <div className="text-sm text-slate-500">Assets Managed</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4 dark:text-white">Our Core Values</h2>
            <p className="text-slate-600 dark:text-slate-400">The pillars that define every decision we make.</p>
          </div>
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Shield className="text-blue-600" />, title: "Integrity First", desc: "Total transparency in every trade and transaction." },
                { icon: <Zap className="text-amber-500" />, title: "Innovation", desc: "Constantly evolving AI models to stay ahead of the market." },
                { icon: <Users className="text-indigo-600" />, title: "Client Focus", desc: "Your financial well-being is our only metric of success." },
                { icon: <Award className="text-red-500" />, title: "Excellence", desc: "Striving for the highest returns with the lowest risk." }
              ].map((val, idx) => (
                <StaggerItem key={idx}>
                  <div className="h-full p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-blue-500/50 transition-all group">
                    <div className="mb-4 p-3 bg-slate-50 dark:bg-black/20 rounded-xl w-fit group-hover:scale-110 transition-transform">
                      {val.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2 dark:text-white">{val.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{val.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>

        <FadeIn delay={0.6}>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Join the Revolution?</h2>
              <p className="text-blue-100 mb-10 text-lg">
                Start your journey towards financial freedom today with a platform built for your success.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/plans" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-slate-100 transition shadow-lg active:scale-95">
                  View Investment Plans
                </Link>
                <Link href="/register" className="px-8 py-4 bg-blue-700 text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition shadow-lg active:scale-95 border border-blue-500">
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
