describe('account screen', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('/account')

    cy.url().should('eq', 'http://localhost:8081/auth?has-account=true')
  })

  it('should render all elements', () => {
    cy.signIn()
    cy.visit('/account')

    cy.contains('Account')
    cy.contains(Cypress.env('TEST_USER_EMAIL'))
    cy.contains('Name')
    cy.contains('female')
    cy.contains('male')
    cy.contains('Update')
    cy.contains('Sign Out')
  })

  // TODO: figure out how to access value of sex toggle, then test it

  it('should update name', () => {
    cy.intercept('https://krsvqfsdxblshgkwnwnb.supabase.co/rest/v1/profiles').as('nameUpdate')
    cy.signIn()
    cy.addUserName()
    cy.visit('/account')

    cy.get('[data-testid="name-input"]').clear()
    cy.get('[data-testid="name-input"]').type('new name')
    cy.contains('Update').click()
    cy.wait('@nameUpdate')
    cy.reload()

    cy.get('[data-testid="name-input"]').should('have.value', 'new name')
  })

  it('should display error message if user attempts to save empty string as a name', () => {
    cy.signIn()
    cy.addUserName()
    cy.visit('/account')

    cy.get('[data-testid="name-input"]').clear()
    cy.contains('Update').click()

    cy.contains('Please enter a name.')
  })
})
