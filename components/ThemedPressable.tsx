import { forwardRef } from 'react'
import { Pressable, type PressableProps } from 'react-native'

type ThemedPressableProps = PressableProps & {
  secondary?: boolean // set true if button is not the primary call to action
}

export default forwardRef(function ThemedPressable(props: ThemedPressableProps, ref): JSX.Element {
  const { className, secondary = false, ...rest } = props
  return (
    <Pressable
      className={`${
        secondary ? 'bg-mafiaDarkGray' : 'bg-mafiaAccent'
      } p-3 w-full max-w-sm my-1 rounded-full flex items-center ${className}`}
      {...rest}
    />
  )
})
