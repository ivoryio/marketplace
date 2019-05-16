import React, { createContext, useState, useEffect } from "react"
import { WatchList, WatchDetails } from "./screens"
import Provider from "./services/Provider"
import api from '../../services/catalog.dataservice'
import { isResponseOk } from '../../services/helpers'

export const NavigationContext = createContext()
const WatchCatalogEntry = () => {
  const [currentScreen, setCurrentScreen] = useState("watch-list")
  const [activeWatchId, setActiveWatchId] = useState('')
  const [watchDetails, setWatchDetails] = useState({ data: {}, isFetching: true, error: null })
  const validScreens = ["watch-list", "watch-details"]
  const NavigateTo = screenName => {
    validScreens.includes(currentScreen) ? setCurrentScreen(screenName) : console.error(`Invalid screen name, expected one of ${validScreens}`)
  }

  useEffect(() => {
    const _fetchWatchDetails = async (id) => {
      try {
        const response = await api.getWatchDetails(id)
        if (isResponseOk(response.status)) {
          const { data } = response
          setWatchDetails({ data, isFetching: false, error: null })
        } else {
          setWatchDetails({ ...watchDetails, isFetching: false, error: response.error })
        }
      } catch (err) {
        setWatchDetails({ watchDetails, isFetching: false, error: err })
      }
    }
    if (activeWatchId) {
      _fetchWatchDetails(activeWatchId)
    } else {
      setWatchDetails({...watchDetails, isFetching: true})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWatchId])

  return (
    <Provider>
      <NavigationContext.Provider
        value={{currentScreen, NavigateTo, activeWatchId, setActiveWatchId, watchDetails}}
      >
        <WatchList />
        <WatchDetails />
      </NavigationContext.Provider>
    </Provider>
  )
}

export default WatchCatalogEntry
