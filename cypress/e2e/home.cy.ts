describe('home screen', () => {
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

  it('should navigate to join screen', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/home')

    cy.contains('Join Game').click()
    cy.location('pathname').should('eq', '/join')
  })

  it('should host game', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/home')

    cy.contains('Host Game').click()
    cy.location('pathname').should('eq', '/game')

    // clean up for next time
    // TODO: create a cy.deleteGame() command, run it at the beginning of this test to remove flakiness
    cy.contains('Delete Game').click()
  })

  it('should navigate to account screen', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/home')

    cy.contains('Account').click()
    cy.location('pathname').should('eq', '/account')
  })
})
