import React, { Fragment } from 'react'
import { Space } from '@ivoryio/kogaio'
import { Region } from 'frint-react'
import { HeroBanner } from '../components'

const Landing = () => (
  <Fragment>
    <HeroBanner />
    <Space my={6}>
      <Region name='watch-list' />
    </Space>
    <Space my={6}>
      <Region name='spotlight-watches' />
    </Space>
  </Fragment>
)

export default Landing
