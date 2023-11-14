import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'
import { UserProfile } from '../types/types'
import { getUserProfile as sGetUserProfile } from '../services/mafiaServices'

type UserContextType = {
  signedIn: boolean
  session: Session | null
  userProfile: UserProfile
}

function getUserProfile(userId: string) {
  return sGetUserProfile(userId)
}

const defaultUserContext = createContext<UserContextType>({
  signedIn: false,
  session: null,
  userProfile: {
    first_name: '',
    id: '',
    last_name: '',
    stats_id: '',
    updated_at: '',
  },
})

export const useUserContext = (): UserContextType => {
  return useContext(defaultUserContext)
}

export default function UserProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [session, setSession] = useState<Session | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    first_name: '',
    id: '',
    last_name: '',
    stats_id: '',
    updated_at: '',
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (session?.user?.id) {
      getUserProfile(session.user.id).then((profile) => setUserProfile(profile))
    }
  }, [session?.user?.id])

  return (
    <defaultUserContext.Provider value={{ signedIn: !!session, session, userProfile }}>
      {children}
    </defaultUserContext.Provider>
  )
}
