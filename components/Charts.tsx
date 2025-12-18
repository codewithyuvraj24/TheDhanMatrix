"use client"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Investment Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={investmentTrendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PortfolioBreakdownChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Portfolio Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={portfolioData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name} ${entry.value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
            {portfolioData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PlanComparisonChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Plan Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={returnData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="plan" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="return" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
