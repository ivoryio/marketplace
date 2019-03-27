import React from 'react'
import styled from 'styled-components'
import { Region } from 'frint-react'

const Auth = () => <AuthScreen name='auth' />

const AuthScreen = styled(Region)`
  width: 100%;
  height: 100%;
  align-self: center;
  & > div:first-child {
    width: 100%;
    height: 100%;
  }
`

export default Auth
