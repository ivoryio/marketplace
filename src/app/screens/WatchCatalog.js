import React from 'react'
import PropTypes from 'prop-types'
import { Region } from 'frint-react'
import { Flex, Space } from '@ivoryio/kogaio'

import { Footer, FooterCTA } from '../components'

const WatchCatalog = ({ searchTerm }) => (
  <Flex flexDirection='column'>
    <Region name='products-overview' data={{ searchTerm }} />
    <Space mt={10}>
      <FooterCTA />
    </Space>
    <Footer />
  </Flex>
)

WatchCatalog.propTypes = {
  searchTerm: PropTypes.string.isRequired
}

export default WatchCatalog
