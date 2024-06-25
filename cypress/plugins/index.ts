// https://github.com/orgs/supabase/discussions/6177

import { deleteGames, signIn, setUpGame, addUserName } from './tasks'

export default (on: any, config: any) => {
  on('task', {
    deleteGames,
    signIn,
    setUpGame,
    addUserName,
  })

  return config
}
