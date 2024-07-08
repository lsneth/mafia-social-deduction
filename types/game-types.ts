export type Role = 'mafia' | 'investigator' | 'innocent'

export type Phase = 'lobby' | 'role' | 'mafia' | 'investigator' | 'execution' | 'end'

export type Event = 'INSERT' | 'UPDATE' | 'DELETE'

export type Player = {
  game_id: string
  has_been_investigated: boolean
  is_alive: boolean
  name: string
  profile_id: string
  role: Role
  selected_player_id: string
  ready: boolean
  has_been_murdered: boolean
}

export type PlayersChange = {
  commit_timestamp: string // '2023-10-27T14:02:37.898Z'
  errors: any
  eventType: Event
  new: Player
  old: Player
  schema: 'public'
  table: 'players'
}

export type Game = {
  id: string
  host_id: string
  phase: Phase
  result: 'innocent' | 'mafia' | null
  round_count: number
  start_time: string
}

export type GameChange = {
  commit_timestamp: string // '2023-10-27T14:02:37.898Z'
  errors: any
  eventType: Event
  new: Game
  old: Game
  schema: 'public'
  table: 'game'
}
