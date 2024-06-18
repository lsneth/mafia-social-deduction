import React, { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import ThemedView from '@/components/ThemedView'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedTextInput from '@/components/ThemedTextInput'
import Group from '@/components/Group'
import Spacer from '@/components/Spacer'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import { Redirect } from 'expo-router'
import { useGlobalSearchParams } from 'expo-router'

export default function AuthScreen() {
  const { signIn, signUp, session, loading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { 'has-account': hasAccountString } = useGlobalSearchParams()
  const hasAccount = hasAccountString === 'true'

  if (loading) return <ThemedActivityIndicator />
  if (session) return <Redirect href="/home" />

  const displayErrorMessage = (message: string): void => setErrorMessage(message)

  return (
    <ThemedView className="justify-between">
      <Group>
        {!hasAccount ? (
          <ThemedTextInput
            label="Name"
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="John"
            testID="name-input"
          />
        ) : null}
        <ThemedTextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          testID="email-input"
        />
        <ThemedTextInput
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="password"
          testID="password-input"
        />
        {errorMessage ? (
          <>
            <Spacer />
            <ThemedText>{errorMessage}</ThemedText> // TODO: improve error messaging
          </>
        ) : null}
      </Group>
      {hasAccount ? (
        <ThemedPressable onPress={() => signIn(email, password, displayErrorMessage)} testID="sign-in">
          <ThemedText>Sign in</ThemedText>
        </ThemedPressable>
      ) : (
        <ThemedPressable onPress={() => signUp(email, password, name, displayErrorMessage)} testID="sign-up">
          <ThemedText>Sign up</ThemedText>
        </ThemedPressable>
      )}
    </ThemedView>
  )
}
