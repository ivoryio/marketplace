import React, { PureComponent, Fragment } from 'react'
import { Hub, Auth } from 'aws-amplify'
import { Authenticator } from 'aws-amplify-react'

import { SignIn, SignUp } from './screens'

class AuthEntry extends PureComponent {
  constructor (props) {
    super(props)
    Hub.listen('auth', this, 'authListener')
    this.state = {
      user: null
    }
  }

  async componentDidMount () {
    try {
      await this._loadUser() // The first check
    } catch (err) {
      console.error('* Error caught on loading user in AuthEntry', err)
    }
  }

  _loadUser = async () => {
    const currUser = await Auth.currentAuthenticatedUser()
    try {
      if (currUser) {
        this._transitionToAuthed(currUser)
      }
    } catch (err) {
      console.error('* Error caught in _loadUser() in AuthEntry', err)
    }
  };

  _transitionToAuthed = currUser => {
    const event = new CustomEvent('authed', { detail: { user: currUser } })
    window.dispatchEvent(event)
  };

  async onHubCapsule (capsule) {
    try {
      await this._loadUser() // Triggered every time user sign in / out
    } catch (err) {
      console.error('* Error caught in hub capsule', err)
    }
  }

  render () {
    const { user } = this.state
    return (
      <Fragment>
        {!user ? (
          <Authenticator authState='signIn' hideDefault>
            <SignIn />
            <SignUp />
          </Authenticator>
        ) : null}
      </Fragment>
    )
  }
}

export default AuthEntry
