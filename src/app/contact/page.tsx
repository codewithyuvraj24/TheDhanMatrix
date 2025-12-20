"use client"
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('All fields are required.')
      return
    }

    // Simulate form submission (in real app, send to backend)
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-8">
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
        <p className="text-gray-600 mb-8">Have questions? We'd love to hear from you. Get in touch with us today.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="p-6 border border-gray-300 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-gray-600">
              <a href="mailto:contact@thedhanmatrix.com" className="text-blue-600 hover:underline">
                contact@thedhanmatrix.com
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-2">We'll respond within 24 hours</p>
          </div>

          <div className="p-6 border border-gray-300 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Phone</h3>
            <p className="text-gray-600">
              <a href="tel:+91 8857978121" className="text-blue-600 hover:underline">
                +91 8857978121
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-2">Monday to Friday, 9am-6pm EST</p>
          </div>

          <div className="p-6 border border-gray-300 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Address</h3>
            <p className="text-gray-600">
              Saiful, Solapur<br />
              413007<br />
              India
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="">Select a subject</option>
                  <option value="Investment Inquiry">Investment Inquiry</option>
                  <option value="Account Support">Account Support</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              {error && <p className="text-red-600 font-medium">{error}</p>}
              {submitted && (
                <p className="text-green-600 font-medium">✓ Thank you! We'll get back to you soon.</p>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
                <h4 className="font-semibold mb-2">How do I get started?</h4>
                <p className="text-sm text-gray-700">
                  Simply sign up for an account, complete your profile, and choose an investment plan that suits your goals.
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
                <h4 className="font-semibold mb-2">What are the minimum investment amounts?</h4>
                <p className="text-sm text-gray-700">
                  Minimum investments vary by plan. Our Starter Plan begins at $500, while others require higher minimum amounts.
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
                <h4 className="font-semibold mb-2">Is my money secure?</h4>
                <p className="text-sm text-gray-700">
                  Yes, we employ industry-leading security measures and are fully insured to protect your investments.
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
                <h4 className="font-semibold mb-2">Can I withdraw my investment early?</h4>
                <p className="text-sm text-gray-700">
                  Early withdrawal terms vary by plan. Please contact our support team for details specific to your investment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
