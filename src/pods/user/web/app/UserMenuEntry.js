import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'

import {
  MenuList,
  Modal,
  Space,
  themeGet,
  Touchable,
  Typography
} from '@ivoryio/kogaio'

const menuItems = [
  {
    id: 'my-account',
    name: 'My Profile'
  },
  {
    id: 'signout-button',
    name: 'Sign Out'
  }
]

export const UserMenuEntry = ({ regionData: { user } }) => {
  const {
    attributes: { name, family_name: familyName }
  } = user
  const initials = `${name[0].toUpperCase()}${familyName[0].toUpperCase()}`
  const [isModalShown, setModalShown] = useState(false)
  const toggleModal = () => setModalShown(!isModalShown)

  async function _signOut () {
    await _requestSignOut()
    toggleModal()

    async function _requestSignOut () {
      await Auth.signOut().catch(err =>
        console.error('* Error caught on sign out', err)
      )
      const event = new Event('signout')
      window.dispatchEvent(event)
    }
  }

  const _selectMenuItem = item => {
    switch (item) {
      case 'My Profile':
        return console.warn('* My Account fired. Feature still in progress.')
      default:
        return toggleModal()
    }
  }
  const SignOutIcon = ({ ...props }) => (
    <RoundedIcon data-testid='user-menu-toggler' {...props}>
      <Typography color='white' fontSize={3}>
        {initials}
      </Typography>
    </RoundedIcon>
  )

  return (
    <Fragment>
      <Space mr={3} py={2}>
        <MenuList
          alignment='right'
          arrowSize={10}
          CustomToggler={SignOutIcon}
          id='user-menu'
          colors='menu-list'
          fontSize='1rem'
          listItems={menuItems}
          onSelectItem={_selectMenuItem}
        />
      </Space>
      {isModalShown ? (
        <Modal
          cancelButtonType='outline'
          confirmActionFn={_signOut}
          confirmButtonTestId='confirm-button-signout'
          data-testid='signout-modal'
          display='flex'
          flexDirection='column'
          fontSize='1.2rem'
          hideModal={toggleModal}
          minHeight='14em'
          maxHeight='25em'
          position='relative'
          px={3}
          width={{ xs: 9 / 10, sm: 3 / 4, md: 1 / 2, lg: 1 / 3 }}
        >
          Are you sure you want to sign out?
        </Modal>
      ) : null}
    </Fragment>
  )
}

const RoundedIcon = styled(Touchable)`
  width: 40px;
  height: 40px;
  border-radius: ${themeGet('radii.5', '50%')};
  background-color: ${themeGet('colors.dark-gunmetal', '#484848')};
`

const ObservedUserMenu = observe((app, props$) => {
  const region = app.get('region')
  const regionData$ = region
    .getData$()
    .pipe(map(regionData => ({ regionData })))
  return regionData$
})(UserMenuEntry)

UserMenuEntry.propTypes = {
  regionData: PropTypes.object
}

export default ObservedUserMenu
