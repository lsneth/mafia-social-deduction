import { forwardRef } from 'react'
import { Pressable, type PressableProps } from 'react-native'

export const ThemedPressable = forwardRef(function ThemedPressable(props: PressableProps, ref) {
  const { className, ...rest } = props
  return <Pressable className={`bg-red-800 p-3 w-full max-w-sm rounded-full ${className}`} {...rest} />
})
