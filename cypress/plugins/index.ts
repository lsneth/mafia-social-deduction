// https://github.com/orgs/supabase/discussions/6177

import { signIn, signOut } from './tasks'

export default (on: any, config: any) => {
  on('task', {
    signIn,
    signOut,
  })

  return config
}
