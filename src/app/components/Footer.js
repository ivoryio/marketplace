import React from 'react'
import styled from 'styled-components'
import { Hub } from '@aws-amplify/core'

import icons from 'assets/icons'
import { Box, Flex, Image, Space, Touchable, Typography } from '@ivoryio/kogaio'
import { footerCategories } from '../services/constants'
const Footer = () => {
  const _handleItemClick = item => () => {
    const { type, path } = item
    if (type.includes('url')) {
      return window.open(path, '_blank')
    }
    Hub.dispatch(
      'TransitionChannel',
      {
        event: 'transition',
        data: { destination: path },
        message: `Request to transition to ${path}`
      },
      'Footer'
    )
  }
  return (
    <Space my={{xs: 6, lg: 10}}>
      <Flex
        alignItems='center'
        flexWrap={{ xs: 'wrap-reverse', md: 'wrap' }}
        width={1}>
        <Copyright />
        <Space px={2}>
          {footerCategories.map(section => (
            <Flex
              alignItems='center'
              justifyContent='center'
              key={section.title}
              width={{ xs: 1 / 3, md: 1 / 5 }}>
              <Flex flexDirection='column' alignItems='flex-start'>
                <SectionHeader
                  color='pastel-blue'
                  fontWeight={2}
                  variant='h6'>
                  {section.title}
                </SectionHeader>
                {section.items.map(item => (
                  <Space key={item.title} mt={3}>
                    <Touchable
                      effect='opacity'
                      onClick={_handleItemClick(item)}>
                      <Typography fontWeight={0} variant='caption'>
                        {item.title}
                      </Typography>
                    </Touchable>
                  </Space>
                ))}
              </Flex>
            </Flex>
          ))}
        </Space>
      </Flex>
    </Space>
  )
}

const Copyright = () => (
  <Space mt={{ xs: 6, md: 0 }}>
    <Box alignSelf='flex-start' width={{ xs: 1, md: 1 / 3 }}>
      <Flex alignItems='center' justifyContent='center'>
        <Image dimensions={[24]} src={icons.logo} />
        <Space ml={1}>
          <Typography color='pastel-blue' fontWeight={5} variant='h6'>
            Ivory
          </Typography>
        </Space>
      </Flex>
      <Space mt={1}>
        <Typography
          fontFamily='complementary'
          textAlign='center'
          variant='caption'>
          © 2019 Ivory.io, Inc. or its affiliates
        </Typography>
      </Space>
    </Box>
  </Space>
)

const SectionHeader = styled(Typography)`
  text-transform: uppercase;
`

export default Footer
