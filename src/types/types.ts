import { signOut, updateUserProfile } from '../services/userServices'

type Role = 'commonfolk' | 'detective' | 'mafia' | null
type CauseOfDeath = 'murder' | 'lynching' | null
type Sex = 'male' | 'female'
export type ChangeType = 'INSERT' | 'UPDATE' | 'DELETE'
export type UserId = string // todo

export type RoleCount = {
  mafia: number
  detective: number
  commonfolk: number
  total: number
}

export type User = {
  id: UserId
  updatedAt: string | null
  firstName: string | null
  lastName: string | null
  statsId: string
  sex: Sex
}

export type UserContext = {
  user: User & { email: string }
  updateUserProfile: typeof updateUserProfile
  signOut: typeof signOut
  loading: boolean
}

export type Player = {
  playerId: UserId // 'bab1a7b5-0316-4840-9af8-ce044d687d80'
  firstName: string
  lastName: string
  joinTime: string // '2023-11-02T18:19:32.471926+00:00'
  isAlive: boolean
  votesFor: any // TODO
  votesAgainst: any // TODO
  investigated: boolean
  role: Role
  causeOfDeath: CauseOfDeath
  isHost: boolean
  selectedPlayerId: UserId | null
  gamePhase: Role | 'role' | undefined
  roundCount: number | null
}

export type GameContext = {
  gameId: string
  setGameId: React.Dispatch<React.SetStateAction<string>>
  players: Player[]
  player: Player
  roleCounts: RoleCount
  newGame: () => Promise<void>
  joinGame: ({ gameId, isHost }: { gameId: string; isHost?: boolean }) => Promise<void>
  mutatePlayers: (gameId: string) => void
  deleteGame: (gameId: string) => void
  loading: boolean
  roundCount: number
  gamePhase: Role | 'role' | undefined
  hostId: string | null
}

export type Change = {
  commit_timestamp: string // '2023-10-27T14:02:37.898Z'
  errors: any // TODO
  eventType: ChangeType
  new: Player
  old: Player
  schema: 'game_sessions'
  table: string // same as gameId
}
