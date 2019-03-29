import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '@ivoryio/kogaio/Input'
import Button from '@ivoryio/kogaio/Button'
import Typography from '@ivoryio/kogaio/Typography'
import { Box, Flex, Space } from '@ivoryio/kogaio/Responsive'

import icons from 'assets/icons'

const HeroBanner = () => (
  <Space py={5}>
    <Container>
      <Space px={{ xs: 3, md: 5 }}>
        <Box width={{ xs: 1, md: 3 / 4, lg: 2 / 3 }}>
          <Typography
            color='white'
            textAlign='center'
            textStyle='h1'
            fontWeight={2}
          >
            Hero image headline text goes here.
            <Typography color='white' textAlign='center'>
              Promote a product and then follow with a call to action!
            </Typography>
          </Typography>
          <Typography
            color='white'
            textAlign='center'
            textStyle='h2'
            fontWeight={2}
            mt={3}
          >
            Subtitle with a call to action label goes here.
          </Typography>
        </Box>
        <Space mt={3}>
          <Flex flexWrap='wrap' width={{ xs: 1, sm: 3 / 4, md: 1 / 2 }}>
            <Space px={1}>
              <Box width={{ xs: 1, lg: 2 / 3 }}>
                <Search />
              </Box>
            </Space>
            <Space px={1}>
              <Box width={{ xs: 1, lg: 1 / 3 }}>
                <Button title='Feeling lucky' height='40px' width={1} />
              </Box>
            </Space>
          </Flex>
        </Space>
      </Space>
    </Container>
  </Space>
)

const Search = props => {
  const [searchTerm, setSearchTerm] = useState('')
  const _search = ev => setSearchTerm(ev.target.value)
  return (
    <Input
      onChange={_search}
      placeholder='Search...'
      border='1px solid white'
      value={searchTerm}
      {...props}
    />
  )
}

const Container = styled(Flex)`
  position: relative;
  background: url(${icons.heroBanner});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default HeroBanner
