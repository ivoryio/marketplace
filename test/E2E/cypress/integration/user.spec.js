describe('Ivory Registration Flow', () => {
  const random = Math.random()
    .toString(36)
    .substring(7)

  beforeEach(() => {
    cy.fixture('user').as('admin')
  })

  it('should display sign in screen when app is loaded', function signIn () {
    cy.visit('/')
    cy.get('[data-testid="signin-title"]')
    cy.get('[data-testid="username-input-signin"]').should('have.value', '')
    cy.get('[data-testid="password-input-signin"]').should('have.value', '')
    cy.get('[data-testid="signin-button"]')
    cy.get('[data-testid="anchor-to-signup"]')
  })

  it('should navigate from sign in to sign up', function () {
    cy.get('[data-testid="anchor-to-signup"]').click()
  })

  it('should display sign up screen', function () {
    cy.get('[data-testid="signup-title"]')
    cy.get('[data-testid="email-input-signup"]')
    cy.get('[data-testid="password-input-signup"]')
    cy.get('[data-testid="firstname-input-signup"]')
    cy.get('[data-testid="lastname-input-signup"]')
    cy.get('[data-testid="city-input-signup"]')
    cy.get('[data-testid="country-dropdown-signup"]')
    cy.get('[data-testid="signup-button"]')
    cy.get('[data-testid="anchor-to-signin"]')
  })

  it('should navigate from sign up to sign in', function () {
    cy.get('[data-testid="anchor-to-signin"]').click()
  })

  it('should sign up successfully new user with valid data and redirect him to sign in screen', function signUp () {
    const {
      signUpData: { email, password, firstName, lastName, city }
    } = this.admin
    const randomEmail = random + email

    cy.get('[data-testid="anchor-to-signup"]').click()
    cy.get('[data-testid="email-input-signup"]').type(randomEmail)
    cy.get('[data-testid="password-input-signup"]').type(password)
    cy.get('[data-testid="firstname-input-signup"]').type(firstName)
    cy.get('[data-testid="lastname-input-signup"]').type(lastName)
    cy.get('[data-testid="city-input-signup"]').type(city)
    cy.get('[data-testid="country-dropdown-signup"]').click()
    cy.get('[data-testid="dropdown-romania"]').click()
    cy.get('[data-testid="signup-button"]').click()
    cy.get('[data-testid="signin-title"]')
  })

  it('should be able to sign in into the app after signing up successfully', function signIn () {
    const {
      signIn: { email, password }
    } = this.admin
    const randomEmail = random + email

    cy.wait(2000) // eslint-disable-line cypress/no-unnecessary-waiting
    cy.get('[data-testid="username-input-signin"]').type(randomEmail)
    cy.get('[data-testid="password-input-signin"]').type(password)
    cy.get('[data-testid="signin-button"]').click()
  })

  it('should sign out successfully', function () {
    cy.get('[data-testid="user-menu-toggler"]').click()
    cy.get('[data-testid="signout-button"]').click()
    cy.get('[data-testid="signout-modal"]')
    cy.get('[data-testid="confirm-button-signout"]').click()
    cy.get('[data-testid="signin-title"]')
  })
})
