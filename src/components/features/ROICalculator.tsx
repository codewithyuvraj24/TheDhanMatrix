"use client"
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Calculator, TrendingUp } from 'lucide-react'

export default function ROICalculator() {
    const [initial, setInitial] = useState(10000)
    const [monthly, setMonthly] = useState(500)
    const [rate, setRate] = useState(8)
    const [years, setYears] = useState(10)

    // Calculate compound growth
    const calculateGrowth = () => {
        const data = []
        const monthlyRate = rate / 100 / 12
        const months = years * 12

        for (let month = 0; month <= months; month += 6) { // Every 6 months for cleaner chart
            const contributions = initial + (monthly * month)
            const interest = monthly * ((Math.pow(1 + monthlyRate, month) - 1) / monthlyRate) * (1 + monthlyRate)
            const total = initial * Math.pow(1 + monthlyRate, month) + interest

            data.push({
                year: (month / 12).toFixed(1),
                value: Math.round(total),
                contributions: Math.round(contributions)
            })
        }
        return data
    }

    const data = calculateGrowth()
    const finalValue = data[data.length - 1]?.value || 0
    const totalContributions = initial + (monthly * years * 12)
    const totalGains = finalValue - totalContributions

    return (
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Calculator className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">ROI Projection</h2>
            </div>

            {/* Input Controls */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Initial Investment</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-300 font-bold">₹</span>
                        <input
                            type="number"
                            value={initial}
                            onChange={e => setInitial(Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Monthly Add</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-300 font-bold">₹</span>
                        <input
                            type="number"
                            value={monthly}
                            onChange={e => setMonthly(Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Annual Return %</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={e => setRate(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Time Horizon</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={years}
                            onChange={e => setYears(Number(e.target.value))}
                            className="w-full pr-12 px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-300 font-bold text-xs">years</span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
                        <XAxis
                            dataKey="year"
                            stroke="currentColor"
                            className="text-slate-600 dark:text-slate-300 text-xs"
                            tick={{ fontSize: 10 }}
                        />
                        <YAxis
                            stroke="currentColor"
                            className="text-slate-600 dark:text-slate-300 text-xs"
                            tick={{ fontSize: 10 }}
                            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}
                            formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Results */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                    <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Final Value</p>
                    <p className="text-xl font-black text-blue-600 dark:text-blue-400">₹{finalValue.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Total Gains</p>
                    <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">+₹{totalGains.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-4 bg-slate-500/10 border border-slate-500/20 rounded-2xl">
                    <p className="text-xs font-black text-slate-600 dark:text-slate-600 dark:text-slate-300 uppercase tracking-widest mb-1">Invested</p>
                    <p className="text-xl font-black text-slate-600 dark:text-slate-600 dark:text-slate-300">₹{totalContributions.toLocaleString('en-IN')}</p>
                </div>
            </div>
        </div>
    )
}
