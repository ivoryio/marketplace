import React from 'react'
import PropTypes from 'prop-types'

import icons from 'assets/icons'
import Image from '@ivoryio/kogaio/Image'
import TopBar from '@ivoryio/kogaio/TopBar'
import Touchable from '@ivoryio/kogaio/Touchable'
import IconButton from '@ivoryio/kogaio/IconButton'
import { Flex, Space } from '@ivoryio/kogaio/Responsive'

const Header = ({ transitionToState, user }) => (
  <TopBar
    icSize='1.5em'
    height='56px'
    alignItems='center'
    justifyContent='space-between'
  >
    <Touchable onClick={transitionToState('landing')}>
      <Image
        src={icons.logoLarge}
        alt='Market placeholder'
        dimensions={[96, 'auto']}
      />
    </Touchable>
    <Flex>
      <NavButton icName='shopping_cart' onClick={transitionToState('cart')} />
      <NavButton
        icName='account_circle'
        onClick={transitionToState('profile')}
      />

      {user ? (
        <NavButton
          icName='exit_to_app'
          onClick={transitionToState('signout')}
        />
      ) : null}
    </Flex>
  </TopBar>
)

const NavButton = ({ icName, onClick }) => (
  <Space p={2}>
    <IconButton
      color='pastel-blue'
      fontSize={4}
      name={icName}
      onClick={onClick}
    />
  </Space>
)

Header.propTypes = {
  transitionToState: PropTypes.func.isRequired,
  user: PropTypes.object
}

NavButton.propTypes = {
  icName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Header
