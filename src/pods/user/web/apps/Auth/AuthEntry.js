import React, { PureComponent } from 'react'
import { Hub, Auth } from 'aws-amplify'
import { Authenticator } from 'aws-amplify-react'

import { SignIn, SignUp } from './screens'

class AuthEntry extends PureComponent {
  constructor (props) {
    super(props)

    Hub.listen('auth', async () => {
      await this._loadUser()
    })
    this.state = {
      user: null
    }
  }

  async componentDidMount () {
    try {
      await this._loadUser() // The first check
    } catch (err) {
      if (err.includes('not authenticated')) {
        return console.warn('* User not authenticated')
      }
      console.error('* Error caught on loading user in AuthEntry', err)
    }
  }

  _loadUser = async () => {
    const currUser = await Auth.currentAuthenticatedUser().catch(err =>
      console.warn('* Failed to retrieve user. Reason:', err)
    )
    try {
      if (currUser) {
        _transitionToAuthed(currUser)
      }
    } catch (err) {
      console.error('* Error caught in loading user in AuthEntry', err)
    }
    function _transitionToAuthed (currUser) {
      const authenticateEv = new CustomEvent('signIn', {
        detail: { user: currUser }
      })
      window.dispatchEvent(authenticateEv)
    }
  };

  render () {
    const { user } = this.state
    return (
      <>
        {!user ? (
          <Authenticator authState='signIn' hideDefault>
            <SignIn />
            <SignUp />
          </Authenticator>
        ) : null}
      </>
    )
  }
}

export default AuthEntry
