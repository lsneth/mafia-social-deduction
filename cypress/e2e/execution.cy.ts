describe('execution screen', () => {
  // eslint-disable-next-line no-only-tests/no-only-tests -- // TODO: fix test
  it.skip('should render all elements (announce overlay)', () => {
    cy.setUpGame({ phase: 'execution', numOtherPlayers: 4, murderedPlayerId: Cypress.env('TEST_USER_ID_1') })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('TEST1')
    cy.contains('WAS MURDERED!')
    cy.contains('test1 was an innocent. They may no longer speak, vote, or participate in any way.')
    cy.contains('Confirm')
  })

  it('should render all elements (after announce overlay)', () => {
    cy.setUpGame({ phase: 'execution', numOtherPlayers: 4 })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Confirm').click()

    cy.contains('EXECUTION PHASE')
    cy.contains('Vote for the person you would like to execute.')
    cy.contains('Me')
    cy.contains('0')
    cy.contains('test1')
    cy.contains('test2')
    cy.contains('test3')
    cy.contains('test4')
    cy.get('[data-testid="vote-button"]').should('not.be.visible')
  })

  it('should play audio (host)', () => {
    cy.intercept('http://localhost:8081/assets/?unstable_path=*sleepInvestigator.mp3*').as('sleepInvestigator')
    cy.intercept('http://localhost:8081/assets/?unstable_path=*wakeAll.mp3*').as('wakeAll')
    cy.setUpGame({ phase: 'execution', numOtherPlayers: 4 })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    // cy.wait('@sleepInvestigator') // TODO: figure out why this passes alone but fails when run with other tests. This could have something to do with chrome's autoplay restrictions
    cy.wait('@wakeAll', { timeout: 10000 }) // timeout is necessary because of the audio delay
  })

  it('should not play audio (non-host)', () => {
    cy.intercept('http://localhost:8081/assets/?unstable_path=*sleepInvestigator.mp3*').as('sleepInvestigator')
    cy.intercept('http://localhost:8081/assets/?unstable_path=*wakeAll.mp3*').as('wakeAll')
    cy.setUpGame({ hostedByMe: false, addMe: true, numOtherPlayers: 3, phase: 'execution' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    // eslint-disable-next-line cypress/no-unnecessary-waiting -- necessary because of the audio delay
    cy.wait(6500)
    cy.get(`@sleepInvestigator.all`).its('length').should(`equal`, 0)
    cy.get(`@wakeAll.all`).its('length').should(`equal`, 0)
  })

  it('should disable (in addition to 0 opacity) vote button until player selects another player', () => {
    cy.setUpGame({
      phase: 'execution',
      numOtherPlayers: 4,
      selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Confirm').click()

    cy.get('[data-testid="vote-button"]').click()
    cy.get('[data-testid="vote-button"]')
  })

  it('should show vote button once player selects another player', () => {
    cy.setUpGame({
      phase: 'execution',
      numOtherPlayers: 4,
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Confirm').click()

    cy.contains('test1').click()
    cy.get('[data-testid="vote-button"]').should('be.visible')
  })

  it('should disable ready if player is already ready', () => {
    cy.setUpGame({
      phase: 'execution',
      numOtherPlayers: 4,
      ready: Cypress.env('TEST_USER_ID'),
      selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Confirm').click()

    cy.contains('Waiting for other players...').click()
    cy.contains('Waiting for other players...')
  })

  it('should ready player when they click vote button', () => {
    cy.setUpGame({
      phase: 'execution',
      numOtherPlayers: 4,
      selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Confirm').click()

    cy.get('[data-testid="vote-button"]').click()
    cy.contains('Waiting for other players...')
  })

  it("should show the majority selected player's role once all players are ready", () => {
    cy.setUpGame({
      phase: 'execution',
      numOtherPlayers: 4,
      selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
      ready: 'all',
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Confirm').click()

    cy.contains('test1 was an innocent')
    cy.contains('innocent')
  })

  // TODO. What makes it tricky is that all players need to start ready to get past the voting stage and then be set to ready again to get into the mafia stage
  // it.skip('should start mafia phase', () => {
  //   cy.setUpGame({
  //     phase: 'execution',
  //     numOtherPlayers: 4,
  //     selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
  //     ready: 'all',
  //   })
  //   cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

  //   cy.contains('Confirm').click()
  //   cy.contains('MAFIA PHASE')
  // })
})
