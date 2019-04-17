import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import { map } from 'rxjs/operators'
import { observe } from 'frint-react'

import { MenuList, Modal, Touchable, Typography } from '@ivoryio/kogaio'

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
    toggleModal()
    await _requestSignOut()

    async function _requestSignOut () {
      try {
        await Auth.signOut()
        window.dispatchEvent(new Event('signOut'))
      } catch (err) {
        console.error('* Error caught on sign out', err)
      }
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
  const UserAvatar = ({ ...props }) => (
    <Touchable
      effect='opacity'
      bg='dark-gunmetal'
      borderRadius={7}
      data-testid='user-menu-toggler'
      p={3}
      my={2}
      {...props}
    >
      <Typography color='white' fontSize={3} textStyle='h5'>
        {initials}
      </Typography>
    </Touchable>
  )

  return (
    <>
      <MenuList
        alignment='right'
        arrowSize={8}
        CustomToggler={UserAvatar}
        id='user-menu'
        listItems={menuItems}
        onSelectItem={_selectMenuItem}
      />
      {isModalShown ? (
        <Modal
          cancelButtonType='outline'
          confirmActionFn={_signOut}
          confirmButtonTestId='confirm-button-signout'
          data-testid='signout-modal'
          display='flex'
          flexDirection='column'
          fontSize='1.2em'
          hideModal={toggleModal}
          minHeight='224px'
          maxHeight='400px'
          position='relative'
          px={3}
          width={{ xs: 9 / 10, sm: 3 / 4, md: 1 / 2, lg: 1 / 3 }}
        >
          Are you sure you want to sign out?
        </Modal>
      ) : null}
    </>
  )
}

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
