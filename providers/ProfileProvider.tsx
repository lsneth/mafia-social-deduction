import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'
import { supabase } from '@/lib/supabase'
import { Alert } from 'react-native'

const ProfileContext = createContext<{
  id: string
  name: string | null
  sex: 'male' | 'female'
  loading: boolean
  updateProfile: ({ name, sex }: { name: string; sex: 'male' | 'female' }) => Promise<void>
}>({
  id: '',
  name: null,
  sex: 'male',
  loading: true,
  updateProfile: async () => {},
})

export function useProfile() {
  const value = useContext(ProfileContext)
  if (value === undefined) {
    throw new Error('useProfile must be wrapped in a <ProfileProvider />')
  }

  return value
}

export function ProfileProvider(props: PropsWithChildren) {
  const { session } = useAuth()
  const [id, setId] = useState<string>('')
  const [name, setName] = useState<string | null>(null)
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [loading, setLoading] = useState<boolean>(true)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      setId(session?.user.id ?? '')

      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase.from('profiles').select('name, sex').eq('id', id).single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setName(data.name)
        setSex(data.sex)
      }
      setLoading(false)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
      setLoading(false)
    }
  }, [id, session?.user])

  async function updateProfile({ name, sex }: { name: string; sex: 'male' | 'female' }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        name,
        sex,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) throw error

      setLoading(false)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session) getProfile()
  }, [getProfile, session])

  return (
    <ProfileContext.Provider value={{ id, name, sex, loading, updateProfile }}>
      {props.children}
    </ProfileContext.Provider>
  )
}