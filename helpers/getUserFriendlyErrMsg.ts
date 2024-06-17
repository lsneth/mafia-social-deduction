export default function getUserFriendlyErrMsg(error: string) {
  // join game errors
  if (error.includes('duplicate key value violates unique constraint')) return 'You have already joined this game.'

  if (error.includes('no valid playerName provided')) return 'Please add a name to your account to join a game.'

  if (error.includes('no valid playerId provided')) return 'Please sign in to join a game.'

  if (error.includes('no valid gameId provided') || /relation .* does not exist/.test(error)) {
    return 'Please enter a valid game id.'
  }

  if (error.includes('already has 15 players')) return 'This game already has 15 players.'

  if (error.includes('has already started')) return 'This game has already started.'

  return error
}
