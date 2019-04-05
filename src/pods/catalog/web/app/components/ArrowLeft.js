import React from 'react'
import styled from 'styled-components'
import { Icon, Space } from '@ivoryio/kogaio'

const ArrowLeft = () => (
  <Space mb={5} mr={3}>
    <StyledIcon
      alignSelf='center'
      color='pastel-blue'
      name='arrow_back'
      fontSize={5}
    />
  </Space>
)

const StyledIcon = styled(Icon)`
  cursor: pointer;
`

export default ArrowLeft
