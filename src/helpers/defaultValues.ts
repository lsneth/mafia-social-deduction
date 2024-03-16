import { GameContext, Player, User, UserContext } from '../types/types'

export const defaultPlayer: Player = {
  playerId: '',
  firstName: '',
  lastName: '',
  joinTime: '',
  isAlive: true,
  votesFor: {},
  votesAgainst: {},
  investigated: false,
  role: null,
  causeOfDeath: null,
  isHost: false,
  selectedPlayerId: null,
  gameState: null,
  gamePhase: null,
  roundCount: null,
}

export const defaultGameContextValue: GameContext = {
  gameId: '',
  setGameId: () => {},
  players: [],
  player: defaultPlayer,
  hostId: null,
  roundCount: 0,
  roleCounts: { mafia: 0, detective: 0, commonfolk: 0, total: 0 },
  newGame: async () => {},
  joinGame: async () => {},
  mutatePlayers: () => {},
  deleteGame: () => {},
  loading: true,
  gameState: null,
  gamePhase: null,
}

export const defaultUser: User & { email: string } = {
  id: '',
  updatedAt: '',
  firstName: '',
  lastName: '',
  statsId: '',
  sex: 'male' as 'male',
  email: '',
}

export const defaultUserContextValue: UserContext = {
  user: { ...defaultUser, email: '' },
  updateUserProfile: async () => {},
  signOut: () => {},
  loading: true,
}
