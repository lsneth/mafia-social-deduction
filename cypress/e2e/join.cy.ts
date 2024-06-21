describe('join game screen', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('/join')

    cy.url().should('eq', 'http://localhost:8081/auth?has-account=true')
  })

  it('should render all elements', () => {
    cy.signIn()
    cy.visit('/join')

    cy.contains('Join Game')
    cy.contains('Enter a code to join a game.')
    cy.get('[data-testid="game-id-input"]')
    cy.get('[data-testid="join-game-button"]')
  })

  it('should join game and navigate to /game?id=gameId if gameId is valid', () => {
    cy.cleanSignIn()
    cy.visit('/join')

    cy.get('[data-testid="game-id-input"]').type(Cypress.env('TEST_GAME_ID'))
    cy.get('[data-testid="join-game-button"]').click()

    cy.url().should('eq', `http://localhost:8081/game?id=${Cypress.env('TEST_GAME_ID')}`)
  })

  it('should show an error message if a user tries to join when they are already part of a game', () => {
    cy.cleanSignIn()
    cy.addPlayerToGame(Cypress.env('TEST_ALREADY_JOINED_GAME_ID'))
    cy.visit('/join')

    cy.get('[data-testid="game-id-input"]').type(Cypress.env('TEST_GAME_ID'))
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('You have already joined a game.')
  })

  it('should show an error message if a user tries to join a game but has no name', () => {
    cy.cleanSignIn()
    cy.deleteUserName()
    cy.visit('/join')

    cy.get('[data-testid="game-id-input"]').type(Cypress.env('TEST_GAME_ID'))
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('Please add a name to your account to join a game.')
  })

  it('should show an error message if the game does not exist', () => {
    cy.cleanSignIn()
    cy.visit('/join')

    cy.get('[data-testid="game-id-input"]').type('bad-id')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('Please enter a valid game id.')
  })

  it('should show an error message if an empty string is submitted', () => {
    cy.cleanSignIn()
    cy.visit('/join')

    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('Please enter a valid game id.')
  })

  it('should show an error message if there are already 15 players in the game', () => {
    cy.cleanSignIn()
    cy.visit('/join')

    cy.get('[data-testid="game-id-input"]').type(Cypress.env('TEST_15_PLAYER_GAME_ID'))
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('This game already has 15 players.')
  })

  it("should show an error message if the game is already started (if it isn't in the lobby phase)", () => {
    cy.cleanSignIn()
    cy.visit('/join')

    cy.get('[data-testid="game-id-input"]').type(Cypress.env('TEST_ALREADY_STARTED_GAME_ID'))
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('This game has already started.')
  })
})
