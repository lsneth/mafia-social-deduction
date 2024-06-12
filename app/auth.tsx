import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useAuth } from '@/providers/AuthProvider'
import ThemedView from '@/components/ThemedView'
import { Redirect } from 'expo-router'

export default function AuthScreen() {
  const { loading, signIn, signUp, session } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (session) return <Redirect href="/home" />

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          testID="email-input"
        />
      </ThemedView>
      <ThemedView style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          testID="password-input"
        />
      </ThemedView>
      <ThemedView style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signIn(email, password)} testID="sign-in" />
      </ThemedView>
      <ThemedView style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUp(email, password)} />
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
