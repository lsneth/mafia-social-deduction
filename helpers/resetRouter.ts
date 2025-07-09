import { NavigationProp, StackActions } from '@react-navigation/native'

const resetRouter = (
  router: any, // TODO: find how to type this properly
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  initialRoute: string,
) => {
  // this is a bit hacky but seems to currently be the best solution since expo doesn't offer any kind of navigation.reset() function
  // 'POP_TO_TOP' can throw a warning if there is no screen to go back to, so only dispatch when possible
  if (navigation.canGoBack()) {
    navigation.dispatch(StackActions.popToTop())
  }
  router.replace(initialRoute)
}

export default resetRouter
