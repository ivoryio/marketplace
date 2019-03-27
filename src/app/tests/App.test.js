import React from 'react'
import renderer from 'react-test-renderer'
import Root from '../RootEntry'

it('renders renders without crashing', () => {
  const mockedRoot = renderer.create(<Root />).toJSON()
  expect(mockedRoot).toMatchSnapshot()
})
