import React, { useState, useEffect } from 'react'
import { Flex } from '@ivoryio/kogaio'

import fsm from './services/StateMachine'
import { Header, NavMenu } from './components'
import { Cart, Landing, NotFound, Profile, SearchResults } from './screens'

const RootEntry = () => {
  const [currentState, setCurrentState] = useState({
    name: fsm.state,
    payload: {}
  })
  useEffect(() => {
    fsm.listen().subscribe({
      next: newState => _handleStateUpdated(newState),
      error: err => console.error('* Error caught in fsm listener', err),
      complete: () => console.warn(' * fsm is done listening')
    })
  }, [])

  const _handleStateUpdated = nextState => {
    const { state, payload } = nextState
    setCurrentState({ name: state, payload })
  }

  const transitionToState = nextState => () => {
    const transitionEvent = new CustomEvent('transition', {
      detail: { nextState }
    })
    window.dispatchEvent(transitionEvent)
  }

  const CurrentScreen = (() => {
    const { name: stateName, payload } = currentState
    switch (stateName) {
      case 'profile':
        return <Profile />
      case 'cart':
        return <Cart />
      case 'search-results':
        return <SearchResults searchTerm={payload.searchTerm} />
      case 'landing':
        return <Landing />
      default:
        return <NotFound />
    }
  })()
  return (
    <Flex flexDirection='column'>
      <Header transitionToState={transitionToState} user={fsm.user} />
      {currentState.name.includes('landing') ? <NavMenu /> : null}
      {CurrentScreen}
    </Flex>
  )
}

export default RootEntry
