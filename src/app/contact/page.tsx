"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from "@/components/ui/Animations"
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, AlertCircle, HelpCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('All fields are required.')
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">Get in Touch</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Have questions about your investment journey? We're here to help you every step of the way.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Mail size={24} className="text-blue-600" />,
              title: "Email Support",
              info: "contact@dhanmatrixcapital.com",
              sub: "Response within 24 hours",
              link: "mailto:contact@dhanmatrixcapital.com"
            },
            {
              icon: <Phone size={24} className="text-emerald-600" />,
              title: "Phone Support",
              info: "+91 8857978121",
              sub: "Mon-Fri, 9am-6pm IST",
              link: "tel:+918857978121"
            },
            {
              icon: <MapPin size={24} className="text-purple-600" />,
              title: "Headquarters",
              info: "Solapur, Maharashtra, India",
              sub: "413007",
              link: "#"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-blue-500/50 transition-all text-center group"
            >
              <div className="w-12 h-12 mx-auto bg-slate-50 dark:bg-black/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 dark:text-white">{item.title}</h3>
              <a href={item.link} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline block mb-1">
                {item.info}
              </a>
              <p className="text-sm text-slate-500 dark:text-slate-500">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <FadeIn delay={0.2}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="text-blue-600" size={28} />
                <h3 className="text-2xl font-black dark:text-white">Send us a Message</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 dark:text-slate-300">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 dark:text-slate-300">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 dark:text-slate-300">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all appearance-none"
                  >
                    <option value="">Select a subject...</option>
                    <option value="Investment Inquiry">Investment Inquiry</option>
                    <option value="Account Support">Account Support</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 dark:text-slate-300">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all resize-none"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-sm font-bold">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}

                {submitted && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-sm font-bold animate-fadeIn">
                    <CheckCircle size={18} />
                    Message sent successfully! We'll be in touch soon.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="text-purple-600" size={28} />
                <h3 className="text-2xl font-black dark:text-white">FAQ</h3>
              </div>
              <div className="space-y-4">
                {[
                  { q: "How do I get started?", a: "Simply sign up for an account, complete your profile, and choose an investment plan that suits your goals." },
                  { q: "What are the minimum investment amounts?", a: "Minimum investments vary by plan. Our Starter Plan begins at $100, while others require higher minimum amounts." },
                  { q: "Is my money secure?", a: "Yes, we employ industry-leading security measures and are fully insured to protect your investments." },
                  { q: "Can I withdraw my investment early?", a: "Early withdrawal terms vary by plan. Please contact our support team for details specific to your investment." }
                ].map((faq, idx) => (
                  <div key={idx} className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-blue-500/50 transition-all">
                    <h4 className="font-bold text-lg mb-2 dark:text-white">{faq.q}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
