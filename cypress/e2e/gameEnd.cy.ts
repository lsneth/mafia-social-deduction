describe('game end screen', () => {
  it('should render all elements (host, mafia victory)', () => {
    cy.setUpGame({ phase: 'end', numOtherPlayers: 4, result: 'mafia' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('The Mafia wins!')
    cy.contains('Me')
    cy.contains('test1')
    cy.contains('test2')
    cy.contains('test3')
    cy.contains('test4')
    cy.contains('mafia')
    cy.contains('investigator')
    cy.contains('innocent')
    cy.contains('Delete Game')
  })

  it('should render all elements (host, innocent victory)', () => {
    cy.setUpGame({ phase: 'end', numOtherPlayers: 4, result: 'innocent' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('The innocent win!')
    cy.contains('Me')
    cy.contains('test1')
    cy.contains('test2')
    cy.contains('test3')
    cy.contains('test4')
    cy.contains('mafia')
    cy.contains('investigator')
    cy.contains('innocent')
    cy.contains('Delete Game')
  })

  it('should render all elements (non-host)', () => {
    cy.setUpGame({ hostedByMe: false, addMe: true, phase: 'end', numOtherPlayers: 3, result: 'mafia' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('The Mafia wins!')
    cy.contains('Me')
    cy.contains('host')
    cy.contains('test1')
    cy.contains('test2')
    cy.contains('test3')
    cy.contains('mafia')
    cy.contains('investigator')
    cy.contains('innocent')
    cy.contains('Leave Game')
  })
})
