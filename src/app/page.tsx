"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem, FadeIn, ScaleIn } from "@/components/ui/Animations"
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Users,
  Globe,
  Lock,
  Cpu,
  ChevronRight,
  Check,
  HelpCircle,
  TrendingUp,
  PieChart,
  Target
} from "lucide-react"
import { useState } from "react"

export default function Home() {
  const { user } = useAuth()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  return (
    <div className="w-full bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 transition-colors duration-500">

      {/* Hero Section */}
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
                <span>SEBI Regulated Advisory</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                Smart Investing & <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  Structured Growth.
                </span>
              </h1>

              <div className="max-w-3xl mx-auto mb-10 space-y-8">
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                  Dhan Matrix Capital provides all advice strictly in accordance with SEBI regulations and is based on client suitability. Join us for the best investment opportunities.
                </p>

                <div className="mx-auto max-w-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/5 dark:to-white/10 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp size={64} className="text-slate-900 dark:text-white" />
                  </div>
                  <div className="relative z-10 text-left">
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">
                      "Investment does not need Lakhs, you can start with just 25k"
                    </div>
                    <p className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400">
                      Join us to separate your wealth and unlock opportunities in every market cycle.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {user ? (
                  <Link href="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-3 active:scale-95">
                    Enter Portal
                    <ArrowRight size={20} />
                  </Link>
                ) : (
                  <>
                    <Link href="/register" className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-3 active:scale-95">
                      Start Investing Now
                      <ArrowRight size={20} />
                    </Link>
                    <Link href="#how-it-works" className="w-full sm:w-auto px-10 py-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl font-black text-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95">
                      See How It Works
                    </Link>
                  </>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-6 sm:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                <span className="font-bold text-lg sm:text-xl flex items-center gap-2"><Lock size={20} /> SECURE</span>
                <span className="font-bold text-lg sm:text-xl flex items-center gap-2"><ShieldCheck size={20} /> VERIFIED</span>
                <span className="font-bold text-lg sm:text-xl flex items-center gap-2"><Zap size={20} /> INSTANT</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">Why Choose Dhanmatrixcapital?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Revolutionizing investing through technology and transparency.</p>
          </div>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Cpu className="text-blue-600 dark:text-blue-400" size={32} />,
                  title: "AI Strategies",
                  desc: "Proprietary algorithms that scan markets 24/7 to find high-yield entries with minimal risk."
                },
                {
                  icon: <BarChart3 className="text-emerald-600 dark:text-emerald-400" size={32} />,
                  title: "Full Transparency",
                  desc: "Zero hidden fees. Real-time logging of every trade and growth milestone on your dashboard."
                },
                {
                  icon: <ShieldCheck className="text-indigo-600 dark:text-indigo-400" size={32} />,
                  title: "Bank-Grade Security",
                  desc: "Multi-layer encryption and rigorous auditing ensure your capital is always safe."
                },
                {
                  icon: <Users className="text-purple-600 dark:text-purple-400" size={32} />,
                  title: "Investor-First",
                  desc: "Tools designed specifically for retail investors. Complex data made simple for you."
                }
              ].map((prop, idx) => (
                <StaggerItem key={idx}>
                  <div className="h-full p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all group">
                    <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-black/40 shadow-sm w-fit group-hover:scale-110 transition-transform">
                      {prop.icon}
                    </div>
                    <h3 className="text-xl font-black mb-4 dark:text-white">{prop.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{prop.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#0a192f] text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Where DMC invest your Dhan?</h2>
              <p className="text-xl text-blue-200 font-medium tracking-wide">DMC Working Structure</p>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Large Cap - 40% */}
              <div className="col-span-2 p-10 md:p-14 border border-white/10 rounded-[2rem] bg-gradient-to-b from-blue-600/20 to-blue-900/20 backdrop-blur-md text-center hover:border-blue-500/30 transition-all group shadow-2xl">
                <div className="text-7xl md:text-9xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 group-hover:scale-105 transition-transform duration-500">40%</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-100 tracking-wide">Large-Cap</div>
              </div>

              {/* Mid Cap - 25% & Small Cap - 15% */}
              <div className="col-span-1 p-8 md:p-10 border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-md text-center hover:bg-white/10 transition-all flex flex-col justify-center items-center min-h-[220px] group">
                <div className="text-5xl md:text-7xl font-black mb-3 text-white group-hover:scale-105 transition-transform duration-300">25%</div>
                <div className="text-lg md:text-xl font-bold text-slate-300">Mid-Cap</div>
              </div>

              <div className="col-span-1 p-8 md:p-10 border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-md text-center hover:bg-white/10 transition-all flex flex-col justify-center items-center min-h-[220px] group">
                <div className="text-5xl md:text-7xl font-black mb-3 text-white group-hover:scale-105 transition-transform duration-300">15%</div>
                <div className="text-lg md:text-xl font-bold text-slate-300">Small-Cap</div>
              </div>

              {/* IPO - 10% & Gold/Silver - 10% */}
              <div className="col-span-1 p-6 md:p-8 border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-md text-center hover:bg-white/10 transition-all flex flex-col justify-center items-center min-h-[180px] group">
                <div className="text-4xl md:text-6xl font-black mb-2 text-white/90 group-hover:scale-105 transition-transform duration-300">10%</div>
                <div className="text-base md:text-lg font-bold text-slate-400">IPO</div>
              </div>

              <div className="col-span-1 p-6 md:p-8 border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-md text-center hover:bg-white/10 transition-all flex flex-col justify-center items-center min-h-[180px] group">
                <div className="text-4xl md:text-6xl font-black mb-2 text-white/90 group-hover:scale-105 transition-transform duration-300">10%</div>
                <div className="text-base md:text-lg font-bold text-slate-400">Gold/Silver</div>
              </div>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">Start Earning in 4 Simple Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-white/10 -translate-y-1/2 z-0"></div>

            {[
              { step: "01", title: "Create Account", desc: "Sign up in seconds with Google or Email." },
              { step: "02", title: "Choose a Plan", desc: "Select a strategy that fits your budget." },
              { step: "03", title: "Deposit Funds", desc: "Add capital securely via your dashboard." },
              { step: "04", title: "Track Growth", desc: "Watch your wealth grow with AI insights." }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="relative z-10 text-center lg:text-left">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-black flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-xl shadow-blue-500/40">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-black mb-3 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">Investment Plans</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Scale your wealth with our adaptive portfolios.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Starter",
                returns: "12-15% p.a.",
                min: "$100",
                features: ["Basic AI Insights", "Standard Security", "Monthly Reports"],
                popular: false
              },
              {
                name: "Growth",
                returns: "18-22% p.a.",
                min: "$1,000",
                features: ["Advanced AI Trading", "Priority Support", "Real-time Tracking", "Risk Management"],
                popular: true
              },
              {
                name: "Pro",
                returns: "25%+ p.a.",
                min: "$10,000",
                features: ["Elite Algorithms", "Dedicated Advisor", "Custom Strategies", "Tax Optimization"],
                popular: false
              }
            ].map((plan, idx) => (
              <div key={idx} className={`relative p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border transition-all duration-500 ${plan.popular
                ? 'bg-blue-600 border-blue-500 text-white shadow-2xl shadow-blue-500/30 lg:scale-105 z-10'
                : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-blue-500/50'
                }`}>
                {plan.popular && (
                  <div className="absolute top-0 right-6 sm:right-10 -translate-y-1/2 bg-amber-400 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-black mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6 sm:mb-8">
                  <span className="text-3xl sm:text-4xl font-black">{plan.returns}</span>
                </div>
                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  <div className="flex justify-between text-[10px] sm:text-sm font-bold opacity-70">
                    <span>Minimum Investment</span>
                    <span>{plan.min}</span>
                  </div>
                  <div className="h-px bg-current opacity-10"></div>
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 font-medium">
                      <Check className={plan.popular ? "text-blue-200" : "text-blue-600 dark:text-blue-400"} size={16} />
                      <span className="text-xs sm:text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/register"
                  className={`block w-full py-4 rounded-xl sm:rounded-2xl text-center font-black transition-all text-sm sm:text-base ${plan.popular
                    ? 'bg-white text-blue-600 hover:bg-slate-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 relative overflow-hidden bg-slate-50 dark:bg-white/5 transition-colors duration-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl sm:text-6xl font-black mb-10 leading-[1.1] text-slate-900 dark:text-white">
                Built on Trust, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Powered by Success.</span>
              </h2>
              <div className="space-y-10">
                {[
                  {
                    icon: <Users className="text-blue-600 dark:text-blue-400" size={28} />,
                    label: "Active Investors",
                    value: "14",
                    color: "bg-blue-600/10"
                  },
                  {
                    icon: <TrendingUp className="text-indigo-600 dark:text-indigo-400" size={28} />,
                    label: "Total Asset Value",
                    value: "1.3 Million",
                    color: "bg-indigo-600/10"
                  },
                  {
                    icon: <Target className="text-emerald-600 dark:text-emerald-400" size={28} />,
                    label: "Market Success Rate",
                    value: "99.9%",
                    color: "bg-emerald-600/10"
                  }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-8 group"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg shadow-black/5`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                      <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs mt-1">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-blue-600/20 rounded-full blur-[100px] absolute inset-0 -z-10 animate-pulse"></div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 p-2 bg-white/70 dark:bg-white/5 border border-white dark:border-white/10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl overflow-hidden"
              >
                <img
                  src="/trust-visual.png"
                  alt="Financial Security"
                  className="w-full h-auto rounded-[2rem] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 dark:text-white">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is my capital safe?", a: "Yes, we use bank-grade encryption and secure institutional custody. However, please note that all market investments carry some inherent risk." },
              { q: "How long is the lock-in period?", a: "Lock-in periods vary by plan, typically ranging from 30 days to 1 year. You can view specific terms in your dashboard." },
              { q: "Can I withdraw anytime?", a: "Withdrawals can be initiated once the maturity period is reached. Emergency withdrawals are available with a small processing fee." },
              { q: "How does the AI strategy work?", a: "Our AI analyzes live market trends, volume, and volatility to execute trades across diversified asset classes automatically." }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="p-6 flex justify-between items-center font-bold text-lg dark:text-white">
                  <span>{faq.q}</span>
                  <HelpCircle className={`transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                </div>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight">Ready to Take Control of Your <br />Wealth Journey?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/register" className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all shadow-2xl active:scale-95">
              Create Free Account
            </Link>
            <Link href="/plans" className="px-12 py-5 bg-blue-700 text-white border border-blue-500 rounded-2xl font-black text-xl hover:bg-blue-800 transition-all active:scale-95 text-center">
              Compare Plans
            </Link>
          </div>
          <p className="mt-12 text-blue-200 font-medium italic">"Join 14+ smart investors today."</p>
        </div>
      </section>

    </div>
  )
}
