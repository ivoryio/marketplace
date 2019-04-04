import React from 'react'
import styled from 'styled-components'
import { Region } from 'frint-react'
import { Space } from '@ivoryio/kogaio'

const Profile = () => (
  <Space py={{ xs: 2, md: 0 }}>
    <AuthRegion name='auth' />
  </Space>
)

const AuthRegion = styled(Region)`
  margin: auto;
  width: 100%;
`

export default Profile
