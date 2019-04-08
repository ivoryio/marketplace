import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Touchable from '@ivoryio/kogaio/Touchable'
import { Flex, Space } from '@ivoryio/kogaio/Responsive'
import Typography from '@ivoryio/kogaio/Typography'

const categories = ['New Arrivals', 'Mens Watches', 'Ladies Watches', 'Sale']

const NavMenu = props => (
  <Space px={{ xs: '2.5%', sm: '5%', md: '7.5%' }}>
    <NavContainer {...props}>
      {categories.map(cat => (
        <Category key={cat} name={cat} onClick={() => {}} />
      ))}
    </NavContainer>
  </Space>
)

const Category = ({ name, onClick }) => (
  <Flex
    alignItems='center'
    justifyContent='center'
    minWidth={{ xs: '40%', sm: '25%', lg: '15%' }}
  >
    <Touchable effect='opacity' onClick={onClick} width={1}>
      <Typography textStyle='list'>{name}</Typography>
    </Touchable>
  </Flex>
)

const NavContainer = styled(Flex)`
  align-items: center;
  height: 60px;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: auto;
  -webkit-overflow-scrolling: touch;
`

Category.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default NavMenu
