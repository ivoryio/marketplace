import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex, themeGet, Touchable } from '@ivoryio/kogaio'

const SquaredBox = ({ children, onClick, size, ...props }) => (
  <StyledTouchable
    borderRadius={1}
    effect='highlight'
    onClick={onClick}
  >
    <Flex
      width={size}
      height={size}
      justifyContent='center'
      alignItems='center'
      {...props}
    >
      {children}
    </Flex>
  </StyledTouchable>
)

SquaredBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
    PropTypes.element
  ]).isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

SquaredBox.defaultProps = {
  size: 36
}

const StyledTouchable = styled(Touchable)`
  border: ${themeGet('borders.1')} ${themeGet('colors.pastel-blue')};
`

export default SquaredBox
