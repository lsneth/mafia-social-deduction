import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { Alert } from 'react-native'
import { useAuth } from '@/providers/AuthProvider'
import ThemedView from '@/components/ThemedView'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedTextInput from '@/components/ThemedTextInput'
import Group from '@/components/Group'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import Toggle from '@/components/Toggle'

export default function AccountScreen() {
  const { session, loading: sessionLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState<string>('')
  const [sex, setSex] = useState<'male' | 'female'>('male')

  const toggleSex = () => setSex((prev) => (prev === 'male' ? 'female' : 'male'))

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select('name, sex')
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setName(data.name)
        setSex(data.sex)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }, [session?.user])

  useEffect(() => {
    if (session) getProfile()
  }, [getProfile, session])

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

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  if (sessionLoading || loading) return <ThemedActivityIndicator />

  return (
    <ThemedView className="justify-between">
      <Group>
        <ThemedText>{session?.user?.email}</ThemedText>
        <ThemedTextInput
          label="Name"
          value={name || ''}
          placeholder="John Doe"
          onChangeText={(text) => setName(text)}
        />
        <Toggle onValueChange={toggleSex} value={sex === 'male'} trueDisplayValue="male" falseDisplayValue="female" />
      </Group>

      <Group>
        <ThemedPressable onPress={() => updateProfile({ name, sex })} disabled={loading}>
          <ThemedText>{loading ? 'Loading ...' : 'Update'}</ThemedText>
        </ThemedPressable>

        <ThemedPressable onPress={() => supabase.auth.signOut()}>
          <ThemedText>Sign Out</ThemedText>
        </ThemedPressable>
      </Group>
    </ThemedView>
  )
}
