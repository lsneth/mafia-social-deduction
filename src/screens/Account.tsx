import React from 'react'
import { useState } from 'react'
import { useUser } from '../providers/UserProvider'
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
import { ActivityIndicator } from 'react-native'

export default function Account({
  route,
  navigation,
}: {
  route: RouteProp<RootStackParamList, 'Account'>
  navigation: NativeStackNavigationProp<RootStackParamList, 'Account'>
}) {
  const {
    user: { email, id, firstName: dbFirstName, lastName: dbLastName, sex },

    updateUserProfile,
    signOut,
    loading: userLoading,
  } = useUser()
  console.log('firstName:', dbFirstName)
  const [tempFirstName, setTempFirstName] = useState<string>('') // state the user changes during edit mode
  const [tempLastName, setTempLastName] = useState<string>('') // state the user changes during edit mode
  const [firstName, setFirstName] = useState<string>(dbFirstName)
  const [lastName, setLastName] = useState<string>(dbLastName)
  const [isMale, setIsMale] = useState<boolean>(sex === 'male')
  const [tempIsMale, setTempIsMale] = useState<boolean>(true)
  const [editMode, setEditMode] = useState<boolean>(route.params.loadInEditMode ? true : false)

  return (
    <ParentView>
      <Text size="md">Account</Text>
      <Separator size={10} />
      <Text size="sm">{email}</Text>
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
              updateUserProfile({
                id,
                firstName: tempFirstName,
                lastName: tempLastName,
                sex: tempIsMale ? 'male' : 'female',
              })
              setFirstName(tempFirstName)
              setLastName(tempLastName)
              setIsMale(tempIsMale)
              setEditMode(false)
            }}
            disabled={userLoading}
          >
            {userLoading ? <ActivityIndicator /> : 'SAVE'}
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
        <Button onPress={() => navigation.navigate('Stats')} disabled>
          STATS (COMING SOON)
        </Button>
        <Button
          backgroundColor="gray"
          onPress={() => {
            signOut()
            navigation.navigate('Home')
          }}
        >
          LOG OUT
        </Button>
      </BottomView>
    </ParentView>
  )
}
