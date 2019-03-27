import React from 'react'
import { createApp } from 'frint'
import { themeFactory } from '@ivoryio/kogaio'
import { ThemeProvider } from 'styled-components'

import RootEntry from './RootEntry'

export default createApp({
  name: 'Root',
  providers: [
    {
      name: 'component',
      useFactory () {
        return () => (
          <ThemeProvider theme={themeFactory()}>
            <RootEntry />
          </ThemeProvider>
        )
      }
    }
  ]
})
