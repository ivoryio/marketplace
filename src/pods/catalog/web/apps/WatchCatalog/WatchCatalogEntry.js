import React, { createContext, useEffect, useState } from "react"
import { WatchList, WatchDetails } from "./screens"
import Provider from "./services/Provider"

export const ScreensContext = createContext()
const WatchCatalogEntry = () => {
  const [currentScreen, setCurrentScreen] = useState("watch-list")
  const validScreens = ["watch-list", "watch-details"]

  useEffect(() => {
    if (!validScreens.includes(currentScreen)) {
      setCurrentScreen('watch-list')
    }
  }, [currentScreen])
  return (
    <Provider>
      <ScreensContext.Provider
        value={{currentScreen, setCurrentScreen}}
      >
        <WatchList
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
        <WatchDetails />
      </ScreensContext.Provider>
    </Provider>
  )
}

export default WatchCatalogEntry
