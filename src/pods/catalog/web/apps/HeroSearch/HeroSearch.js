import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  Flex,
  Input,
  Space,
  themeGet,
  Typography
} from '@ivoryio/kogaio'
import icons from 'assets/icons'

const HeroSearch = props => {
  const [searchTerm, setSearchTerm] = useState('')
  const _handleValueChange = ev => setSearchTerm(ev.target.value)
  const _requestSearch = ev => {
    if (!searchTerm.length) {
      return ev.preventDefault()
    }
    window.dispatchEvent(
      new CustomEvent('transition', {
        detail: { nextState: 'search-results', searchTerm }
      })
    )
  }
  return (
    <Space px={8} py={{ xs: 16, md: 24, lg: 32 }} mt={0}>
      <Flex position='relative' width={1} mt={4} {...props}>
        <Container {...props}>
          <Box width={{ xs: 1, md: 3 / 4 }}>
            <Typography
              color='white'
              fontSize={{ xs: '1.625em', md: '2em' }}
              fontWeight={0}
              textAlign='center'
              textStyle='h2'
            >
              Hero image headline text goes here.
              <Typography color='white' textAlign='center'>
                Promote a product and then follow with a call to action!
              </Typography>
            </Typography>
          </Box>
          <Space mt={8}>
            <Flex
              flexWrap='wrap'
              justifyContent='center'
              width={{ xs: 1, sm: 3 / 4, md: 2 / 3 }}
            >
              <Box width={1}>
                <Typography
                  color='white'
                  fontWeight={0}
                  textAlign='center'
                  textStyle='h3'
                >
                  Subtitle with a call to action label goes here.
                </Typography>
              </Box>
              <Space mt={4}>
                <Flex
                  flexWrap='wrap'
                  width={{ xs: 1, md: 1, lg: 3 / 4 }}
                  maxWidth='760px'
                >
                  <Space px={1}>
                    <Box width={{ xs: 1, md: 2 / 3 }}>
                      <Input
                        onChange={_handleValueChange}
                        placeholder='Search...'
                        value={searchTerm}
                        {...props}
                      />
                    </Box>
                    <Box width={{ xs: 1, md: 1 / 3 }}>
                      <Button
                        title='Feeling lucky'
                        height='36px'
                        onClick={_requestSearch}
                        width={1}
                      />
                    </Box>
                  </Space>
                </Flex>
              </Space>
            </Flex>
          </Space>
        </Container>
      </Flex>
    </Space>
  )
}

const Container = styled(Flex)`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  ::before {
    background-image: url(${icons.heroBanner});
    background-position: center;
    background-size: cover;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
  }

  ::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    content: '';
    ${themeGet('colorStyles.overlay')};
  }
`

export default HeroSearch
