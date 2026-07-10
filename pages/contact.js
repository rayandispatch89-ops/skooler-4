import Link from 'next/link'
import { useRef, useState } from 'react'

export default function Contact() {
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(formRef.current)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setSubmitted(true)
        formRef.current.reset()
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError('Failed to send message. Please try again.')
      }
    } catch (err) {
      setError('Error sending message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light">
      {/* Navigation */}
      <nav className="bg-light border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Skooler" className="w-10 h-10" />
            <div className="text-2xl font-bold text-[rgb(91,63,255)]">Skooler</div>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/#features" className="text-dark hover:text-primary font-medium">Features</Link>
            <Link href="/#pricing" className="text-dark hover:text-primary font-medium">Pricing</Link>
            <Link href="/#testimonials" className="text-dark hover:text-primary font-medium">Testimonials</Link>
            <Link href="/contact" className="text-dark hover:text-primary font-medium">Contact Us</Link>
            <Link href="/" className="bg-primary text-light px-6 py-2 rounded hover:opacity-90 font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-dark mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
            <h2 className="text-2xl font-bold text-dark mb-6">Send us a Message</h2>

            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                ✓ Message sent successfully! We'll be in touch soon.
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="access_key" value="800e38e3-1a1d-41ad-94af-fe9672feb837" />

              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-dark mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition"
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-dark mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-purple-700 hover:opacity-90 disabled:opacity-60 text-light font-semibold py-3 px-6 rounded-lg transition"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-dark mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-700 rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0">
                    📧
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">Email</h3>
                    <p className="text-gray-600">abdullah987570@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-700 rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0">
                    💬
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">Response Time</h3>
                    <p className="text-gray-600">We typically respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-700 rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0">
                    🎯
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">Support</h3>
                    <p className="text-gray-600">Questions about Skooler or your community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-dark mb-4">Quick Answers</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-dark text-sm">How long does setup take?</p>
                  <p className="text-gray-600 text-sm">Less than 5 minutes to get your first strategy</p>
                </div>
                <div>
                  <p className="font-semibold text-dark text-sm">Is there a free trial?</p>
                  <p className="text-gray-600 text-sm">Yes! Generate one strategy completely free</p>
                </div>
                <div>
                  <p className="font-semibold text-dark text-sm">Can I customize recommendations?</p>
                  <p className="text-gray-600 text-sm">Absolutely, all content is fully editable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/logo.svg" alt="Skooler" className="w-7 h-7" />
            <div className="text-sm font-bold text-[rgb(91,63,255)]">Skooler</div>
          </div>
          <p className="text-center text-sm text-gray-600">© 2026 Skooler. Built for community owners.</p>
        </div>
      </footer>
    </div>
  )
}
