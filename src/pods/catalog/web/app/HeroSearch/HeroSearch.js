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

const HeroSearch = props => (
  <Space px={6} py={{ xs: 9, md: 12, lg: 13 }} mt={0}>
    <Flex position='relative' width={1} mt={4} {...props}>
      <Container {...props}>
        <Box width={{ xs: 1, md: 3 / 4 }}>
          <Typography
            color='white'
            fontSize={{ xs: '1.625em', md: '2em' }}
            fontWeight={2}
            textAlign='center'
            textStyle='h2'
          >
            Hero image headline text goes here.
            <Typography color='white' textAlign='center'>
              Promote a product and then follow with a call to action!
            </Typography>
          </Typography>
        </Box>
        <Space mt={6}>
          <Flex
            flexWrap='wrap'
            justifyContent='center'
            width={{ xs: 1, sm: 3 / 4, md: 2 / 3 }}
          >
            <Box width={1}>
              <Typography
                color='white'
                fontWeight={2}
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
                    <Search />
                  </Box>
                  <Box width={{ xs: 1, md: 1 / 3 }}>
                    <Button title='Feeling lucky' height='40px' width={1} />
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

const Search = props => {
  const [searchTerm, setSearchTerm] = useState('')
  const _search = ev => setSearchTerm(ev.target.value)
  return (
    <Input
      onChange={_search}
      placeholder='Search...'
      value={searchTerm}
      {...props}
    />
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
