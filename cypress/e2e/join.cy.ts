describe('Home', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('http://localhost:8081/join')

    cy.location('pathname').should('eq', '/auth')
  })

  it('should render all elements', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.contains('Join Room')
    cy.contains('Enter a code to join a room.')
    cy.get('[data-testid="room-id-input"]')
    cy.get('[data-testid="join-room-button"]')
  })
})
