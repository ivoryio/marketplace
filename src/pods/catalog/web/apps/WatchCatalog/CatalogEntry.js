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
  regionData: { filter, searchTerm, sortRule, source }
}) => {
  const validScreens = ['watch-list', 'watch-details']
  const [selectedWatch, setSelectedWatch] = useState('')
  const [currentScreen, setCurrentScreen] = useState('watch-list')
  const prevProps = usePrevious({ filter, searchTerm, sortRule })
  useEffect(() => {
    if (prevProps) {
      if (!_.isEqual(prevProps, { filter, searchTerm, sortRule })) {
        setCurrentScreen('watch-list')
      }
    }
  }, [filter, prevProps, searchTerm, sortRule])
  const navigateTo = screenName =>
    validScreens.includes(currentScreen)
      ? setCurrentScreen(screenName)
      : console.error(`Invalid screen name. Expected one of ${validScreens}`)

  const selectWatch = watchId => setSelectedWatch(watchId)

  return (
    <RootContext.Provider value={{ navigateTo, selectedWatch, selectWatch }}>
      <SearchBox initialValue={searchTerm} />
      {currentScreen.includes('watch-list') ? (
        <ListProvider>
          ? <WatchList />{' '}
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
