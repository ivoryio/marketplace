import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Region } from 'frint-react'

import { Header, themeGet, Typography } from '@ivoryio/kogaio'
import { Box, Space } from '@ivoryio/kogaio/Responsive'

const HeaderCmp = ({ user }) => {
  const hasUser = Object.keys(user).length !== 0
  const Left = () => (
    <LeftSection>
      <Space ml={3}>
        <Typography
          color='white'
          data-testid='dashboard-title'
          fontSize={3}
        >
          Dashboard
        </Typography>
      </Space>
    </LeftSection>
  )
  const Right = () => (
    <RightSection width={1}>
      <Region name='user-menu' data={{ user }} />
    </RightSection>
  )
  return (
    <Space>
      {hasUser ? (
        <StyledHeader left={<Left />} right={<Right user={user} />} />
      ) : null}
    </Space>
  )
}

const LeftSection = styled(Box)`
  display: flex
  flex-direction: row;
  align-items: center;
`
const RightSection = styled(Box)`
  display: flex
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
`
const StyledHeader = styled(Header)`
  background-color: ${themeGet('colors.brand.primary')};
`

HeaderCmp.propTypes = {
  user: PropTypes.object.isRequired
}

HeaderCmp.defaultProps = {
  user: {}
}

export default HeaderCmp
