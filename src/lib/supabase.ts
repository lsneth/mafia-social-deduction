import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

// These variables are safe to expose in your Expo app since Supabase unless Row Level Security is disabled on your Database. https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native
const supabaseUrl = 'https://jintzfwoapwwpskedtbz.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbnR6ZndvYXB3d3Bza2VkdGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4NjQ1MTUsImV4cCI6MjAxMjQ0MDUxNX0.0St_ftkB_PSuc0BNvqYvIK5HRvuM3njvWdFDn5eoIJY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  db: {
    schema: 'public, game_sessions',
  },
})
