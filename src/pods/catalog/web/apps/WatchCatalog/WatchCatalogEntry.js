import React, { createContext, useState, useEffect } from 'react'
import { WatchList, WatchDetails } from './screens'
import CatalogProvider from './services/Provider'
import api from '../../services/catalog.dataservice'
import { isResponseOk } from '../../services/helpers'

export const NavigationContext = createContext()

const WatchCatalogEntry = () => {
  const [currentScreen, setCurrentScreen] = useState('watch-list')
  const [activeWatchId, setActiveWatchId] = useState('')
  const [watchDetails, setWatchDetails] = useState({
    data: {},
    isFetching: true,
    error: null
  })
  const validScreens = ['watch-list', 'watch-details']
  const navigateTo = screenName => {
    validScreens.includes(currentScreen)
      ? setCurrentScreen(screenName)
      : console.error(`Invalid screen name, expected one of ${validScreens}`)
  }

  useEffect(() => {
    const _fetchWatchDetails = async id => {
      try {
        const response = await api.getWatchDetails(id)
        if (isResponseOk(response.status)) {
          const { data } = response
          setWatchDetails({ data, isFetching: false, error: null })
        } else {
          setWatchDetails(prevWatchDetails => ({
            ...prevWatchDetails,
            isFetching: false,
            error: response.error
          }))
        }
      } catch (err) {
        setWatchDetails(prevWatchDetails => ({
          ...prevWatchDetails,
          isFetching: false,
          error: err
        }))
      }
    }

    activeWatchId
      ? _fetchWatchDetails(activeWatchId)
      : setWatchDetails(prevWatchDetails => ({
          ...prevWatchDetails,
          isFetching: true
        }))
  }, [activeWatchId])

  return (
    <CatalogProvider>
      <NavigationContext.Provider
        value={{
          currentScreen,
          navigateTo,
          activeWatchId,
          setActiveWatchId,
          watchDetails
        }}>
        <WatchList />
        <WatchDetails />
      </NavigationContext.Provider>
    </CatalogProvider>
  )
}

export default WatchCatalogEntry
