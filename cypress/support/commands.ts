/// <reference types="cypress" />

export {}

// https://github.com/orgs/supabase/discussions/6177
Cypress.Commands.add(
  'signIn',
  (
    credentials = {
      email: Cypress.env('AUTOMATED_TESTING_EMAIL'),
      password: Cypress.env('AUTOMATED_TESTING_PASSWORD'),
    }
  ) => {
    cy.task('signIn', credentials).then((sessionData) => {
      localStorage.setItem('sb-krsvqfsdxblshgkwnwnb-auth-token', JSON.stringify(sessionData))
    })
  }
)

Cypress.Commands.add('signOut', () => cy.task('signOut'))

Cypress.Commands.add('removePlayerFromGame', () => cy.task('removePlayerFromGame'))

Cypress.Commands.add('deleteGame', () => cy.task('deleteGame'))

Cypress.Commands.add('addPlayerToGame', (gameId = Cypress.env('AUTOMATED_TESTING_GAME_ID')) => {
  cy.task('addPlayerToGame', gameId)
})

declare global {
  namespace Cypress {
    interface Chainable {
      signIn(credentials?: { email: string; password: string }): Chainable<void>
      signOut(): Chainable<void>
      removePlayerFromGame(): Chainable<void>
      deleteGame(): Chainable<void>
      addPlayerToGame(gameId?: string): Chainable<void>
    }
  }
}
