import { StyleSheet } from 'react-native'
import { Button as BaseButton } from 'react-native-elements'
import colors from '../styles/colors'
import globalStyles from '../styles/globalStyles'

export default function Button({
  disabled,
  onPress,
  title,
}: {
  disabled?: boolean
  onPress: () => void
  title: string
}) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.red,
      paddingTop: 12,
      paddingBottom: 12,
      margin: 7,
      marginLeft: 25,
      marginRight: 25,
      borderRadius: 22,
    },
  })

  return (
    <BaseButton
      title={title}
      onPress={() => onPress()}
      disabled={disabled}
      titleStyle={globalStyles.baseText}
      buttonStyle={styles.button}
    />
  )
}
