import React from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import { RootStackParamList } from '../../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

export default function Event({
  route,
  navigation,
}: {
  route: RouteProp<RootStackParamList, 'Event'>
  navigation: NativeStackNavigationProp<RootStackParamList, 'Event'>
}) {
  return (
    <ParentView
      //   backgroundImage={role?.image} //TODO add isNight/isDay to GameProvider. add the corresponding bg image.
      //   gradientValues={['#000000', 'transparent', 'transparent', 'transparent', '#000000']}
      //   resizeMode="contain"
      paddingTop={30}
    >
      <Text size="lg">{route.params.eventText}</Text>
    </ParentView>
  )
}
