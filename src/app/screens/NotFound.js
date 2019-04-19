import React from 'react'
import Typography from '@ivoryio/kogaio/Typography'
import { Flex, Space } from '@ivoryio/kogaio/Responsive'

const NotFound = () => (
  <Space mt={4}>
    <Flex
      alignItems='center'
      flexDirection='column'
      justifyContent='center'
      variant='h2'
    >
      <Typography>Oops! Looks like you found a non-existing page.</Typography>
      <Typography>Ask Mihai for assistance (politely!)</Typography>
    </Flex>
  </Space>
)

export default NotFound
