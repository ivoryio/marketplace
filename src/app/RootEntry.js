import React, { useState, useEffect } from 'react'
import { Flex } from '@ivoryio/kogaio'
import { Hub } from '@aws-amplify/core'

import fsm from './services/StateMachine'
import { Header, NavMenu } from './components'
import { Cart, Landing, NotFound, ProductsOverview, Profile } from './screens'

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
    const { currentState, payload } = nextState
    setCurrentState({ name: currentState, payload })
  }

  const transitionToState = (destination, payload = {}) => () => {
    Hub.dispatch(
      'TransitionChannel',
      {
        event: 'transition',
        data: { destination, payload },
        message: `Request to transition to ${destination}`
      },
      ''
    )
  }

  const CurrentScreen = (() => {
    const { name: stateName, payload } = currentState
    switch (stateName) {
      case 'landing':
        return <Landing />
      case 'profile':
        return <Profile />
      case 'cart':
        return <Cart />
        case 'product-catalog':
        case 'search-results':
        return (
          <ProductsOverview
            filter={payload.filter}
            searchTerm={payload.searchTerm}
            sortRule={payload.sortRule}
            source={stateName}
          />
        )
      default:
        return <NotFound />
    }
  })()
  return (
    <Flex flexDirection='column'>
      <Header transitionToState={transitionToState} user={fsm.user} />
      {['landing', 'search-results', 'product-catalog'].includes(
        currentState.name
      ) ? (
        <NavMenu statePayload={currentState.payload} />
      ) : null}
      {CurrentScreen}
    </Flex>
  )
}

export default RootEntry
