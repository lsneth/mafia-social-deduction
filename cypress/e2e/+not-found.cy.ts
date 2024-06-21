describe('not found screen', () => {
  it('should render all elements', () => {
    cy.visit('/+not-found', { failOnStatusCode: false })

    cy.contains('404 - This page is in witness protection')
    cy.contains('Go to home screen')
  })

  it.skip('should render all elements (deeper path)', () => {
    cy.visit('/blah/blah/blah', { failOnStatusCode: false })

    cy.contains('404 - This page is in witness protection')
    cy.contains('Go to home screen')
  })

  it.skip('should navigate to home screen (if authenticated)', () => {
    cy.signIn()
    cy.visit('/blahblahblah', { failOnStatusCode: false })

    cy.contains('Go to home screen').click()
    cy.location('pathname').should('eq', '/home')
  })

  it.skip('should navigate to index (if not authenticated)', () => {
    cy.visit('/blahblahblah', { failOnStatusCode: false })

    cy.contains('Go to home screen').click()
    cy.url().should('eq', 'http://localhost:8081/auth?has-account=true')
  })
})
