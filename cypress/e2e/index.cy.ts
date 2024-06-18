describe('index', () => {
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
    cy.contains('Sign up')
  })

  it('should navigate to /auth (sign in)', () => {
    cy.visit('http://localhost:8081/')

    cy.contains('Sign in').click()

    cy.url().should('eq', 'http://localhost:8081/auth?has-account=true')
  })

  it('should navigate to /auth (sign up)', () => {
    cy.visit('http://localhost:8081/')

    cy.contains('Sign up').click()

    cy.url().should('eq', 'http://localhost:8081/auth?has-account=false')
  })
})
