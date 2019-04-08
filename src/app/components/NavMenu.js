import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { themeGet } from 'styled-system'
import Touchable from '@ivoryio/kogaio/Touchable'
import IconButton from '@ivoryio/kogaio/IconButton'
import Typography from '@ivoryio/kogaio/Typography'
import { Flex, Hide, Space } from '@ivoryio/kogaio/Responsive'

const categories = ['New Arrivals', 'Mens Watches', 'Ladies Watches', 'Sale']
const NavMenu = props => (
  <NavContainer
    id='landing-nav-menu'
    justifyContent={{ xs: 'space-between', md: 'space-around' }}
    position='relative'
    {...props}
  >
    <NavArrow
      direction='right'
      id='nav-arrow-left'
      name='arrow_left'
      htmlFor='landing-nav-menu'
      textAlign='left'
    />
    <Space px={{ xs: '2.5%', sm: '5%', md: '7.5%' }}>
      {categories.map(cat => (
        <Category key={cat} name={cat} onClick={() => {}} />
      ))}
    </Space>
    <NavArrow
      direction='left'
      id='nav-arrow-right'
      name='arrow_right'
      htmlFor='landing-nav-menu'
      textAlign='right'
    />
  </NavContainer>
)

const NavArrow = ({ direction, name, htmlFor, scrollValue, ...rest }) => {
  const _scroll = () => {
    const container = document.getElementById(htmlFor)
    const scrollTarget = {
      left: direction === 'right' ? -scrollValue : scrollValue
    }
    return container.scrollBy(scrollTarget)
  }
  return (
    <Hide md lg xlg>
      <ArrowContainer>
        <IconButton
          color='pastel-blue'
          fontSize='2em'
          name={name}
          onClick={_scroll}
          width='40px'
          {...rest}
        />
      </ArrowContainer>
    </Hide>
  )
}

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
  width: 100%;
  overflow: hidden;
  position: relative;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: auto;
  -webkit-overflow-scrolling: touch;
`

const ArrowContainer = styled(Flex)`
  background-color: ${themeGet('colors.white')};
  height: 100%;
  left: 0;
  position: -webkit-sticky;
  position: sticky;
  right: 0;
  z-index: 10;
`

Category.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

NavArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  scrollValue: PropTypes.number.isRequired
}

NavArrow.defaultProps = {
  scrollValue: 54
}

export default NavMenu
