import { createApp } from 'frint'
import { RegionService } from 'frint-react'

import Entry from './app/Entry'

const app = createApp({
  name: 'hello',
  providers: [
    {
      name: 'component',
      useValue: Entry
    },
    {
      name: 'region',
      useClass: RegionService
    }
  ]
});

(window.app = window.app || []).push([
  app,
  {
    regions: ['hello']
  }
])
