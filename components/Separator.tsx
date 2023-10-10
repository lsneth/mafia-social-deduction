import { StyleSheet, View } from 'react-native'

export default function Separator({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const styles = StyleSheet.create({
    sm: {
      marginTop: 10,
      marginBottom: 10,
    },
    md: {
      marginTop: 25,
      marginBottom: 25,
    },
    lg: {
      marginTop: 50,
      marginBottom: 50,
    },
  })

  return <View style={styles[size]} />
}
