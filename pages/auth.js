import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Auth() {
  const { sendMagicLink, signInWithGoogle } = useAuth()
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
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setError('Please enter a valid email address')
        setLoading(false)
        return
      }

      const { error } = await sendMagicLink(email)

      if (error) {
        // Handle specific error types
        if (error.toLowerCase().includes('rate limit') || error.toLowerCase().includes('too many')) {
          setError('Too many attempts. Please wait a few minutes before requesting another link.')
        } else if (error.toLowerCase().includes('invalid') || error.toLowerCase().includes('not found')) {
          setError('Email address not valid. Please check and try again.')
        } else {
          setError(error)
        }
      } else {
        setSuccess('✓ Check your email for a magic link to sign in!')
        setEmail('')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Sign In - Skooler</title>
        <meta name="description" content="Sign in to your Skooler account using magic link authentication. No password needed." />
      </Head>
      <div className="min-h-screen bg-light flex items-center justify-center py-12 px-4">
        {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 bg-light border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Skooler" className="w-10 h-10" />
            <div className="text-2xl font-bold text-[rgb(91,63,255)]">Skooler</div>
          </Link>
          <Link href="/" className="text-dark hover:text-primary font-medium">← Back Home</Link>
        </div>
      </nav>

      <div className="w-full max-w-md mt-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔗</div>
          <h1 className="text-4xl font-bold text-dark mb-3">Sign in with Magic Link</h1>
          <p className="text-lg text-gray-600">
            No password needed. We'll send you a link to your email.
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-light border border-gray-200 rounded-xl p-8 shadow-lg">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              ✗ {error}
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
              <label htmlFor="email" className="block text-sm font-semibold text-dark mb-3">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition disabled:opacity-50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-light font-bold py-3 px-6 rounded-lg hover:bg-primary/90 disabled:opacity-60 transition flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}
            >
              <span>✉️</span>
              {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={signInWithGoogle}
            className="w-full mt-6 bg-light border border-gray-300 text-dark font-bold py-3 px-6 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95" style={{perspective: '1000px', transformStyle: 'preserve-3d'}}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Info Boxes */}
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-primary">💡 How it works:</span>
                <br />
                1. Enter your email above
                <br />
                2. Check your inbox for a magic link
                <br />
                3. Click the link to sign in instantly
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">⏱️ Rate Limit Info:</span>
                <br />
                You can request a magic link once per minute. If you get a rate limit message, please wait a few minutes before trying again.
              </p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-600 mt-8">
          By signing in, you agree to our{' '}
          <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
    </>
  )
}
