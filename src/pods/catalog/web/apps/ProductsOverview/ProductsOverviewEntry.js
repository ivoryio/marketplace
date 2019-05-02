import React from 'react'
import ProductsOverview from './screen/ProductsOverview'
import Provider from './services/Provider'

const RootEntry = () => (
  <Provider>
    <ProductsOverview />
  </Provider>
  )

export default RootEntry