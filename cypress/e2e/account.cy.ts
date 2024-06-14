function generateRandomString(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }
  return randomString
}

describe('Account', () => {
  it('should render correctly', () => {
    cy.login()
    cy.contains('Account').click()

    cy.contains('Account')
    cy.contains(Cypress.env('automated_testing_email'))
    cy.contains('Name')
    cy.contains('female')
    cy.contains('male')
    cy.contains('Update')
    cy.contains('Sign Out')
  })

  // TODO: figure out how to access value of sex toggle, then test it
  it.only('should update name', () => {
    cy.login()
    cy.contains('Account').click()

    const randomString = generateRandomString()
    cy.get('[data-testid="name-input"]').clear()
    cy.get('[data-testid="name-input"]').type(randomString)
    cy.contains('Update').click()
    cy.go('back')
    cy.contains('Account').click()
    cy.get('[data-testid="name-input"]').should('have.value', randomString)
  })
})
