import React from 'react'
import PropTypes from 'prop-types'
import { Region } from 'frint-react'
import { Flex } from '@ivoryio/kogaio'

const ProductsOverview = ({ searchTerm }) => (
  <Flex flexDirection='column'>
    <Region name='products-overview' data={{ searchTerm }} />
  </Flex>
)

ProductsOverview.propTypes = {
  searchTerm: PropTypes.string.isRequired
}

export default ProductsOverview
