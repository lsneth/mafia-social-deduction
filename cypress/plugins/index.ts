// https://github.com/orgs/supabase/discussions/6177

import { signIn, signOut, addPlayerToGame, removePlayerFromGame, deleteUserGame, hostGame, addUserName } from './tasks'

export default (on: any, config: any) => {
  on('task', {
    signIn,
    signOut,
    addPlayerToGame,
    removePlayerFromGame,
    deleteUserGame,
    hostGame,
    addUserName,
  })

  return config
}
