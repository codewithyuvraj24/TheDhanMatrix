"use client"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTheme } from '@/context/ThemeContext'

// Sample data for charts
const investmentTrendData = [
  { month: 'Jan', value: 4000 },
  { month: 'Feb', value: 3000 },
  { month: 'Mar', value: 2000 },
  { month: 'Apr', value: 9800 },
  { month: 'May', value: 8000 },
  { month: 'Jun', value: 7000 }
]

const portfolioData = [
  { name: 'Active', value: 65, color: '#10b981' },
  { name: 'Withdrawn', value: 25, color: '#a855f7' },
  { name: 'Pending', value: 10, color: '#f59e0b' }
]

const returnData = [
  { plan: 'Starter', return: 12 },
  { plan: 'Growth', return: 15 },
  { plan: 'Premium', return: 18 },
  { plan: 'Enterprise', return: 20 }
]

export function InvestmentTrendChart() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="w-full p-6">
      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Investment Momentum</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={investmentTrendData}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
          <XAxis
            dataKey="month"
            stroke={isDark ? "#94a3b8" : "#64748b"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={isDark ? "#94a3b8" : "#64748b"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              borderRadius: '16px',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
              color: isDark ? '#f8fafc' : '#1e293b'
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={4}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6, stroke: isDark ? '#0f172a' : '#fff' }}
            activeDot={{ r: 8, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PortfolioBreakdownChart() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="w-full p-6">
      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Asset Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={portfolioData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {portfolioData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              borderRadius: '16px',
              color: isDark ? '#f8fafc' : '#1e293b'
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PlanComparisonChart() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="w-full p-6">
      <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Yield Projections</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={returnData}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
          <XAxis
            dataKey="plan"
            stroke={isDark ? "#94a3b8" : "#64748b"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={isDark ? "#94a3b8" : "#64748b"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              borderRadius: '16px',
              color: isDark ? '#f8fafc' : '#1e293b'
            }}
          />
          <Bar dataKey="return" fill="#10b981" radius={[12, 12, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
