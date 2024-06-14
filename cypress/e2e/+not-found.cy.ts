describe('Not found', () => {
  it('should render all elements', () => {
    cy.visit('http://localhost:8081/blahblahblah', { failOnStatusCode: false })

    cy.contains('404 - This page is in witness protection')
    cy.contains('Go to home screen')
  })

  it('should render all elements (deeper path)', () => {
    cy.visit('http://localhost:8081/blah/blah/blah', { failOnStatusCode: false })

    cy.contains('404 - This page is in witness protection')
    cy.contains('Go to home screen')
  })

  it('should navigate to home screen (if authenticated)', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/blahblahblah', { failOnStatusCode: false })

    cy.contains('Go to home screen').click()
    cy.location('pathname').should('eq', '/home')
  })
})
