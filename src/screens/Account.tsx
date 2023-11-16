import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Alert } from 'react-native'
import { useUserContext } from '../providers/UserProvider'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ParentView from '../components/ParentView'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Separator from '../components/Separator'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
import Switch from '../components/Switch'

export default function Account({
  route,
  navigation,
}: {
  route: RouteProp<RootStackParamList, 'Account'>
  navigation: NativeStackNavigationProp<RootStackParamList, 'Account'>
}) {
  const [loading, setLoading] = useState(true)
  const [tempFirstName, setTempFirstName] = useState<string>('') // state the user changes during edit mode
  const [tempLastName, setTempLastName] = useState<string>('') // state the user changes during edit mode
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const { signedIn, session } = useUserContext()
  const [isMale, setIsMale] = useState<boolean>(true)
  const [tempIsMale, setTempIsMale] = useState<boolean>(true)

  const [editMode, setEditMode] = useState<boolean>(route.params.loadInEditMode ? true : false)

  useEffect(() => {
    if (signedIn) getProfile()
  }, [signedIn])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      let { data, error, status } = await supabase
        .schema('public')
        .from('profiles')
        .select(`first_name, last_name, sex`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setIsMale(data.sex === 'male')
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    first_name,
    last_name,
    sex,
  }: {
    first_name: string
    last_name: string
    sex: 'male' | 'female'
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        first_name,
        last_name,
        updated_at: new Date(),
        sex,
      }

      let { error } = await supabase.schema('public').from('profiles').upsert(updates)

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
      <Text size="sm">{session?.user?.email as string}</Text>
      <Separator size={30} />

      <TextInput
        value={editMode ? tempFirstName : firstName}
        onChangeText={(text) => setTempFirstName(text)}
        editable={editMode}
        autoFocus
        label="First Name"
      />
      <Separator size={20} />
      <TextInput
        value={editMode ? tempLastName : lastName}
        onChangeText={(text) => setTempLastName(text)}
        editable={editMode}
        label="Last Name"
      />
      <Separator size={20} />
      <Switch
        value={editMode ? tempIsMale : isMale}
        onChange={() => setTempIsMale(!tempIsMale)}
        stateLabel="Male"
        notStateLabel="Female"
        editable={editMode}
      />

      <Separator size={40} />

      {editMode ? (
        <>
          <Button
            onPress={() => {
              updateProfile({ first_name: tempFirstName, last_name: tempLastName, sex: tempIsMale ? 'male' : 'female' })
              setFirstName(tempFirstName)
              setLastName(tempLastName)
              setIsMale(tempIsMale)
              setEditMode(false)
            }}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'SAVE'}
          </Button>
          <Button
            onPress={() => {
              setEditMode(false)
            }}
          >
            CANCEL
          </Button>
        </>
      ) : (
        <Button
          onPress={() => {
            setEditMode(true)
            setTempFirstName(firstName)
            setTempLastName(lastName)
            setTempIsMale(isMale)
          }}
        >
          EDIT PROFILE
        </Button>
      )}

      <BottomView>
        <Button onPress={() => navigation.navigate('Stats')}>STATS</Button>
        <Button
          backgroundColor="gray"
          onPress={() => {
            supabase.auth.signOut()
            navigation.navigate('Home')
          }}
        >
          LOG OUT
        </Button>
      </BottomView>
    </ParentView>
  )
}
