export type Role = 'mafia' | 'investigator' | 'innocent'

export type Phase = 'lobby' | 'role' | 'mafia' | 'investigator' | 'innocent'

export type Event = 'INSERT' | 'UPDATE' | 'DELETE'

export type Player = {
  playerId: string
  name: string
  role: Role
  selectedPlayerId: string
  isAlive: boolean
  hasBeenInvestigated: boolean
  isHost: boolean
  phase: Phase
}

export type Change = {
  commit_timestamp: string // '2023-10-27T14:02:37.898Z'
  errors: any
  eventType: Event
  new: Player
  old: Player
  schema: 'public'
  table: string
}
