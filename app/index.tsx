import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { Link, Redirect } from 'expo-router'
import backgroundImage from '../assets/images/mafia-bg.png'
import { useAuth } from '@/providers/AuthProvider'
import Group from '@/components/Group'

export default function HomeScreen() {
  const { session } = useAuth()

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
