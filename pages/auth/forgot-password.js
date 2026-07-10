import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const { error } = await resetPassword(email)
      if (error) {
        setError(error)
      } else {
        setSuccess('Check your email for password reset instructions')
        setEmail('')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light flex items-center justify-center py-12 px-4">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 bg-light border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Skool.Online" className="w-10 h-10" />
            <div className="text-2xl font-bold text-primary">Skool.Online</div>
          </Link>
          <Link href="/auth" className="text-dark hover:text-primary font-medium">← Back to Auth</Link>
        </div>
      </nav>

      <div className="w-full max-w-md mt-16">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Card */}
        <div className="bg-light border border-gray-200 rounded-xl p-8 shadow-lg">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-purple-700 text-light font-semibold py-3 px-6 rounded-lg hover:opacity-90 disabled:opacity-60 transition"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Back to Auth */}
          <div className="text-center mt-6">
            <Link href="/auth" className="text-primary hover:text-primary/80 font-semibold">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
