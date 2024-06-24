import { supabase } from '../../lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import ThemedView from '@/components/ThemedView'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedTextInput from '@/components/ThemedTextInput'
import Group from '@/components/Group'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import Toggle from '@/components/Toggle'
import { useProfile } from '@/providers/ProfileProvider'
import { useEffect, useState } from 'react'
import Spacer from '@/components/Spacer'
import getUserFriendlyErrMsg from '@/helpers/getUserFriendlyErrMsg'

export default function AccountScreen() {
  const { session, loading: sessionLoading } = useAuth()
  const { name, sex, loading, updateProfile } = useProfile()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [newName, setNewName] = useState<string | null>(null)
  const [newSex, setNewSex] = useState<'male' | 'female'>('male')

  const toggleSex = () => setNewSex((prev) => (prev === 'male' ? 'female' : 'male'))

  useEffect(() => {
    setNewName(name)
    setNewSex(sex)
  }, [name, sex])

  if (sessionLoading || loading) return <ThemedActivityIndicator />

  return (
    <ThemedView className="justify-between">
      <Group>
        <ThemedText>{session?.user?.email}</ThemedText>
        <ThemedTextInput
          label="Name"
          value={newName || ''}
          placeholder="John Doe"
          onChangeText={(text) => setNewName(text)}
          testID="name-input"
        />
        <Toggle
          onValueChange={toggleSex}
          value={newSex === 'male'}
          trueDisplayValue="male"
          falseDisplayValue="female"
          testID="sex-toggle"
        />
      </Group>

      <Group>
        {errorMessage ? <ThemedText>{errorMessage}</ThemedText> : ''}
        <ThemedPressable
          onPress={async () => {
            try {
              const { error } = await updateProfile({ name: newName ?? '', sex: newSex })
              if (error) throw error
            } catch (error: any) {
              setErrorMessage(getUserFriendlyErrMsg(error.message))
              console.error(error)
            }
          }}
        >
          <ThemedText>Update</ThemedText>
        </ThemedPressable>
        <Spacer />
        <ThemedPressable secondary onPress={() => supabase.auth.signOut()}>
          <ThemedText>Sign Out</ThemedText>
        </ThemedPressable>
      </Group>
    </ThemedView>
  )
}
