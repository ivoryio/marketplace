import { createApp } from 'frint'
import { RegionService } from 'frint-react'

import CatalogEntry from './app/CatalogEntry'
import WatchListEntry from './app/WatchListEntry'
import HeroSearch from './app/HeroSearch/HeroSearch'

const entries = [
  { name: 'Catalog', Component: CatalogEntry, regions: ['catalog'] },
  { name: 'WatchList', Component: WatchListEntry, regions: ['watch-list'] },
  { name: 'HeroSearch', Component: HeroSearch, regions: ['hero-search'] }
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
