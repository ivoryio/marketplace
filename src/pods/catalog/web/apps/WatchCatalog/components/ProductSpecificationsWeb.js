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

const ProductSpecificationsWeb = (props) => (
  <Flex flexDirection='column' {...props}>
    <Typography color='pastel-blue' fontSize={0}>Caliber</Typography>
    <Space mt={2}>
      <InfoTable options={options} />
    </Space>
  </Flex>
)

export default ProductSpecificationsWeb
