describe('Account', () => {
  it('should render correctly', () => {
    cy.login()
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
