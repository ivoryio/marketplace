import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'
import _ from 'lodash'

import { usePrevious } from './services/hooks'

import { SearchBox } from './components'
import { WatchList, WatchDetails } from './screens'
import ListProvider from './services/ListProvider'
import DetailsProvider from './services/DetailsProvider'

export const RootContext = createContext()
const CatalogEntry = ({
  regionData: { filter, searchTerm, sortRule, source },
  ...props
}) => {
  const validScreens = ['watch-list', 'watch-details']
  const [selectedWatch, setSelectedWatch] = useState('')
  const [currentScreen, setCurrentScreen] = useState('watch-list')

  const prevProps = usePrevious({ filter, searchTerm, sortRule })
  useEffect(() => {
    if (prevProps) {
      if (
        currentScreen !== 'watch-list' &&
        !_.isEqual(prevProps, { filter, searchTerm, sortRule })
      ) {
        setCurrentScreen('watch-list')
      }
    }
  }, [currentScreen, filter, prevProps, searchTerm, sortRule])

  const selectWatch = watchId => {
    setSelectedWatch(watchId)
    navigateTo('watch-details')
  }

  const clearSelectedWatch = () => {
    selectWatch('')
    navigateTo('watch-list')
  }

  const navigateTo = screenName =>
    validScreens.includes(currentScreen)
      ? setCurrentScreen(screenName)
      : console.error(`Invalid screen name. Expected one of ${validScreens}`)

  const returnToList = () =>
    currentScreen !== 'watch-list' ? setCurrentScreen('watch-list') : null

  return (
    <RootContext.Provider
      value={{ clearSelectedWatch, navigateTo, selectedWatch, selectWatch }}>
      <SearchBox initialValue={searchTerm} returnToList={returnToList} />
      {currentScreen.includes('watch-list') ? (
        <ListProvider>
          <WatchList />
        </ListProvider>
      ) : null}

      {currentScreen.includes('watch-details') ? (
        <DetailsProvider>
          <WatchDetails />
        </DetailsProvider>
      ) : null}
    </RootContext.Provider>
  )
}

const ObservedCatalog = observe((app, props$) => {
  const region = app.get('region')
  const regionData$ = region
    .getData$()
    .pipe(map(regionData => ({ regionData })))
  return regionData$
})(CatalogEntry)

CatalogEntry.propTypes = {
  regionData: PropTypes.object
}
ObservedCatalog.propTypes = {
  regionData: PropTypes.object
}

export default ObservedCatalog
