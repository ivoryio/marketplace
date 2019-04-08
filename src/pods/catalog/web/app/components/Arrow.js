import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon, Space } from '@ivoryio/kogaio'

const Arrow = ({ direction }) => (
  <Space
    mb={5} 
    ml={direction === 'left' ? 3 : 0}
    mr={direction === 'right' ? 3 : 0}
  >
    <StyledIcon
      alignSelf='center'
      color='pastel-blue'
      name={direction === 'left' ? 'arrow_back' : 'arrow_forward'}
      fontSize={5}
    />
  </Space>
)

const StyledIcon = styled(Icon)`
  cursor: pointer;
`

Arrow.propTypes={
  direction: PropTypes.string
}

export default Arrow
