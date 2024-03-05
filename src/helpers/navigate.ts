import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

export default function navigate({
  navigation,
  nextRoute,
  params,
}: {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList
  >
  nextRoute: keyof RootStackParamList
  params?: Readonly<object | undefined>
}): void {
  navigation.reset({
    index: 0,
    routes: [
      {
        name: nextRoute,
        params: params,
      },
    ],
  })
}
