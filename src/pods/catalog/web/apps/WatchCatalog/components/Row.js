import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@ivoryio/kogaio'
const Row = ({ left, right, ...props }) => (
  <Flex
    width={1}
    alignItems='center'
    justifyContent='space-between'
    {...props}
  >
    {left}
    {right}
  </Flex>
)

Row.propTypes = {
  left: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.element
  ]),
  right: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.element
  ])
}

export default Row