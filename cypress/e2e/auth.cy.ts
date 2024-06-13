describe('sign in', () => {
  it('happy path sign in', () => {
    cy.visit('http://localhost:8081/auth')
    cy.contains('Sign in or Sign up')
    cy.contains('Email')
    cy.get('[data-testid="email-input"]').type(Cypress.env('automated_testing_email'))
    cy.contains('Password')
    cy.get('[data-testid="password-input"]').type(Cypress.env('automated_testing_password'))
    cy.get('[data-testid="sign-up"]')
    cy.get('[data-testid="sign-in"]').click()

    cy.location('pathname').should('eq', '/home')
  })

  it('displays alert for sign in attempt with invalid credentials', () => {
    cy.visit('http://localhost:8081/auth')
    cy.contains('Invalid login credentials').should('not.exist')
    cy.get('[data-testid="email-input"]').type('invalid email')
    cy.get('[data-testid="password-input"]').type('invalid password')
    cy.get('[data-testid="sign-in"]').click()
    cy.contains('Invalid login credentials')
  })
})

describe('sign up', () => {
  // it('happy path sign up', () => {
  // sign up for a new account
  // verify UI reacts correctly and that user was actually created
  // delete new account so it can be repeated next time
  // })
  it('displays alert for sign up attempt when user is already registered', () => {
    cy.visit('http://localhost:8081/auth')
    cy.contains('User already registered').should('not.exist')
    cy.get('[data-testid="email-input"]').type(Cypress.env('automated_testing_email'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('automated_testing_password'))
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('User already registered')
  })

  it('displays alert for sign up attempt with short password', () => {
    cy.visit('http://localhost:8081/auth')
    cy.contains('Password should be at least 6 characters.').should('not.exist')
    cy.get('[data-testid="email-input"]').type(Cypress.env('automated_testing_email'))
    cy.get('[data-testid="password-input"]').type('12345')
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('Password should be at least 6 characters.')
  })
})
