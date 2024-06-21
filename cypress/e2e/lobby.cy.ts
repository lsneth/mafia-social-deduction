describe('lobby screen', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('/game')

    cy.url().should('eq', 'http://localhost:8081/auth?has-account=true')
  })

  it('should render all elements', () => {
    cy.signIn()
    cy.removePlayerFromGame()
    cy.addPlayerToGame()
    cy.visit(`/game?id=${Cypress.env('AUTOMATED_TESTING_GAME_ID')}`)

    cy.contains(Cypress.env('AUTOMATED_TESTING_GAME_ID'))
    cy.contains('Invite others with this code')
    cy.contains('Start Game')
    cy.contains('Delete Game')
    cy.contains('Leave Game')
  })

  it('should render error if url game id is invalid', () => {
    cy.signIn()
    cy.visit(`/game?id=blah`)

    cy.location('pathname').should('eq', '/+not-found')
  })

  it("should render error if player isn't in the game that matches the game id in the url (they should have gone there through join flow instead)", () => {
    cy.signIn()
    cy.removePlayerFromGame()
    cy.visit(`/game?id=${Cypress.env('AUTOMATED_TESTING_GAME_ID')}`)

    cy.location('pathname').should('eq', '/+not-found')
  })
})
