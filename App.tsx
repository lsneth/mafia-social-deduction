import 'react-native-url-polyfill/auto'
import Auth from './screens/Auth'
import Account from './screens/Account'
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthProvider from './providers/AuthProvider'

export type RootStackParamList = {
  Home: undefined
  Auth: { hasAccount: boolean }
  Account: undefined
}

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  // TODO: style headers, make them transparent, or hide them: options={{ headerShown: false }}
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Auth" initialParams={{ hasAccount: true }} component={Auth} />
          <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  )
}
