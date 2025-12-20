export default function About() {
  return (
    <section className="max-w-4xl mx-auto pt-24 px-4">
      <h2 className="text-3xl font-bold mb-6">About TheDhanMatrix</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-700">
            At TheDhanMatrix, we are committed to providing secure, transparent, and innovative investment solutions
            to help our clients build and grow their wealth. We believe in making investment opportunities accessible
            to everyone, regardless of their financial background.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Who We Are</h3>
          <p className="text-gray-700">
            TheDhanMatrix is a forward-thinking financial technology platform dedicated to revolutionizing the way
            people invest. Our team comprises experienced investment professionals, technologists, and financial experts
            who share a common vision: to democratize investment and create lasting value for our clients.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">What We Do</h3>
          <p className="text-gray-700 mb-4">
            We offer a comprehensive suite of investment products and services tailored to meet the diverse needs of
            our clients. From conservative to aggressive investment strategies, we have something for every investor.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3">•</span>
              <span><strong>Portfolio Management:</strong> Professional investment advisory and portfolio management services</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3">•</span>
              <span><strong>Diversified Investments:</strong> Access to stocks, bonds, real estate, and alternative investments</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3">•</span>
              <span><strong>Risk Management:</strong> Comprehensive risk assessment and mitigation strategies</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3">•</span>
              <span><strong>Financial Education:</strong> Resources and guidance to help you make informed investment decisions</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Why Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-2">Transparency</h4>
              <p className="text-sm text-gray-700">Complete transparency in all operations and fee structures</p>
            </div>
            <div className="p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-2">Security</h4>
              <p className="text-sm text-gray-700">Industry-leading security measures to protect your investments</p>
            </div>
            <div className="p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-2">Expertise</h4>
              <p className="text-sm text-gray-700">Access to seasoned investment professionals and advisors</p>
            </div>
            <div className="p-4 border border-gray-300 rounded-lg">
              <h4 className="font-semibold mb-2">Support</h4>
              <p className="text-sm text-gray-700">Dedicated customer support available when you need us</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Our Values</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              <span><strong>Integrity:</strong> We uphold the highest standards of ethical conduct</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              <span><strong>Innovation:</strong> We continuously evolve to serve you better</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              <span><strong>Client-Centric:</strong> Your success is our success</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              <span><strong>Responsibility:</strong> We take our fiduciary duties seriously</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-blue-50 border border-blue-300 rounded-lg mt-8">
          <h3 className="text-lg font-semibold mb-2">Get Started Today</h3>
          <p className="text-gray-700 mb-4">
            Ready to take control of your financial future? Explore our investment plans and start your journey with TheDhanMatrix.
          </p>
          <div className="flex gap-4">
            <a href="/plans" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              View Plans
            </a>
            <a href="/register" className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
