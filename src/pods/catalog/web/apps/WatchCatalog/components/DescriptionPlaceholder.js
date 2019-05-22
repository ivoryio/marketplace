import React from 'react'
import { Box, Flex, Space } from '@ivoryio/kogaio/Responsive'

const DetailsPlaceholder = () => (
  <Flex
    bg='white'
    flexWrap='wrap'
    justifyContent='flex-start'
    minHeight='472px'
    width={1}>
    {Array.from(Array(20)).map((item, ix) => (
      <Space key={Math.random() * 10} mx={1}>
        <Box
          bg='ice-white'
          width={`${Math.round(Math.random() * 90)}%`}
          height='16px'
        />
      </Space>
    ))}
  </Flex>
)

export default DetailsPlaceholder
