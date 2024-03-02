import React, { useState } from 'react'
import { Alert } from 'react-native'
import { supabase } from '../lib/supabase'
import { RootStackParamList } from '../../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Button from '../components/Button'
import Separator from '../components/Separator'
import TextInput from '../components/TextInput'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import en from '../locales/en.json'

export default function CreateAccount({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateAccount'>
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    else {
      Alert.alert('Please check your email for a verification link.')
    }
    setLoading(false)
  }

  return (
    <ParentView>
      <Text size="md">{en['create-account.welcome.heading']}</Text>
      <Separator size={10} />
      <Text size="sm">{en['create-account.catch-phrase.description']}</Text>
      <Separator size={60} />

      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="email@address.com"
        label={en['create-account.email.label']}
      />
      <Separator size={20} />

      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={en['create-account.password.label']}
        secureTextEntry
        label={en['create-account.password.label']}
      />
      <Separator size={30} />

      <Button
        disabled={loading}
        onPress={() => {
          signUpWithEmail()
          navigation.reset({
            index: 1,
            routes: [
              { name: 'Home' },
              { name: 'Login', params: { firstLogin: true } },
            ],
          })
        }}
      >
        {en['create-account.create-account.action']}
      </Button>
    </ParentView>
  )
}
