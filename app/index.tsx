import { Text, View, Pressable } from 'react-native'
import { Link } from 'expo-router'
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
