/// <reference types="cypress" />

export {}

Cypress.Commands.add('signIn', () => {
  cy.session(
    [Cypress.env('AUTOMATED_TESTING_EMAIL'), Cypress.env('AUTOMATED_TESTING_PASSWORD')],
    () => {
      cy.visit('http://localhost:8081/auth')
      cy.get('[data-testid="email-input"]').type(Cypress.env('AUTOMATED_TESTING_EMAIL'))
      cy.get('[data-testid="password-input"]').type(Cypress.env('AUTOMATED_TESTING_PASSWORD'))
      cy.get('[data-testid="sign-in"]').click()
      cy.location('pathname').should('eq', '/home')
    },
    { cacheAcrossSpecs: true }
  )
})

declare global {
  namespace Cypress {
    interface Chainable {
      signIn(): Chainable<void>
    }
  }
}
