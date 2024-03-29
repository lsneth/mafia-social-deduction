import React, { useState } from 'react'
import { Alert } from 'react-native'
import { supabase } from '../lib/supabase'
import { RouteProp } from '@react-navigation/core'
import { RootStackParamList } from '../../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Button from '../components/Button'
import Separator from '../components/Separator'
import TextInput from '../components/TextInput'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import en from '../locales/en.json'
import navigate from '../helpers/navigate'

export default function Login({
  route,
  navigation,
}: {
  route: RouteProp<RootStackParamList, 'Login'>
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <ParentView>
      {route.params.firstLogin ? (
        <>
          <Text size="md">{en['create-account.welcome.heading']}</Text>
          <Separator size={10} />
          <Text size="sm">{en['create-account.catch-phrase.description']}</Text>
          <Separator size={60} />
        </>
      ) : (
        <>
          <Text size="md">{en['login.welcome-back.heading']}</Text>
          <Separator size={10} />
          <Text size="sm">{en['login.catch-phrase.description']}</Text>
          <Separator size={60} />
        </>
      )}

      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="email@address.com"
        autoFocus
        label={en['create-account.email.label']}
      />
      <Separator size={20} />

      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="password"
        secureTextEntry
        label={en['create-account.password.label']}
      />
      <Separator size={30} />

      <Button
        disabled={loading}
        onPress={async () => {
          await signInWithEmail()
          route.params.firstLogin
            ? navigate({
                navigation,
                nextRoute: 'Account',
                params: { loadInEditMode: true },
              })
            : navigation.navigate('Home')
        }}
      >
        {en['home.log-in.action']}
      </Button>
    </ParentView>
  )
}
