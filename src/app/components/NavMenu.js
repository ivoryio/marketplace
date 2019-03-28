import React from 'react'
import PropTypes from 'prop-types'
import Touchable from '@ivoryio/kogaio/Touchable'
import Typography from '@ivoryio/kogaio/Typography'
import { Flex, Space } from '@ivoryio/kogaio/Responsive'

const NavMenu = () => (
    <Space px={3} py={4}>
      <Flex width={1} justifyContent='space-around'>
        <Category onClick={() => {}} />
        <Category onClick={() => {}} />
        <Category onClick={() => {}} />
        <Category onClick={() => {}} />
      </Flex>
    </Space>
  )

const Category = ({ onClick }) => (
  <Touchable effect='opacity' onClick={onClick}>
    <Typography textStyle='list'>Category</Typography>
  </Touchable>
)

Category.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default NavMenu
