import { Link } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export default function HostScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href="/123456" asChild>
        <Pressable>
          <Text>Host a game</Text>
        </Pressable>
      </Link>
    </View>
  )
}
