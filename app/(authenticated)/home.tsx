import { Link } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import ThemedPressable from '@/components/ThemedPressable'
import ThemedView from '@/components/ThemedView'
import Group from '@/components/Group'
import backgroundImage from '../../assets/images/mafia-bg.png'

export default function AuthenticatedHomeScreen() {
  return (
    <ThemedView bgImageSrc={backgroundImage} className="justify-between">
      <Group>
        <ThemedText type="title">MAFIA</ThemedText>
        <ThemedText type="subtitle">Social Deduction</ThemedText>
      </Group>

      <Group>
        <Link href="/join" asChild>
          <ThemedPressable>
            <ThemedText>Join Game</ThemedText>
          </ThemedPressable>
        </Link>
        <Link href="/game" replace asChild>
          <ThemedPressable>
            <ThemedText>Host Game</ThemedText>
          </ThemedPressable>
        </Link>
        <Link href="/account" asChild>
          <ThemedPressable secondary>
            <ThemedText>Account</ThemedText>
          </ThemedPressable>
        </Link>
      </Group>
    </ThemedView>
  )
}
