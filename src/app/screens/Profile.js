import React from 'react'
import styled from 'styled-components'
import { Region } from 'frint-react'
import { Space } from '@ivoryio/kogaio'

const Profile = () => (
  <Space my={6}>
    <AuthRegion name='auth' />
  </Space>
)

const AuthRegion = styled(Region)`
  width: 100%;
`

export default Profile
