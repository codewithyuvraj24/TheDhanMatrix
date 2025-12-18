"use client"
import Link from "next/link"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem, SlideIn, FadeIn } from "../components/Animations"

export default function Home(){
  const { user } = useAuth()

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Build Your Wealth with TheDhanMatrix</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Secure investment platform designed for modern investors</p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex justify-center gap-4 flex-wrap">
              {user ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/dashboard" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition inline-block">
                      Go to Dashboard
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/plans" className="px-8 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-400 transition border border-white inline-block">
                      View Plans
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/register" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition inline-block">
                      Get Started
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/login" className="px-8 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-400 transition border border-white inline-block">
                      Sign In
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why Choose TheDhanMatrix?</h2>
          </FadeIn>
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🔒",
                  title: "Secure",
                  desc: "Bank-level security for all your investments and personal data"
                },
                {
                  icon: "📊",
                  title: "Transparent",
                  desc: "Real-time dashboard showing all investment details and returns"
                },
                {
                  icon: "💰",
                  title: "Profitable",
                  desc: "Competitive returns up to 20% annually on your investments"
                },
                {
                  icon: "🤝",
                  title: "Dedicated Support",
                  desc: "24/7 customer support to help with your investment queries"
                },
                {
                  icon: "📈",
                  title: "Professional Management",
                  desc: "Expert team managing your portfolio with proven track record"
                },
                {
                  icon: "⚡",
                  title: "Easy Access",
                  desc: "Simple, user-friendly platform accessible anytime, anywhere"
                }
              ].map((feature, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Our Platform by Numbers</h2>
          </FadeIn>
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "50K+", label: "Active Investors" },
                { number: "$500M+", label: "Assets Under Management" },
                { number: "18%", label: "Average Annual Return" },
                { number: "99.9%", label: "Uptime Guarantee" }
              ].map((stat, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.p
                      className="text-4xl font-bold text-blue-600 mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      {stat.number}
                    </motion.p>
                    <p className="text-gray-700 font-medium">{stat.label}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Investment Plans Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Investment Plans</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">Choose the plan that fits your investment goals and start earning today</p>
          </FadeIn>
          
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { name: "Starter", return: "12%", min: "$500", color: "blue" },
                { name: "Growth", return: "15%", min: "$5K", color: "green" },
                { name: "Premium", return: "18%", min: "$50K", color: "purple" },
                { name: "Enterprise", return: "20%+", min: "Custom", color: "orange" }
              ].map((plan, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-${plan.color}-500`}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className={`text-3xl font-bold text-${plan.color}-600 mb-2`}>{plan.return}</p>
                    <p className="text-sm text-gray-600 mb-4">Annual Return</p>
                    <p className="text-gray-700 font-medium mb-6">Min: {plan.min}</p>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link href="/plans" className={`block text-center px-4 py-2 bg-${plan.color}-600 text-white rounded hover:bg-${plan.color}-700 transition font-medium`}>
                        Learn More
                      </Link>
                    </motion.div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          
          <FadeIn delay={0.6}>
            <div className="text-center mt-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/plans" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
                  View All Plans →
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            backgroundSize: "200% 200%"
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl mb-8 opacity-90">Join thousands of investors already earning with TheDhanMatrix</p>
          </FadeIn>
          <FadeIn delay={0.4}>
            {user ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/dashboard" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition">
                  View Your Portfolio
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition">
                  Create Free Account Now
                </Link>
              </motion.div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={0.1}>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
                <li><Link href="/plans" className="hover:text-blue-400 transition">Plans</Link></li>
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="mailto:support@thedhanmatrix.com" className="hover:text-blue-400 transition">Email Support</a></li>
                <li><a href="tel:+1-555-123-4567" className="hover:text-blue-400 transition">Call Us</a></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition">Chat with Us</Link></li>
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div>
              <h4 className="font-bold text-lg mb-4">Security</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Security</a></li>
              </ul>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.4}>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TheDhanMatrix. All rights reserved.</p>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
