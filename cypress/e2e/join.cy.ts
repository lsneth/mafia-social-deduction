describe('Join screen', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('http://localhost:8081/join')

    cy.url().should('eq', 'http://localhost:8081/auth?has-account=true')
  })

  it('should render all elements', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.contains('Join Game')
    cy.contains('Enter a code to join a game.')
    cy.get('[data-testid="game-id-input"]')
    cy.get('[data-testid="join-game-button"]')
  })

  it('should join game and navigate to /game?id=gameId if gameId is valid', () => {
    cy.signIn()
    cy.removePlayerFromGame()
    cy.deleteGame()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('TEST-HAPPY-PATH')
    cy.get('[data-testid="join-game-button"]').click()

    cy.url().should('eq', 'http://localhost:8081/game?id=TEST-HAPPY-PATH')
  })

  it('should not allow a player to join a game if they are already part of a game', () => {
    cy.signIn({
      email: Cypress.env('CYPRESS_HOST_EMAIL'),
      password: Cypress.env('CYPRESS_HOST_PASSWORD'),
    })
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('TEST-HAPPY-PATH')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('You have already joined a game.')
  })

  it('should show an error message if a user tries to join a game but has no name', () => {
    cy.signIn({
      email: Cypress.env('CYPRESS_NO_NAME_EMAIL'),
      password: Cypress.env('CYPRESS_NO_NAME_PASSWORD'),
    })
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('TEST-HAPPY-PATH')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('Please add a name to your account to join a game.')
  })

  it('should show an error message if the game does not exist', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('bad-id')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('Please enter a valid game id.')
  })

  it('should show an error message if an empty string is submitted', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('Please enter a valid game id.')
  })

  it('should show an error message if there are already 15 players in the game', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('TEST-15-PLAYERS')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('This game already has 15 players.')
  })

  it("should show an error message if the game is already started (if it isn't in the lobby phase)", () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('TEST-ALREADY-STARTED')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('This game has already started.')
  })
})
