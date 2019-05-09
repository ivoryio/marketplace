import React, { useContext } from 'react'
import { Button, Flex, Typography, Space } from '@ivoryio/kogaio'

import { ScreensContext } from '../WatchCatalogEntry'

const WatchDetails = () => {
  const { currentScreen, setCurrentScreen } = useContext(ScreensContext)
  if (!currentScreen.includes('watch-details')) {
    return null
  }
  return (
    <Flex flexDirection='column' alignItems='center'>
      <Typography>Welcome to Watch Details</Typography>
      <Space mt={1}>
        <Button
          title='Go Back To Watch List'
          onClick={() => setCurrentScreen('watch-list')}
        />
      </Space>
    </Flex>
  )
}

export default WatchDetails
