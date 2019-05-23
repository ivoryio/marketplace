import React from 'react'
import PropTypes from 'prop-types'
import { Region } from 'frint-react'
import { Flex, Space } from '@ivoryio/kogaio'

import { Footer, FooterCTA } from '../components'

const ProductsOverview = ({
  destination,
  filter,
  searchTerm,
  targetWatch,
  sortRule
}) => (
  <Flex flexDirection='column'>
    <Region
      name='watch-catalog'
      data={{ destination, filter, searchTerm, sortRule, targetWatch }}
    />
    <Space mt={10}>
      <FooterCTA />
    </Space>
    <Footer />
  </Flex>
)

ProductsOverview.propTypes = {
  destination: PropTypes.string,
  filter: PropTypes.string,
  searchTerm: PropTypes.string,
  targetWatch: PropTypes.string,
  sortRule: PropTypes.string
}

export default ProductsOverview
