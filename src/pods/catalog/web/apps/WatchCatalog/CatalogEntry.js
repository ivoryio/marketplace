import React, { createContext, useState } from 'react'
import { WatchList, WatchDetails } from './screens'
import DataProvider from './services/DataProvider'

export const RootContext = createContext()
const CatalogEntry = () => {
  const validScreens = ['watch-list', 'watch-details']
  const [currentScreen, setCurrentScreen] = useState('watch-list')

  const navigateTo = screenName =>
    validScreens.includes(currentScreen)
      ? setCurrentScreen(screenName)
      : console.error(`Invalid screen name. Expected one of ${validScreens}`)

  return (
    <RootContext.Provider value={{ navigateTo }}>
      <DataProvider>
        {currentScreen.includes('watch-list') ? <WatchList /> : null}
        {currentScreen.includes('watch-details') ? <WatchDetails /> : null}
      </DataProvider>
    </RootContext.Provider>
  )
}

export default CatalogEntry
