import React from 'react'
import PropTypes from 'prop-types'
import { Region } from 'frint-react'

const ProductsOverview = ({ searchTerm }) => (
  <Region name='products-overview' data={{ searchTerm }} />
)

ProductsOverview.propTypes = {
  searchTerm: PropTypes.string.isRequired
}

export default ProductsOverview
