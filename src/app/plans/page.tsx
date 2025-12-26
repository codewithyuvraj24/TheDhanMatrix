"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { Check, AlertTriangle, TrendingUp, Shield, Zap, Crown } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    id: 1,
    name: 'Growth',
    minInvestment: '25k',
    annualReturn: '5-15%',
    term: 'Flexible',
    description: 'Consistent returns with flexible withdrawals and tax benefits.',
    features: [
      "Withdraw Payments Anytime",
      "Withdrawals Credit in 24h",
      "100% Tax Free Return",
      "Real-time Tracking",
      "Risk Management",
      "Priority Support"
    ],
    icon: <TrendingUp className="text-blue-500" size={32} />
  }
]

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
              Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Strategies</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Choose the plan that best suits your goals.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer>
          <div className="grid grid-cols-1 gap-6 mb-12 max-w-md mx-auto">
            {plans.map(plan => (
              <StaggerItem key={plan.id}>
                <motion.div
                  className={`h-full border rounded-3xl p-8 cursor-pointer transition-all relative overflow-hidden group ${selectedPlan === plan.id
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-black'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-blue-400'
                    }`}
                  onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-6 p-4 bg-slate-100 dark:bg-black/20 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    {plan.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-2 dark:text-white">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">{plan.annualReturn}</span>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-2">Per Month</span>
                  </div>

                  <div className="space-y-3 text-sm mb-8">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Min Deposit</span>
                      <span className="font-bold dark:text-white">{plan.minInvestment}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Term</span>
                      <span className="font-bold dark:text-white">{plan.term}</span>
                    </div>
                  </div>

                  <motion.button
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-colors ${selectedPlan === plan.id ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white'}`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'View Details'}
                  </motion.button>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <AnimatePresence>
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 48 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                        {plans.find(p => p.id === selectedPlan)?.icon}
                      </div>
                      <h2 className="text-3xl font-black dark:text-white">
                        {plans.find(p => p.id === selectedPlan)?.name}
                      </h2>
                    </div>
                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                      {plans.find(p => p.id === selectedPlan)?.description}
                    </p>
                    <div className="flex gap-4">
                      <Link href="/register" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/25 active:scale-95">
                        Start Investing
                      </Link>
                      <Link href="/contact" className="px-8 py-4 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-white/20 transition active:scale-95">
                        Talk to Advisor
                      </Link>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/3 bg-slate-50 dark:bg-black/20 rounded-2xl p-8">
                    <h3 className="font-bold text-lg mb-6 dark:text-white flex items-center gap-2">
                      <Zap size={20} className="text-amber-500" /> Plan Features
                    </h3>
                    <ul className="space-y-4">
                      {plans.find(p => p.id === selectedPlan)?.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                            <Check className="text-green-600 dark:text-green-400" size={12} />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 text-sm text-slate-500 dark:text-slate-500 flex items-start gap-2">
                  <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                  <p>Historical returns are not a guarantee of future performance. All investments involve risk. Please read our investment agreement carefully.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
