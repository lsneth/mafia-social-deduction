import { signOut, updateUserProfile } from '../services/mafiaServices'

export type GameContext = {
  gameId: string
  player: Player | undefined
  players: Player[] | undefined
  joinGame: (gameId: string) => void
  mutatePlayers: (gameId: string) => void
  deleteGame: (gameId: string) => void
  createGame: () => Promise<string>
  roleCounts: RoleCount
  loading: boolean
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
}

export type Change = {
  commit_timestamp: string // '2023-10-27T14:02:37.898Z'
  errors: any // TODO
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: Player
  old: Player
  schema: 'game_sessions'
  table: `gs_${string}` & { length: 9 }
}

export type PlayersReducerAction =
  | {
      type: 'UPDATE' | 'INSERT' | 'DELETE'
      new: Player
      old: Player
    }
  | {
      type: 'mutate'
      mutation: Player[]
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
