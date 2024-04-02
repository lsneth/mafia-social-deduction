import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'
import { User, UserContext as UserContextType } from '../types/types'
import {
  getUserProfile,
  updateUserProfile as updateUserProfileService,
  signOut as signOutService,
} from '../services/userServices'
import { defaultUser, defaultUserContextValue } from '../helpers/defaultValues'

const UserContext = createContext<UserContextType>(defaultUserContextValue)

export const useUser = (): UserContextType => {
  return useContext(UserContext)
}

export default function UserProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User & { email: string }>(defaultUser)

  // get session
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

  // get user data
  useEffect(() => {
    setLoading(true)
    if (session) {
      getUserProfile(session.user.id)
        .then((profile) => {
          const { id, updatedAt, firstName, lastName, statsId, sex } = profile ?? {}

          setUser({
            id: id ?? '',
            updatedAt: updatedAt ?? '',
            firstName: firstName ?? '',
            lastName: lastName ?? '',
            statsId: statsId ?? '',
            sex: sex ?? 'male',
            email: session.user.email ?? '',
          })
        })
        .then(() => setLoading(false))
    } else {
      setUser(defaultUser)
      setLoading(false)
    }
  }, [session])

  // update user data
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
    await updateUserProfileService({ id, firstName, lastName, sex }).then(() => {
      if (session?.user?.id) {
        getUserProfile(session.user.id).then((profile) => {
          const { id, updatedAt, firstName, lastName, statsId, sex } = profile ?? {}

          setUser({
            id: id ?? '',
            updatedAt: updatedAt ?? '',
            firstName: firstName ?? '',
            lastName: lastName ?? '',
            statsId: statsId ?? '',
            sex: sex ?? 'male',
            email: session.user.email ?? '',
          })
        })
      }
    })
    setLoading(false)
  }

  function signOut() {
    setLoading(true)
    signOutService()
    setLoading(true)
  }

  return (
    <UserProviderBase
      children={children}
      user={user}
      signOut={signOut}
      updateUserProfile={updateUserProfile}
      loading={loading}
    />
  )
}

function UserProviderBase({
  children,
  user,
  signOut,
  updateUserProfile,
  loading,
}: {
  children: JSX.Element
  user: User & { email: string }
  signOut: () => void
  updateUserProfile: ({
    id,
    firstName,
    lastName,
    sex,
  }: {
    id: string
    firstName: string
    lastName: string
    sex: 'male' | 'female'
  }) => Promise<void>
  loading: boolean
}) {
  return <UserContext.Provider value={{ user, updateUserProfile, signOut, loading }}>{children}</UserContext.Provider>
}
