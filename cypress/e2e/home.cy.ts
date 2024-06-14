describe('Home', () => {
  it('should render correctly and navigate to account screen', () => {
    cy.login()

    cy.location('pathname').should('eq', '/home')
    cy.contains('MAFIA')
    cy.contains('Social Deduction')
    cy.contains('Join Game')
    cy.contains('Host Game')
    cy.contains('Account').click()
    cy.location('pathname').should('eq', '/account')
  })
})
