"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'

const plans = [
  {
    id: 1,
    name: 'Starter Plan',
    minInvestment: 500,
    maxInvestment: 5000,
    annualReturn: '12%',
    term: '12 months',
    description: 'Perfect for beginners looking to start their investment journey',
    features: ['Fixed returns', 'Monthly payouts', 'Low minimum deposit', 'Basic support']
  },
  {
    id: 2,
    name: 'Growth Plan',
    minInvestment: 5000,
    maxInvestment: 50000,
    annualReturn: '15%',
    term: '18 months',
    description: 'Ideal for investors seeking higher returns with moderate risk',
    features: ['Higher returns', 'Quarterly payouts', 'Portfolio diversification', 'Priority support']
  },
  {
    id: 3,
    name: 'Premium Plan',
    minInvestment: 50000,
    maxInvestment: 500000,
    annualReturn: '18%',
    term: '24 months',
    description: 'For serious investors looking to maximize long-term growth',
    features: ['Maximum returns', 'Annual payouts', 'Personal account manager', '24/7 VIP support']
  },
  {
    id: 4,
    name: 'Enterprise Plan',
    minInvestment: 500000,
    maxInvestment: null,
    annualReturn: '20%+',
    term: 'Flexible',
    description: 'Custom solutions for institutional and high-net-worth investors',
    features: ['Custom returns', 'Customized terms', 'Dedicated team', 'Exclusive benefits']
  }
]

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  return (
    <section className="pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-4">Investment Plans</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-gray-600 mb-8">Choose the plan that best suits your investment goals. All plans are display-only for informational purposes.</p>
        </FadeIn>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {plans.map(plan => (
              <StaggerItem key={plan.id}>
                <motion.div
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${selectedPlan === plan.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-blue-400'
                    }`}
                  onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-blue-600">{plan.annualReturn}</p>
                    <p className="text-sm text-gray-600">Annual Return</p>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <p><strong>Min Investment:</strong> ${plan.minInvestment.toLocaleString()}</p>
                    <p><strong>Max Investment:</strong> {plan.maxInvestment ? `$${plan.maxInvestment.toLocaleString()}` : 'Unlimited'}</p>
                    <p><strong>Term:</strong> {plan.term}</p>
                  </div>

                  <p className="text-gray-700 text-sm mb-4">{plan.description}</p>

                  <motion.button
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {selectedPlan && (
          <motion.div
            className="bg-gray-50 border border-gray-300 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="text-xl font-semibold mb-4">
              {plans.find(p => p.id === selectedPlan)?.name} - Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plans.find(p => p.id === selectedPlan)?.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-green-600 mr-3">✓</span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 text-gray-600 text-sm">
              To invest in this plan, please <a href="/login" className="text-blue-600 underline">sign in to your account</a> or <a href="/register" className="text-blue-600 underline">create a new account</a>.
            </p>
          </motion.div>
        )}

        <FadeIn delay={0.3}>
          <motion.div
            className="mt-12 p-6 bg-yellow-50 border border-yellow-300 rounded-lg"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Disclaimer</h3>
            <p className="text-sm text-yellow-700">
              This dashboard is for display purposes only. All investment information is illustrative. Past performance is not indicative of future results. Please consult with a financial advisor before making investment decisions.
            </p>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}
