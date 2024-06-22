describe('home screen', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('/home')

    cy.url().should('eq', 'http://localhost:8081/auth?has-account=true')
  })

  it('should render all elements', () => {
    cy.signIn()
    cy.visit('/home')

    cy.contains('MAFIA')
    cy.contains('Social Deduction')
    cy.contains('Join Game')
    cy.contains('Host Game')
    cy.contains('Account')
  })

  it('should navigate to join screen', () => {
    cy.signIn()
    cy.visit('/home')

    cy.contains('Join Game').click()
    cy.location('pathname').should('eq', '/join')
  })

  it('should host game', () => {
    cy.cleanSignIn()
    cy.visit('/home')

    cy.contains('Host Game').click()

    cy.location('pathname').should('eq', '/game')
  })

  it('should render error if user tries to host but is already hosting a game', () => {
    cy.cleanSignIn()
    cy.hostGame()
    cy.removePlayerFromGame() // this should be impossible but you never know
    cy.visit('/home')

    cy.contains('Host Game').click()

    cy.contains('You are already hosting a game.')
  })

  it('should render error if user tries to host but is already in a game', () => {
    cy.cleanSignIn()
    cy.addPlayerToGame()
    cy.visit('/home')

    cy.contains('Host Game').click()

    cy.contains('You have already joined a game.')
  })

  it('should navigate to account screen', () => {
    cy.signIn()
    cy.visit('/home')

    cy.contains('Account').click()
    cy.location('pathname').should('eq', '/account')
  })
})
