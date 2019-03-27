import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

import 'assets/animations.css'
import fsm from './services/StateMachine'
import { Auth, Home } from './screens'
import { Header } from './components'
import { Flex } from '@ivoryio/kogaio'
import useWindowSize from './services/useWindowSize'

const RootEntry = () => {
  const { innerWidth, innerHeight } = useWindowSize()
  const [currentState, setCurrentState] = useState(fsm.state)
  const [user, setUser] = useState(fsm.user)

  useEffect(() => {
    fsm.listen().subscribe({
      next: newState => _handleStateUpdated(newState),
      error: err => console.error('* Error caught in fsm listener', err),
      complete: () => console.warn(' * fsm is done listening')
    })
  }, [])

  const _handleStateUpdated = newState => {
    const { currentState, user } = newState
    setUser(user)
    setCurrentState(currentState)
  }

  const CurrentScreen = (() => {
    switch (currentState) {
      case 'unauthed':
        return <Auth />
      default:
        return <Home user={user} />
    }
  })()
  return (
    <Flex flexDirection='column'>
      <Header user={user} />
      <Body flexDirection='column' height={innerHeight} width={innerWidth}>
        {CurrentScreen}
      </Body>
    </Flex>
  )
}

const screenSize = css`
  ${props => `
    width: ${props.width}px;
    height: calc(${props.height}px);
  `}
`

const Body = styled(Flex)`
  ${screenSize}
`

export default RootEntry
