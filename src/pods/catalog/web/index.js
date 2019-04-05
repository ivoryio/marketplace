import { createApp } from 'frint'
import { RegionService } from 'frint-react'

import HeroSearch from './app/HeroSearch'
import SearchResults from './app/SearchResults'
import WatchListEntry from './app/WatchListEntry'

const entries = [
  { name: 'HeroSearch', Component: HeroSearch, regions: ['hero-search'] },
  {
    name: 'SearchResults',
    Component: SearchResults,
    regions: ['search-results']
  },
  { name: 'WatchList', Component: WatchListEntry, regions: ['watch-list'] }
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
