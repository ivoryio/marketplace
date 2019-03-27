import React from 'react'
import PropTypes from 'prop-types'
import { Region } from 'frint-react'
import styled from 'styled-components'

const Home = ({ user }) => (
  <Wrapper>
    <Region name='hello' data={{ user }} />
  </Wrapper>
)

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 500px;
  justify-content: space-evenly;
  font-size: 26px;
  font-style: italic;
`

Home.propTypes = {
  user: PropTypes.object
}

export default Home
