import React from 'react'
import { createApp } from 'frint'
import { RegionService } from 'frint-react'
import { ThemeConsumer } from 'styled-components'

import 'user-assets/animations.css'
import AuthEntry from './app/AuthEntry'
import UserMenuEntry from './app/UserMenuEntry'

const entries = [
  { name: 'Auth', Component: AuthEntry, regions: ['auth'] },
  { name: 'UserMenu', Component: UserMenuEntry, regions: ['user-menu'] }
]

entries.forEach(entry => {
  const App = createApp({
    name: entry.name,
    providers: [
      {
        name: 'component',
        useFactory () {
          return () => {
            const { Component } = entry
            return (
              <ThemeConsumer>
                {theme => <Component theme={theme} />}
              </ThemeConsumer>
            )
          }
        }
      },
      {
        name: 'region',
        useClass: RegionService // `useClass` because `RegionService` will be instantiated
      }
    ]
  });
  (window.app = window.app || []).push([App, { regions: entry.regions }])
})
