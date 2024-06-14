describe('Home', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('http://localhost:8081/home')

    cy.location('pathname').should('eq', '/auth')
  })

  it('should render all elements', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/home')

    cy.contains('MAFIA')
    cy.contains('Social Deduction')
    cy.contains('Join Game')
    cy.contains('Host Game')
    cy.contains('Account')
  })

  it('should navigate to account screen', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/home')

    cy.contains('Account').click()
    cy.location('pathname').should('eq', '/account')
  })
})
