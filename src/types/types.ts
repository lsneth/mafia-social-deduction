import { signOut, updateUserProfile } from '../services/userServices'

export type GameContext = {
  gameId: string | undefined
  setGameId: React.Dispatch<React.SetStateAction<string | undefined>>
  players: Player[] | undefined
  player: Player | undefined
  roleCounts: RoleCount | undefined
  newGame: () => Promise<void>
  joinGame: ({ gameId, isHost }: { gameId: string; isHost?: boolean }) => Promise<void>
  mutatePlayers: (gameId: string) => void
  deleteGame: (gameId: string) => void
  loading: boolean
  gameState: 'waiting' | 'playing' | 'done'
}

export type Player = {
  player_id: string // 'bab1a7b5-0316-4840-9af8-ce044d687d80'
  first_name: string //'Luke'
  last_name: string //'Nethercott'
  join_time: string // '2023-11-02T18:19:32.471926+00:00'
  is_alive: boolean
  votes_for: any // TODO
  votes_against: any // TODO
  investigated: boolean
  role: 'commonfolk' | 'detective' | 'mafia'
  cause_of_death: 'murder' | 'execution' | null
  is_host: boolean
  game_state: 'waiting' | 'playing' | 'done'
}

export type Change = {
  commit_timestamp: string // '2023-10-27T14:02:37.898Z'
  errors: any // TODO
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: Player
  old: Player
  schema: 'game_sessions'
  table: string & { length: 6 }
}

export type PlayersReducerAction =
  | {
      type: 'UPDATE' | 'INSERT' | 'DELETE'
      new: Player
      old: Player
    }
  | {
      type: 'mutate'
      players: Player[]
    }

export type BackendUser = {
  id: string
  updated_at: string
  first_name: string
  last_name: string
  stats_id: string
  sex: 'male' | 'female'
}

export type User = {
  id: string
  updatedAt: string
  firstName: string
  lastName: string
  statsId: string
  sex: 'male' | 'female'
  email: string
}

export type UserContext = {
  user: User
  updateUserProfile: typeof updateUserProfile
  signOut: typeof signOut
  loading: boolean
}

export type RoleCount = {
  mafia: number
  detective: number
  commonfolk: number
  total: number
}
