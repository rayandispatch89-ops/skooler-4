import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
        if (session?.user) {
          await saveUserToDatabase(session.user)
        }
      } catch (err) {
        console.error('Auth check error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
      if (session?.user) {
        await saveUserToDatabase(session.user)
      }
    })

    return () => subscription?.unsubscribe()
  }, [])

  const saveUserToDatabase = async (authUser) => {
    try {
      if (!authUser?.email) return

      const { error } = await supabase
        .from('users')
        .upsert(
          { email: authUser.email, status: 'active' },
          { onConflict: 'email' }
        )

      if (error) throw error
    } catch (err) {
      console.error('Error saving user to database:', err.message || err)
    }
  }

  const sendMagicLink = async (email) => {
    try {
      setError(null)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`
        }
      })
      if (error) throw error
      return { error: null }
    } catch (err) {
      setError(err.message)
      return { error: err.message }
    }
  }

  const signInWithGoogle = async () => {
    try {
      setError(null)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`
        }
      })
      if (error) throw error
      return { error: null }
    } catch (err) {
      setError(err.message)
      return { error: err.message }
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      return { error: null }
    } catch (err) {
      setError(err.message)
      return { error: err.message }
    }
  }

  const value = {
    user,
    loading,
    error,
    sendMagicLink,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
