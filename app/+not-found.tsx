import Spacer from '@/components/Spacer'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { Link, Stack } from 'expo-router'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ThemedView className="justify-center">
        <ThemedText>404 - This page is in witness protection</ThemedText>
        <Spacer />
        <Link href="/home" replace asChild>
          <ThemedPressable>
            <ThemedText>Go to home screen</ThemedText>
          </ThemedPressable>
        </Link>
        <Spacer size={20} />
      </ThemedView>
    </>
  )
}
