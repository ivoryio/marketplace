import React from 'react'
import { createApp } from 'frint'
import { themeFactory } from '@ivoryio/kogaio'
import { ThemeProvider } from 'styled-components'

import RootEntry from './RootEntry'
import { GlobalStyle } from '../assets/GlobalStyle'

export default createApp({
  name: 'Root',
  providers: [
    {
      name: 'component',
      useFactory () {
        return () => (
          <ThemeProvider theme={themeFactory()}>
            <>
              <GlobalStyle />
              <RootEntry />
            </>
          </ThemeProvider>
        )
      }
    }
  ]
})
