import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, loading, signOut, isAuthenticated } = useAuth()
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [usersError, setUsersError] = useState('')

  const ADMIN_EMAILS = [
    'wahabilyas205@gmail.com',
    'abdullah987570@gmail.com',
    'ashfaqawan90op@gmail.com',
    'rayan.dispatch89@gmail.com'
  ]

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [loading, isAuthenticated, router])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsersError('')
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setUsers(data || [])
      } catch (err) {
        console.error('Error fetching users:', err)
        setUsersError(err.message || 'Failed to load users')
        setUsers([])
      } finally {
        setUsersLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchUsers()
    }
  }, [isAuthenticated])

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

  const isAdmin = ADMIN_EMAILS.includes(user?.email)

  return (
    <>
      <Head>
        <title>Admin Panel - Skooler</title>
        <meta name="description" content="Skooler admin dashboard. Manage platform settings, users, and analytics." />
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
        {isAdmin ? (
          <>
            {/* Admin Welcome */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 border border-primary/20 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">⚙️</span>
                <h1 className="text-4xl font-bold text-dark">Admin Dashboard</h1>
              </div>
              <p className="text-lg text-gray-700">
                Welcome to the admin control center. Manage your platform and monitor key metrics here.
              </p>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-light border border-gray-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-gray-600">Communities Generated</p>
              </div>
              <div className="bg-light border border-gray-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-2">{users.length}</div>
                <p className="text-gray-600">Registered Users</p>
              </div>
              <div className="bg-light border border-gray-200 rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>

            {/* Admin Info */}
            <div className="bg-light border border-gray-200 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-dark mb-6">Admin Account Info</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Email</span>
                  <span className="font-semibold text-dark">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Role</span>
                  <span className="font-semibold text-primary">Administrator</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Member Since</span>
                  <span className="font-semibold text-dark">
                    {new Date(user?.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Status</span>
                  <span className="font-semibold text-green-600">✓ Active</span>
                </div>
              </div>
            </div>

            {/* Users List */}
            <div className="bg-light border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-dark mb-6">Registered Users ({users.length})</h2>
              {usersLoading ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4 inline-block animate-spin">⏳</div>
                  <p className="text-gray-600">Loading users...</p>
                </div>
              ) : usersError ? (
                <div className="text-center py-12">
                  <p className="text-red-600 text-lg font-semibold mb-2">Couldn't load users</p>
                  <p className="text-gray-600 text-sm">{usersError}</p>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No users registered yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-dark">User ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-dark">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-dark">Joined Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-dark">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="py-3 px-4 text-gray-600 text-sm font-medium break-all">{u.id}</td>
                          <td className="py-3 px-4 text-dark">{u.email}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {u.status ? u.status.charAt(0).toUpperCase() + u.status.slice(1) : 'Active'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Non-Admin Access Denied */
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-3xl font-bold text-dark mb-3">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              This admin panel is only available to administrators. If you believe this is an error, please contact support.
            </p>
            <Link href="/" className="bg-primary text-light px-6 py-3 rounded-lg hover:opacity-90 font-medium inline-block">
              Back to Home
            </Link>
          </div>
        )}
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
