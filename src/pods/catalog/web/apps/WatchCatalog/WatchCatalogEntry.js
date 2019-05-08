import React from 'react'
import WatchList from './screens/WatchList'
import Provider from './services/Provider'

const WatchCatalogEntry = () => (
  <Provider>
    <WatchList />
  </Provider>
  )

export default WatchCatalogEntry