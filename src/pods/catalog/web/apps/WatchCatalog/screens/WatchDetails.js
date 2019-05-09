import React, { useContext } from 'react'
import { Button, Flex, Typography, Space } from '@ivoryio/kogaio'

import { NavigationContext } from '../WatchCatalogEntry'

const WatchDetails = () => {
  const { currentScreen, NavigateTo } = useContext(NavigationContext)
  if (!currentScreen.includes('watch-details')) {
    return null
  }
  return (
    <Flex flexDirection='column' alignItems='center'>
      <Typography>Welcome to Watch Details</Typography>
      <Space mt={1}>
        <Button
          title='Go Back To Watch List'
          onClick={() => NavigateTo('watch-list')}
        />
      </Space>
    </Flex>
  )
}

export default WatchDetails
