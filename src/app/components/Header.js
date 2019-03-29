import React from 'react'
import PropTypes from 'prop-types'

import icons from 'assets/icons'
import Image from '@ivoryio/kogaio/Image'
import TopBar from '@ivoryio/kogaio/TopBar'
import Touchable from '@ivoryio/kogaio/Touchable'
import IconButton from '@ivoryio/kogaio/IconButton'
import { Flex, Space } from '@ivoryio/kogaio/Responsive'

const Header = ({ transitionToState, user }) => (
  <TopBar as='header' icSize='1.5em' alignItems='center' px={0} py={2}>
    <Flex
      justifyContent='space-between'
      px={{ xs: '5%', md: '7.5%', lg: '10%' }}
    >
      <Touchable onClick={transitionToState('landing')}>
        <Image
          alt='Market placeholder'
          dimensions={[96, 'auto']}
          objectFit='contain'
          src={icons.logoLarge}
        />
      </Touchable>
      <Flex justifyContent='space-between'>
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
    </Flex>
  </TopBar>
)

const NavButton = ({ icName, onClick }) => (
  <Space px={3} py={2}>
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
