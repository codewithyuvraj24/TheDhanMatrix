"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Info, Zap, Shield, TrendingUp } from 'lucide-react'
import { PlanComparisonChart } from '@/components/features/Charts'

const plans = [
    {
        id: 'starter',
        name: 'Starter',
        min: 10000,
        roi: '10-12%',
        risk: 'Low',
        lockIn: '3 Months',
        features: {
            'Withdraw Anytime': false,
            'Capital Protection': true,
            'Personal Advisor': false,
            'Tax Free Returns': true,
            'Auto-Reinvest': true,
        },
        color: 'blue'
    },
    {
        id: 'growth',
        name: 'Growth',
        min: 25000,
        roi: '15-18%',
        risk: 'Medium',
        lockIn: '6 Months',
        features: {
            'Withdraw Anytime': true,
            'Capital Protection': true,
            'Personal Advisor': false,
            'Tax Free Returns': true,
            'Auto-Reinvest': true,
        },
        color: 'emerald',
        popular: true
    },
    {
        id: 'premium',
        name: 'Premium',
        min: 100000,
        roi: '20-25%',
        risk: 'High',
        lockIn: '1 Year',
        features: {
            'Withdraw Anytime': true,
            'Capital Protection': true,
            'Personal Advisor': true,
            'Tax Free Returns': true,
            'Auto-Reinvest': true,
        },
        color: 'purple'
    }
]

export default function PlanComparison() {
    const [selectedPlans, setSelectedPlans] = useState<string[]>(['starter', 'growth', 'premium'])

    const togglePlan = (id: string) => {
        if (selectedPlans.includes(id)) {
            if (selectedPlans.length > 1) {
                setSelectedPlans(selectedPlans.filter(p => p !== id))
            }
        } else {
            setSelectedPlans([...selectedPlans, id])
        }
    }

    const activePlans = plans.filter(p => selectedPlans.includes(p.id))

    return (
        <div className="space-y-12">

            {/* Plan Selection Toggles */}
            <div className="flex flex-wrap justify-center gap-4">
                {plans.map(plan => (
                    <button
                        key={plan.id}
                        onClick={() => togglePlan(plan.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${selectedPlans.includes(plan.id)
                            ? `bg-${plan.color}-600 text-white shadow-lg shadow-${plan.color}-500/30 scale-105`
                            : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10'
                            }`}
                    >
                        {selectedPlans.includes(plan.id) && <Check size={16} />}
                        {plan.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Features Matrix */}
                <div className="lg:col-span-2 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 bg-transparent"></th>
                                {activePlans.map(plan => (
                                    <th key={plan.id} className="p-4 min-w-[200px]">
                                        <div className={`p-6 rounded-2xl bg-${plan.color}-500/10 border border-${plan.color}-500/20 text-center relative overflow-hidden`}>
                                            {plan.popular && (
                                                <div className="absolute top-0 right-0 bg-amber-400 text-black text-[9px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-widest">
                                                    Popular
                                                </div>
                                            )}
                                            <h3 className={`text-xl font-black text-${plan.color}-600 dark:text-${plan.color}-400 mb-2`}>{plan.name}</h3>
                                            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{plan.roi}</div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Exp. Return</p>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">

                            {/* Core Specs */}
                            <tr>
                                <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Min Investment</td>
                                {activePlans.map(plan => (
                                    <td key={plan.id} className="p-4 text-center font-black text-slate-900 dark:text-white">
                                        ₹{plan.min.toLocaleString('en-IN')}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Lock-in Period</td>
                                {activePlans.map(plan => (
                                    <td key={plan.id} className="p-4 text-center font-bold text-slate-900 dark:text-white">
                                        {plan.lockIn}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 font-bold text-slate-500 dark:text-slate-400">Risk Level</td>
                                {activePlans.map(plan => (
                                    <td key={plan.id} className="p-4 text-center">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${plan.risk === 'Low' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                            plan.risk === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                                                'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                                            }`}>
                                            <Shield size={12} /> {plan.risk}
                                        </span>
                                    </td>
                                ))}
                            </tr>

                            {/* Features List */}
                            {Object.keys(plans[0].features).map((feature, idx) => (
                                <tr key={idx} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
                                        {feature}
                                        <Info size={14} className="text-slate-300 cursor-help" />
                                    </td>
                                    {activePlans.map(plan => (
                                        <td key={plan.id} className="p-4 text-center">
                                            {/* @ts-ignore */}
                                            {plan.features[feature] ? (
                                                <div className={`inline-flex p-1 rounded-full bg-${plan.color}-100 text-${plan.color}-600 dark:bg-${plan.color}-500/20 dark:text-${plan.color}-400`}>
                                                    <Check size={16} strokeWidth={3} />
                                                </div>
                                            ) : (
                                                <div className="inline-flex p-1 rounded-full bg-slate-100 text-slate-300 dark:bg-white/5 dark:text-white/20">
                                                    <X size={16} strokeWidth={3} />
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}

                            <tr>
                                <td className="p-4"></td>
                                {activePlans.map(plan => (
                                    <td key={plan.id} className="p-4 text-center">
                                        <button className={`w-full py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all active:scale-95 ${plan.popular
                                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25'
                                            : 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20'
                                            }`}>
                                            Select Plan
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Visual Chart */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-3xl overflow-hidden p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                <TrendingUp className="text-indigo-600 dark:text-indigo-400" size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white">Yield Comparison</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">projected annual returns</p>
                            </div>
                        </div>
                        <PlanComparisonChart />

                        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-500/10">
                            <div className="flex items-start gap-3">
                                <Zap className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
                                <p className="text-sm text-blue-800 dark:text-blue-200 font-medium leading-relaxed">
                                    <span className="font-bold">Pro Tip:</span> The Growth plan offers the best balance of flexibility and returns for most investors starting with 25k.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
