import React, { createContext, useState } from "react"
import { WatchList, WatchDetails } from "./screens"
import Provider from "./services/Provider"

export const ScreensContext = createContext()
const WatchCatalogEntry = () => {
  const [currentScreen, setCurrentScreen] = useState("watch-list")
  const validScreens = ["watch-list", "watch-details"]
  const setScreen = screenName => {
    if (!validScreens.includes(currentScreen)) {
      console.error(`Invalid screen name, it must be one of ${validScreens}`)
    }
    setCurrentScreen(screenName)
  }

  return (
    <Provider>
      <ScreensContext.Provider
        value={{currentScreen, setScreen}}
      >
        <WatchList />
        <WatchDetails />
      </ScreensContext.Provider>
    </Provider>
  )
}

export default WatchCatalogEntry
