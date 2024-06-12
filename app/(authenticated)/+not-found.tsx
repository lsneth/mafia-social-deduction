import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <ThemedView style={styles.container}>
        <Link href="/">
          <ThemedText>Go to home screen</ThemedText>
        </Link>
      </ThemedView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
