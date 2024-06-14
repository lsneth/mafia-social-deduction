/// <reference types="cypress" />

export {}

Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:8081/auth')
  cy.get('[data-testid="email-input"]').type(Cypress.env('automated_testing_email'))
  cy.get('[data-testid="password-input"]').type(Cypress.env('automated_testing_password'))
  cy.get('[data-testid="sign-in"]').click()
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
    }
  }
}
