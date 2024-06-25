describe('role screen', () => {
  it('should render all elements (mafia)', () => {
    cy.setUpGame({ phase: 'role', numOtherPlayers: 4, myRole: 'mafia' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains("You're a")
    cy.contains('MAFIA')
    cy.contains('Victory')
    cy.contains('You win when all non-mafia players are dead.')
    cy.contains('Special')
    cy.contains('The mafia team kills a player every night.')
    cy.contains('Ready')
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
    cy.contains('Ready')
  })

  it('should render all elements (innocent)', () => {
    cy.setUpGame({ phase: 'role', numOtherPlayers: 4, myRole: 'innocent' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains("You're an")
    cy.contains('INNOCENT')
    cy.contains('Victory')
    cy.contains('You win when all the mafia players are dead.')
    cy.contains('Special').should('not.exist')
    cy.contains('Ready')
  })

  it('should render "waiting for other players" after pressing ready (non-host)', () => {
    cy.setUpGame({ hostedByMe: false, addMe: true, phase: 'role', numOtherPlayers: 3 })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)
    // TODO: figure out a way to wait for the WebSocket message
    // eslint-disable-next-line cypress/no-unnecessary-waiting -- there isn't a great way to wait for WebSocket messages with Cypress yet
    cy.wait(1000)

    cy.get('[data-testid="ready-button"]').click()

    cy.contains('Waiting for other players.')
  })

  it('should render "waiting for host" after pressing ready once all players are ready (non-host)', () => {
    cy.setUpGame({ hostedByMe: false, addMe: true, phase: 'role', numOtherPlayers: 3, allReady: true })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)
    // TODO: figure out a way to wait for the WebSocket message
    // eslint-disable-next-line cypress/no-unnecessary-waiting -- there isn't a great way to wait for WebSocket messages with Cypress yet
    cy.wait(1000)

    cy.contains('Waiting for host.')
  })

  it('should render "waiting for other players" button after pressing ready (host)', () => {
    cy.setUpGame({ phase: 'role', numOtherPlayers: 4 })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)
    // TODO: figure out a way to wait for the WebSocket message
    // eslint-disable-next-line cypress/no-unnecessary-waiting -- there isn't a great way to wait for WebSocket messages with Cypress yet
    cy.wait(1000)

    cy.get('[data-testid="ready-button"]').click()

    cy.get('[data-testid="start-mafia-phase-button"]').should('contain.text', 'Waiting for other players.')
  })

  it('should render "start mafia phase" button after all players are ready (host)', () => {
    cy.setUpGame({ phase: 'role', numOtherPlayers: 4, allReady: true })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)
    // TODO: figure out a way to wait for the WebSocket message
    // eslint-disable-next-line cypress/no-unnecessary-waiting -- there isn't a great way to wait for WebSocket messages with Cypress yet
    cy.wait(1000)

    cy.get('[data-testid="start-mafia-phase-button"]').should('contain.text', 'Start Mafia Phase')
  })

  it('should render mafia screen when "start mafia phase" is clicked (host)', () => {
    cy.setUpGame({ phase: 'role', numOtherPlayers: 4, allReady: true })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)
    // TODO: figure out a way to wait for the WebSocket message
    // eslint-disable-next-line cypress/no-unnecessary-waiting -- there isn't a great way to wait for WebSocket messages with Cypress yet
    cy.wait(1250)

    cy.get('[data-testid="start-mafia-phase-button"]').click()

    cy.contains('Mafia screen')
  })
})
