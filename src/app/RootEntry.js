import React, { useState, useEffect } from 'react'
import { Flex } from '@ivoryio/kogaio'

import fsm from './services/StateMachine'
import { Header, NavMenu } from './components'
import { Cart, Landing, Profile } from './screens'

const RootEntry = () => {
  const [currentState, setCurrentState] = useState(fsm.state)
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

  const transitionToState = nextState => () => {
    const transitionEvent = new CustomEvent('transition', {
      detail: { nextState }
    })
    window.dispatchEvent(transitionEvent)
  }

  const CurrentScreen = (() => {
    switch (currentState) {
      case 'profile':
        return Profile
      case 'cart':
        return Cart
      default:
        return Landing
    }
  })()
  return (
    <Flex flexDirection='column'>
      <Header transitionToState={transitionToState} user={fsm.user} />
      {currentState.includes('landing') ? <NavMenu /> : null}
      <CurrentScreen />
    </Flex>
  )
}

export default RootEntry
