import React from 'react'
import { Space } from '@ivoryio/kogaio'
import { HeroSearch } from '@ivoryio/mercury'

import icons from 'assets/icons'

const LandingSearch = () => {
  const _requestSearch = searchTerm =>
    window.dispatchEvent(
      new CustomEvent('transition', {
        detail: { nextState: 'search-results', searchTerm }
      })
    )

  return (
    <Space px={6} py={{ xs: 9, md: 12, lg: 13 }} mt={0}>
      <HeroSearch
        backgroundImage={icons.heroBanner}
        subtitle='You look like you need to update your watch. Type your desires below.'
        title="Don't waste time. Save on style!"
        onSearch={_requestSearch}
      />
    </Space>
  )
}

export default LandingSearch
