import React from 'react'
import { CallToAction } from '@ivoryio/mercury'
import { Box, Button, Flex, Space, Typography } from '@ivoryio/kogaio'

const FooterCTA = ({...props}) => (
  <Space px={4} py={{ xs: 6, md: 8, lg: 3 }}>
    <CallToAction {...props}>
      <Flex alignItems='center' flexWrap='wrap' width={1}>
        <Box width={{ xs: 1, lg: 2 / 3 }}>
          <Typography
            color='white'
            fontWeight={2}
            textAlign='center'
            variant='subtitle'>
            Start your 30-day free trial today. Cancel or upgrade anytime.
          </Typography>
        </Box>
        <Space mt={{ xs: 4, md: 5, lg: 0 }}>
          <Box width={{ xs: 1, lg: 1 / 3 }} textAlign='center'>
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
export default FooterCTA
