describe('unauthenticated home screen', () => {
  it('should redirect to authenticated home screen if a session exists', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/')

    cy.location('pathname').should('eq', '/home')
  })

  it('should render all elements', () => {
    cy.visit('http://localhost:8081/')

    cy.contains('MAFIA')
    cy.contains('Social Deduction')
    cy.contains('Sign in')
  })

  it('should navigate to /auth', () => {
    cy.visit('http://localhost:8081/')

    cy.contains('Sign in').click()
    cy.location('pathname').should('eq', '/auth')
  })
})
