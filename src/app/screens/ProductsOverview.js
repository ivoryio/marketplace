import React from 'react'
import PropTypes from 'prop-types'
import { Region } from 'frint-react'
import { Flex, Space } from '@ivoryio/kogaio'

import { Footer, FooterCTA } from '../components'

const ProductsOverview = ({ filter, searchTerm, sortRule, source }) => (
  <Flex flexDirection='column'>
    <Region
      name='watch-catalog'
      data={{ filter, searchTerm, sortRule, source }}
    />
    <Space mt={10}>
      <FooterCTA />
    </Space>
    <Footer />
  </Flex>
)

ProductsOverview.propTypes = {
  filter: PropTypes.string,
  searchTerm: PropTypes.string,
  sortRule: PropTypes.string,
  source: PropTypes.oneOf(['search-results', 'product-catalog'])
}

export default ProductsOverview
