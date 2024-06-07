import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Platform } from 'react-native'

// These variables are safe to expose in your Expo app since Supabase has Row Level Security enabled on your Database.
// https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native
const supabaseUrl = 'https://krsvqfsdxblshgkwnwnb.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyc3ZxZnNkeGJsc2hna3dud25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3Njc4NTgsImV4cCI6MjAzMzM0Mzg1OH0.-GlDIfDvVrauGuuvmZDReVVBN7BIy-SBCvRDGeUf9NI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}), // https://github.com/supabase/supabase-js/issues/870
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
