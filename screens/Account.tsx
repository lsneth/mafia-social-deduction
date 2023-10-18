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
import BottomView from '../components/BottomView'

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

  const [editMode, setEditMode] = useState<boolean>(false)

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
      <Separator size={10} />
      <Text size="sm">{session?.user?.email}</Text>
      <Separator size={30} />

      <TextInput value={firstName} onChangeText={(text) => setFirstName(text)} editable={editMode} label="First Name" />
      <Separator size={20} />
      <TextInput value={lastName} onChangeText={(text) => setLastName(text)} editable={editMode} label="Last Name" />

      <Separator size={40} />

      {editMode ? (
        <>
          <Button
            title={loading ? 'Loading ...' : 'Save'}
            onPress={() => {
              updateProfile({ first_name: firstName, last_name: lastName })
              setEditMode(false)
            }}
            disabled={loading}
          />
          <Button
            title={'Cancel'}
            onPress={() => {
              setEditMode(false)
              getProfile() // TODO: manage state instead of making another call like this
            }}
          />
        </>
      ) : (
        <Button title={'Edit Profile'} onPress={() => setEditMode(true)} />
      )}

      <BottomView>
        <Button
          title="Log Out"
          backgroundColor="gray"
          onPress={() => {
            supabase.auth.signOut()
            navigation.navigate('Home')
          }}
        />
      </BottomView>
    </ParentView>
  )
}
