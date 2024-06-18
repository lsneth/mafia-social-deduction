/// <reference types="cypress" />

export {}

// https://github.com/orgs/supabase/discussions/6177
Cypress.Commands.add(
  'signIn',
  (
    credentials = { email: Cypress.env('AUTOMATED_TESTING_EMAIL'), password: Cypress.env('AUTOMATED_TESTING_PASSWORD') }
  ) => {
    cy.task('signIn', credentials).then((sessionData) => {
      localStorage.setItem('sb-krsvqfsdxblshgkwnwnb-auth-token', JSON.stringify(sessionData))
    })
  }
)

Cypress.Commands.add('signOut', () => cy.task('signOut'))

Cypress.Commands.add(
  'signInNoCache',
  (email = Cypress.env('AUTOMATED_TESTING_EMAIL'), password = Cypress.env('AUTOMATED_TESTING_PASSWORD')) => {
    cy.visit('http://localhost:8081/auth')
    cy.get('[data-testid="email-input"]').type(email)
    cy.get('[data-testid="password-input"]').type(password)
    cy.get('[data-testid="sign-in"]').click()
    cy.location('pathname').should('eq', '/home')
  }
)

declare global {
  namespace Cypress {
    interface Chainable {
      // signIn(email?: string, password?: string): Chainable<void>
      signIn(credentials?: { email: string; password: string }): Chainable<void>
      signOut(): Chainable<void>
      signInNoCache(email?: string, password?: string): Chainable<void>
    }
  }
}
