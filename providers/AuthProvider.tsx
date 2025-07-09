import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useRouter, useNavigation } from 'expo-router'
import resetRouter from '@/helpers/resetRouter'

const AuthContext = createContext<{
  signIn: (email: string, password: string, displayErrorMessage: (message: string) => void) => void
  signUp: (email: string, password: string, name: string, displayErrorMessage: (message: string) => void) => void
  signOut: () => void
  session?: Session | null
  loading: boolean
}>({
  signIn: (email: string, password: string) => null,
  signUp: (email: string, name: string, password: string) => null,
  signOut: () => null,
  session: null,
  loading: false,
})

// This hook can be used to access the user info.
export function useAuth() {
  const value = useContext(AuthContext)
  if (value === undefined) {
    throw new Error('useAuth must be wrapped in a <AuthProvider />')
  }

  return value
}

export function AuthProvider(props: PropsWithChildren) {
  const router = useRouter()
  const navigation = useNavigation()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    let subscription: { unsubscribe: () => void } | null = null

    const initialize = async () => {
      setLoading(true)

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (!ignore) setSession(session)

        const {
          data: { subscription: sub },
        } = supabase.auth.onAuthStateChange((_event, sess) => {
          if (!ignore) setSession(sess)
        })

        subscription = sub
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    initialize()

    return () => {
      ignore = true
      subscription?.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string, displayErrorMessage: (message: string) => void) => {
          setLoading(true)

          const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          })

          if (error) {
            displayErrorMessage(error.message)
          } else {
            resetRouter(router, navigation, `/home`)
          }

          setLoading(false)
        },
        signUp: async (
          email: string,
          password: string,
          name: string,
          displayErrorMessage: (message: string) => void,
        ) => {
          if (!name) return displayErrorMessage('Please enter your name.')

          setLoading(true)
          const {
            data: { session },
            error,
          } = await supabase.auth.signUp({
            options: {
              data: {
                display_name: name,
              },
            },
            email: email,
            password: password,
          })

          if (error) {
            displayErrorMessage(error.message)
          } else {
            if (!session)
              displayErrorMessage('Please check your inbox for email verification! Then return here to sign in.')
            else resetRouter(router, navigation, `/home`)
          }

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
