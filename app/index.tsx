import { Link } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Mafia: Social Deduction</Text>
      <Link href="/auth" asChild>
        <Pressable>
          <Text>Sign in</Text>
        </Pressable>
      </Link>
    </View>
  )
}
