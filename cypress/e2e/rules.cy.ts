describe('rules screen', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('/rules')

    cy.url().should('eq', 'http://localhost:8081/auth?has-account=true')
  })

  it('should render all elements', () => {
    cy.cleanSignIn()
    cy.visit('/rules')

    cy.contains('Introduction')
    cy.contains('Objective')
    cy.contains('Gameplay')
  })
})
