export default function getUserFriendlyErrMsg(errorMessage: string) {
  // join game errors
  if (
    errorMessage.includes('duplicate key value violates unique constraint "players_player_id_key"') ||
    errorMessage.includes('Player is already in a game')
  ) {
    return 'You have already joined a game.'
  }

  if (
    errorMessage.includes('null value in column "name" of relation "players" violates not-null constraint') ||
    errorMessage.includes("Player doesn't have a name")
  ) {
    return 'Please add a name to your account to join a game.'
  }

  if (
    errorMessage.includes(
      'insert or update on table "players" violates foreign key constraint "players_game_id_fkey"',
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

  if (errorMessage.includes('Anonymous sign-ins are disabled')) {
    return 'Please enter a valid email.'
  }

  if (errorMessage.includes('Signup requires a valid password')) {
    return 'Please enter a valid password.'
  }

  if (errorMessage.includes('Please enter your name.')) {
    return 'Please enter a valid name.'
  }

  if (errorMessage.includes('Password should be at least 6 characters.')) {
    return errorMessage
  }

  if (errorMessage.includes('User already registered')) {
    return 'An account with that email already exists.'
  }

  if (errorMessage.includes('Invalid login credentials')) {
    return 'Invalid login credentials. Please try again.'
  }

  if (errorMessage.includes('duplicate key value violates unique constraint "games_host_id_key"')) {
    return 'You are already hosting a game.'
  }

  return errorMessage
}
