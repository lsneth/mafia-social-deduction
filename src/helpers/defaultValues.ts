import { GameContext, Player, UserContext } from '../types/types'

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
  gameState: null,
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
}

export const defaultUser = {
  id: '',
  updatedAt: '',
  firstName: '',
  lastName: '',
  statsId: '',
  sex: 'male' as 'male',
  email: '',
}

export const defaultUserContextValue: UserContext = {
  user: defaultUser,
  updateUserProfile: async () => {},
  signOut: () => {},
  loading: true,
}