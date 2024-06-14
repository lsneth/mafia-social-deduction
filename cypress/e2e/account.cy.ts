describe('Account', () => {
  it('should redirect to auth screen if a session does not exist', () => {
    cy.visit('http://localhost:8081/account')

    cy.location('pathname').should('eq', '/auth')
  })

  it('should render all elements', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/account')

    cy.contains('Account')
    cy.contains(Cypress.env('AUTOMATED_TESTING_EMAIL'))
    cy.contains('Name')
    cy.contains('female')
    cy.contains('male')
    cy.contains('Update')
    cy.contains('Sign Out')
  })

  // TODO: figure out how to access value of sex toggle, then test it

  it.only('should update name', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/account')

    cy.get('[data-testid="name-input"]').clear() // TODO: fix the flakiness
    const randomString = generateRandomString()
    cy.get('[data-testid="name-input"]').type(randomString)
    cy.contains('Update').click()
    cy.reload()
    cy.get('[data-testid="name-input"]').should('have.value', randomString)
  })
})

function generateRandomString(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }
  return randomString
}
