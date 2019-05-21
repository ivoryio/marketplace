import React, { createContext, useState } from 'react'
import { WatchList, WatchDetails } from './screens'
import ListProvider from './services/ListProvider'
import DetailsProvider from './services/DetailsProvider'

export const RootContext = createContext()
const CatalogEntry = () => {
  const validScreens = ['watch-list', 'watch-details']
  const [selectedWatch, setSelectedWatch] = useState('')
  const [currentScreen, setCurrentScreen] = useState('watch-list')

  const navigateTo = screenName =>
    validScreens.includes(currentScreen)
      ? setCurrentScreen(screenName)
      : console.error(`Invalid screen name. Expected one of ${validScreens}`)

  const selectWatch = watchId => setSelectedWatch(watchId)

  return (
    <RootContext.Provider value={{ navigateTo, selectedWatch, selectWatch }}>
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

export default CatalogEntry
