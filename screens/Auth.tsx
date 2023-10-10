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

export default function Auth({
  route,
  navigation,
}: {
  route: RouteProp<RootStackParamList, 'Auth'>
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasAccount, setHasAccount] = useState(route.params.hasAccount)

  async function signInWithEmail() {
    setLoading(true)
    navigation.navigate('Home')
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    console.log(error)

    if (error) Alert.alert(error.message)
    else {
      setHasAccount(true)
      Alert.alert('Please check your email for a verification link.')
    }
    setLoading(false)
  }

  return (
    <ParentView>
      {route.params.hasAccount ? ( // this needs to be different than the state `hasAccount` because we don't want the welcome text to change on a user's first time like we want to button text to
        <>
          <Text size="md">Welcome Back!</Text>
          <Separator size="xs" />
          <Text size="sm">We're excited to see you again!</Text>
        </>
      ) : (
        <>
          <Text size="md">Welcome!</Text>
          <Separator size="xs" />
          <Text size="sm">We're happy for you to join us!</Text>
        </>
      )}

      <Separator size="md" />
      <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="email@address.com" autoFocus />
      <TextInput value={password} onChangeText={(text) => setPassword(text)} placeholder="password" secureTextEntry />

      <Separator size="sm" />

      {hasAccount ? (
        <Button title="LOG IN" disabled={loading} onPress={() => signInWithEmail()} />
      ) : (
        <Button title="CREATE ACCOUNT" disabled={loading} onPress={() => signUpWithEmail()} />
      )}
    </ParentView>
  )
}
