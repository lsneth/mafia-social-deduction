/// <reference types="cypress" />

export {}

// https://github.com/orgs/supabase/discussions/6177
Cypress.Commands.add(
  'signIn',
  (
    credentials = {
      email: Cypress.env('AUTOMATED_TESTING_EMAIL'),
      password: Cypress.env('AUTOMATED_TESTING_PASSWORD').toString(),
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

declare global {
  namespace Cypress {
    interface Chainable {
      signIn(credentials?: { email: string; password: string }): Chainable<void>
      signOut(): Chainable<void>
      removePlayerFromGame(): Chainable<void>
      deleteGame(): Chainable<void>
    }
  }
}
