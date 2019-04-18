import React from 'react'
import { CallToAction } from '@ivoryio/mercury'
import { Box, Button, Flex, Space, Typography } from '@ivoryio/kogaio'

const FooterCTA = () => (
  <Space mt={6} px={4} py={{ xs: 5, md: 6, lg: 3 }}>
    <CallToAction>
      <Flex alignItems='center' flexWrap='wrap' width={1}>
        <Box width={{ xs: 1, md: 2 / 3 }}>
          <Typography
            color='white'
            fontWeight={2}
            textAlign='center'
            textStyle='subtitle'>
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
export default FooterCTA
