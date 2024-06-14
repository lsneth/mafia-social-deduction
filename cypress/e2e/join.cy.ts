describe('Home', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('http://localhost:8081/join')

    cy.location('pathname').should('eq', '/auth')
  })

  it('should render all elements', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.contains('Join Game')
    cy.contains('Enter a code to join a game.')
    cy.get('[data-testid="game-id-input"]')
    cy.get('[data-testid="join-game-button"]')
  })

  it('should show an error message if the game does not exist', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('bad-id')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('The game code you entered does not exist.')
  })

  it('should show an error message if an empty string is submitted', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('Please enter a game code.')
  })

  it('should show an error message if an empty string is submitted', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('test:15_players')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('There are already 15 players in the game.')
  })

  it('should navigate to /game?id=gameId if gameId is valid', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('test:happy_path')
    cy.get('[data-testid="join-game-button"]').click()

    cy.url().should('eq', 'http://localhost:8081/game?id=test%3Ahappy_path')
  })
})
