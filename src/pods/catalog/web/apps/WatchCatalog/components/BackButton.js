import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Icon, Touchable, Typography } from '@ivoryio/kogaio'

const BackButton = ({ onClick, ...props }) => (
  <Touchable effect='opacity' onClick={onClick} {...props}>
    <Flex alignItems='center'>
      <Icon
        color='pastel-blue'
        fontSize={3}
        name='navigate_before'
      />
      <Typography
        color='pastel-blue'
        fontSize={2}
      >
        Back
      </Typography>
    </Flex>
  </Touchable>
)

BackButton.propTypes = {
  onClick: PropTypes.func
}

export default BackButton