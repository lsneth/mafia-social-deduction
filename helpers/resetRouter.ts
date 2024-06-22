import { NavigationProp, StackActions } from '@react-navigation/native'
import { ExpoRouter } from 'expo-router/types/expo-router'

const resetRouter = (
  router: ExpoRouter.Router,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  initialRoute: string,
) => {
  // this is a bit hacky but seems to currently be the best solution since expo doesn't offer any kind of navigation.reset() function
  navigation.dispatch(StackActions.popToTop())
  router.replace(initialRoute)
}

export default resetRouter
