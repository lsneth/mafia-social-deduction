import React, { useState } from 'react'
import { Alert, View, TextInput } from 'react-native'
import { supabase } from '../lib/supabase'
import Button from '../components/Button'
import globalStyles from '../styles/globalStyles'
import colors from '../styles/colors'
import { RouteProp } from '@react-navigation/core'
import { RootStackParamList } from '../App'
import Separator from '../components/Separator'

export default function Auth({ route }: { route: RouteProp<RootStackParamList, 'Auth'> }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { hasAccount } = route.params

  async function signInWithEmail() {
    setLoading(true)
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
    setLoading(false)
  }

  return (
    <View style={{ backgroundColor: colors.black, height: '100%' }}>
      <Separator size="md" />
      <View style={[globalStyles.baseTextInputContainer]}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="email@address.com"
          placeholderTextColor={colors.white}
          autoCapitalize={'none'}
          autoFocus
          style={globalStyles.baseTextInput}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={colors.white}
          autoCapitalize={'none'}
          style={globalStyles.baseTextInput}
        />
      </View>
      <Separator size="sm" />
      <View style={{ justifyContent: 'flex-end' }}>
        {hasAccount ? (
          <Button title="LOG IN" disabled={loading} onPress={() => signInWithEmail()} />
        ) : (
          <Button title="CREATE ACCOUNT" disabled={loading} onPress={() => signUpWithEmail()} />
        )}
      </View>
    </View>
  )
}
