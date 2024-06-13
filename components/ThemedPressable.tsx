import { forwardRef } from 'react'
import { Pressable, type PressableProps } from 'react-native'

export default forwardRef(function ThemedPressable(props: PressableProps, ref): JSX.Element {
  const { className, ...rest } = props
  return (
    <Pressable
      className={`bg-mafiaAccent p-3 w-full max-w-sm my-1 rounded-full flex items-center ${className}`}
      {...rest}
    />
  )
})
