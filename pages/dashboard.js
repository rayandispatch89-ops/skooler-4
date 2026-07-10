import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const router = useRouter()
  const { user, loading, signOut, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [loading, isAuthenticated, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 inline-block animate-spin">⏳</div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Check if user is admin (only allow specific emails)
  const ADMIN_EMAILS = [
    'wahabilyas205@gmail.com',
    'abdullah987570@gmail.com',
    'ashfaqawan90op@gmail.com',
    'rayan.dispatch89@gmail.com'
  ]
  const isAdmin = ADMIN_EMAILS.includes(user?.email)

  return (
    <>
      <Head>
        <title>Dashboard - Skooler</title>
        <meta name="description" content="Your Skooler user dashboard. Generate growth strategies, explore features, and manage your account." />
      </Head>
      <div className="min-h-screen bg-light">
        {/* Navigation */}
      <nav className="bg-light border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Skooler" className="w-10 h-10" />
            <div className="text-2xl font-bold text-[rgb(91,63,255)]">Skooler</div>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-dark font-medium hidden sm:inline">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-primary text-light px-6 py-2 rounded-lg hover:opacity-90 font-medium transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 border border-primary/20 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3">
            Welcome to Skooler! 🎉
          </h1>
          <p className="text-lg text-gray-700">
            You're now signed in and ready to create powerful growth strategies for your community.
          </p>
        </div>

        {/* Admin Alert */}
        {isAdmin && (
          <div className="bg-gradient-to-r from-primary to-purple-700 text-light rounded-xl p-6 mb-8 border border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold mb-1">👑 Admin Account Detected</h2>
                <p className="opacity-90">You have admin access to the control panel.</p>
              </div>
              <Link href="/admin" className="bg-white text-primary px-6 py-2 rounded-lg font-bold hover:opacity-90 transition">
                Go to Admin Panel
              </Link>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className={`grid gap-6 mb-8 ${isAdmin ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
          <Link href="/">
            <div className="bg-light border border-gray-200 rounded-xl p-8 hover:shadow-lg transition cursor-pointer h-full">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-dark mb-2">Generate Strategy</h3>
              <p className="text-gray-600">Create a complete growth strategy in 60 seconds</p>
            </div>
          </Link>

          <Link href="/#features">
            <div className="bg-light border border-gray-200 rounded-xl p-8 hover:shadow-lg transition cursor-pointer h-full">
              <div className="text-5xl mb-4">🛠️</div>
              <h3 className="text-2xl font-bold text-dark mb-2">Explore Features</h3>
              <p className="text-gray-600">Discover all tools to grow your community</p>
            </div>
          </Link>

          {isAdmin && (
            <Link href="/admin">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-8 hover:shadow-lg transition cursor-pointer h-full">
                <div className="text-5xl mb-4">⚙️</div>
                <h3 className="text-2xl font-bold text-primary mb-2">Admin Panel</h3>
                <p className="text-gray-600">Manage platform settings and users</p>
              </div>
            </Link>
          )}
        </div>

        {/* Account Info */}
        <div className="bg-light border border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-dark mb-6">Account Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Email</span>
              <span className="font-semibold text-dark">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Member Since</span>
              <span className="font-semibold text-dark">
                {new Date(user?.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Account Type</span>
              <span className={`font-semibold flex items-center gap-1 ${isAdmin ? 'text-primary' : 'text-green-600'}`}>
                {isAdmin ? '👑 Administrator' : '👤 User'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Status</span>
              <span className="font-semibold text-green-600 flex items-center gap-1">
                ✓ Active
              </span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-bold text-dark mb-2">💡 Next Steps</h3>
          <ul className="text-gray-700 space-y-2">
            <li>• Click "Generate Strategy" to create your first growth plan</li>
            <li>• Use the tools to analyze keywords, content, and marketing</li>
            <li>• Customize all recommendations for your community</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/logo.svg" alt="Skooler" className="w-6 h-6" />
            <div className="text-sm font-bold text-[rgb(91,63,255)]">Skooler</div>
          </div>
          <p className="text-sm text-gray-600">© 2026 Skooler. Built for community owners.</p>
        </div>
      </footer>
    </div>
    </>
  )
}
