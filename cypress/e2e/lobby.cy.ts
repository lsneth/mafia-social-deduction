describe('lobby screen', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('/game')

    cy.url().should('eq', 'http://localhost:8081/auth?has-account=true')
  })

  it('should render all elements (host)', () => {
    cy.setUpGame()
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains(Cypress.env('TEST_GAME_ID'))
    cy.contains('Invite others with this code')
    cy.contains(Cypress.env('TEST_USER_NAME'))
    cy.contains('1 Player')
    cy.contains('0')
    cy.contains('Mafia')
    cy.contains('Investigators')
    cy.contains('1')
    cy.contains('Innocent')
    cy.contains('Need 4+ More Players')
    cy.contains('Delete Game')
    cy.contains('Leave Game').should('not.exist')
  })

  it('should render all elements (non-host)', () => {
    cy.setUpGame({ hostedByMe: false, addMe: true })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains(Cypress.env('TEST_GAME_ID'))
    cy.contains('Invite others with this code')
    cy.contains('host')
    cy.contains(Cypress.env('TEST_USER_NAME'))
    cy.contains('0')
    cy.contains('Mafia')
    cy.contains('Investigators')
    cy.contains('2')
    cy.contains('Innocents')
    cy.contains('Start Game').should('not.exist')
    cy.contains('Waiting for 3+ more players.')
    cy.contains('Need 4+ More Players').should('not.exist')
    cy.contains('Delete Game').should('not.exist')
    cy.contains('Leave Game')
  })

  it('should render error if url game id is invalid', () => {
    cy.cleanSignIn()
    cy.visit(`/game?id=blah`)

    cy.location('pathname').should('eq', '/+not-found')
  })

  it("should render error if player isn't in the game that matches the game id in the url (they should have gone there through join flow instead)", () => {
    cy.setUpGame({ hostedByMe: false })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.location('pathname').should('eq', '/+not-found')
  })

  it('should start game (host)', () => {
    cy.setUpGame({ phase: 'lobby', numOtherPlayers: 4 })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Start Game').click()

    cy.contains('Victory')
    cy.contains('Ready')
  })

  it('should start game (non-host)', () => {
    cy.setUpGame({ hostedByMe: false, addMe: true, phase: 'role', numOtherPlayers: 3 })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Victory')
    cy.contains('Ready')
  })
})
