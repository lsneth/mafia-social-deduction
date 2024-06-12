describe('happy path', () => {
  it('happy path works', () => {
    // /
    cy.visit('http://localhost:8081/')
    cy.contains('MAFIA')
    cy.contains('Social Deduction')
    cy.contains('Sign in').click()

    // /auth
    cy.get('[data-testid="email-input"]').type(Cypress.env('automated_testing_email'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('automated_testing_password'))
    cy.get('[data-testid="sign-in"]').click()

    // /home
    cy.contains('MAFIA')
    cy.contains('Social Deduction')
    cy.contains('Join Game')
    cy.contains('Host Game')
    cy.contains('Account')
  })
})
