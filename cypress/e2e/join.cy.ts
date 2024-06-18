describe('Join screen', () => {
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

  it('should navigate to /game?id=gameId if gameId is valid', () => {
    cy.signInNoCache() // needs to be used if we're going to log out in the same test
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('test:happy_path')
    cy.get('[data-testid="join-game-button"]').click()

    cy.url().should('eq', 'http://localhost:8081/game?id=test%3Ahappy_path')

    cy.contains('Leave Game').click() // remove player to set up test for next time. Because of this we have to use the signInNoCache command, otherwise the cached session ends up being a logged out one.
  })

  // TODO
  // it('should not allow a player to join a game that they have already joined', () => {
  //   cy.signInNoCache()
  //   cy.visit('http://localhost:8081/join')

  //   cy.get('[data-testid="game-id-input"]').type('test:happy_path')
  //   cy.get('[data-testid="join-game-button"]').click()
  //   cy.visit('http://localhost:8081/join')
  //   cy.get('[data-testid="game-id-input"]').type('test:happy_path')
  //   cy.get('[data-testid="join-game-button"]').click()

  //   cy.contains('You have already joined this game.')

  //   cy.contains('Leave Game').click() // remove player to set up test for next time
  // })

  it('should show an error message if a user tries to join a game but has no name', () => {
    cy.signIn(Cypress.env('AUTOMATED_TESTING_EMAIL_NO_NAME'), Cypress.env('AUTOMATED_TESTING_PASSWORD_NO_NAME'))
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('test:happy_path')
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

    cy.get('[data-testid="game-id-input"]').type('test:15_players')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('This game already has 15 players.')
  })

  it("should show an error message if the game is already started (if it isn't in the lobby phase)", () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('test:already_started')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('This game has already started.')
  })
})
