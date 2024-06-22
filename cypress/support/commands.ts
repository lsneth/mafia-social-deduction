/// <reference types="cypress" />

export {}

// auth
Cypress.Commands.add('cleanSignIn', () => {
  cy.signIn()
  cy.removePlayerFromGame()
  cy.deleteUserGame()
  cy.addUserName()
})
Cypress.Commands.add('signIn', () => {
  // https://github.com/orgs/supabase/discussions/6177
  cy.task('signIn').then((sessionData) => {
    localStorage.setItem('sb-krsvqfsdxblshgkwnwnb-auth-token', JSON.stringify(sessionData))
  })
})
Cypress.Commands.add('signOut', () => cy.task('signOut'))

// game
Cypress.Commands.add('addPlayerToGame', (gameId = Cypress.env('TEST_GAME_ID')) => {
  cy.task('addPlayerToGame', gameId)
})
Cypress.Commands.add('removePlayerFromGame', () => cy.task('removePlayerFromGame'))
Cypress.Commands.add('deleteUserGame', () => cy.task('deleteUserGame'))
Cypress.Commands.add('hostGame', () => cy.task('hostGame'))

// name
Cypress.Commands.add('addUserName', () => cy.task('addUserName'))
Cypress.Commands.add('deleteUserName', () => cy.task('deleteUserName'))

declare global {
  namespace Cypress {
    interface Chainable {
      cleanSignIn(): Chainable<void>
      signIn(): Chainable<void>
      signOut(): Chainable<void>
      addPlayerToGame(gameId?: string): Chainable<void>
      removePlayerFromGame(): Chainable<void>
      deleteUserGame(): Chainable<void>
      hostGame(): Chainable<void>
      addUserName(): Chainable<void>
      deleteUserName(): Chainable<void>
    }
  }
}
