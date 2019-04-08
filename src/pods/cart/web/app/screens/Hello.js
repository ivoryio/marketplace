import React from 'react'
import styled from 'styled-components'

const Hello = () => <Header>Hello from Cart</Header>

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.875em;
  color: #484848;
`

export default Hello
