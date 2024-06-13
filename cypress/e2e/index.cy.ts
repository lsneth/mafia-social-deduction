describe('unauthenticated home screen', () => {
  it('renders all elements and navigates from unauthenticated home screen to auth screen', () => {
    cy.visit('http://localhost:8081/')
    cy.contains('MAFIA')
    cy.contains('Social Deduction')
    cy.contains('Sign in').click()
    cy.url().should('include', '/auth')
  })
})
