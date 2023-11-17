import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'
import { User, UserContext } from '../types/types'
import { getUserProfile as sGetUserProfile, updateUserProfile as sUpdateUserProfile } from '../services/mafiaServices'

function getUserProfile(userId: string) {
  return sGetUserProfile(userId)
}

const defaultUserContext = createContext<UserContext>({
  user: {
    firstName: '',
    id: '',
    lastName: '',
    statsId: '',
    updatedAt: '',
    sex: 'male',
    email: '',
  },
  updateUserProfile: (() => {}) as unknown as typeof sUpdateUserProfile,
  loading: true,
})

export const useUserContext = (): UserContext => {
  return useContext(defaultUserContext)
}

export default function UserProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User>({
    firstName: '',
    id: '',
    lastName: '',
    statsId: '',
    updatedAt: '',
    sex: 'male',
    email: '',
  })

  useEffect(() => {
    setLoading(true)

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(true)
    if (session?.user?.id) {
      getUserProfile(session.user.id).then((profile) => setUser({ ...profile, email: session.user.email ?? '' }))
    }
    setLoading(false)
  }, [session])

  async function updateUserProfile({
    id,
    firstName,
    lastName,
    sex,
  }: {
    id: string
    firstName: string
    lastName: string
    sex: 'male' | 'female'
  }) {
    setLoading(true)
    await sUpdateUserProfile({ id, firstName, lastName, sex }).then(() => {
      if (session?.user?.id) {
        getUserProfile(session.user.id).then((profile) => setUser({ ...profile, email: session.user.email ?? '' }))
      }
    })
    setLoading(false)
  }

  return (
    <defaultUserContext.Provider value={{ user, updateUserProfile, loading }}>{children}</defaultUserContext.Provider>
  )
}
