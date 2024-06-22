export type Role = 'mafia' | 'investigator' | 'innocent'

export type Phase = 'lobby' | 'role' | 'mafia' | 'investigator' | 'innocent'

export type Event = 'INSERT' | 'UPDATE' | 'DELETE'

export type Player = {
  game_id: string
  has_been_investigated: boolean
  is_alive: boolean
  is_host: boolean
  name: string
  profile_id: string
  role: Role
  selected_player_id: string
}

export type Change = {
  commit_timestamp: string // '2023-10-27T14:02:37.898Z'
  errors: any
  eventType: Event
  new: Player
  old: Player
  schema: 'public'
  table: 'players'
}
