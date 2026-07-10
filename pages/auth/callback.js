import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'

export default function AuthCallback() {
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth()
  const redirectAttempted = useRef(false)

  // Admin email list
  const ADMIN_EMAILS = [
    'wahabilyas205@gmail.com',
    'abdullah987570@gmail.com',
    'ashfaqawan90op@gmail.com',
    'rayan.dispatch89@gmail.com'
  ]

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

  return (
    <div className="min-h-screen bg-light flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 inline-block animate-spin">⏳</div>
        <h1 className="text-3xl font-bold text-dark mb-2">Verifying your magic link...</h1>
        <p className="text-gray-600">Please wait while we sign you in.</p>
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
