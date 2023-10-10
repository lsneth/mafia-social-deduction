import React from 'react'
import { useAuthContext } from '../providers/AuthProvider'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { ImageBackground, View } from 'react-native'
import { Text } from 'react-native-elements'
import Button from '../components/Button'
import globalStyles from '../styles/globalStyles'
import { LinearGradient } from 'expo-linear-gradient'

export default function Home({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> }) {
  const { signedIn } = useAuthContext() // TODO: when signed in, render join game/host game instead of create account/login

  return (
    <View>
      <ImageBackground source={require('../assets/background-images/mafia.png')} style={{ height: '100%' }}>
        <LinearGradient colors={['#000000', 'transparent', '#000000']} style={{ height: '100%' }}>
          <View style={globalStyles.paddingLarge}>
            <Text style={[globalStyles.baseText, globalStyles.center, globalStyles.heading]}>MAFIA</Text>
            <Text style={[globalStyles.baseText, globalStyles.center, globalStyles.subheading]}>Social Deduction</Text>
          </View>
          <View style={[globalStyles.bottom, globalStyles.paddingBottomMedium]}>
            <Button title="CREATE ACCOUNT" onPress={() => navigation.navigate('Auth', { hasAccount: false })} />
            <Button title="LOG IN" onPress={() => navigation.navigate('Auth', { hasAccount: true })} />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}
