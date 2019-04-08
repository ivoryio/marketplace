import React from 'react'
import styled from 'styled-components'
import { Icon, Space } from '@ivoryio/kogaio'

const ArrowRight = () => (
  <Space mb={5} ml={3}>
    <StyledIcon
      alignSelf='center'
      color='pastel-blue'
      name='arrow_forward'
      fontSize={5}
    />
  </Space>
)

const StyledIcon = styled(Icon)`
  cursor: pointer;
`

export default ArrowRight
