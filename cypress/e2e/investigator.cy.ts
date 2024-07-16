describe('investigator screen', () => {
  it('should render all elements (investigator)', () => {
    cy.setUpGame({ phase: 'investigator', numOtherPlayers: 4, myRole: 'investigator' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('INVESTIGATOR PHASE')
    cy.contains('Vote for the person you would like to investigate.')
    cy.contains('Me')
    cy.contains('investigator')
    cy.contains('test1')
    cy.contains('0')
    cy.contains('test2')
    cy.contains('test3')
    cy.contains('test4')
    cy.get('[data-testid="investigate-button"]').should('not.be.visible')
  })

  it('should render all elements (non-investigators)', () => {
    cy.setUpGame({ phase: 'investigator', numOtherPlayers: 4, myRole: 'innocent' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('INVESTIGATOR PHASE')
    cy.contains('Close your eyes and go to sleep.')
    cy.contains('Me').should('not.exist')
    cy.contains('investigator').should('not.exist')
    cy.contains('test1').should('not.exist')
    cy.contains('0').should('not.exist')
    cy.contains('test2').should('not.exist')
    cy.contains('test3').should('not.exist')
    cy.contains('test4').should('not.exist')
    cy.get('[data-testid="investigate-button"]').should('not.exist')
  })

  it('should play audio (host)', () => {
    cy.intercept('http://localhost:8081/assets/?unstable_path=*sleepMafia.mp3*').as('sleepMafia')
    cy.intercept('http://localhost:8081/assets/?unstable_path=*wakeInvestigator.mp3*').as('wakeInvestigator')
    cy.setUpGame({ phase: 'investigator', numOtherPlayers: 4 })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    // cy.wait('@sleepMafia') // TODO: figure out why this passes alone but fails when run with other tests. This is because of chrome's autoplay restrictions
    cy.wait('@wakeInvestigator', { timeout: 10000 }) // timeout is necessary because of the audio delay
  })

  it('should not play audio (non-host)', () => {
    cy.intercept('http://localhost:8081/assets/?unstable_path=*sleepMafia.mp3*').as('sleepMafia')
    cy.intercept('http://localhost:8081/assets/?unstable_path=*wakeInvestigator.mp3*').as('wakeInvestigator')
    cy.setUpGame({ hostedByMe: false, addMe: true, numOtherPlayers: 3, phase: 'investigator' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    // eslint-disable-next-line cypress/no-unnecessary-waiting -- necessary because of the audio delay
    cy.wait(6500)
    cy.get(`@sleepMafia.all`).its('length').should(`equal`, 0)
    cy.get(`@wakeInvestigator.all`).its('length').should(`equal`, 0)
  })

  it('should disable investigate button until player selects another player', () => {
    cy.setUpGame({
      phase: 'investigator',
      numOtherPlayers: 4,
      myRole: 'investigator',
      selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.get('[data-testid="investigate-button"]').click()
    cy.get('[data-testid="investigate-button"]')
  })

  it('should show investigate button once player selects another player', () => {
    cy.setUpGame({
      phase: 'investigator',
      numOtherPlayers: 4,
      myRole: 'investigator',
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('test1').click()
    cy.get('[data-testid="investigate-button"]').should('be.visible')
  })

  it('should disable ready if player is already ready', () => {
    cy.setUpGame({
      phase: 'investigator',
      numOtherPlayers: 12, // 12 players so that there are 2 investigators
      myRole: 'investigator',
      ready: Cypress.env('TEST_USER_ID'),
      selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Waiting for other investigators...').click()
    cy.contains('Waiting for other investigators...')
  })

  it('should ready player when they click investigate button', () => {
    cy.setUpGame({
      phase: 'investigator',
      numOtherPlayers: 4,
      myRole: 'investigator',
      selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Investigate').click()
    cy.contains('test1 is an innocent')
  })

  it("should show the majority selected player's role once all players are ready", () => {
    cy.setUpGame({
      phase: 'investigator',
      numOtherPlayers: 4,
      myRole: 'investigator',
      selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
      ready: Cypress.env('TEST_USER_ID'),
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('test1 is an innocent')
    cy.contains('innocent')
  })

  it('should start execution phase', () => {
    cy.setUpGame({
      phase: 'investigator',
      numOtherPlayers: 4,
      myRole: 'investigator',
      selectedPlayerId: Cypress.env('TEST_USER_ID_1'),
      ready: Cypress.env('TEST_USER_ID'),
      murderedPlayerId: Cypress.env('TEST_USER_ID_1'),
    })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('Confirm').click()
    cy.contains('test1, an innocent, was murdered last night!')
  })
})
