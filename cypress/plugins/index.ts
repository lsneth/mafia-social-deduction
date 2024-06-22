// https://github.com/orgs/supabase/discussions/6177

import {
  signIn,
  signOut,
  addPlayerToGame,
  removePlayerFromGame,
  deleteUserGame,
  hostGame,
  addUserName,
  deleteUserName,
} from './tasks'

export default (on: any, config: any) => {
  on('task', {
    signIn,
    signOut,
    addPlayerToGame,
    removePlayerFromGame,
    deleteUserGame,
    hostGame,
    addUserName,
    deleteUserName,
  })

  return config
}
