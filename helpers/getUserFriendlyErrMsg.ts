export default function getUserFriendlyErrMsg(errorMessage: string) {
  // join game errors
  if (
    errorMessage.includes('duplicate key value violates unique constraint "players_player_id_key"') ||
    errorMessage.includes('duplicate key value violates unique constraint "players_pkey"')
  ) {
    return 'You have already joined a game.'
  }

  if (errorMessage.includes('null value in column "name" of relation "players" violates not-null constraint')) {
    return 'Please add a name to your account to join a game.'
  }

  if (
    errorMessage.includes(
      'insert or update on table "players" violates foreign key constraint "players_game_id_fkey"'
    ) ||
    errorMessage.includes('JSON object requested, multiple (or no) rows returned')
  ) {
    return 'Please enter a valid game id.'
  }

  if (errorMessage.includes('there are already 15 players')) {
    return 'This game already has 15 players.'
  }

  if (errorMessage.includes('game has already started')) {
    return 'This game has already started.'
  }

  return errorMessage
}
