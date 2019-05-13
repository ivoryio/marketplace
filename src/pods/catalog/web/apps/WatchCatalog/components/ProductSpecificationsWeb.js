import React from 'react'
import { Flex, Typography, Space } from '@ivoryio/kogaio'
import { InfoTable } from '.'

const options = [
  {
    id: 'movement-option',
    name: 'Movement',
    value: 'Automatic'
  },
  {
    id: 'power-option',
    name: 'Power reserve',
    value: '48h'
  }
]
const longDescription = 'WatchShopping.com buys and sells brand new prestigous watches from all around the world. All our products are inspected and purchased directly from countries all around the world to provide the lowest cost, yet, best service quality for our customers. We sell brands such as Rolex, Cartier, Omega, Tudor, Vacheron Constantin, Audemars Piguet, Patek Philippe, Officine Panerai, Hublot and more. If you have a specific watch brand and model that you are looking for, please feel free to talk to us and we will assist you to search for it. Please feel free to talk to us for any questions or concerns. '

const ProductSpecificationsWeb = (props) => (
  <Flex flexDirection='column' {...props}>
    <Typography color='gunmetal' fontSize={3} fontWeight={0}>Details</Typography>
    <Space mt={2}>
      <Typography lineHeight='26px' color='gunmetal' fontSize={1} fontWeight={0}>{longDescription}</Typography>
    </Space>
    <Space mt={5}>
      <Typography color='gunmetal' fontSize={3} fontWeight={0}>Info & Stats</Typography>
    </Space>
    <Space mt={2}>
      <Typography color='pastel-blue' fontSize={0}>Caliber</Typography>
    </Space>
    <Space mt={2}>
      <InfoTable options={options} />
    </Space>
  </Flex>
)

export default ProductSpecificationsWeb
