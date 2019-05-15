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
  <Space mx='auto' px={{ xs: 0, md: '7.5%' }}>
    <NavContainer
      id='landing-nav-menu'
      justifyContent='space-between'
      width={{ xs: 1, sm: 9 / 10, md: 1 }}
      {...props}>
      <NavArrow
        direction='right'
        id='nav-arrow-left'
        name='arrow_left'
        htmlFor='landing-nav-menu'
        textAlign='left'
      />
      {categories.map(category => (
        <Category key={category} name={category} onClick={() => {}} />
      ))}
      <NavArrow
        direction='left'
        id='nav-arrow-right'
        name='arrow_right'
        htmlFor='landing-nav-menu'
        textAlign='right'
      />
    </NavContainer>
  </Space>
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
      <ArrowContainer alignment={name.split('_')[1]}>
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
    minWidth={{ xs: '33.3333%', lg: '15%' }}>
    <Touchable effect='opacity' onClick={onClick} width={1}>
      <Typography variant='list'>{name}</Typography>
    </Touchable>
  </Flex>
)

const NavContainer = styled(Flex)`
  align-items: center;
  height: 100%;
  min-height: 60px;
  flex-wrap: nowrap;
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  position: relative;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: auto;
  -webkit-overflow-scrolling: touch;
`

const alignment = () => ({ alignment }) => `${alignment}: 0;`
const ArrowContainer = styled(Flex)`
  ${alignment}
  background-color: ${themeGet('colors.white')};
  height: 100%;
  position: -webkit-sticky;
  position: sticky;
  z-index: 2;
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
