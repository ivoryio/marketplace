import React from 'react'
import { render, fireEvent, cleanup, act } from 'react-testing-library'
import SignIn from '../SignIn'
import { emailRegex, passwordRegex } from '../../services'

// #region REMOVE ME at your earliest convenience
/**
  [25.03.2019] Remove the function below when jsdom issue is fixed.
  This is a temporary workaround to suppress jsdom's error which fails to parse CSS Stylesheet.
  Related to: https://github.com/jsdom/jsdom/issues/2131
*/
const _ = require('lodash')
const originalConsoleError = console.error
console.error = function (msg) {
  if (_.startsWith(msg, '[vuex] unknown')) return
  if (_.startsWith(msg, 'Error: Could not parse CSS stylesheet')) return
  originalConsoleError(msg)
}
// #endregion

// #region initialisation
const dummyEmail = 'ivory@thinslices.com'
const dummyPassword = 'ivorySecret1!'

const setup = ({ authState }) => {
  const utils = render(<SignIn authState={authState} />)
  const emailInput = utils.getByTestId('username-input-signin')
  const passwordInput = utils.getByTestId('password-input-signin')
  return {
    emailInput,
    passwordInput,
    ...utils
  }
}
// #endregion

afterEach(cleanup)

test('should input a valid format of email and password', () => {
  const { emailInput, passwordInput } = setup({ authState: 'signIn' })
  // #region test email input
  act(() => {
    fireEvent.change(emailInput, { target: { value: dummyEmail } })
  })
  expect(emailInput.value).toBe(dummyEmail)
  const isEmailValid = emailRegex.test(emailInput.value)
  expect(isEmailValid).toBeTruthy()
  // #endregion

  // #region test password input
  act(() => {
    fireEvent.change(passwordInput, { target: { value: dummyPassword } })
  })
  expect(passwordInput.value).toBe(dummyPassword)
  const isPasswordValid = passwordRegex.test(passwordInput.value)
  expect(isPasswordValid).toBeTruthy()
  // #endregion
})
