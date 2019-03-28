import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Flex } from '@ivoryio/kogaio'

import { Header } from './components'
import fsm from './services/StateMachine'
import { Cart, Landing, Profile } from './screens'
import useWindowSize from './services/useWindowSize'

const RootEntry = () => {
  const [currentState, setCurrentState] = useState(fsm.state)
  const { innerWidth, innerHeight } = useWindowSize()
  useEffect(() => {
    fsm.listen().subscribe({
      next: newState => _handleStateUpdated(newState),
      error: err => console.error('* Error caught in fsm listener', err),
      complete: () => console.warn(' * fsm is done listening')
    })
  }, [])

  const _handleStateUpdated = payload => {
    const { currentState } = payload
    setCurrentState(currentState)
  }

  const transitionToState = targetState => () => {
    const transitionEvent = new CustomEvent('transition', {
      detail: { targetState }
    })
    window.dispatchEvent(transitionEvent)
  }

  const CurrentScreen = (() => {
    switch (currentState) {
      case 'profile':
        return <Profile />
      case 'cart':
        return <Cart />
      default:
        return <Landing />
    }
  })()
  return (
    <Container flexDirection='column' width={innerWidth} height={innerHeight}>
      <Header transitionToState={transitionToState} user={fsm.user} />
      {CurrentScreen}
    </Container>
  )
}

const windowSize = ({ width, height }) => css`
  min-width: ${width}px;
  min-height: ${height}px;
`

const Container = styled(Flex)`
  ${windowSize}
`

export default RootEntry
