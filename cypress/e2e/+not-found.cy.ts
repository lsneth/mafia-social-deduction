describe('not found page', () => {
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
    console.log('**********this test is running************')
    cy.signIn()
    cy.visit('http://localhost:8081/blahblahblah', { failOnStatusCode: false })

    cy.contains('Go to home screen').click()
    cy.location('pathname').should('eq', '/home')
  })

  it('should navigate to index (if not authenticated)', () => {
    cy.visit('http://localhost:8081/blahblahblah', { failOnStatusCode: false })

    cy.contains('Go to home screen').click()
    cy.url().should('eq', 'http://localhost:8081/auth?has-account=true')
  })
})
