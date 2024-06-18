describe('sign in', () => {
  it('should redirect to authenticated home screen if a session exists', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/auth?has-account=true')

    cy.location('pathname').should('eq', '/home')
  })

  it('should render all elements', () => {
    cy.visit('http://localhost:8081/auth?has-account=true')

    cy.contains('Welcome to Mafia!')
    cy.contains('Email')
    cy.get('[data-testid="email-input"]')
    cy.contains('Password')
    cy.get('[data-testid="password-input"]')
    cy.get('[data-testid="sign-in"]')
  })

  it('should sign in', () => {
    cy.visit('http://localhost:8081/auth?has-account=true')

    cy.get('[data-testid="email-input"]').type(Cypress.env('AUTOMATED_TESTING_EMAIL'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('AUTOMATED_TESTING_PASSWORD'))
    cy.get('[data-testid="sign-in"]').click()
    cy.location('pathname').should('eq', '/home')
  })

  it('displays alert for sign in attempt with invalid credentials', () => {
    cy.visit('http://localhost:8081/auth?has-account=true')

    cy.get('[data-testid="email-input"]').type('invalid email')
    cy.get('[data-testid="password-input"]').type('invalid password')
    cy.get('[data-testid="sign-in"]').click()
    cy.contains('Invalid login credentials')
  })
})

describe('sign up', () => {
  // TODO: implement happy path sign up test
  // sign up for a new account
  // verify UI reacts correctly and that user was actually created
  // delete new account so it can be repeated next time

  it('should redirect to authenticated home screen if a session exists', () => {
    cy.signIn()
    cy.visit('http://localhost:8081/auth?has-account=false')

    cy.location('pathname').should('eq', '/home')
  })

  it('should render all elements', () => {
    cy.visit('http://localhost:8081/auth?has-account=false')

    cy.contains('Welcome to Mafia!')
    cy.contains('Name')
    cy.get('[data-testid="name-input"]')
    cy.contains('Email')
    cy.get('[data-testid="email-input"]')
    cy.contains('Password')
    cy.get('[data-testid="password-input"]')
    cy.get('[data-testid="sign-up"]')
  })

  it('should display error text for sign up attempt when user is already registered', () => {
    cy.visit('http://localhost:8081/auth?has-account=false')

    cy.get('[data-testid="name-input"]').type('a random name')
    cy.get('[data-testid="email-input"]').type(Cypress.env('AUTOMATED_TESTING_EMAIL'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('AUTOMATED_TESTING_PASSWORD'))
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('User already registered')
  })

  it('should display error text for sign up attempt with too short password', () => {
    cy.visit('http://localhost:8081/auth?has-account=false')

    cy.get('[data-testid="name-input"]').type('a random name')
    cy.get('[data-testid="email-input"]').type(Cypress.env('AUTOMATED_TESTING_EMAIL'))
    cy.get('[data-testid="password-input"]').type('short')
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('Password should be at least 6 characters.')
  })

  it('should display error text for sign up attempt with no name', () => {
    cy.visit('http://localhost:8081/auth?has-account=false')

    cy.get('[data-testid="email-input"]').type(Cypress.env('AUTOMATED_TESTING_EMAIL'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('AUTOMATED_TESTING_PASSWORD'))
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('Please enter your name.')
  })

  it('should display error text for sign up attempt with no password', () => {
    cy.visit('http://localhost:8081/auth?has-account=false')

    cy.get('[data-testid="name-input"]').type('a random name')
    cy.get('[data-testid="email-input"]').type(Cypress.env('AUTOMATED_TESTING_EMAIL'))
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('Signup requires a valid password')
  })

  it('should display error text for sign up attempt with no email', () => {
    cy.visit('http://localhost:8081/auth?has-account=false')

    cy.get('[data-testid="name-input"]').type('a random name')
    cy.get('[data-testid="password-input"]').type(Cypress.env('AUTOMATED_TESTING_PASSWORD'))
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('Anonymous sign-ins are disabled')
  })
})
