import React, { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import ThemedView from '@/components/ThemedView'
import { Redirect } from 'expo-router'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedTextInput from '@/components/ThemedTextInput'
import Group from '@/components/Group'
import Spacer from '@/components/Spacer'

export default function AuthScreen() {
  const { loading, signIn, signUp, session } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const displayErrorMessage = (message: string): void => setErrorMessage(message)

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
        {errorMessage ? (
          <>
            <Spacer />
            <ThemedText>{errorMessage}</ThemedText>
          </>
        ) : null}
      </Group>
      <Group>
        <ThemedPressable
          disabled={loading}
          onPress={() => signIn(email, password, displayErrorMessage)}
          testID="sign-in"
        >
          <ThemedText>Sign in</ThemedText>
        </ThemedPressable>
        <ThemedPressable
          secondary
          disabled={loading}
          onPress={() => signUp(email, password, displayErrorMessage)}
          testID="sign-up"
        >
          <ThemedText>Sign up</ThemedText>
        </ThemedPressable>
      </Group>
    </ThemedView>
  )
}
