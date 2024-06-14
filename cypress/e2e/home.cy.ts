describe('Home', () => {
  it('should render correctly and navigate to account screen', () => {
    cy.visit('http://localhost:8081/auth')
    cy.get('[data-testid="email-input"]').type(Cypress.env('automated_testing_email'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('automated_testing_password'))
    cy.get('[data-testid="sign-in"]').click()

    cy.location('pathname').should('eq', '/home')
    cy.contains('MAFIA')
    cy.contains('Social Deduction')
    cy.contains('Join Game')
    cy.contains('Host Game')
    cy.contains('Account').click()
    cy.location('pathname').should('eq', '/account')
  })
})
