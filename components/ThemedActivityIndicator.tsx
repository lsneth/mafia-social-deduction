import { ActivityIndicator } from 'react-native'
import ThemedView from './ThemedView'
import colors from '@/constants/colors'

export default function ThemedActivityIndicator(): JSX.Element {
  return (
    <ThemedView className="justify-center">
      <ActivityIndicator color={colors.mafiaAccent} size="large" />
    </ThemedView>
  )
}
