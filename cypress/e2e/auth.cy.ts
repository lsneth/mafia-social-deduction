describe('auth screen (sign in)', () => {
  it('should redirect to authenticated home screen if a session exists', () => {
    cy.signIn()
    cy.visit('/auth?has-account=true')

    cy.location('pathname').should('eq', '/home')
  })

  it('should render all elements', () => {
    cy.visit('/auth?has-account=true')

    cy.contains('Welcome to Mafia!')
    cy.contains('Email')
    cy.get('[data-testid="email-input"]')
    cy.contains('Password')
    cy.get('[data-testid="password-input"]')
    cy.get('[data-testid="sign-in"]')
  })

  it('should sign in', () => {
    cy.visit('/auth?has-account=true')

    cy.get('[data-testid="email-input"]').type(Cypress.env('AUTOMATED_TESTING_EMAIL'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('AUTOMATED_TESTING_PASSWORD'))
    cy.get('[data-testid="sign-in"]').click()
    cy.location('pathname').should('eq', '/home')
  })

  it('displays error message for sign in attempt with invalid credentials', () => {
    cy.visit('/auth?has-account=true')

    cy.get('[data-testid="email-input"]').type('invalid email')
    cy.get('[data-testid="password-input"]').type('invalid password')
    cy.get('[data-testid="sign-in"]').click()
    cy.contains('Invalid login credentials. Please try again.')
  })
})

describe('auth screen(sign up)', () => {
  it('should redirect to authenticated home screen if a session exists', () => {
    cy.signIn()
    cy.visit('/auth?has-account=false')

    cy.location('pathname').should('eq', '/home')
  })

  it('should render all elements', () => {
    cy.visit('/auth?has-account=false')

    cy.contains('Welcome to Mafia!')
    cy.contains('Name')
    cy.get('[data-testid="name-input"]')
    cy.contains('Email')
    cy.get('[data-testid="email-input"]')
    cy.contains('Password')
    cy.get('[data-testid="password-input"]')
    cy.get('[data-testid="sign-up"]')
  })

  it('should sign up', () => {
    // there is no simple way to delete users in supabase. so all we can test here is that the right request gets sent
    cy.intercept('https://krsvqfsdxblshgkwnwnb.supabase.co/auth/v1/signup', {}).as('signUp')
    cy.visit('/auth?has-account=false')

    cy.get('[data-testid="name-input"]').type('a random name')
    cy.get('[data-testid="email-input"]').type('aRandom@email.com')
    cy.get('[data-testid="password-input"]').type('aRandomPassword')
    cy.get('[data-testid="sign-up"]').click()

    cy.wait('@signUp')
  })

  it('should display error text for sign up attempt when user is already registered', () => {
    cy.visit('/auth?has-account=false')

    cy.get('[data-testid="name-input"]').type('a random name')
    cy.get('[data-testid="email-input"]').type(Cypress.env('AUTOMATED_TESTING_EMAIL'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('AUTOMATED_TESTING_PASSWORD'))
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('An account with that email already exists.')
  })

  it('should display error text for sign up attempt with too short password', () => {
    cy.visit('/auth?has-account=false')

    cy.get('[data-testid="name-input"]').type('a random name')
    cy.get('[data-testid="email-input"]').type(Cypress.env('AUTOMATED_TESTING_EMAIL'))
    cy.get('[data-testid="password-input"]').type('short')
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('Password should be at least 6 characters.')
  })

  it('should display error text for sign up attempt with no name', () => {
    cy.visit('/auth?has-account=false')

    cy.get('[data-testid="email-input"]').type(Cypress.env('AUTOMATED_TESTING_EMAIL'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('AUTOMATED_TESTING_PASSWORD'))
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('Please enter a valid name.')
  })

  it('should display error text for sign up attempt with no password', () => {
    cy.visit('/auth?has-account=false')

    cy.get('[data-testid="name-input"]').type('a random name')
    cy.get('[data-testid="email-input"]').type(Cypress.env('AUTOMATED_TESTING_EMAIL'))
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('Please enter a valid password.')
  })

  it('should display error text for sign up attempt with no email', () => {
    cy.visit('/auth?has-account=false')

    cy.get('[data-testid="name-input"]').type('a random name')
    cy.get('[data-testid="password-input"]').type(Cypress.env('AUTOMATED_TESTING_PASSWORD'))
    cy.get('[data-testid="sign-up"]').click()
    cy.contains('Please enter a valid email.')
  })
})
