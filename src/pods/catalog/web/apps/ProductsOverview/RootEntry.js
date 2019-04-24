import React from 'react'
import ProductsOverview from './screen/ProductsOverview'
import Provider, { Context } from './services/Provider'

const RootEntry = () => (
    <Provider>
      <Context.Consumer>
        {
          context => {
            const { data: { searchTerm } } = context
            return <ProductsOverview srcTerm={searchTerm} />
          }
        }
      </Context.Consumer>
    </Provider>
  )

export default RootEntry