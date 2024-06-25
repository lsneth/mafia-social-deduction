describe('lobby screen', () => {
  it('should render all elements (mafia)', () => {
    cy.setUpGame({ phase: 'role', numOtherPlayers: 4, myRole: 'mafia' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains("You're a")
    cy.contains('MAFIA')
    cy.contains('Victory')
    cy.contains('You win when all non-mafia players are dead.')
    cy.contains('Special')
    cy.contains('The mafia team kills a player every night.')
    cy.contains('Continue')
  })

  it('should render all elements (investigator)', () => {
    cy.setUpGame({ phase: 'role', numOtherPlayers: 4, myRole: 'investigator' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains("You're an")
    cy.contains('INVESTIGATOR')
    cy.contains('Victory')
    cy.contains('You win when all the mafia players are dead.')
    cy.contains('Special')
    cy.contains('The investigator team investigates a player every night.')
    cy.contains('Continue')
  })

  it('should render all elements (innocent)', () => {
    cy.setUpGame({ phase: 'role', numOtherPlayers: 4, myRole: 'innocent' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains("You're an")
    cy.contains('INNOCENT')
    cy.contains('Victory')
    cy.contains('You win when all the mafia players are dead.')
    cy.contains('Special').should('not.exist')
    cy.contains('Continue')
  })
})
