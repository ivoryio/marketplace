import React from 'react'
import PropTypes from 'prop-types'

import icons from 'assets/icons'
import Icon from '@ivoryio/kogaio/Icon'
import Image from '@ivoryio/kogaio/Image'
import TopBar from '@ivoryio/kogaio/TopBar'
import Touchable from '@ivoryio/kogaio/Touchable'
import Typography from '@ivoryio/kogaio/Typography'
import { Flex, Hide, Space } from '@ivoryio/kogaio/Responsive'

const Header = ({ transitionToState, user }) => (
  <Space py={2}>
    <TopBar as='header' icSize='1.5em' alignItems='center'>
      <Space px={{ xs: '2.5%', sm: '5%', md: '7.5%' }}>
        <Flex justifyContent='space-between' height='56px' width={1}>
          <Touchable onClick={transitionToState('landing')}>
            <Image
              alt='Logo placeholder'
              dimensions={[96, 'auto']}
              objectFit='contain'
              src={icons.logoLarge}
            />
          </Touchable>
          <Flex justifyContent='space-between'>
            <NavButton
              icName='shopping_cart'
              label='Your Cart'
              onClick={transitionToState('cart')}
            />
            <NavButton
              icName='account_circle'
              label='Sign Up'
              onClick={transitionToState('profile')}
            />
            <NavButton
              icName='exit_to_app'
              label='Sign In'
              onClick={transitionToState('profile')}
            />
          </Flex>
        </Flex>
      </Space>
    </TopBar>
  </Space>
)

const NavButton = ({ icName, label, onClick }) => (
  <Space px={4}>
  {/* // TODO: Enable at your earliest convenience */}
    <Touchable effect='opacity' onClick={onClick} disabled>
      <Flex alignItems='center'>
        <Icon color='pastel-blue' fontSize={4} name={icName} />
        <Hide xs sm md>
          <Space ml={2}>
            <Typography color='pastel-blue' variant='list'>
              {label}
            </Typography>
          </Space>
        </Hide>
      </Flex>
    </Touchable>
  </Space>
)

Header.propTypes = {
  transitionToState: PropTypes.func.isRequired,
  user: PropTypes.object
}

NavButton.propTypes = {
  icName: PropTypes.string.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default Header
