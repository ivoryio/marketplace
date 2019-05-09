import React, { createContext, useState } from "react"
import { WatchList, WatchDetails } from "./screens"
import Provider from "./services/Provider"

export const ScreensContext = createContext()
const WatchCatalogEntry = () => {
  const [currentScreen, setCurrentScreen] = useState("watch-list")
  const validScreens = ["watch-list", "watch-details"]
  const NavigateTo = screenName => {
    validScreens.includes(currentScreen) ? setCurrentScreen(screenName) : console.error(`Invalid screen name, expected one of ${validScreens}`)
  }

  return (
    <Provider>
      <ScreensContext.Provider
        value={{currentScreen, NavigateTo}}
      >
        <WatchList />
        <WatchDetails />
      </ScreensContext.Provider>
    </Provider>
  )
}

export default WatchCatalogEntry
