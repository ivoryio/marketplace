import React from 'react'
import ProductsOverview from './screen/ProductsOverview'
import Provider from './services/Provider'

const ProductsOverviewEntry = () => (
  <Provider>
    <ProductsOverview />
  </Provider>
  )

export default ProductsOverviewEntry