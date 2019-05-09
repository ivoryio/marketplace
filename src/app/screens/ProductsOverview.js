import React from 'react'
import PropTypes from 'prop-types'
import { Region } from 'frint-react'
import { Flex, Space } from '@ivoryio/kogaio'

import { Footer, FooterCTA } from '../components'

const ProductsOverview = ({ searchTerm }) => (
  <Flex flexDirection='column'>
    <Region name='watch-catalog' data={{ searchTerm }} />
    <Space mt={10}>
      <FooterCTA />
    </Space>
    <Footer />
  </Flex>
)

ProductsOverview.propTypes = {
  searchTerm: PropTypes.string.isRequired
}

export default ProductsOverview
