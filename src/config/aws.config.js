import Amplify, { Auth } from 'aws-amplify'

const auth = require('./auth.config.json')
const apiEndpoints = require('./api.config.json')

export default Amplify.configure({
  Auth: auth,
  API: {
    endpoints: apiEndpoints.map(endpoint => ({
      ...endpoint,
      custom_header: async () => ({
        Authorization: (await Auth.currentSession()).idToken.jwtToken
      })
    }))
  }
})
