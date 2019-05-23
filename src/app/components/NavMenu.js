import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Hub } from '@aws-amplify/core'
import { themeGet } from 'styled-system'

import Touchable from '@ivoryio/kogaio/Touchable'
import IconButton from '@ivoryio/kogaio/IconButton'
import Typography from '@ivoryio/kogaio/Typography'
import { Flex, Hide, Space } from '@ivoryio/kogaio/Responsive'

const NavMenu = ({
  currScreen,
  ...props
}) => {
  const [activeCategory, setActiveCategory] = useState('')
  const categories = [
    { name: 'New Arrivals', sortRule: 'Newest' },
    { name: 'Mens Watches', searchTerm: 'men' },
    { name: 'Ladies Watches', searchTerm: 'women'},
    { name: 'Spotlight', filter: 'spotlight' }
  ]
  const _requestTransitionToCategory = category => {
    const { filter = '', searchTerm = '', sortRule = '' } = category
    Hub.dispatch(
      'TransitionChannel',
      {
        event: 'transition',
        data: { destination: 'search-results', filter, searchTerm, sortRule },
        message: `Request to transition to SearchResults`
      },
      'NavMenu'
    )
  }
  const handleCategoryClick = category => () => {
    setActiveCategory(category.name)
    _requestTransitionToCategory(category)
  }
  useEffect(() => {
    if (currScreen !== 'search-results')
      setActiveCategory('')
  }, [currScreen, setActiveCategory])
  return (
    <Space px={{ xs: 0, md: '7.5%' }}>
      <NavContainer
        id='landing-nav-menu'
        justifyContent='space-between'
        width={1}
        {...props}>
        <NavArrow
          direction='right'
          id='nav-arrow-left'
          name='arrow_left'
          htmlFor='landing-nav-menu'
          textAlign='left'
        />
        {categories.map(category => (
          <Category
            isActive={activeCategory === category.name}
            key={category.name}
            name={category.name}
            onClick={handleCategoryClick(category)}
          />
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
}

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

const Category = ({ isActive, name, onClick }) => (
  <CategoryContainer
    isActive={isActive}
    minWidth={{ xs: '33.3333%', lg: '15%' }}>
    <Touchable effect='opacity' onClick={onClick} width={1}>
      <Typography variant='list'>{name}</Typography>
    </Touchable>
  </CategoryContainer>
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

const isActive = style => ({ isActive }) => (isActive ? style : null)
const CategoryContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  border-bottom: ${props =>
    isActive(
      `${themeGet('borders.1')(props)} ${themeGet('colors.gunmetal')(props)}`
    )};
`
NavMenu.propTypes = {
  currScreen: PropTypes.string
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
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
