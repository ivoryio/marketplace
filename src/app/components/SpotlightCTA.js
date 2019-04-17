import React from 'react'
import { CallToAction } from '@ivoryio/mercury'
import { Space, Typography } from '@ivoryio/kogaio'

import icons from 'assets/icons'

const SpotlightCTA = () => {
  const ActionTitle = () => (
    <Typography color='white' fontWeight={2} textAlign='center' textStyle='h2'>
      Deal of the day! <br />
      <Space mt={1}>
        <Typography color='white'>
          Buy an Omega Seamaster PF-69AT and get free delivery!
        </Typography>
      </Space>
    </Typography>
  )

  return (
    <Space mt={6} py={{ xs: 8, md: 11, lg: 9 }}>
      <CallToAction
        background={icons.spotlightCTA}
        button={{
          title: 'Take me there',
          colors: 'button-outline-dark',
          variant: 'outline',
          onClick: () => {}
        }}
        Title={<ActionTitle />}
      />
    </Space>
  )
}

export default SpotlightCTA
