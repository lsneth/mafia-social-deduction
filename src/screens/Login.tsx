import React, { useState } from 'react'
import { Alert } from 'react-native'
import { supabase } from '../lib/supabase'
import { RouteProp } from '@react-navigation/core'
import { RootStackParamList } from '../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Button from '../components/Button'
import Separator from '../components/Separator'
import TextInput from '../components/TextInput'
import ParentView from '../components/ParentView'
import Text from '../components/Text'

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
          <Text size="md">Welcome!</Text>
          <Separator size={10} />
          <Text size="sm">Hours of fun are just around the corner.</Text>
          <Separator size={60} />
        </>
      ) : (
        <>
          <Text size="md">Welcome Back!</Text>
          <Separator size={10} />
          <Text size="sm">We're excited to see you again!</Text>
          <Separator size={60} />
        </>
      )}

      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="email@address.com"
        autoFocus
        label="Email"
      />
      <Separator size={20} />

      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="password"
        secureTextEntry
        label="Password"
      />
      <Separator size={30} />

      <Button
        disabled={loading}
        onPress={async () => {
          await signInWithEmail()
          route.params.firstLogin
            ? navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }, { name: 'Account', params: { loadInEditMode: true } }],
              })
            : navigation.navigate('Home')
        }}
      >
        LOG IN
      </Button>
    </ParentView>
  )
}
