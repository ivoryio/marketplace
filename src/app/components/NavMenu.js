import React from 'react'
import PropTypes from 'prop-types'
import Touchable from '@ivoryio/kogaio/Touchable'
import Typography from '@ivoryio/kogaio/Typography'
import { Flex, Space } from '@ivoryio/kogaio/Responsive'

const NavMenu = () => (
  <Space p={3}>
    <Flex width={1} justifyContent='space-around'>
      {['New Arrivals', 'Mens Watches', 'Ladies Watches', 'Sale'].map(
        cat => (
          <Category key={cat} name={cat} onClick={() => {}} />
        )
      )}
    </Flex>
  </Space>
)

const Category = ({ name, onClick }) => (
  <Touchable effect='opacity' onClick={onClick}>
    <Typography textStyle='list'>{name}</Typography>
  </Touchable>
)

Category.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default NavMenu
