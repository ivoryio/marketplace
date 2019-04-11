import React from 'react'
import { Region } from 'frint-react'
import { CallToAction } from '../components'
import { Box, Button, Flex, Space, Typography } from '@ivoryio/kogaio'

import icons from 'assets/icons'
import { Footer } from '../components'

const Landing = () => (
  <Flex flexDirection='column'>
    <Region name='hero-search' />
    <Space my={6}>
      <Region name='spotlight-watches' />
    </Space>
    <PrimaryCTA />
    <Space my={6}>
      <Region name='watch-list' />
    </Space>
    <Region name='spotlight-categories' />
    <SecondaryCTA />
    <Footer />
  </Flex>
)

const PrimaryCTA = () => (
  <Space mt={6} py={{ xs: 8, md: 11, lg: 9 }}>
    <CallToAction background={icons.callToAction1}>
      <Box width={{ xs: 1, md: 3 / 4 }}>
        <Typography
          textStyle='h2'
          fontSize={{ xs: '1.625em', md: '1.75em', lg: '2em' }}
          fontWeight={2}
          color='white'
          textAlign='center'
        >
          Hero image headline text goes here.
          <Typography color='white' textAlign='center'>
            Promote a product and then follow with a call to action
          </Typography>
        </Typography>
      </Box>
      <Space mt={{ xs: 6, sm: 5, lg: 8 }}>
        <Box width={1 / 2} textAlign='center'>
          <Button
            colors='button-outline-dark'
            onClick={() => {}}
            title='Take me there'
            variant='outline'
            width={1}
            maxWidth='180px'
          />
        </Box>
      </Space>
    </CallToAction>
  </Space>
)

const SecondaryCTA = () => (
  <Space mt={6} py={{ xs: 5, md: 6, lg: 3 }}>
    <CallToAction>
      <Flex alignItems='center' flexWrap='wrap' width={1}>
        <Box width={{ xs: 1, md: 2 / 3 }}>
          <Typography
            color='white'
            fontWeight={2}
            textAlign='center'
            textStyle='subtitle'
          >
            Start your 30-day free trial today. Cancel or upgrade anytime.
          </Typography>
        </Box>
        <Space mt={{ xs: 4, md: 0 }}>
          <Box width={{ xs: 1, md: 1 / 3 }} textAlign='center'>
            <Button
              onClick={() => {}}
              title='Claim'
              variant='primary'
              width={1}
              maxWidth='212px'
            />
          </Box>
        </Space>
      </Flex>
    </CallToAction>
  </Space>
)

export default Landing
