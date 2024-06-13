import React, { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import ThemedView from '@/components/ThemedView'
import { Redirect } from 'expo-router'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedTextInput from '@/components/ThemedTextInput'
import Group from '@/components/Group'

export default function AuthScreen() {
  const { loading, signIn, signUp, session } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (session) return <Redirect href="/home" />

  return (
    <ThemedView className="justify-between">
      <Group>
        <ThemedTextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          testID="email-input"
        />
        <ThemedTextInput
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="password"
          autoCapitalize={'none'}
          testID="password-input"
        />
      </Group>
      <Group>
        <ThemedPressable disabled={loading} onPress={() => signIn(email, password)} testID="sign-in">
          <ThemedText>Sign in</ThemedText>
        </ThemedPressable>
        <ThemedPressable disabled={loading} onPress={() => signUp(email, password)} testID="sign-up">
          <ThemedText>Sign up</ThemedText>
        </ThemedPressable>
      </Group>
    </ThemedView>
  )
}
