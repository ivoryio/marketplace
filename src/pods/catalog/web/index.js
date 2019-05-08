import { createApp } from 'frint'
import { RegionService } from 'frint-react'

import NewestWatches from './apps/NewestWatches'
import WatchCatalog from './apps/WatchCatalog'
import SpotlightWatches from './apps/SpotlightWatches'
import SpotlightCategories from './apps/SpotlightCategories'

const entries = [
  {
    name: 'NewestWatches',
    Component: NewestWatches,
    regions: ['newest-watches']
  },
  {
    name: 'WatchCatalog',
    Component: WatchCatalog,
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
