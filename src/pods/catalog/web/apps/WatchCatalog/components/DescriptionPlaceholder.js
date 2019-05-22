import React from 'react'
import { Box, Flex, Space } from '@ivoryio/kogaio/Responsive'

const DetailsPlaceholder = () => (
  <Flex
    bg='white'
    flexWrap='wrap'
    justifyContent='flex-start'
    minHeight='472px'
    width={1}>
    {Array(150)
      .fill('')
      .map((item, ix) => (
        <Space key={Math.random * 10} mx={1}>
          <Box bg='ice-white' width={Math.random() * 75} height='16px' />
        </Space>
      ))}
  </Flex>
)

export default DetailsPlaceholder
