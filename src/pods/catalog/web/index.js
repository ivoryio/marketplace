import { createApp } from 'frint'
import { RegionService } from 'frint-react'

import WatchList from './apps/WatchList'
import ProductsOverview from './apps/ProductsOverview'
import SpotlightWatches from './apps/SpotlightWatches'
import SpotlightCategories from './apps/SpotlightCategories'

const entries = [
  {
    name: 'WatchList',
    Component: WatchList,
    regions: ['watch-list']
  },
  {
    name: 'ProductsOverview',
    Component: ProductsOverview,
    regions: ['products-overview']
  },
  {
    name: 'SpotlightWatches',
    Component: SpotlightWatches,
    regions: ['spotlight-watches']
  },
  {
    name: 'SpotlightCategories',
    Component: SpotlightCategories,
    regions: ['spotlight-categories']
  }
]

entries.forEach(entry => {
  const { name, Component, regions } = entry
  const App = createApp({
    name,
    providers: [
      {
        name: 'component',
        useValue: Component
      },
      {
        name: 'region',
        useClass: RegionService
      }
    ]
  })

  ;(window.app = window.app || []).push([App, { regions: regions }])
})
