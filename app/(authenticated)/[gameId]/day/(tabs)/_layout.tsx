import { Tabs } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="supervisor-account" color={color} />,
          tabBarShowLabel: false,
          tabBarAccessibilityLabel: 'Day',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="history" color={color} />,
          tabBarShowLabel: false,
          tabBarAccessibilityLabel: 'History',
        }}
      />
      <Tabs.Screen
        name="role"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
          tabBarShowLabel: false,
          tabBarAccessibilityLabel: 'Role',
          // TODO: use `tabBarButton` with a pressable that has `onPressIn` and `onPressOut` to only show the role while holding down the tab
        }}
      />
    </Tabs>
  )
}
