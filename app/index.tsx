import { Text, View, Pressable } from 'react-native'
import { Link } from 'expo-router'

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Mafia</Text>
      <Text>Social Deduction</Text>

      <Link href="/join" asChild>
        <Pressable>
          <Text>Join Game</Text>
        </Pressable>
      </Link>
      <Link href="/467958" replace asChild>
        <Pressable>
          <Text>Host Game</Text>
        </Pressable>
      </Link>
      <Link href="/account" asChild>
        <Pressable>
          <Text>Account</Text>
        </Pressable>
      </Link>
    </View>
  )
}
