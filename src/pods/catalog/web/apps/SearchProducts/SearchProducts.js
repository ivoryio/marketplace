import React from 'react'
import PropTypes from 'prop-types'
import { map } from "rxjs/operators"
import { observe } from "frint-react"
import { Space } from '@ivoryio/kogaio'

import { SearchBox } from './components'

const SearchProducts = ({ regionData: { searchTerm } }) => (
<Space mt={3} px={{ xs: 4, lg: 378 }}>
  <SearchBox initialValue={searchTerm} />
</Space>
)

const ObservedSearchProducts = observe((app, props$) => {
  const region = app.get("region")
  const regionData$ = region
    .getData$()
    .pipe(map(regionData => ({ regionData })))
  return regionData$
})(SearchProducts)

SearchProducts.propTypes = {
  regionData: PropTypes.object
}

export default ObservedSearchProducts

