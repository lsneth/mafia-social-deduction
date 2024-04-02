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
import en from '../locales/en.json'

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

  const [tempFirstName, setTempFirstName] = useState<string>('') // state the user changes during edit mode
  const [tempLastName, setTempLastName] = useState<string>('') // state the user changes during edit mode
  const [firstName, setFirstName] = useState<string>(dbFirstName ?? '')
  const [lastName, setLastName] = useState<string>(dbLastName ?? '') // Provide a default value for dbLastName
  const [isMale, setIsMale] = useState<boolean>(sex === 'male')
  const [tempIsMale, setTempIsMale] = useState<boolean>(true)
  const [editMode, setEditMode] = useState<boolean>(route.params.loadInEditMode ? true : false)

  return (
    <ParentView>
      <Text size="md">{en['account.account.heading']}</Text>
      <Separator size={10} />
      <Text size="sm">{email}</Text>
      <Separator size={30} />

      <TextInput
        value={editMode ? tempFirstName : firstName}
        onChangeText={(text) => setTempFirstName(text)}
        editable={editMode}
        autoFocus
        label={en['account.first-name.label']}
      />
      <Separator size={20} />
      <TextInput
        value={editMode ? tempLastName : lastName}
        onChangeText={(text) => setTempLastName(text)}
        editable={editMode}
        label={en['account.last-name.label']}
      />
      <Separator size={20} />
      <Switch
        value={editMode ? tempIsMale : isMale}
        onChange={() => setTempIsMale(!tempIsMale)}
        stateLabel={en['account.male.label']}
        notStateLabel={en['account.female.label']}
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
            {userLoading ? <ActivityIndicator /> : en['account.save.action']}
          </Button>
          <Button
            onPress={() => {
              setEditMode(false)
            }}
          >
            {en['account.cancel.action']}
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
          {en['account.edit-profile.action']}
        </Button>
      )}

      <BottomView>
        <Button onPress={() => navigation.navigate('Stats')} disabled>
          {en['account.stats-coming-soon.label']}
        </Button>
        <Button
          backgroundColor="gray"
          onPress={() => {
            signOut()
            navigation.navigate('Home')
          }}
        >
          {en['account.log-out.action']}
        </Button>
      </BottomView>
    </ParentView>
  )
}
