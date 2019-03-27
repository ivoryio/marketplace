import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Context } from '../services/Provider'

const Hello = () => {
  const { message, fetchMessage, username } = useContext(Context)

  useEffect(() => {
    fetchMessage()
  }, [])

  let msg = message ? `${message} ${username}!` : 'Hi! Please deploy the hello pod microservice by running ivory deploy'

  return <Header>{msg}</Header>
}

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.875em;
  color: #484848;
`

export default Hello
