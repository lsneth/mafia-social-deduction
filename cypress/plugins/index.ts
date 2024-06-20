// https://github.com/orgs/supabase/discussions/6177

import { signIn, signOut, removePlayerFromGame, deleteGame, addPlayerToGame } from './tasks'

export default (on: any, config: any) => {
  on('task', {
    signIn,
    signOut,
    removePlayerFromGame,
    deleteGame,
    addPlayerToGame,
  })

  return config
}
