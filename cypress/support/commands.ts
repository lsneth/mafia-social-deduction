/// <reference types="cypress" />

import { Phase, Role } from '@/types/game-types'

export {}

Cypress.Commands.add('cleanSignIn', () => {
  // https://github.com/orgs/supabase/discussions/6177
  cy.task('deleteGames')
  cy.task('addUserName')
  cy.task('signIn').then((sessionData) => {
    localStorage.setItem('sb-krsvqfsdxblshgkwnwnb-auth-token', JSON.stringify(sessionData))
  })
})

// deletes old test game and sets up a new one
Cypress.Commands.add(
  'setUpGame',
  ({
    hostedByMe = true,
    addMe = false,
    numOtherPlayers = 0,
    phase = 'lobby',
    myRole,
    ready = '',
    selectedPlayerId = null,
    result = null,
    murderedPlayerId = null,
  } = {}) => {
    cy.task('deleteGames')
    cy.task('addUserName')
    cy.task('signIn').then((sessionData) => {
      localStorage.setItem('sb-krsvqfsdxblshgkwnwnb-auth-token', JSON.stringify(sessionData))
    })
    cy.task('setUpGame', {
      phase,
      numOtherPlayers,
      hostedByMe,
      addMe,
      myRole,
      ready,
      selectedPlayerId,
      result,
      murderedPlayerId,
    })
  },
)

declare global {
  namespace Cypress {
    interface Chainable {
      cleanSignIn(): Chainable<void>
      setUpGame({
        hostedByMe,
        addMe,
        numOtherPlayers,
        phase,
      }?: {
        hostedByMe?: boolean
        addMe?: boolean
        numOtherPlayers?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
        phase?: Phase
        myRole?: Role
        ready?: string
        selectedPlayerId?: string
        result?: 'mafia' | 'innocent' | null
        murderedPlayerId?: string | null
      }): Chainable<void>
    }
  }
}
