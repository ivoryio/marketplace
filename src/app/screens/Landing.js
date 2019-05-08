import React from 'react'
import { Region } from 'frint-react'
import { Flex, Space } from '@ivoryio/kogaio'
import { SpotlightCTA, FooterCTA } from '../components'

import { Footer, LandingSearch } from '../components'

const Landing = () => (
  <Flex flexDirection='column'>
    <LandingSearch />
    <Space my={6}>
      <Region name='spotlight-watches' />
    </Space>
    <SpotlightCTA />
    <Space my={6}>
      <Region name='newest-watches' />
    </Space>
    <Region name='spotlight-categories' />
    <FooterCTA />
    <Footer />
  </Flex>
)

export default Landing
