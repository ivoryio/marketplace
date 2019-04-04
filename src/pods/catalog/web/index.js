import { createApp } from 'frint'
import { RegionService } from 'frint-react'
import WatchListEntry from './app/WatchListEntry'
import HeroSearch from './app/HeroSearch/HeroSearch'
import SpotlightWatchesEntry from './app/SpotlightWatchesEntry'
import SpotlightCategoriesEntry from './app/SpotlightCategoriesEntry'

const entries = [
  { name: 'HeroSearch', Component: HeroSearch, regions: ['hero-search'] },
  { name: 'WatchList', Component: WatchListEntry, regions: ['watch-list'] },
  { name: 'SpotlightWatches', Component: SpotlightWatchesEntry, regions: ['spotlight-watches'] },
  { name: 'SpotlightCategories', Component: SpotlightCategoriesEntry, regions: ['spotlight-categories'] }
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
