import { NavigationProp, StackActions } from '@react-navigation/native'

const resetRouter = (
  router: any, // TODO: find how to type this properly
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  initialRoute: string,
) => {
  // this is a bit hacky but seems to currently be the best solution since expo doesn't offer any kind of navigation.reset() function
  navigation.dispatch(StackActions.popToTop())
  router.replace(initialRoute)
}

export default resetRouter
