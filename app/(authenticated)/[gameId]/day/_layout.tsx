import { Stack } from 'expo-router'

export default function DayLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => <></>,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}
