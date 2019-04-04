import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Flex, themeGet } from '@ivoryio/kogaio'

const CallToAction = ({ background, children, ...props }) => (
  <Flex position='relative' width={1} {...props}>
    <Container background={background}>{children}</Container>
  </Flex>
)

const withBackoundImage = ({ background }) => css`
  ${background &&
    `
  ::before {
    background-image: url(${background});
    background-size: cover;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
  }
  `};
`

const backgroundOverlay = ({ background, ...props }) => css`
  ${background
    ? themeGet('colorStyles.overlay')
    : `background-color: ${themeGet('colors.gunmetal')(props)}`};
`
const Container = styled(Flex)`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  ${withBackoundImage}

  ::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    content: '';
    ${backgroundOverlay}
  }
`

CallToAction.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default CallToAction
