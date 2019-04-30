import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Flex, Icon, Space, Touchable, Typography } from '@ivoryio/kogaio'

const ActiveFilter = ({ title, onClickIcon, ...props }) => (
  <Space px={1} py={1}>
    <Flex
      bg='brand'
      borderRadius={1}
      {...props}
    >
      <Space px={1}>
        <FitlerTitle
          color='white'
          fontFamily='complementary'
          fontSize={0}
        >
          {title}
        </FitlerTitle>
      </Space>
      <Space px={1}>
        <Touchable
          activeOpacity={.75}
          alignItems='center'
          display='flex'
          effect='opacity'
          onClick={onClickIcon}
        >
          <Icon
            color='white'
            fontSize={1}
            name='remove_circle'
          />
        </Touchable>
      </Space>
    </Flex>
  </Space>
)

const FitlerTitle = styled(Typography)`
  text-transform: capitalize;
`

ActiveFilter.propTypes = {
  title: PropTypes.string,
  onClickIcon: PropTypes.func
}

export default ActiveFilter
