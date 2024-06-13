import { forwardRef } from 'react'
import { View, ViewProps } from 'react-native'

type GroupProps = ViewProps & {}

export default forwardRef(function Group(props: GroupProps, ref): JSX.Element {
  const { className, ...rest } = props
  return <View className={`w-full max-w-sm flex items-center`} {...rest} />
})
