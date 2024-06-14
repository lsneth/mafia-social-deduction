describe('Account', () => {
  it('should render correctly', () => {
    cy.visit('http://localhost:8081/auth')
    cy.get('[data-testid="email-input"]').type(Cypress.env('automated_testing_email'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('automated_testing_password'))
    cy.get('[data-testid="sign-in"]').click()
    cy.contains('Account').click()

    cy.contains('Account')
    cy.contains(Cypress.env('automated_testing_email'))
    cy.contains('Name')
    cy.contains('female')
    cy.contains('male')
    cy.contains('Update')
    cy.contains('Sign Out')
  })
})
