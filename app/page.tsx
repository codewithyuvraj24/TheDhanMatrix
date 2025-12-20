"use client"
import Link from "next/link"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem, SlideIn, FadeIn } from "../components/Animations"
import Image from "next/image"

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-brand-dark overflow-hidden pt-20">
        {/* Abstract Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-left">
            <FadeIn>
              <div className="inline-block px-4 py-2 bg-blue-900/30 border border-blue-500/30 rounded-full mb-6">
                <span className="text-blue-400 font-semibold text-sm tracking-wide uppercase">🚀 AI-Powered Investing</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Grow Your Wealth <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Intelligently</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                TheDhanMatrix connects you to high-yield investment opportunities with real-time tracking, AI insights, and bank-grade security.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Link href="/dashboard" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-500/25 flex items-center gap-2">
                    Go to Dashboard
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                ) : (
                  <>
                    <Link href="/register" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-500/25 flex items-center gap-2">
                      Start Investing Now
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                    <Link href="/about" className="px-8 py-4 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition border border-gray-700">
                      How it Works
                    </Link>
                  </>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="mt-12 flex items-center gap-8 text-gray-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>Bank-Grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-2">
              {/* Using the generated hero image */}
              <img
                src="/hero-dashboard.png"
                alt="TheDhanMatrix Dashboard Interface"
                className="rounded-xl w-full h-auto transform hover:scale-[1.01] transition duration-500"
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                  📈
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Return</p>
                  <p className="text-lg font-bold text-white">+24.5%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500">
                  🛡️
                </div>
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="text-lg font-bold text-white">Protected</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-brand-darker border-y border-brand-accent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Investors", value: "50K+" },
              { label: "Total Assets", value: "$500M+" },
              { label: "Countries", value: "30+" },
              { label: "Success Rate", value: "99.9%" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Modern Investors Choose Us</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">We combine cutting-edge technology with seasoned financial expertise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔒",
                title: "Secure & Encrypted",
                desc: "Your data and funds are protected by military-grade encryption and insurance."
              },
              {
                icon: "📊",
                title: "Real-Time Tracking",
                desc: "Monitor your portfolio performance with live updates and detailed analytics."
              },
              {
                icon: "🤖",
                title: "AI-Driven Insights",
                desc: "Get smart recommendations based on market trends and your risk profile."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-brand-accent p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-brand-accent hover:border-blue-500/50">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Start Your Wealth Journey Today</h2>
          <p className="text-xl text-blue-100 mb-10">Join the thousands of investors who are already building their future with TheDhanMatrix.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition shadow-xl">
              Create Free Account
            </Link>
            <Link href="/plans" className="px-8 py-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 transition border border-blue-500">
              View Investment Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-16 bg-brand-darker text-gray-400 border-t border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-white block mb-4">TheDhanMatrix</span>
            <p className="max-w-xs mb-6">The premier platform for intelligent, secure, and profitable automated investing.</p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">X</div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">In</div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/plans" className="hover:text-white transition">Investment Plans</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2025 TheDhanMatrix. All rights reserved.</p>
        </div>
      </section>
    </div>
  )
}
