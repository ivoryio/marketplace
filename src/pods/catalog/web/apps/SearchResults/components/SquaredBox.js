import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Space, themeGet, Touchable } from '@ivoryio/kogaio'

const SquaredBox = ({ children, onClick, ...props }) => (
  <Space mx={1}>
    <StyledTouchable
      borderRadius={1}
      justifyContent='center'
      alignItems='center'
      minWidth='36px'
      minHeight='36px'
      effect='highlight'
      onClick={onClick}
      {...props}
    >
    { children }
    </StyledTouchable>
  </Space>
)

SquaredBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
    PropTypes.element
  ]).isRequired,
  onClick: PropTypes.func
}

const StyledTouchable = styled(Touchable)`
  border: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
`

export default SquaredBox
