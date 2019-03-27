import React from 'react'
import renderer from 'react-test-renderer'
import Header from '../Header'

// #region initialisation
const mockedUser = {
  attributes: {
    'custom:city': 'Iasi',
    'custom:country': 'Romania',
    'custom:onboarding_done': true,
    email: 'ivory@thinslices.com',
    email_verified: false,
    family_name: 'Slice',
    name: 'Ivory',
    sub: '517617af-15e8-40df-be61-3845e5740c31'
  }
}
// #endregion

it('renders correctly when user is guest', () => {
  const component = renderer.create(<Header />).toJSON()
  expect(component).toMatchSnapshot()
})

it('renders correctly when user authenticated', () => {
  const component = renderer.create(<Header user={mockedUser} />).toJSON()
  expect(component).toMatchSnapshot()
})
