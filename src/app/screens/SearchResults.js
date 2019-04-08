import React from 'react'
import PropTypes from 'prop-types'
import { Region } from 'frint-react'

const SearchResults = ({ searchTerm }) => (
  <Region name='search-results' data={{ searchTerm }} />
)

SearchResults.propTypes = {
  searchTerm: PropTypes.string.isRequired
}

export default SearchResults
