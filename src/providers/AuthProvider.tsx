import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'

type AuthContextType = {
  signedIn: boolean
  session: Session | null
}

const AuthContext = createContext<AuthContextType>({ signedIn: false, session: null })
export const useAuthContext = () => {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => console.log(session), [session])

  return <AuthContext.Provider value={{ signedIn: !!session, session }}>{children}</AuthContext.Provider>
}
