import React, { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { Alert } from 'react-native'

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void
  signUp: (email: string, password: string) => void
  signOut: () => void
  session?: Session | null
  loading: boolean
}>({
  signIn: (email: string, password: string) => null,
  signUp: (email: string, password: string) => null,
  signOut: () => null,
  session: null,
  loading: false,
})

// This hook can be used to access the user info.
export function useAuth() {
  const value = React.useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth must be wrapped in a <AuthProvider />')
  }

  return value
}

export function AuthProvider(props: React.PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session)
      })
      .then(() => setLoading(false))

    supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(true)
      setSession(session)
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          setLoading(true)
          const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          })

          if (error) Alert.alert(error.message)
          setLoading(false)
        },
        signUp: async (email: string, password: string) => {
          setLoading(true)
          const {
            data: { session },
            error,
          } = await supabase.auth.signUp({
            email: email,
            password: password,
          })

          if (error) Alert.alert(error.message)
          if (!session) Alert.alert('Please check your inbox for email verification!')
          setLoading(false)
        },
        signOut: () => {
          supabase.auth.signOut()
        },
        session,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
