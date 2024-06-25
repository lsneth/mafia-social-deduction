describe('join game screen', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('/join')

    cy.url().should('eq', 'http://localhost:8081/auth?has-account=true')
  })

  it('should render all elements', () => {
    cy.cleanSignIn()
    cy.visit('/join')

    cy.contains('Join Game')
    cy.contains('Enter a code to join a game.')
    cy.get('[data-testid="game-id-input"]')
    cy.get('[data-testid="join-game-button"]')
  })

  it('should join game and navigate to /game?id=gameId if gameId is valid', () => {
    cy.setUpGame({ hostedByMe: false })
    cy.visit('/join')

    cy.get('[data-testid="game-id-input"]').type(Cypress.env('TEST_GAME_ID'))
    cy.get('[data-testid="join-game-button"]').click()

    cy.url().should('eq', `http://localhost:8081/game?id=${Cypress.env('TEST_GAME_ID')}`)
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
    cy.setUpGame({ hostedByMe: false, numOtherPlayers: 14 })
    cy.visit('/join')

    cy.get('[data-testid="game-id-input"]').type(Cypress.env('TEST_GAME_ID'))
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('This game already has 15 players.')
  })

  it("should show an error message if the game is already started (if it isn't in the lobby phase)", () => {
    cy.setUpGame({ hostedByMe: false, phase: 'role' })

    cy.visit('/join')

    cy.get('[data-testid="game-id-input"]').type(Cypress.env('TEST_GAME_ID'))
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('This game has already started.')
  })

  it('should show an error message if a user tries to join when they are already in a game', () => {
    cy.setUpGame()
    cy.visit('/join')

    cy.get('[data-testid="game-id-input"]').type('blah')
    cy.get('[data-testid="join-game-button"]').click()

    cy.contains('You are already in a game.')
  })
})
