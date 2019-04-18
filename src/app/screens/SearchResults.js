import React from 'react'
import PropTypes from 'prop-types'
import { Region } from 'frint-react'

const SearchResults = ({ searchTerm }) => (
  <Region name='products-overview' data={{ searchTerm }} />
)

SearchResults.propTypes = {
  searchTerm: PropTypes.string.isRequired
}

export default SearchResults
