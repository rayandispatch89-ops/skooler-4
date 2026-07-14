import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'

export default function AuthCallback() {
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth()
  const redirectAttempted = useRef(false)
  const [authError, setAuthError] = useState(null)
  const [timedOut, setTimedOut] = useState(false)

  // Admin email list
  const ADMIN_EMAILS = [
    'wahabilyas205@gmail.com',
    'abdullah987570@gmail.com',
    'ashfaqawan90op@gmail.com',
    'rayan.dispatch89@gmail.com'
  ]

  // Detect an error returned by Supabase in the URL. Supabase puts errors in the
  // query string (?error=...) for the PKCE/code flow and in the hash fragment
  // (#error=...) for the implicit flow, so we check both.
  useEffect(() => {
    if (typeof window === 'undefined') return

    const query = new URLSearchParams(window.location.search)
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))

    const errorCode = query.get('error') || hash.get('error')
    const errorDescription =
      query.get('error_description') || hash.get('error_description')

    if (errorCode) {
      setAuthError(
        errorDescription
          ? decodeURIComponent(errorDescription.replace(/\+/g, ' '))
          : errorCode
      )
    }
  }, [])

  useEffect(() => {
    // If user is authenticated, redirect based on role (only once)
    if (!loading && isAuthenticated && user && !redirectAttempted.current) {
      redirectAttempted.current = true
      // Check if user is admin
      const isAdmin = ADMIN_EMAILS.includes(user.email)
      // Use setTimeout to ensure state updates complete before redirect
      setTimeout(() => {
        if (isAdmin) {
          router.push('/admin')
        } else {
          router.push('/')
        }
      }, 500)
    }
  }, [loading, isAuthenticated, user, router])

  // Fallback: if we're not authenticated and there's no explicit error after a
  // while, the session was never established (e.g. redirect URL not allow-listed
  // in Supabase). Surface a helpful message instead of spinning forever.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated && !authError) {
        setTimedOut(true)
      }
    }, 8000)
    return () => clearTimeout(timer)
  }, [isAuthenticated, authError])

  const showError = authError || timedOut

  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {!showError ? (
          <>
            <div className="text-6xl mb-4 inline-block animate-spin">⏳</div>
            <h1 className="text-3xl font-bold text-dark mb-2">Verifying your sign-in...</h1>
            <p className="text-gray-600">Please wait while we sign you in.</p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-dark mb-2">Sign-in failed</h1>
            <p className="text-gray-600 mb-2">
              {authError
                ? authError
                : 'We could not complete your sign-in. The link may have expired, or the site URL is not allow-listed in your authentication settings.'}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Tip: make sure this exact site URL is added to your Supabase
              project&apos;s <strong>Authentication → URL Configuration →
              Redirect URLs</strong> (with a <code>/**</code> suffix).
            </p>
            <Link
              href="/auth"
              className="inline-block bg-primary text-light font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition"
            >
              Back to Sign In
            </Link>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </div>
  )
}
