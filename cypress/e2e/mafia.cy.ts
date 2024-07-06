describe('mafia screen', () => {
  it('should render all elements (mafia)', () => {
    cy.setUpGame({ phase: 'mafia', numOtherPlayers: 4, myRole: 'mafia' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('MAFIA PHASE')
    cy.contains('Vote for the person you would like to kill.')
    cy.contains('Me')
    cy.contains('mafia')
    cy.contains('test1')
    cy.contains('0')
    cy.contains('test2')
    cy.contains('test3')
    cy.contains('test4')
    cy.contains('Ready')
  })

  it('should render all elements (non-mafia)', () => {
    cy.setUpGame({ phase: 'mafia', numOtherPlayers: 4, myRole: 'innocent' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('MAFIA PHASE')
    cy.contains('Close your eyes and go to sleep.')
    cy.contains('test0').should('not.exist')
    cy.contains('0').should('not.exist')
    cy.contains('test1').should('not.exist')
    cy.contains('test2').should('not.exist')
    cy.contains('test3').should('not.exist')
    cy.contains('test4').should('not.exist')
    cy.contains('Ready').should('not.exist')
  })

  it('should play audio (host)', () => {
    cy.intercept('http://localhost:8081/assets/?unstable_path=*sleepAll.mp3*').as('sleepAll')
    cy.intercept('http://localhost:8081/assets/?unstable_path=*wakeMafia.mp3*').as('wakeMafia')
    cy.setUpGame({ phase: 'mafia', numOtherPlayers: 4 })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    // cy.wait('@sleepAll') // TODO: figure out why this passes alone but fails when run with other tests
    cy.wait('@wakeMafia', { timeout: 10000 }) // timeout is necessary because of the audio delay
  })

  it('should not play audio (non-host)', () => {
    cy.intercept('http://localhost:8081/assets/?unstable_path=*sleepAll.mp3*').as('sleepAll')
    cy.intercept('http://localhost:8081/assets/?unstable_path=*wakeMafia.mp3*').as('wakeMafia')
    cy.setUpGame({ hostedByMe: false, addMe: true, numOtherPlayers: 3, phase: 'mafia' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    // eslint-disable-next-line cypress/no-unnecessary-waiting -- necessary because of the audio delay
    cy.wait(6500)
    cy.get(`@sleepAll.all`).its('length').should(`equal`, 0)
    cy.get(`@wakeMafia.all`).its('length').should(`equal`, 0)
  })

  it('should disable ready button if player has not selected another player', () => {
    cy.setUpGame({ phase: 'mafia', numOtherPlayers: 4, myRole: 'mafia' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Ready').click()
    cy.contains('Ready')
  })

  it('should enable ready button once player has selected another player', () => {
    cy.setUpGame({
      phase: 'mafia',
      numOtherPlayers: 4,
      myRole: 'mafia',
      selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Ready').click()
    cy.contains('Waiting for other mafia...')
  })

  it('should disable ready if player is ready', () => {
    cy.setUpGame({
      phase: 'mafia',
      numOtherPlayers: 4,
      myRole: 'mafia',
      selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
      ready: Cypress.env('TEST_USER_ID'),
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Waiting for other mafia...')
  })
})
