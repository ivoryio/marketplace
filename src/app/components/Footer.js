import React from 'react'
import styled from 'styled-components'

import icons from 'assets/icons'
import { Box, Flex, Image, Space, Touchable, Typography } from '@ivoryio/kogaio'
import { footerCategories } from '../services/constants'
const Footer = () => {
  const _handleItemClick = item => () => {
    const { type, path } = item
    if (type.includes('url')) {
      return window.open(path, '_blank')
    }
    window.dispatchEvent(
      new CustomEvent('transition', {
        detail: { nextState: path }
      })
    )
  }
  return (
    <Space my={8}>
      <Flex
        alignItems='center'
        flexWrap={{ xs: 'wrap-reverse', md: 'wrap' }}
        width={1}
      >
        <Copyright />
        <Space px={2}>
          {footerCategories.map(section => (
            <Flex
              alignItems='center'
              justifyContent='center'
              key={section.title}
              width={{ xs: 1 / 3, md: 1 / 5 }}
            >
              <Flex flexDirection='column' alignItems='flex-start'>
                <SectionHeader
                  color='pastel-blue'
                  fontWeight={2}
                  textStyle='h6'
                >
                  {section.title}
                </SectionHeader>
                {section.items.map(item => (
                  <Space key={item.title} mt={3}>
                    <Touchable
                      effect='opacity'
                      onClick={_handleItemClick(item)}
                    >
                      <Typography fontWeight={0} textStyle='caption'>
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
          <Typography color='pastel-blue' fontWeight={5} textStyle='h6'>
            Ivory
          </Typography>
        </Space>
      </Flex>
      <Space mt={1}>
        <Typography
          fontFamily='complementary'
          textAlign='center'
          textStyle='caption'
        >
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
