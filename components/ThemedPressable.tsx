import { forwardRef } from 'react'
import { Pressable, type PressableProps } from 'react-native'

type ThemedPressableProps = PressableProps & {
  secondary?: boolean // set true if button is not the primary call to action
}

export default forwardRef(function ThemedPressable(props: ThemedPressableProps, ref): JSX.Element {
  const { className, secondary = false, disabled, ...rest } = props
  return (
    <Pressable
      className={`${secondary ? 'bg-mafiaDarkGray' : disabled ? 'bg-mafiaGray' : 'bg-mafiaAccent'} flex w-full max-w-sm items-center rounded-full p-3 ${className}`}
      {...rest}
    />
  )
})
