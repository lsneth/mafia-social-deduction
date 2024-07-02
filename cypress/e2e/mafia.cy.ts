describe('role screen', () => {
  it('should render all elements (mafia)', () => {
    cy.setUpGame({ phase: 'mafia', numOtherPlayers: 4, myRole: 'mafia' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.contains('MAFIA PHASE')
    cy.contains('Tap on the name of the player you would like to kill.')
    cy.contains('test0')
    cy.contains('0')
    cy.contains('test1')
    cy.contains('test2')
    cy.contains('test3')
    cy.contains('test4')
    cy.contains('Ready')
  })

  it('should render all elements (non-mafia)', () => {
    cy.setUpGame({ phase: 'mafia', numOtherPlayers: 4 })
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

  it('should play audio (mafia)', () => {
    cy.intercept('http://localhost:8081/assets/?unstable_path=*sleep.mp3*').as('sleepAudio')
    cy.intercept('http://localhost:8081/assets/?unstable_path=*mafia.mp3*').as('mafiaAudio')
    cy.setUpGame({ phase: 'mafia', numOtherPlayers: 4, myRole: 'mafia' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.wait(['@sleepAudio', '@mafiaAudio'], { timeout: 6000 })
  })

  it('should not play audio (non-mafia)', () => {
    cy.intercept('http://localhost:8081/assets/?unstable_path=*sleep.mp3*').as('sleepAudio')
    cy.intercept('http://localhost:8081/assets/?unstable_path=*mafia.mp3*').as('mafiaAudio')
    cy.setUpGame({ hostedByMe: false, addMe: true, numOtherPlayers: 3 })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    // eslint-disable-next-line cypress/no-unnecessary-waiting -- necessary because @mafiaAudio is on a setTimeout in the code. see success above in 'should play audio (mafia)'
    cy.wait(6000)
    cy.get(`@sleepAudio.all`).its('length').should(`equal`, 0)
    cy.get(`@mafiaAudio.all`).its('length').should(`equal`, 0)
  })

  it('should disable ready button if player has not selected another player', () => {
    cy.setUpGame({ phase: 'mafia', numOtherPlayers: 4, myRole: 'mafia' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.wait(6000)
    cy.contains('Ready').click()
    cy.contains('Ready')
  })

  it.only('should enable ready button once player has selected another player', () => {
    cy.setUpGame({ phase: 'mafia', numOtherPlayers: 4, myRole: 'mafia' })
    cy.visit(`/game?id=${Cypress.env('TEST_GAME_ID')}`)

    cy.wait(6000)
    cy.contains('test1').click()
    cy.wait(1000)
    cy.contains('Ready').click()
    cy.contains('Waiting on other mafia...')
  })
})
