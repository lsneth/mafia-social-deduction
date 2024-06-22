// https://stackoverflow.com/questions/65481226/react-native-alert-alert-only-works-on-ios-and-android-not-web

import { Alert, AlertButton, Platform } from 'react-native'

const alertPolyfill = (
  title: string,
  message?: string | undefined,
  buttons?: AlertButton[] | undefined,
  //   options?: AlertOptions | undefined
): void => {
  const result = window.confirm([title, message].filter(Boolean).join('\n'))

  if (result) {
    const confirmOption = buttons?.find(({ style }) => style !== 'cancel')
    if (confirmOption?.onPress) confirmOption.onPress()
  } else {
    const cancelOption = buttons?.find(({ style }) => style === 'cancel')
    if (cancelOption?.onPress) cancelOption.onPress()
  }
}

const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert

export default alert
