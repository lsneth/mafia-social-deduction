import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { useAuthContext } from '../providers/AuthProvider'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ParentView from '../components/ParentView'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Separator from '../components/Separator'
import Text from '../components/Text'

export default function Account({
  route,
  navigation,
}: {
  route: RouteProp<RootStackParamList, 'Account'>
  navigation: NativeStackNavigationProp<RootStackParamList, 'Account'>
}) {
  const [loading, setLoading] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const { signedIn, session } = useAuthContext()

  useEffect(() => {
    if (signedIn) getProfile()
  }, [signedIn])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name, last_name`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFirstName(data.first_name)
        setLastName(data.last_name)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ first_name, last_name }: { first_name: string; last_name: string }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        first_name,
        last_name,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

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

  return (
    <ParentView>
      <Text size="md">Account</Text>
      <Separator size="xs" />
      <Text size="sm">{session?.user?.email}</Text>
      <Separator size="md" />

      <TextInput value={firstName || 'first name'} onChangeText={(text) => setFirstName(text)} />
      <TextInput value={lastName || 'last name'} onChangeText={(text) => setLastName(text)} />

      <Separator size="sm" />

      <Button
        title={loading ? 'Loading ...' : 'Update'}
        onPress={() => updateProfile({ first_name: firstName, last_name: lastName })}
        disabled={loading}
      />
      <Button
        title="Log Out"
        onPress={() => {
          supabase.auth.signOut()
          navigation.navigate('Home')
        }}
      />
    </ParentView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
