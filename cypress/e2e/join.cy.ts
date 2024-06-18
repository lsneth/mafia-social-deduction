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

  it.skip('should navigate to /game?id=gameId if gameId is valid, should leave game', () => {
    // This test is a bit hacky. To make this reproducible, I need to remove the player from the game after they join. Right now the best way to do that is with the UI. Since we have to leave the game anyway, I decided to test in here as well. So we join the game, make an assertion, then leave the game and make another assertion. This is not ideal, but it works for now.
    // This also has potential to be flaky; if the test player is ever added but not removed then it will need to be manually removed.
    // TODO: make a cy.removePlayerFromGame command. Call it at the beginning of the test instead of the end to remove flakiness.

    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('test-happy_path')
    cy.get('[data-testid="join-game-button"]').click()

    cy.url().should('eq', 'http://localhost:8081/game?id=test-happy_path')

    cy.contains('Leave Game').click() // remove player to set up test for next time
    cy.url().should('eq', 'http://localhost:8081/home')
  })

  it.skip('should not allow a player to join a game that they have already joined', () => {
    cy.signIn({
      email: Cypress.env('AUTOMATED_TESTING_EMAIL_ALREADY_JOINED'),
      password: Cypress.env('AUTOMATED_TESTING_PASSWORD_ALREADY_JOINED'),
    })
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('test-happy_path')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('You have already joined this game.')
  })

  it.skip('should show an error message if a user tries to join a game but has no name', () => {
    cy.signIn({
      email: Cypress.env('AUTOMATED_TESTING_EMAIL_NO_NAME'),
      password: Cypress.env('AUTOMATED_TESTING_PASSWORD_NO_NAME'),
    })
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('test-happy_path')
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

  it.skip('should show an error message if there are already 15 players in the game', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('test-15_players')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('This game already has 15 players.')
  })

  it.skip("should show an error message if the game is already started (if it isn't in the lobby phase)", () => {
    cy.signIn()
    cy.visit('http://localhost:8081/join')

    cy.get('[data-testid="game-id-input"]').type('test-already_started')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('This game has already started.')
  })
})
