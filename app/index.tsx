import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { Link, Redirect } from 'expo-router'
import backgroundImage from '../assets/images/mafia-bg.png'
import Group from '@/components/Group'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import { useAuth } from '@/providers/AuthProvider'

export default function HomeScreen() {
  const { session, loading } = useAuth()

  if (loading) return <ThemedActivityIndicator />
  if (session) return <Redirect href="/home" />

  return (
    <ThemedView bgImageSrc={backgroundImage} className="justify-between">
      <Group>
        <ThemedText type="title">MAFIA</ThemedText>
        <ThemedText type="subtitle">Social Deduction</ThemedText>
      </Group>
      <Link href="/auth" asChild>
        <ThemedPressable>
          <ThemedText>Sign in</ThemedText>
        </ThemedPressable>
      </Link>
    </ThemedView>
  )
}
