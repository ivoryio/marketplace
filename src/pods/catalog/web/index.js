import { createApp } from 'frint'
import { RegionService } from 'frint-react'

import Entry from './app/Entry'
import WatchListEntry from './app/WatchListEntry'

const entries = [
  { name: 'Catalog', Component: Entry, regions: ['catalog'] },
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
